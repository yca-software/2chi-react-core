import { describe, expect, it, vi } from 'vitest';
import { createDefaultRefreshRequest, performAccessTokenRefresh } from './request';

describe('performAccessTokenRefresh', () => {
  it('stores and returns access token on success', async () => {
    const setAccessToken = vi.fn();
    const onFailure = vi.fn();
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response(JSON.stringify({ accessToken: 'new-access' }), { status: 200 }),
        ),
    );

    const token = await performAccessTokenRefresh({
      baseURL: 'http://test/api/v1',
      getRefreshToken: () => 'refresh-token',
      request: createDefaultRefreshRequest(),
      useCookieCredentials: false,
      setAccessToken,
      onFailure,
    });

    expect(token).toBe('new-access');
    expect(setAccessToken).toHaveBeenCalledWith('new-access');
    expect(onFailure).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it('calls onFailure when refresh token is missing', async () => {
    const onFailure = vi.fn();
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    await expect(
      performAccessTokenRefresh({
        baseURL: 'http://test/api/v1',
        getRefreshToken: () => null,
        request: createDefaultRefreshRequest(),
        useCookieCredentials: false,
        setAccessToken: vi.fn(),
        onFailure,
      }),
    ).rejects.toMatchObject({ status: 401 });

    expect(onFailure).toHaveBeenCalledOnce();
    expect(fetchSpy).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it('uses cookie credentials when enabled', async () => {
    const fetchSpy = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ accessToken: 'cookie-token' }), { status: 200 }),
      );
    vi.stubGlobal('fetch', fetchSpy);

    await performAccessTokenRefresh({
      baseURL: 'http://test/api/v1',
      getRefreshToken: () => null,
      request: createDefaultRefreshRequest(),
      useCookieCredentials: true,
      setAccessToken: vi.fn(),
      onFailure: vi.fn(),
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      'http://test/api/v1/auth/refresh',
      expect.objectContaining({ credentials: 'include' }),
    );
    vi.unstubAllGlobals();
  });

  it('calls onFailure on invalid JSON response', async () => {
    const onFailure = vi.fn();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('not-json', { status: 200 })));

    await expect(
      performAccessTokenRefresh({
        baseURL: 'http://test/api/v1',
        getRefreshToken: () => 'refresh',
        request: createDefaultRefreshRequest(),
        useCookieCredentials: false,
        setAccessToken: vi.fn(),
        onFailure,
      }),
    ).rejects.toMatchObject({ status: 401 });

    expect(onFailure).toHaveBeenCalledOnce();
    vi.unstubAllGlobals();
  });

  it('applies custom excluded retry prefixes', () => {
    const request = createDefaultRefreshRequest({
      excludedRetryPrefixes: ['session/', 'auth/'],
    });

    expect(request.excludedRetryPrefixes).toEqual(['session/', 'auth/']);
  });

  it('uses a custom refresh endpoint from request config', async () => {
    const fetchSpy = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ accessToken: 'custom' }), { status: 200 }));
    vi.stubGlobal('fetch', fetchSpy);

    await performAccessTokenRefresh({
      baseURL: 'http://test/api/v1',
      getRefreshToken: () => 'refresh-token',
      request: createDefaultRefreshRequest({ endpoint: 'session/renew' }),
      useCookieCredentials: false,
      setAccessToken: vi.fn(),
      onFailure: vi.fn(),
    });

    expect(fetchSpy).toHaveBeenCalledWith('http://test/api/v1/session/renew', expect.any(Object));
    vi.unstubAllGlobals();
  });
});
