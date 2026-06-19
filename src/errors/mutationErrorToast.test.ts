import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { handleApiMutationError, useQueryApiErrorToast } from './mutationErrorToast';

describe('handleApiMutationError', () => {
  it('notifies with formatted message', () => {
    const notify = vi.fn();
    const formatError = vi.fn(() => 'Email already in use');

    handleApiMutationError(
      { status: 409, error: { errorCode: 'EmailAlreadyInUse' } },
      formatError,
      notify,
    );

    expect(formatError).toHaveBeenCalled();
    expect(notify).toHaveBeenCalledWith('Email already in use');
  });

  it('maps unique constraint conflicts to field errors', () => {
    const notify = vi.fn();
    const setFieldErrors = vi.fn();

    handleApiMutationError(
      {
        status: 409,
        error: {
          errorCode: 'ConflictingData',
          extra: { constraint_name: 'org_members_unique', field: 'email' },
        },
      },
      () => 'Email already in use',
      notify,
      { setFieldErrors },
    );

    expect(notify).toHaveBeenCalledWith('Email already in use');
    expect(setFieldErrors).toHaveBeenCalledWith({ email: 'Email already in use' });
  });
});

describe('useQueryApiErrorToast', () => {
  it('shows one toast per distinct query error', () => {
    const notify = vi.fn();
    const formatError = vi.fn(() => 'Load failed');
    const error = { status: 500, error: { errorCode: 'InternalServerError' } };

    const { rerender } = renderHook<void, { isError: boolean; currentError: unknown }>(
      ({ isError, currentError }) =>
        useQueryApiErrorToast(isError, currentError, formatError, notify),
      { initialProps: { isError: true, currentError: error } },
    );

    expect(notify).toHaveBeenCalledTimes(1);

    rerender({ isError: true, currentError: error });
    expect(notify).toHaveBeenCalledTimes(1);

    rerender({ isError: false, currentError: null });
    rerender({ isError: true, currentError: { status: 404, error: { errorCode: 'NotFound' } } });
    expect(notify).toHaveBeenCalledTimes(2);
  });
});
