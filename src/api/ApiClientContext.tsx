import { createContext, type ReactNode, useCallback, useContext, useMemo } from 'react';
import { buildRequestUrl, getRequestOptions } from './request';
import { createResponseHandler } from './responseHandler';
import type { ApiClientConfig, ApiClientProviderConfig, FetchFn, RequestConfig } from './types';

const ApiClientContext = createContext<ApiClientConfig | null>(null);

export function ApiClientProvider({
  baseURL,
  config,
  children,
}: {
  baseURL: string;
  config: ApiClientProviderConfig;
  children: ReactNode;
}) {
  const value = useMemo<ApiClientConfig>(() => ({ ...config, baseURL }), [baseURL, config]);

  return <ApiClientContext.Provider value={value}>{children}</ApiClientContext.Provider>;
}

export function useApiClientConfig(): ApiClientConfig {
  const ctx = useContext(ApiClientContext);
  if (!ctx) {
    throw new Error('useApiClientConfig must be used within ApiClientProvider');
  }
  return ctx;
}

export function useAPI(): FetchFn {
  const config = useApiClientConfig();
  const responseHandler = useMemo(() => createResponseHandler(config), [config]);

  return useCallback(
    (requestConfig: RequestConfig) => {
      const accessToken = config.getAccessToken();
      return fetch(
        buildRequestUrl(config.baseURL, requestConfig.endpoint),
        getRequestOptions(requestConfig, accessToken, config.getAcceptLanguage?.()),
      ).then((response) => responseHandler(response, { config: requestConfig }));
    },
    [config, responseHandler],
  );
}
