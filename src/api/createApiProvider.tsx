import { type ReactNode, useMemo } from 'react';

import { ApiClientProvider } from './ApiClientContext';
import { createDefaultRefreshRequest } from './request';
import type { ApiClientProviderConfig } from './types';

export interface CreateApiProviderOptions {
  baseURL: string;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  /** When true, refresh uses HttpOnly cookie credentials instead of body token. */
  cookieCredentialsEnabled: () => boolean;
  setAccessToken: (token: string) => void;
  onRefreshFailure: () => void;
  getAcceptLanguage?: () => string;
  onRefreshStart?: () => void;
  onRefreshEnd?: () => void;
  /** Refresh endpoint path relative to baseURL. Defaults to `auth/refresh`. */
  refreshEndpoint?: string;
  /** Paths that must not trigger automatic refresh retry on 401. Defaults to `['auth/']`. */
  refreshExcludedPrefixes?: string[];
}

/**
 * Factory for app `ApiProvider` components. Pass a hook that returns wiring options
 * (cookies, i18n, zustand). Memoize that return value with `useMemo` so the API
 * client context is not rebuilt on every parent render.
 */
export function createApiProvider(useOptions: () => CreateApiProviderOptions) {
  return function ApiProvider({ children }: { children: ReactNode }) {
    const options = useOptions();

    const apiConfig = useMemo<ApiClientProviderConfig>(
      () => ({
        getAccessToken: options.getAccessToken,
        getRefreshToken: options.getRefreshToken,
        getAcceptLanguage: options.getAcceptLanguage,
        refresh: {
          request: createDefaultRefreshRequest({
            endpoint: options.refreshEndpoint,
            excludedRetryPrefixes: options.refreshExcludedPrefixes,
          }),
          cookieCredentialsEnabled: options.cookieCredentialsEnabled,
          setAccessToken: options.setAccessToken,
          onFailure: options.onRefreshFailure,
          onStart: options.onRefreshStart,
          onEnd: options.onRefreshEnd,
        },
      }),
      [options],
    );

    return (
      <ApiClientProvider baseURL={options.baseURL} config={apiConfig}>
        {children}
      </ApiClientProvider>
    );
  };
}
