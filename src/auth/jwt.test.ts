import { describe, expect, it } from 'vitest';
import { getAccessInfoFromToken, getInitials } from './jwt';

function b64url(obj: unknown): string {
  return btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

describe('jwt helpers', () => {
  it('decodes access info from a valid token', () => {
    const payload = {
      sub: 'user-1',
      email: 'user@example.com',
      permissions: ['org:read'],
      isAdmin: true,
    };
    const token = `${b64url({ alg: 'none' })}.${b64url(payload)}.sig`;
    expect(getAccessInfoFromToken(token)).toEqual({
      userId: 'user-1',
      email: 'user@example.com',
      permissions: ['org:read'],
      isAdmin: true,
      impersonatedBy: null,
      impersonatedByEmail: null,
    });
  });

  it('returns null for empty or invalid tokens', () => {
    expect(getAccessInfoFromToken('')).toBeNull();
    expect(getAccessInfoFromToken('not-a-jwt')).toBeNull();
  });

  it('builds initials from names', () => {
    expect(getInitials('Jane', 'Doe')).toBe('JD');
    expect(getInitials(undefined, undefined)).toBe('U');
    expect(getInitials('Alice', undefined)).toBe('A');
  });
});
