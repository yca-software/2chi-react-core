import { cn } from '../../lib/utils';

export interface TeamMember {
  name: string;
  role: string;
  image?: { src: string; alt: string };
  href?: string;
}

export interface TeamGridProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  members: TeamMember[];
  className?: string;
}

/**
 * Team / leadership grid with portrait cards.
 */
export function TeamGrid({ id, eyebrow, title, description, members, className }: TeamGridProps) {
  return (
    <section id={id} className={cn('ds-mkt-section-spotlight px-4 py-20', className)}>
      <div className="container mx-auto max-w-6xl">
        {(eyebrow || title || description) && (
          <div className="mb-14 text-center">
            {eyebrow && <p className="text-sm font-medium text-primary">{eyebrow}</p>}
            {title && (
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            )}
            {description && (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {members.map((m) => {
            const body = (
              <>
                <div className="ds-mkt-media-frame w-full">
                  <div className="ds-mkt-media-frame-inner relative aspect-[4/5] w-full overflow-hidden bg-muted">
                    {m.image ? (
                      <img
                        src={m.image.src}
                        alt={m.image.alt}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full min-h-[200px] w-full items-center justify-center bg-gradient-to-br from-primary/20 to-muted text-4xl font-bold text-muted-foreground">
                        {m.name.slice(0, 1)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <p className="font-semibold text-foreground">{m.name}</p>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                </div>
              </>
            );
            return (
              <div
                key={`${m.name}-${m.role}`}
                className="ds-mkt-surface-elevated rounded-2xl border-0 p-5 transition duration-300 hover:-translate-y-1"
              >
                {m.href ? (
                  <a
                    href={m.href}
                    className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
                  >
                    {body}
                  </a>
                ) : (
                  body
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
