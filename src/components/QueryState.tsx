import { PageLoader } from './PageLoader';
import { Alert, AlertDescription, Button } from './ui';

export interface QueryStateProps {
  isLoading: boolean;
  isError?: boolean;
  error?: unknown;
  onRetry?: () => void;
  loadingClassName?: string;
  children: React.ReactNode;
  /** App-bound API error formatter (e.g. formatApiError from SPA helpers). */
  formatError?: (error: unknown) => string;
  /** Fallback copy when formatError returns empty. */
  errorDescription?: string;
  retryLabel?: string;
  loadingLabel?: string;
}

/** Renders loading/error states for TanStack Query results, then children on success. */
export function QueryState({
  isLoading,
  isError,
  error,
  onRetry,
  loadingClassName,
  children,
  formatError,
  errorDescription = 'We could not load this data. Please try again.',
  retryLabel = 'Try again',
  loadingLabel = 'Loading...',
}: QueryStateProps) {
  if (isLoading) {
    return (
      <PageLoader variant="section" className={loadingClassName} loadingLabel={loadingLabel} />
    );
  }

  if (isError) {
    const message = formatError?.(error) || errorDescription;
    return (
      <Alert variant="destructive" className="max-w-xl">
        <AlertDescription className="space-y-3">
          <p>{message}</p>
          {onRetry ? (
            <Button type="button" variant="outline" size="sm" onClick={onRetry}>
              {retryLabel}
            </Button>
          ) : null}
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
}
