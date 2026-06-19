import { describe, expect, it, vi } from 'vitest';
import { createResponseHandler } from './responseHandler';

describe('createResponseHandler', () => {
  it('parses successful JSON responses', async () => {
    const handler = createResponseHandler({
      baseURL: 'http://test/api/v1',
      getAccessToken: () => null,
      getRefreshToken: () => null,
    });
    const response = new Response(JSON.stringify({ ok: true }), { status: 200 });
    await expect(handler(response)).resolves.toEqual({ ok: true });
  });

  it('rejects with errorCode body on failure', async () => {
    const handler = createResponseHandler({
      baseURL: 'http://test/api/v1',
      getAccessToken: () => null,
      getRefreshToken: () => null,
    });
    const response = new Response(JSON.stringify({ errorCode: 'Forbidden', extra: null }), {
      status: 403,
    });
    await expect(handler(response)).rejects.toMatchObject({
      status: 403,
      error: { errorCode: 'Forbidden' },
    });
  });

  it('retries once after refresh on 401', async () => {
    const fetchSpy = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ accessToken: 'new-token' }), { status: 200 }),
      )
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: 1 }), { status: 200 }));
    vi.stubGlobal('fetch', fetchSpy);

    const handler = createResponseHandler({
      baseURL: 'http://test/api/v1',
      getAccessToken: () => 'old',
      getRefreshToken: () => 'refresh',
      refresh: {
        request: {
          endpoint: 'auth/refresh',
          method: 'POST',
          buildBody: () => ({}),
          parseAccessToken: (data) =>
            (data as { accessToken?: string } | null)?.accessToken ?? null,
          excludedRetryPrefixes: ['auth/'],
        },
        cookieCredentialsEnabled: () => false,
        setAccessToken: vi.fn(),
        onFailure: vi.fn(),
      },
    });

    const result = await handler(new Response('', { status: 401 }), {
      config: { endpoint: 'users/me', method: 'GET' },
    });

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ data: 1 });
    vi.unstubAllGlobals();
  });

  it('does not retry auth endpoints on 401', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    const handler = createResponseHandler({
      baseURL: 'http://test/api/v1',
      getAccessToken: () => 'old',
      getRefreshToken: () => 'refresh',
      refresh: {
        request: {
          endpoint: 'auth/refresh',
          method: 'POST',
          buildBody: () => ({}),
          parseAccessToken: () => 'token',
          excludedRetryPrefixes: ['auth/'],
        },
        cookieCredentialsEnabled: () => false,
        setAccessToken: vi.fn(),
        onFailure: vi.fn(),
      },
    });

    await expect(
      handler(new Response('', { status: 401 }), {
        config: { endpoint: 'auth/oauth/google', method: 'POST' },
      }),
    ).rejects.toMatchObject({ status: 401 });

    expect(fetchSpy).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
