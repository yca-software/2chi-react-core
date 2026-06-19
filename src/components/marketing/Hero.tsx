import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

/** Button/link for the hero CTA (label + href). */
export interface HeroAction {
  label: string;
  href: string;
}

/** Props for the Hero component. */
export interface HeroProps {
  id?: string;
  subtitle?: string;
  title: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  className?: string;
}

/**
 * Marketing hero section: centered headline, optional subtitle/description, and primary/secondary CTAs.
 * Min height ~80vh; responsive typography.
 */
export function Hero({
  id,
  subtitle,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: HeroProps) {
  return (
    <section
      id={id}
      className={cn(
        'ds-mkt-hero-mesh flex min-h-[80vh] flex-col items-center justify-center px-4 py-20 text-center',
        className,
      )}
    >
      <div className="container mx-auto max-w-4xl space-y-6">
        {subtitle && <p className="text-lg font-medium text-muted-foreground">{subtitle}</p>}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {description}
          </p>
        )}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
    </section>
  );
}
