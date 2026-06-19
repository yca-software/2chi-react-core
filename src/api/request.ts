import type {
  ApiClientConfig,
  RefreshBodyContext,
  RefreshRequestConfig,
  RequestConfig,
} from './types';

export const DEFAULT_REFRESH_ENDPOINT = 'auth/refresh';
export const DEFAULT_REFRESH_EXCLUDED_PREFIXES = ['auth/'];

export interface DefaultRefreshRequestOptions {
  endpoint?: string;
  excludedRetryPrefixes?: string[];
}

export function createDefaultRefreshRequest({
  endpoint = DEFAULT_REFRESH_ENDPOINT,
  excludedRetryPrefixes = DEFAULT_REFRESH_EXCLUDED_PREFIXES,
}: DefaultRefreshRequestOptions = {}): RefreshRequestConfig {
  return {
    endpoint,
    method: 'POST',
    buildBody: ({ refreshToken }: RefreshBodyContext) => (refreshToken ? { refreshToken } : {}),
    parseAccessToken: (data: unknown) => {
      if (data && typeof data === 'object' && 'accessToken' in data) {
        const token = (data as { accessToken: unknown }).accessToken;
        return typeof token === 'string' ? token : null;
      }
      return null;
    },
    excludedRetryPrefixes,
  };
}

export function buildRequestUrl(baseURL: string, endpoint: string): string {
  const base = baseURL.replace(/\/$/, '');
  const path = endpoint.replace(/^\//, '');
  return `${base}/${path}`;
}

export function getRequestHeaders(
  accessToken: string | null,
  options?: { multipart?: boolean; acceptLanguage?: string },
): HeadersInit {
  const headers: HeadersInit = {};
  if (!options?.multipart) {
    headers['Content-Type'] = 'application/json';
  }
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  if (options?.acceptLanguage) {
    headers['Accept-Language'] = options.acceptLanguage;
  }
  return headers;
}

export function getRequestOptions(
  config: RequestConfig,
  token: string | null,
  acceptLanguage?: string,
): RequestInit {
  const init: RequestInit = {
    method: config.method,
    headers: getRequestHeaders(token, {
      multipart: config.multipart,
      acceptLanguage,
    }),
    body: config.multipart
      ? (config.body as BodyInit)
      : config.body != null
        ? JSON.stringify(config.body)
        : undefined,
  };
  if (config.credentials) {
    init.credentials = config.credentials;
  }
  return init;
}

export async function performAccessTokenRefresh(params: {
  baseURL: string;
  getRefreshToken: () => string | null;
  request: RefreshRequestConfig;
  useCookieCredentials: boolean;
  setAccessToken: (token: string) => void;
  onFailure: () => void;
  acceptLanguage?: string;
}): Promise<string> {
  const refreshToken = params.useCookieCredentials ? null : params.getRefreshToken();
  if (!params.useCookieCredentials && !refreshToken) {
    params.onFailure();
    throw { error: new Error('missing refresh token'), status: 401 };
  }

  const bodyContext: RefreshBodyContext = {
    refreshToken,
    useCookieCredentials: params.useCookieCredentials,
  };

  const requestConfig: RequestConfig = {
    endpoint: params.request.endpoint,
    method: params.request.method,
    body: params.request.buildBody(bodyContext),
    credentials: params.useCookieCredentials ? 'include' : params.request.credentials,
  };

  const response = await fetch(
    buildRequestUrl(params.baseURL, requestConfig.endpoint),
    getRequestOptions(requestConfig, null, params.acceptLanguage),
  );
  const responseText = await response.text();

  let data: unknown = null;
  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      params.onFailure();
      throw { error: new Error('invalid refresh response'), status: 401 };
    }
  }

  const accessToken = params.request.parseAccessToken(data);
  if (!response.ok || !accessToken) {
    params.onFailure();
    throw { error: new Error('failed to refresh access token'), status: 401 };
  }

  params.setAccessToken(accessToken);
  return accessToken;
}

export async function executeConfiguredRefresh(config: ApiClientConfig): Promise<string> {
  const refresh = config.refresh;
  if (!refresh) {
    throw new Error('refresh is not configured');
  }

  refresh.onStart?.();
  try {
    return await performAccessTokenRefresh({
      baseURL: config.baseURL,
      getRefreshToken: config.getRefreshToken,
      request: refresh.request,
      useCookieCredentials: refresh.cookieCredentialsEnabled(),
      setAccessToken: refresh.setAccessToken,
      onFailure: refresh.onFailure,
      acceptLanguage: config.getAcceptLanguage?.(),
    });
  } finally {
    refresh.onEnd?.();
  }
}
