export interface JWTAccessTokenPermissionData {
  organizationId: string;
  roleId?: string;
  permissions: string[];
}

export interface DecodedAccessToken {
  sub: string;
  email?: string;
  permissions?: JWTAccessTokenPermissionData[];
  isAdmin?: boolean;
  impersonatedBy?: string | null;
  impersonatedByEmail?: string | null;
}

export interface AccessInfo {
  userId: string;
  email: string;
  permissions: JWTAccessTokenPermissionData[];
  isAdmin: boolean;
  impersonatedBy: string | null;
  impersonatedByEmail: string | null;
}
