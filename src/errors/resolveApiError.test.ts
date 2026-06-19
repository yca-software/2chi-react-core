import { describe, expect, it } from 'vitest';
import { resolveApiError } from './resolveApiError';

const t = (key: string | string[], opts?: { defaultValue?: string }) => {
  const lookupKey = Array.isArray(key) ? key[0] : key;
  const map: Record<string, string> = {
    'errors:InvalidToken': 'Session invalid.',
    'errors:ConflictingData': 'Conflicting data.',
    'errors:OrgMembersUnique': 'Already a member.',
    'errors:IdxDevicesSerialNumber': 'Serial number already used.',
    'errors:Unknown': 'Unknown error.',
    'validation.email.required': 'Email is required.',
  };
  return map[lookupKey] ?? opts?.defaultValue ?? '';
};

describe('resolveApiError', () => {
  it('resolves known error codes', () => {
    expect(resolveApiError('InvalidToken', undefined, t)).toBe('Session invalid.');
  });

  it('maps validation extra to field messages', () => {
    expect(resolveApiError('', { email: 'required' }, t)).toContain('required');
  });

  it('humanizes unknown codes instead of generic Unknown', () => {
    expect(resolveApiError('SomeNewCode', undefined, t)).toBe('Some New Code');
  });

  it('maps constraint_name extra to PascalCase error keys', () => {
    expect(resolveApiError('Conflict', { constraint_name: 'org_members_unique' }, t)).toBe(
      'Already a member.',
    );
  });

  it('falls back to ConflictingData for unknown constraints', () => {
    expect(resolveApiError('Conflict', { constraint_name: 'unknown_constraint' }, t)).toBe(
      'Conflicting data.',
    );
  });

  it('prefers constraint_name message when field extra is present', () => {
    expect(
      resolveApiError(
        'Conflict',
        {
          constraint_name: 'idx_devices_serial_number',
          field: 'serialNumber',
        },
        t,
      ),
    ).toBe('Serial number already used.');
  });
});
