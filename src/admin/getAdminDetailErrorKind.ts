import type { AdminDetailErrorKind } from '../components/AdminDetailPage';

export function getAdminDetailErrorKind(options: {
  isLoading: boolean;
  isError: boolean;
  hasData: boolean;
  status?: number;
}): AdminDetailErrorKind | undefined {
  const { isLoading, isError, hasData, status } = options;

  if (isLoading || hasData) {
    return undefined;
  }

  if (status === 403) {
    return 'forbidden';
  }

  if (status === 404 || (!isError && !hasData)) {
    return 'notFound';
  }

  if (isError) {
    return 'load';
  }

  return 'notFound';
}
