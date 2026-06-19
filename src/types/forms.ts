export type RoleOption = { value: string; label: string };

export type PermissionAction = 'read' | 'write' | 'delete';

export interface PermissionOption {
  key: string;
  action: PermissionAction;
  labelKey: string;
}

export interface PermissionGroup {
  contextKey: string;
  labelKey: string;
  descriptionKey: string;
  permissions: PermissionOption[];
}
