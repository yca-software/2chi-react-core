import { cn } from '../../lib/utils';

export interface LogoCloudItem {
  src: string;
  alt: string;
  href?: string;
}

export interface LogoCloudProps {
  id?: string;
  title?: string;
  logos: LogoCloudItem[];
  className?: string;
}

/**
 * Grayscale logo strip for social proof; optional heading.
 */
export function LogoCloud({ id, title, logos, className }: LogoCloudProps) {
  return (
    <section id={id} className={cn('border-y border-border/40 bg-muted/15 px-4 py-14', className)}>
      <div className="container mx-auto max-w-6xl">
        {title && (
          <p className="mb-10 text-center text-sm font-medium text-muted-foreground">{title}</p>
        )}
        <div className="ds-mkt-logo-rail flex flex-wrap items-center justify-center gap-x-10 gap-y-8 px-8 py-10 md:gap-x-14">
          {logos.map((logo) => {
            const img = (
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto max-w-[120px] object-contain opacity-60 grayscale transition-opacity hover:opacity-100 md:h-9"
                loading="lazy"
                decoding="async"
              />
            );
            return (
              <div key={`${logo.src}-${logo.alt}`} className="flex shrink-0 items-center">
                {logo.href ? (
                  <a
                    href={logo.href}
                    className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {img}
                  </a>
                ) : (
                  img
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
