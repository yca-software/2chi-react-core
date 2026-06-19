import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '../lib/utils';

export interface PageLoaderProps {
  className?: string;
  spinnerClassName?: string;
  /**
   * - `page`: full-screen route guard
   * - `route`: lazy route / admin detail suspense (`min-h-[40vh]`)
   * - `section`: in-page block (`py-12`)
   * - `inline`: compact centered spinner (auth cards, nested panels)
   */
  variant?: 'page' | 'route' | 'section' | 'inline';
  /** Accessible loading text; defaults to i18n `common.loading`. */
  loadingLabel?: string;
}

export function PageLoader({
  className,
  spinnerClassName,
  variant = 'section',
  loadingLabel,
}: PageLoaderProps) {
  const { t } = useTranslation('common');
  const label = loadingLabel ?? t('loading');
  const spinnerSize =
    variant === 'inline'
      ? 'h-6 w-6 animate-spin text-primary'
      : 'h-8 w-8 animate-spin text-primary';

  const content = (
    <>
      <Loader2 className={cn(spinnerSize, spinnerClassName)} aria-hidden />
      <span className="sr-only">{label}</span>
    </>
  );

  if (variant === 'page') {
    return (
      <div
        className={cn('min-h-screen flex items-center justify-center bg-background', className)}
        role="status"
        aria-live="polite"
      >
        {content}
      </div>
    );
  }

  if (variant === 'route') {
    return (
      <div
        className={cn('flex min-h-[40vh] items-center justify-center', className)}
        role="status"
        aria-live="polite"
      >
        {content}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div
        className={cn('flex items-center justify-center', className)}
        role="status"
        aria-live="polite"
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className={cn('flex items-center justify-center py-12', className)}
      role="status"
      aria-live="polite"
    >
      {content}
    </div>
  );
}
