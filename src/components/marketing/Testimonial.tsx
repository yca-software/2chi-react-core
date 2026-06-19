import { cn } from '../../lib/utils';

export interface TestimonialProps {
  id?: string;
  quote: string;
  attribution: string;
  role?: string;
  avatar?: { src: string; alt: string };
  logo?: { src: string; alt: string };
  className?: string;
}

/**
 * Single testimonial block with quote and optional avatar / company logo.
 */
export function Testimonial({
  id,
  quote,
  attribution,
  role,
  avatar,
  logo,
  className,
}: TestimonialProps) {
  return (
    <section id={id} className={cn('px-4 py-16', className)}>
      <div className="container mx-auto max-w-3xl">
        <div className="ds-mkt-glass-panel px-8 py-12 text-center sm:px-12 sm:py-14">
          {logo && (
            <div className="mb-8 flex justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto object-contain opacity-90"
                loading="lazy"
              />
            </div>
          )}
          <blockquote className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <footer className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {avatar && (
              <img
                src={avatar.src}
                alt={avatar.alt}
                className="h-12 w-12 rounded-full border-2 border-primary/20 object-cover shadow-md"
                width={48}
                height={48}
                loading="lazy"
              />
            )}
            <div className="text-left sm:text-center">
              <cite className="not-italic font-semibold text-foreground">{attribution}</cite>
              {role && <p className="text-sm text-muted-foreground">{role}</p>}
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
