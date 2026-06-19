import type * as React from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export interface BentoCell {
  title: string;
  description: string;
  /** Tailwind span classes, e.g. `md:col-span-2` or `md:row-span-2`. */
  className?: string;
  icon?: React.ReactNode;
}

export interface BentoFeaturesProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  cells: BentoCell[];
  className?: string;
}

/**
 * Bento-style grid: accent rail, gradient icon wells, and hover lift per tile.
 */
export function BentoFeatures({
  id,
  eyebrow,
  title,
  description,
  cells,
  className,
}: BentoFeaturesProps) {
  return (
    <section id={id} className={cn('ds-mkt-section-soft px-4 py-20 sm:py-24', className)}>
      <div className="container mx-auto max-w-6xl">
        {(eyebrow || title || description) && (
          <div className="mb-14 text-center">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            )}
            {description && (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <div className="grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {cells.map((cell) => (
            <Card
              key={cell.title}
              className={cn(
                'ds-mkt-bento-tile flex h-full flex-col rounded-none border-0 bg-transparent p-0 shadow-none',
                cell.className,
              )}
            >
              <CardHeader className="gap-4 px-6 pb-2 pt-7 sm:px-7">
                {cell.icon && (
                  <div className="ds-mkt-bento-icon-wrap [&_svg]:size-5">{cell.icon}</div>
                )}
                <CardTitle className="text-xl leading-snug">{cell.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 px-6 pb-7 pt-0 sm:px-7">
                <CardDescription className="text-base leading-relaxed">
                  {cell.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
