import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  items: FaqItem[];
  className?: string;
}

/**
 * Accessible FAQ list using native disclosure (`details` / `summary`).
 */
export function FaqSection({ id, eyebrow, title, description, items, className }: FaqSectionProps) {
  return (
    <section id={id} className={cn('px-4 py-20', className)}>
      <div className="container mx-auto max-w-3xl">
        {(eyebrow || title || description) && (
          <div className="mb-12 text-center">
            {eyebrow && <p className="text-sm font-medium text-primary">{eyebrow}</p>}
            {title && (
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            )}
            {description && (
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="group ds-mkt-surface-elevated rounded-2xl border-0 px-6 py-2 transition-colors open:bg-card/80"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="border-t border-border/40 pb-4 pt-0 text-muted-foreground leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
