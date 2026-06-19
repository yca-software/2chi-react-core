import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { flattenPaginatedItems, type PaginatedList } from '../constants/pagination';

export type AdminListPageResponse<T> = PaginatedList<T>;

export function useAdminListPage<T>(
  useInfiniteQuery: (
    search: string,
  ) => UseInfiniteQueryResult<InfiniteData<AdminListPageResponse<T>>>,
  options?: { debounceMs?: number },
) {
  const debounceMs = options?.debounceMs ?? 300;
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const loadMoreRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedSearch(search), debounceMs);
    return () => window.clearTimeout(id);
  }, [search, debounceMs]);

  const query = useInfiniteQuery(debouncedSearch);
  const items = flattenPaginatedItems(query.data?.pages);

  const handleLoadMore = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [query.hasNextPage, query.isFetchingNextPage, query.fetchNextPage]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) handleLoadMore();
      },
      { rootMargin: '100px', threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleLoadMore]);

  return {
    search,
    setSearch,
    items,
    query,
    loadMoreRef,
  };
}
