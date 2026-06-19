import type * as React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export interface NewsletterProps {
  id?: string;
  title: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  /** When set, renders a GET/POST form to this URL (e.g. Buttondown, Formspree). */
  formAction?: string;
  formMethod?: 'get' | 'post';
  inputName?: string;
  /** Custom form content (e.g. hidden fields). When set, other form props are ignored. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Email capture block with elevated surface; works with external form endpoints or `children`.
 */
export function Newsletter({
  id,
  title,
  description,
  placeholder = 'you@company.com',
  buttonLabel = 'Subscribe',
  formAction,
  formMethod = 'post',
  inputName = 'email',
  children,
  className,
}: NewsletterProps) {
  return (
    <section id={id} className={cn('px-4 py-16', className)}>
      <div className="container mx-auto max-w-2xl">
        <div
          className={cn(
            'ds-mkt-surface-elevated overflow-hidden rounded-3xl p-8 sm:p-10',
            'bg-gradient-to-br from-card via-card to-primary/5',
          )}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
            {description && <p className="mt-3 text-muted-foreground">{description}</p>}
          </div>
          <div className="mt-8">
            {children ? (
              children
            ) : formAction ? (
              <form
                action={formAction}
                method={formMethod}
                className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
              >
                <Input
                  type="email"
                  name={inputName}
                  required
                  placeholder={placeholder}
                  autoComplete="email"
                  className="h-11 flex-1 border-border/60 bg-background/80 shadow-inner"
                />
                <Button type="submit" size="lg" className="ds-mkt-btn-primary shrink-0 sm:px-8">
                  {buttonLabel}
                </Button>
              </form>
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                Provide a formAction URL or custom children to wire email capture.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
