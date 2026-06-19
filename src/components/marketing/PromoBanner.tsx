import { X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

export interface PromoBannerProps {
  /** Banner body (string or rich content) */
  children: React.ReactNode;
  href?: string;
  linkLabel?: string;
  dismissible?: boolean;
  className?: string;
}

/**
 * Slim announcement strip; optional link and client-side dismiss (hydrate with `client:load` in Astro when `dismissible`).
 */
export function PromoBanner({
  children,
  href,
  linkLabel = 'Learn more',
  dismissible = false,
  className,
}: PromoBannerProps) {
  const [open, setOpen] = React.useState(true);
  if (!open) return null;

  return (
    <div
      className={cn(
        'relative z-[60] w-full border-b border-primary/20',
        'bg-gradient-to-r from-primary/90 via-primary to-primary/85',
        'text-primary-foreground shadow-md shadow-primary/25',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 py-3 sm:flex-row sm:gap-6 sm:px-6',
          dismissible && 'pr-12 sm:pr-14',
        )}
      >
        <p className="text-center text-sm font-medium sm:text-base">{children}</p>
        {href && (
          <a
            href={href}
            className="shrink-0 rounded-md bg-primary-foreground/15 px-3 py-1.5 text-sm font-semibold underline-offset-4 transition hover:bg-primary-foreground/25 hover:underline"
          >
            {linkLabel}
          </a>
        )}
        {dismissible && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 h-9 w-9 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/15"
            onClick={() => setOpen(false)}
            aria-label="Dismiss"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
