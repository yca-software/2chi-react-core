export interface RequestConfig {
  endpoint: string;
  method: string;
  body?: unknown;
  multipart?: boolean;
  /** When set, forwarded to fetch init (e.g. `include` for HttpOnly auth cookies). */
  credentials?: RequestCredentials;
}

/** API error body: stable code only (no translated message). */
export interface ApiErrorBody {
  errorCode: string;
  extra?: unknown;
}

export interface RequestError {
  error?: ApiErrorBody | unknown;
  status: number;
  retry?: boolean;
}

export type FetchFn = (config: RequestConfig) => Promise<unknown>;

export interface RefreshBodyContext {
  refreshToken: string | null;
  useCookieCredentials: boolean;
}

/** Describes the HTTP refresh call. Built by react-core; apps override endpoint via `refreshEndpoint`. */
export interface RefreshRequestConfig {
  endpoint: string;
  method: string;
  buildBody: (ctx: RefreshBodyContext) => unknown;
  parseAccessToken: (data: unknown) => string | null;
  /** Endpoint prefixes that must not trigger automatic refresh retry on 401. */
  excludedRetryPrefixes: string[];
  credentials?: RequestCredentials;
}

export interface RefreshConfig {
  request: RefreshRequestConfig;
  cookieCredentialsEnabled: () => boolean;
  setAccessToken: (token: string) => void;
  onFailure: () => void;
  onStart?: () => void;
  onEnd?: () => void;
}

export interface ApiClientConfig {
  baseURL: string;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  getAcceptLanguage?: () => string;
  refresh?: RefreshConfig;
}

export type ApiClientProviderConfig = Omit<ApiClientConfig, 'baseURL'>;
