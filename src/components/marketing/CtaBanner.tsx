import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import type { HeroAction } from './Hero';

export interface CtaBannerProps {
  id?: string;
  title: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  /** Use gradient band (primary-tinted) vs solid primary. */
  variant?: 'gradient' | 'solid';
  className?: string;
}

/**
 * Full-width call-to-action: ambient background + frosted inner panel + hero-style buttons.
 */
export function CtaBanner({
  id,
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = 'gradient',
  className,
}: CtaBannerProps) {
  const isGradient = variant === 'gradient';

  return (
    <section
      id={id}
      className={cn(
        'px-4 py-20 sm:py-24',
        isGradient && 'ds-mkt-cta-shell',
        variant === 'solid' && 'ds-mkt-cta-solid-shell text-primary-foreground',
        className,
      )}
    >
      <div
        className={cn(
          'container mx-auto max-w-3xl text-center',
          isGradient && 'ds-mkt-cta-panel px-6 py-10 sm:px-12 sm:py-12',
          variant === 'solid' && 'ds-mkt-cta-solid-panel px-6 py-10 sm:px-12 sm:py-12',
        )}
      >
        <h2
          className={cn(
            'text-2xl font-bold tracking-tight sm:text-3xl',
            isGradient && 'text-foreground',
            variant === 'solid' && 'text-primary-foreground',
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              'mx-auto mt-4 max-w-xl text-lg leading-relaxed',
              isGradient && 'text-muted-foreground',
              variant === 'solid' && 'text-primary-foreground/90',
            )}
          >
            {description}
          </p>
        )}
        {(primaryAction || secondaryAction) && (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            {primaryAction && (
              <Button
                asChild
                size="lg"
                variant={variant === 'solid' ? 'secondary' : 'default'}
                className={cn(
                  'min-h-12 px-8 text-base font-semibold',
                  isGradient && 'ds-mkt-hero-cta-primary',
                  variant === 'solid' &&
                    '!bg-primary-foreground !text-primary shadow-lg shadow-black/10',
                )}
              >
                <a href={primaryAction.href}>{primaryAction.label}</a>
              </Button>
            )}
            {secondaryAction && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className={cn(
                  'min-h-12 border-0 px-8 text-base font-semibold shadow-none',
                  isGradient && 'ds-mkt-hero-cta-secondary bg-transparent hover:bg-transparent',
                  variant === 'solid' &&
                    'border-2 !border-primary-foreground/35 !bg-transparent !text-primary-foreground hover:!bg-primary-foreground/10',
                )}
              >
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
