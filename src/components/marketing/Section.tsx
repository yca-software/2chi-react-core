import type * as React from 'react';
import { cn } from '../../lib/utils';

export type SectionVariant = 'default' | 'soft' | 'spotlight';

/** Props for the Section component. */
export interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  /** Ambient background treatment. */
  variant?: SectionVariant;
  className?: string;
}

/**
 * Full-width section with optional heading block (subtitle, title, description) and content.
 * Uses container and centered text for the heading when present.
 */
export function Section({
  id,
  title,
  subtitle,
  description,
  children,
  variant = 'default',
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'px-4 py-20',
        variant === 'soft' && 'ds-mkt-section-soft',
        variant === 'spotlight' && 'ds-mkt-section-spotlight',
        className,
      )}
    >
      <div className="container mx-auto">
        {(title || subtitle || description) && (
          <div className="mb-12 text-center">
            {subtitle && <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>}
            {title && (
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            )}
            {description && (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
