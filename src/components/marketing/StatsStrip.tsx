import { cn } from '../../lib/utils';

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsStripProps {
  id?: string;
  stats: StatItem[];
  className?: string;
}

/**
 * Responsive row of metrics (value + label).
 */
export function StatsStrip({ id, stats, className }: StatsStripProps) {
  return (
    <section id={id} className={cn('px-4 py-16', className)}>
      <div className="container mx-auto max-w-6xl">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center ds-mkt-stat-pop">
              <dt className="ds-mkt-stat-value text-3xl font-bold tracking-tight sm:text-4xl">
                {stat.value}
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
