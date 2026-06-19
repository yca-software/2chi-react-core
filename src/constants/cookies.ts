export interface CookieNames {
  accessToken: string;
  refreshToken: string;
  cookieConsent: string;
}

export function createCookieNames(appName: string, env: string): CookieNames {
  const prefix = `@${appName}-${env}`;
  return {
    accessToken: `${prefix}/access-token`,
    refreshToken: `${prefix}/refresh-token`,
    cookieConsent: `${prefix}/cookie-consent`,
  };
}
