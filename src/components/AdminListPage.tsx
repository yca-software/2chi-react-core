import { Loader2, Search } from 'lucide-react';

import { cn } from '../lib/utils';
import { PageLoader } from './PageLoader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui';

export interface AdminListPageColumn<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
  /** Column class for alignment/width */
  className?: string;
}

export interface AdminListPageProps<T> {
  title: string;
  description: string;
  /** Optional actions (e.g. "Create" button) rendered next to the page title. */
  headerActions?: React.ReactNode;
  /** Card header title (e.g. "All Users") */
  cardTitle: string;
  searchPlaceholder: string;
  emptyMessage: string;
  columns: AdminListPageColumn<T>[];
  items: T[];
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  loadMoreRef: React.RefObject<HTMLTableRowElement | null>;
  search: string;
  onSearchChange: (value: string) => void;
  onRowClick: (item: T) => void;
  getRowKey: (item: T) => string;
  /** Accessible label for the loading spinner (app i18n). */
  loadingAriaLabel?: string;
}

/**
 * Reusable admin list page: search + card + table + infinite scroll.
 */
export function AdminListPage<T>({
  title,
  description,
  headerActions,
  cardTitle,
  searchPlaceholder,
  emptyMessage,
  columns,
  items,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  loadMoreRef,
  search,
  onSearchChange,
  onRowClick,
  getRowKey,
  loadingAriaLabel = 'Loading...',
}: AdminListPageProps<T>) {
  const safeItems = items.filter((item): item is T => item != null && typeof item === 'object');

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">{description}</p>
        </div>
        {headerActions}
      </div>

      <Card>
        <CardHeader className="gap-4">
          <div className="space-y-2">
            <CardTitle>{cardTitle}</CardTitle>
            <CardDescription>{searchPlaceholder}</CardDescription>
          </div>
          <div className="relative max-w-full sm:max-w-sm">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
              aria-label={searchPlaceholder}
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <PageLoader loadingLabel={loadingAriaLabel} />
          ) : safeItems.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">{emptyMessage}</p>
          ) : (
            <div className="-mx-4 overflow-x-auto sm:mx-0">
              <Table className="min-w-[400px]">
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    {columns.map((col) => (
                      <TableHead key={col.key} className={col.className}>
                        {col.header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {safeItems.map((item, index) => (
                    <TableRow
                      key={getRowKey(item) || `row-${index}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => onRowClick(item)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onRowClick(item);
                        }
                      }}
                      className="cursor-pointer hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                    >
                      {columns.map((col) => (
                        <TableCell
                          key={col.key}
                          className={cn(col.className ?? 'text-muted-foreground')}
                        >
                          {col.render(item)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  {hasNextPage && (
                    <TableRow ref={loadMoreRef}>
                      <TableCell
                        colSpan={columns.length}
                        className="text-center text-muted-foreground"
                      >
                        {isFetchingNextPage ? (
                          <Loader2 className="inline-block h-5 w-5 animate-spin" aria-hidden />
                        ) : null}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
