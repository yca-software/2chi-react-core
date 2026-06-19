import type * as React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import type { HeroAction } from './Hero';

export interface HeroSplitProps {
  id?: string;
  subtitle?: string;
  title: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  /** Image shown in the media column (alternative to `media`). */
  image?: { src: string; alt: string; className?: string };
  /** Custom media: video, illustration, or optimized image from Astro. */
  media?: React.ReactNode;
  /** When true, applies ambient gradient + float wrapper on media (uses `.ds-mkt-*` utilities). */
  decorative?: boolean;
  className?: string;
}

/**
 * Two-column hero: copy and CTAs on one side, image or custom `media` on the other.
 */
export function HeroSplit({
  id,
  subtitle,
  title,
  description,
  primaryAction,
  secondaryAction,
  image,
  media,
  decorative = true,
  className,
}: HeroSplitProps) {
  const mediaContent =
    media ??
    (image ? (
      <img
        src={image.src}
        alt={image.alt}
        className={cn(
          'absolute inset-0 h-full w-full object-cover',
          decorative && 'ds-mkt-media-float',
          image.className,
        )}
        width={800}
        height={600}
        loading="eager"
        decoding="async"
      />
    ) : null);

  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden px-4 py-16 sm:py-24 lg:py-28',
        decorative && 'ds-mkt-gradient-bg ds-mkt-hero-split-stage',
        className,
      )}
    >
      <div className="ds-mkt-hero-split-content container mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6 text-center lg:text-left">
            {subtitle && <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
            {description && (
              <p className="mx-auto max-w-xl text-lg text-muted-foreground lg:mx-0">
                {description}
              </p>
            )}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                {primaryAction && (
                  <Button
                    asChild
                    size="lg"
                    className="ds-mkt-hero-cta-primary min-h-12 px-8 text-base font-semibold"
                  >
                    <a href={primaryAction.href}>{primaryAction.label}</a>
                  </Button>
                )}
                {secondaryAction && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="ds-mkt-hero-cta-secondary min-h-12 border-0 px-8 text-base font-semibold bg-transparent shadow-none hover:bg-transparent"
                  >
                    <a href={secondaryAction.href}>{secondaryAction.label}</a>
                  </Button>
                )}
              </div>
            )}
          </div>
          {mediaContent && (
            <div
              className={cn(
                'relative mx-auto w-full max-w-lg lg:max-w-none',
                decorative && 'ds-mkt-fade-up',
              )}
            >
              <div className="ds-mkt-media-frame">
                <div className="ds-mkt-media-frame-inner relative aspect-[4/3] w-full overflow-hidden">
                  <div className="absolute inset-0 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0 [&_video]:h-full [&_video]:w-full [&_video]:object-cover">
                    {mediaContent}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
