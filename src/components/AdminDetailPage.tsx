import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { PageLoader } from './PageLoader';
import { Button } from './ui';

export type AdminDetailErrorKind = 'notFound' | 'forbidden' | 'load';

export interface AdminDetailPageProps {
  backHref: string;
  backLabel: string;
  isLoading: boolean;
  errorKind?: AdminDetailErrorKind;
  error?: unknown;
  notFoundMessage: string;
  forbiddenMessage: string;
  loadErrorMessage: string;
  /** App-bound API error formatter (e.g. formatApiError from SPA helpers). */
  formatError?: (error: unknown) => string;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
}

/** Reusable admin detail page: back button, loading/error states, content. */
export function AdminDetailPage({
  backHref,
  backLabel,
  isLoading,
  errorKind,
  error,
  notFoundMessage,
  forbiddenMessage,
  loadErrorMessage,
  formatError,
  children,
  headerActions,
}: AdminDetailPageProps) {
  if (isLoading) {
    return <PageLoader variant="route" />;
  }

  if (errorKind) {
    const message =
      errorKind === 'forbidden'
        ? forbiddenMessage
        : errorKind === 'load'
          ? formatError?.(error) || loadErrorMessage
          : notFoundMessage;

    return (
      <div className="space-y-4 sm:space-y-6">
        <p className="text-destructive">{message}</p>
        <Link to={backHref}>
          <Button variant="outline">{backLabel}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to={backHref}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
            {backLabel}
          </Button>
        </Link>
        {headerActions}
      </div>
      {children}
    </div>
  );
}
