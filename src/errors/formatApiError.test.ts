import { describe, expect, it } from 'vitest';
import { formatApiError } from './formatApiError';
import type { TranslateFn } from './types';

const t = ((key: string, opts?: { defaultValue?: string }) => {
  const map: Record<string, string> = {
    'errors:EmailAlreadyInUse': 'This email is already registered.',
    'errors:NotFound': 'The requested resource was not found.',
    'errors:Conflict': 'This request could not be completed because of a conflict.',
    'errors:TooManyRequests': 'Too many requests. Please wait and try again.',
    'errors:InternalServerError': 'A server error occurred. Please try again later.',
    'errors:InvitationEmailMismatch':
      'The email you entered does not match this invitation. Use the address the invitation was sent to.',
    'errors:ConflictingData': 'This action conflicts with existing data.',
    'errors:IdxOrganizationsPaddleCustomerId':
      'This billing email is already linked to another organization.',
    'errors:Unknown': 'Something went wrong.',
  };
  return map[key] ?? opts?.defaultValue ?? '';
}) as TranslateFn;

describe('formatApiError', () => {
  it('resolves errorCode from API body', () => {
    expect(formatApiError({ status: 409, error: { errorCode: 'EmailAlreadyInUse' } }, t)).toBe(
      'This email is already registered.',
    );
  });

  it('resolves invitation email mismatch from API body', () => {
    expect(
      formatApiError(
        {
          status: 403,
          error: { errorCode: 'InvitationEmailMismatch' },
        },
        t,
      ),
    ).toBe(
      'The email you entered does not match this invitation. Use the address the invitation was sent to.',
    );
  });

  it('humanizes unknown error codes instead of generic Unknown', () => {
    expect(formatApiError({ status: 403, error: { errorCode: 'SomeNewDomainCode' } }, t)).toBe(
      'Some New Domain Code',
    );
  });

  it('maps HTTP 409 without errorCode to generic Conflict', () => {
    expect(formatApiError({ status: 409, error: {} }, t)).toBe(
      'This request could not be completed because of a conflict.',
    );
  });

  it('maps HTTP 429 without errorCode to TooManyRequests', () => {
    expect(formatApiError({ status: 429, error: {} }, t)).toBe(
      'Too many requests. Please wait and try again.',
    );
  });

  it('maps HTTP 404 without errorCode to NotFound', () => {
    expect(formatApiError({ status: 404, error: { message: 'Not Found' } }, t)).toBe(
      'The requested resource was not found.',
    );
  });

  it('maps HTTP 500 without errorCode to InternalServerError', () => {
    expect(formatApiError({ status: 500, error: {} }, t)).toBe(
      'A server error occurred. Please try again later.',
    );
  });

  it('returns Error.message for plain errors', () => {
    expect(formatApiError(new Error('Network offline'), t)).toBe('Network offline');
  });

  it('resolves database constraint conflicts from extra', () => {
    expect(
      formatApiError(
        {
          status: 409,
          error: {
            errorCode: '',
            extra: { constraint_name: 'idx_organizations_paddle_customer_id' },
          },
        },
        t,
      ),
    ).toBe('This billing email is already linked to another organization.');
  });

  it('falls back to ConflictingData for unknown constraints', () => {
    expect(
      formatApiError(
        {
          status: 409,
          error: {
            errorCode: '',
            extra: { constraint_name: 'some_unknown_constraint' },
          },
        },
        t,
      ),
    ).toBe('This action conflicts with existing data.');
  });
});
