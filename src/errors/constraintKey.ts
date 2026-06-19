/** Maps a Postgres constraint name (snake_case) to a PascalCase i18n key under `errors`. */
export function constraintNameToErrorKey(constraintName: string): string {
  return constraintName
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

export function getConstraintNameFromExtra(extra: unknown): string | null {
  if (!extra || typeof extra !== 'object' || Array.isArray(extra)) {
    return null;
  }
  if (!('constraint_name' in extra)) {
    return null;
  }
  const name = (extra as { constraint_name?: unknown }).constraint_name;
  return typeof name === 'string' && name.length > 0 ? name : null;
}

export function getConflictFieldFromExtra(extra: unknown): string | null {
  if (!extra || typeof extra !== 'object' || Array.isArray(extra)) {
    return null;
  }
  if (!('field' in extra)) {
    return null;
  }
  const field = (extra as { field?: unknown }).field;
  return typeof field === 'string' && field.length > 0 ? field : null;
}
