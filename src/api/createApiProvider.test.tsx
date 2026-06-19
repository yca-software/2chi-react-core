import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAPI, useApiClientConfig } from './ApiClientContext';
import type { CreateApiProviderOptions } from './createApiProvider';
import { createApiProvider } from './createApiProvider';
import { executeConfiguredRefresh } from './request';

function TestConsumer() {
  const api = useAPI();
  return <div data-testid="has-api">{typeof api === 'function' ? 'yes' : 'no'}</div>;
}

function defaultOptions(
  overrides: Partial<CreateApiProviderOptions> = {},
): CreateApiProviderOptions {
  return {
    baseURL: 'http://test/api/v1',
    getAccessToken: () => 'access',
    getRefreshToken: () => 'refresh',
    cookieCredentialsEnabled: () => false,
    setAccessToken: vi.fn(),
    onRefreshFailure: vi.fn(),
    ...overrides,
  };
}

describe('createApiProvider', () => {
  it('wires refresh handlers and exposes useAPI to children', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response(JSON.stringify({ accessToken: 'refreshed' }), { status: 200 }),
        ),
    );

    const ApiProvider = createApiProvider(() => defaultOptions());

    render(
      <ApiProvider>
        <TestConsumer />
      </ApiProvider>,
    );

    expect(screen.getByTestId('has-api')).toHaveTextContent('yes');
    vi.unstubAllGlobals();
  });

  it('calls onRefreshFailure when refresh fails', async () => {
    const onRefreshFailure = vi.fn();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 401 })));

    const ApiProvider = createApiProvider(() => defaultOptions({ onRefreshFailure }));

    function RefreshCaller() {
      const config = useApiClientConfig();
      return (
        <button
          type="button"
          onClick={() => {
            void executeConfiguredRefresh(config).catch(() => undefined);
          }}
        >
          refresh
        </button>
      );
    }

    render(
      <ApiProvider>
        <RefreshCaller />
      </ApiProvider>,
    );

    screen.getByRole('button', { name: 'refresh' }).click();
    await vi.waitFor(() => expect(onRefreshFailure).toHaveBeenCalledOnce());

    vi.unstubAllGlobals();
  });

  it('uses the latest options when useOptions returns a new object', async () => {
    const firstFailure = vi.fn();
    const secondFailure = vi.fn();
    let onRefreshFailure = firstFailure;

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 401 })));

    const ApiProvider = createApiProvider(() => defaultOptions({ onRefreshFailure }));

    function RefreshCaller() {
      const config = useApiClientConfig();
      return (
        <button
          type="button"
          onClick={() => {
            void executeConfiguredRefresh(config).catch(() => undefined);
          }}
        >
          refresh
        </button>
      );
    }

    const { rerender } = render(
      <ApiProvider>
        <RefreshCaller />
      </ApiProvider>,
    );

    onRefreshFailure = secondFailure;
    rerender(
      <ApiProvider>
        <RefreshCaller />
      </ApiProvider>,
    );

    screen.getByRole('button', { name: 'refresh' }).click();
    await vi.waitFor(() => expect(secondFailure).toHaveBeenCalledOnce());
    expect(firstFailure).not.toHaveBeenCalled();

    vi.unstubAllGlobals();
  });
});
