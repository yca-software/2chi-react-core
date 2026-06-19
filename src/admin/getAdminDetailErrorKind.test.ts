import { describe, expect, it } from 'vitest';

import { getAdminDetailErrorKind } from './getAdminDetailErrorKind';

describe('getAdminDetailErrorKind', () => {
  it('returns undefined while loading or when data exists', () => {
    expect(
      getAdminDetailErrorKind({ isLoading: true, isError: false, hasData: false }),
    ).toBeUndefined();
    expect(
      getAdminDetailErrorKind({ isLoading: false, isError: false, hasData: true }),
    ).toBeUndefined();
  });

  it('maps HTTP status to error kinds', () => {
    expect(
      getAdminDetailErrorKind({ isLoading: false, isError: true, hasData: false, status: 403 }),
    ).toBe('forbidden');
    expect(
      getAdminDetailErrorKind({ isLoading: false, isError: true, hasData: false, status: 404 }),
    ).toBe('notFound');
    expect(getAdminDetailErrorKind({ isLoading: false, isError: true, hasData: false })).toBe(
      'load',
    );
  });
});
