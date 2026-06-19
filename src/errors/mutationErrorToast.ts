import { useEffect, useRef } from 'react';

import { getConflictFieldFromError } from './types';

export type NotifyFn = (message: string) => void;

export type HandleApiMutationErrorOptions = {
  setFieldErrors?: (errors: Record<string, string>) => void;
  /** Called when the API returns a conflict on a specific field (e.g. navigate to the right step). */
  onConflictField?: (field: string) => void;
};

/**
 * Show one toast per distinct query failure (TanStack Query v5 has no `onError`).
 * Pass app-bound `formatError` and `notify` (e.g. sonner toast.error).
 */
export function useQueryApiErrorToast(
  isError: boolean,
  error: unknown,
  formatError: (error: unknown) => string,
  notify: NotifyFn,
): void {
  const lastShown = useRef<unknown>(null);

  useEffect(() => {
    if (isError && error != null && error !== lastShown.current) {
      lastShown.current = error;
      notify(formatError(error));
      return;
    }
    if (!isError) {
      lastShown.current = null;
    }
  }, [isError, error, formatError, notify]);
}

/**
 * Shows a notification for every API mutation failure and optionally sets inline field errors
 * from unique-constraint conflicts. Never suppresses the notification when a field is known.
 */
export function handleApiMutationError(
  error: unknown,
  formatError: (error: unknown) => string,
  notify: NotifyFn,
  options: HandleApiMutationErrorOptions = {},
): void {
  const message = formatError(error);
  notify(message);
  const field = getConflictFieldFromError(error);
  if (!field) {
    return;
  }
  options.setFieldErrors?.({ [field]: message });
  options.onConflictField?.(field);
}
