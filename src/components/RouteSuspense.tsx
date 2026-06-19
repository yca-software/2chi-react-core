import { type ReactNode, Suspense } from 'react';

import { PageLoader } from './PageLoader';

export interface RouteSuspenseProps {
  children: ReactNode;
  loadingLabel?: string;
}

/** Suspense boundary for lazy route modules with shared loading UX. */
export function RouteSuspense({ children, loadingLabel }: RouteSuspenseProps) {
  return (
    <Suspense fallback={<PageLoader variant="route" loadingLabel={loadingLabel} />}>
      {children}
    </Suspense>
  );
}
