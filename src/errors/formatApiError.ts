import type { RequestError } from '../api/types';
import { resolveApiError } from './resolveApiError';
import type { TranslateFn } from './types';
import { getApiErrorFromRequestError } from './types';

function isRequestError(error: unknown): error is RequestError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as RequestError).status === 'number'
  );
}

export function errorCodeFromHttpStatus(status: number): string {
  switch (status) {
    case 400:
    case 422:
      return 'InvalidRequestBody';
    case 401:
      return 'Unauthorized';
    case 403:
      return 'Forbidden';
    case 404:
      return 'NotFound';
    case 409:
      return 'Conflict';
    case 429:
      return 'TooManyRequests';
    default:
      if (status >= 500) return 'InternalServerError';
      return 'Unknown';
  }
}

export function formatApiError(error: unknown, t: TranslateFn): string {
  const api = getApiErrorFromRequestError(error);
  if (api) {
    const code =
      api.errorCode || (isRequestError(error) ? errorCodeFromHttpStatus(error.status) : '');
    return resolveApiError(code, api.extra, t);
  }
  if (isRequestError(error)) {
    const code = errorCodeFromHttpStatus(error.status);
    return resolveApiError(code, undefined, t);
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return t('errors:Unknown', { defaultValue: 'Something went wrong.' });
}
