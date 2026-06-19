/** Show search in single-select dropdowns when option count reaches this threshold. */
export const SEARCHABLE_SELECT_MIN_OPTIONS = 10;

export interface SelectSearchableOption {
  label: string;
}

export function filterSelectOptions<T extends SelectSearchableOption>(
  options: T[],
  query: string,
): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return options;
  return options.filter((option) => option.label.toLowerCase().includes(q));
}

export function isSelectSearchable(optionCount: number, searchable?: boolean): boolean {
  if (searchable === true) return true;
  if (searchable === false) return false;
  return optionCount >= SEARCHABLE_SELECT_MIN_OPTIONS;
}
