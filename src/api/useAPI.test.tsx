import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ApiClientProvider, useAPI } from './ApiClientContext';

describe('useAPI', () => {
  it('fetches with access token and parses JSON', async () => {
    const fetchSpy = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ id: 1 }), { status: 200 }));
    vi.stubGlobal('fetch', fetchSpy);

    const { result } = renderHook(() => useAPI(), {
      wrapper: ({ children }) => (
        <ApiClientProvider
          baseURL="http://test/api/v1"
          config={{
            getAccessToken: () => 'access-token',
            getRefreshToken: () => 'refresh',
            getAcceptLanguage: () => 'en',
          }}
        >
          {children}
        </ApiClientProvider>
      ),
    });

    await expect(result.current({ endpoint: 'users/me', method: 'GET' })).resolves.toEqual({
      id: 1,
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      'http://test/api/v1/users/me',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer access-token',
          'Accept-Language': 'en',
        }),
      }),
    );
    vi.unstubAllGlobals();
  });

  it('retries after refresh on 401', async () => {
    const fetchSpy = vi
      .fn()
      .mockResolvedValueOnce(new Response('', { status: 401 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ accessToken: 'new-token' }), { status: 200 }),
      )
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal('fetch', fetchSpy);

    const { result } = renderHook(() => useAPI(), {
      wrapper: ({ children }) => (
        <ApiClientProvider
          baseURL="http://test/api/v1"
          config={{
            getAccessToken: () => 'old-token',
            getRefreshToken: () => 'refresh',
            refresh: {
              request: {
                endpoint: 'auth/refresh',
                method: 'POST',
                buildBody: () => ({ refreshToken: 'refresh' }),
                parseAccessToken: (data) =>
                  (data as { accessToken?: string } | null)?.accessToken ?? null,
                excludedRetryPrefixes: ['auth/'],
              },
              cookieCredentialsEnabled: () => false,
              setAccessToken: vi.fn(),
              onFailure: vi.fn(),
            },
          }}
        >
          {children}
        </ApiClientProvider>
      ),
    });

    await expect(result.current({ endpoint: 'users/me', method: 'GET' })).resolves.toEqual({
      ok: true,
    });
    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(3));
    vi.unstubAllGlobals();
  });
});
