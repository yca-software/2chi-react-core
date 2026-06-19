import { constraintNameToErrorKey, getConstraintNameFromExtra } from './constraintKey';
import type { TranslateFn } from './types';

const VALIDATION_EXTRA_PREFIX = 'validation.';

function isFieldValidationMap(extra: unknown): extra is Record<string, string | string[]> {
  if (!extra || typeof extra !== 'object' || Array.isArray(extra)) {
    return false;
  }
  if (getConstraintNameFromExtra(extra)) {
    return false;
  }
  return Object.values(extra).every(
    (v) => typeof v === 'string' || (Array.isArray(v) && v.every((x) => typeof x === 'string')),
  );
}

function formatValidationExtra(extra: Record<string, string | string[]>, t: TranslateFn): string {
  const lines: string[] = [];
  for (const [field, messages] of Object.entries(extra)) {
    const list = Array.isArray(messages) ? messages : [messages];
    for (const msg of list) {
      const key = `${VALIDATION_EXTRA_PREFIX}${field}.${msg}`;
      const translated = t(key, { defaultValue: '' });
      lines.push(
        translated ||
          t(`${VALIDATION_EXTRA_PREFIX}${field}`, {
            defaultValue: msg,
          }) ||
          msg,
      );
    }
  }
  return lines.join('\n');
}

function resolveConstraintConflict(extra: unknown, t: TranslateFn): string | null {
  const constraintName = getConstraintNameFromExtra(extra);
  if (!constraintName) {
    return null;
  }

  const key = `errors:${constraintNameToErrorKey(constraintName)}`;
  const message = t(key, { defaultValue: '' });
  if (message && message !== key) {
    return message;
  }

  return t('errors:ConflictingData', {
    defaultValue: 'This action conflicts with existing data.',
  });
}

/**
 * Maps API `errorCode` + optional `extra` to a user-facing i18n string.
 * Keys live under the app `errors` namespace (e.g. `errors:InvalidToken`).
 */
export function resolveApiError(errorCode: string, extra: unknown, t: TranslateFn): string {
  if (isFieldValidationMap(extra)) {
    const validationMessage = formatValidationExtra(extra, t);
    if (validationMessage) return validationMessage;
  }

  const constraintMessage = resolveConstraintConflict(extra, t);
  if (constraintMessage) {
    return constraintMessage;
  }

  if (!errorCode) {
    return t('errors:Unknown', { defaultValue: 'Something went wrong.' });
  }

  const key = `errors:${errorCode}`;
  const message = t(key, { defaultValue: '' });
  if (message && message !== key) {
    return message;
  }

  return errorCode.replace(/([A-Z])/g, ' $1').trim();
}
