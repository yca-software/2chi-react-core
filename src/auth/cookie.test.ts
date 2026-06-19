import Cookies from 'js-cookie';
import { describe, expect, it } from 'vitest';
import type { CookieNames } from '../constants/cookies';
import {
  getAccessTokenFromCookies,
  getCookieConsentFromCookies,
  getRefreshTokenFromCookies,
  removeAccessTokenCookie,
  setAccessTokenCookie,
  setTokens,
} from './cookie';

const names: CookieNames = {
  accessToken: 'test_access',
  refreshToken: 'test_refresh',
  cookieConsent: 'test_consent',
};

describe('cookie helpers', () => {
  it('sets and reads access token', () => {
    setAccessTokenCookie('token-123', { names });
    expect(getAccessTokenFromCookies(names)).toBe('token-123');
    removeAccessTokenCookie({ names });
    expect(getAccessTokenFromCookies(names)).toBeNull();
  });

  it('sets both tokens via setTokens', () => {
    setTokens('access', 'refresh', { names });
    expect(getAccessTokenFromCookies(names)).toBe('access');
    expect(getRefreshTokenFromCookies(names)).toBe('refresh');
  });

  it('returns null for invalid cookie consent JSON', () => {
    Cookies.set(names.cookieConsent, 'not-json');
    expect(getCookieConsentFromCookies(names)).toBeNull();
    Cookies.remove(names.cookieConsent);
  });
});
