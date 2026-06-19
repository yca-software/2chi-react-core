import { jwtDecode } from 'jwt-decode';
import type { AccessInfo, DecodedAccessToken } from './types';

export function getAccessInfoFromToken(accessToken: string): AccessInfo | null {
  if (!accessToken?.trim()) return null;
  try {
    const decoded = jwtDecode<DecodedAccessToken>(accessToken);
    return {
      userId: decoded.sub,
      email: decoded.email ?? '',
      permissions: decoded.permissions ?? [],
      isAdmin: decoded.isAdmin ?? false,
      impersonatedBy: decoded.impersonatedBy ?? null,
      impersonatedByEmail: decoded.impersonatedByEmail ?? null,
    };
  } catch {
    return null;
  }
}

export function getInitials(firstName?: string, lastName?: string): string {
  if (!firstName && !lastName) return 'U';
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
}
