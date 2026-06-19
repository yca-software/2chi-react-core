import type * as React from 'react';
import { cn } from '../../lib/utils';

export interface TrustBadgeItem {
  label: string;
  icon?: React.ReactNode;
}

export interface TrustBadgesProps {
  id?: string;
  title?: string;
  items: TrustBadgeItem[];
  className?: string;
}

/**
 * Inline trust / compliance chips (SOC2-style labels, guarantees, etc.).
 */
export function TrustBadges({ id, title, items, className }: TrustBadgesProps) {
  return (
    <section id={id} className={cn('px-4 py-10', className)}>
      <div className="container mx-auto max-w-5xl">
        {title && (
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border border-border/60',
                'bg-gradient-to-b from-card to-muted/30 px-4 py-2 text-sm font-medium text-foreground shadow-sm',
                'ring-1 ring-border/40 transition hover:border-primary/30 hover:shadow-md',
              )}
            >
              {item.icon && <span className="text-primary [&_svg]:size-4">{item.icon}</span>}
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
