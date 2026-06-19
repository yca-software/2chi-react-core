import type { ApiErrorBody, RequestError } from '../api/types';
import { getConflictFieldFromExtra, getConstraintNameFromExtra } from './constraintKey';

/** Minimal i18n translate callback used by resolveApiError (compatible with i18next TFunction). */
export type TranslateFn = (
  key: string | string[],
  options?: { defaultValue?: string } & Record<string, unknown>,
) => string;

export interface MutationError {
  status: number;
  error: ApiErrorBody;
  retry?: boolean;
}

export function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return (
    typeof value === 'object' &&
    value !== null &&
    'errorCode' in value &&
    typeof (value as ApiErrorBody).errorCode === 'string'
  );
}

export function getApiErrorFromRequestError(error: unknown): ApiErrorBody | null {
  if (!error || typeof error !== 'object') return null;
  if ('error' in error) {
    const inner = (error as RequestError).error;
    if (isApiErrorBody(inner)) return inner;
    if (inner && typeof inner === 'object' && 'error' in inner) {
      return getApiErrorFromRequestError(inner);
    }
  }
  if (isApiErrorBody(error)) return error;
  return null;
}

export function getConstraintNameFromError(error: unknown): string {
  const api = getApiErrorFromRequestError(error);
  if (!api?.extra) return '';
  return getConstraintNameFromExtra(api.extra) ?? '';
}

export function getConflictFieldFromError(error: unknown): string {
  const api = getApiErrorFromRequestError(error);
  if (!api?.extra) return '';
  return getConflictFieldFromExtra(api.extra) ?? '';
}

export {
  constraintNameToErrorKey,
  getConflictFieldFromExtra,
  getConstraintNameFromExtra,
} from './constraintKey';
