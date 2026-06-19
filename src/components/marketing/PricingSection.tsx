import { Check } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import type { HeroAction } from './Hero';

export interface PricingTier {
  name: string;
  /** Single price (legacy). Ignored when `priceMonthly` + `priceAnnual` are set. */
  price: string;
  /** Optional struck-through anchor price shown above discounted price. */
  originalPrice?: string;
  period?: string;
  /** Enables monthly/annual toggle when both are set (with `priceAnnual`). */
  priceMonthly?: string;
  priceAnnual?: string;
  periodMonthly?: string;
  periodAnnual?: string;
  description?: string;
  features: string[];
  cta: HeroAction;
  highlighted?: boolean;
  /** Small badge under the plan name (e.g. trial). */
  badge?: string;
}

/** Feature comparison row: one value per tier (same order as `tiers`). */
export interface PricingComparisonRow {
  label: string;
  /** `true` = checkmark, `false` = muted dot, `string` = shown as text */
  values: (boolean | string)[];
}

export interface PricingSectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  tiers: PricingTier[];
  /** Shown below the cards; same column order as `tiers`. */
  comparisonRows?: PricingComparisonRow[];
  /** Deprecated: comparison title is intentionally not rendered. */
  comparisonTitle?: string;
  /** When monthly/annual prices exist, show “Save X%” style badge. */
  annualDiscountPercent?: number;
  className?: string;
}

function tierUsesBillingToggle(t: PricingTier): boolean {
  return t.priceMonthly != null && t.priceAnnual != null;
}

function resolveTierPrice(
  tier: PricingTier,
  interval: 'monthly' | 'annual',
): { amount: string; period?: string } {
  if (tierUsesBillingToggle(tier)) {
    return interval === 'annual'
      ? {
          amount: tier.priceAnnual as string,
          period: tier.periodAnnual ?? '/year',
        }
      : {
          amount: tier.priceMonthly as string,
          period: tier.periodMonthly ?? '/mo',
        };
  }
  return { amount: tier.price, period: tier.period };
}

/**
 * Pricing grid with optional billing toggle, tier badges, and feature comparison table
 * (aligned with the React SPA `PricingContent` / pricing modal layout).
 */
export function PricingSection({
  id,
  eyebrow,
  title,
  description,
  tiers,
  comparisonRows,
  annualDiscountPercent = 15,
  className,
}: PricingSectionProps) {
  const showBillingToggle = tiers.some(tierUsesBillingToggle);
  const [interval, setInterval] = React.useState<'monthly' | 'annual'>('monthly');

  return (
    <section id={id} className={cn('ds-mkt-section-soft px-4 py-20 sm:py-24', className)}>
      <div className="container mx-auto max-w-6xl">
        {(eyebrow || title || description) && (
          <div className="mb-12 text-center sm:mb-14">
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

        {showBillingToggle && (
          <div className="mb-10 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-background/80 p-1 shadow-sm backdrop-blur-sm">
              <button
                type="button"
                className={cn(
                  'cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  interval === 'monthly'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                onClick={() => setInterval('monthly')}
              >
                Monthly
              </button>
              <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
              <button
                type="button"
                className={cn(
                  'cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  interval === 'annual'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                onClick={() => setInterval('annual')}
              >
                Annual
              </button>
            </div>
            {annualDiscountPercent > 0 && (
              <div className="rounded-full border border-primary/35 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                Save {annualDiscountPercent}% on annual billing
              </div>
            )}
          </div>
        )}

        <div
          className={cn(
            'grid gap-6 lg:gap-8',
            tiers.length === 2 && 'md:grid-cols-2',
            tiers.length >= 3 && 'md:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {tiers.map((tier) => {
            const { amount, period } = resolveTierPrice(tier, interval);
            return (
              <div
                key={tier.name}
                className={cn(
                  'ds-mkt-pricing-tier relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card to-muted/25 p-8 shadow-lg transition duration-300',
                  tier.highlighted &&
                    'z-[1] border-primary/35 shadow-xl ring-2 ring-primary/40 ring-offset-2 ring-offset-background lg:scale-[1.02]',
                )}
              >
                {tier.highlighted && (
                  <span className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-lg bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow-md">
                    Popular
                  </span>
                )}
                <div className="min-h-[3.25rem]">
                  <h3 className="text-xl font-bold tracking-tight">{tier.name}</h3>
                  {tier.badge && (
                    <span className="mt-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {tier.badge}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  {tier.originalPrice && (
                    <div className="mb-1 text-sm font-medium text-muted-foreground line-through">
                      {tier.originalPrice}
                    </div>
                  )}
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      {amount}
                    </span>
                    {period && <span className="text-sm text-muted-foreground">{period}</span>}
                  </div>
                </div>
                {tier.description && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {tier.description}
                  </p>
                )}
                <ul className="mt-8 flex flex-1 flex-col gap-3 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={cn(
                    'mt-10 w-full',
                    tier.highlighted
                      ? 'ds-mkt-hero-cta-primary min-h-11 font-semibold'
                      : 'ds-mkt-btn-secondary min-h-11 font-semibold',
                  )}
                  size="lg"
                  variant={tier.highlighted ? 'default' : 'outline'}
                >
                  <a href={tier.cta.href}>{tier.cta.label}</a>
                </Button>
              </div>
            );
          })}
        </div>

        {comparisonRows && comparisonRows.length > 0 && (
          <div className="mt-16 overflow-x-auto sm:mt-20">
            <div className="ds-mkt-pricing-table min-w-[640px] overflow-hidden rounded-xl border border-border/60 bg-card/50 shadow-sm">
              <div
                className="grid border-b border-border/60 bg-muted/50 text-sm font-medium"
                style={{
                  gridTemplateColumns: `minmax(10rem,2fr) repeat(${tiers.length}, minmax(0,1fr))`,
                }}
              >
                <div className="px-4 py-3 text-left text-muted-foreground">&nbsp;</div>
                {tiers.map((t) => (
                  <div
                    key={t.name}
                    className="border-l border-border/40 px-3 py-3 text-center sm:px-4"
                  >
                    {t.name}
                  </div>
                ))}
              </div>
              {comparisonRows.map((row) => (
                <div
                  key={row.label}
                  className="grid border-t border-border/50 text-sm"
                  style={{
                    gridTemplateColumns: `minmax(10rem,2fr) repeat(${tiers.length}, minmax(0,1fr))`,
                  }}
                >
                  <div className="px-4 py-3 text-left leading-snug text-foreground">
                    {row.label}
                  </div>
                  {tiers.map((_, i) => {
                    const cell = row.values[i];
                    return (
                      <div
                        key={`${row.label}-${i}`}
                        className="flex items-center justify-center border-l border-border/40 px-3 py-3 sm:px-4"
                      >
                        {cell === undefined ? (
                          <span className="text-muted-foreground">—</span>
                        ) : typeof cell === 'string' ? (
                          <span className="text-center text-muted-foreground">{cell}</span>
                        ) : cell ? (
                          <Check className="size-4 shrink-0 text-primary" aria-label="Included" />
                        ) : (
                          <span
                            className="inline-block size-1.5 rounded-full bg-muted-foreground/35"
                            aria-label="Not included"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
