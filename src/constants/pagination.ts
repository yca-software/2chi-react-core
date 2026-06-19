/** Paginated list shape from go-api (`pagination.PaginatedListResponse`). */
export interface PaginatedList<T> {
  items: T[];
  hasNext: boolean;
}

function readItems<T>(page: unknown): T[] {
  if (!page || typeof page !== 'object') return [];
  const record = page as Record<string, unknown>;
  const raw = record.items ?? record.Items;
  if (!Array.isArray(raw)) return [];
  return raw.filter((item): item is T => item != null);
}

/** Flatten infinite-query pages and drop null/invalid entries. */
export function flattenPaginatedItems<T>(pages: PaginatedList<T>[] | undefined): T[] {
  if (!pages?.length) return [];
  return pages.flatMap((page) => readItems<T>(page));
}

export function normalizePaginatedList<T>(raw: unknown): PaginatedList<T> {
  if (!raw || typeof raw !== 'object') {
    return { items: [], hasNext: false };
  }
  const record = raw as Record<string, unknown>;
  return {
    items: readItems<T>(raw),
    hasNext: Boolean(record.hasNext ?? record.HasNext),
  };
}
