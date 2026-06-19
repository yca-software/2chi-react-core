import { buildRequestUrl, executeConfiguredRefresh, getRequestOptions } from './request';
import type { ApiClientConfig, ApiErrorBody, RequestConfig, RequestError } from './types';

function shouldRetryWithRefresh(
  status: number,
  endpoint: string | undefined,
  isRetry: boolean | undefined,
  refreshToken: string | null | undefined,
  refresh: ApiClientConfig['refresh'],
): boolean {
  if (status !== 401 || !refreshToken || !refresh || !endpoint || isRetry) {
    return false;
  }
  const normalized = endpoint.replace(/^\//, '');
  return !refresh.request.excludedRetryPrefixes.some((prefix) =>
    normalized.startsWith(prefix.replace(/^\//, '')),
  );
}

export function createResponseHandler(config: ApiClientConfig) {
  const { baseURL, getRefreshToken, refresh } = config;

  async function handleResponse(
    response: Response,
    options?: { config?: RequestConfig; isRetry?: boolean },
  ): Promise<unknown> {
    const responseText = await response.text();
    let data: unknown;
    if (responseText) {
      try {
        data = JSON.parse(responseText);
      } catch {
        data = responseText;
      }
    }

    if (!response.ok) {
      const refreshToken = getRefreshToken();
      if (
        shouldRetryWithRefresh(
          response.status,
          options?.config?.endpoint,
          options?.isRetry,
          refreshToken,
          refresh,
        ) &&
        options?.config
      ) {
        const newToken = await executeConfiguredRefresh(config);
        const retryResponse = await fetch(
          buildRequestUrl(baseURL, options.config.endpoint),
          getRequestOptions(options.config, newToken, config.getAcceptLanguage?.()),
        );
        return handleResponse(retryResponse, { ...options, isRetry: true });
      }

      throw {
        error: data as ApiErrorBody,
        status: response.status,
        retry: response.status >= 500,
      } satisfies RequestError;
    }

    return data;
  }

  return handleResponse;
}
