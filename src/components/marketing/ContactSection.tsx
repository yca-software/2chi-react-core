import { Mail, MapPin, Phone } from 'lucide-react';
import type * as React from 'react';
import { cn } from '../../lib/utils';

export interface ContactSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  /** Right column: custom form or map embed */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Two-column contact block: copy + channels on the left, `children` (e.g. form) on the right.
 */
export function ContactSection({
  id,
  eyebrow,
  title,
  description,
  email,
  phone,
  address,
  children,
  className,
}: ContactSectionProps) {
  return (
    <section id={id} className={cn('ds-mkt-section-soft px-4 py-20', className)}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {eyebrow && <p className="text-sm font-medium text-primary">{eyebrow}</p>}
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
            <ul className="mt-10 space-y-6 text-sm">
              {email && (
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                    <Mail className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a
                      href={`mailto:${email}`}
                      className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {email}
                    </a>
                  </div>
                </li>
              )}
              {phone && (
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                    <Phone className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {phone}
                    </a>
                  </div>
                </li>
              )}
              {address && (
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Studio</p>
                    <p className="text-muted-foreground whitespace-pre-line">{address}</p>
                  </div>
                </li>
              )}
            </ul>
          </div>
          {children && (
            <div className="ds-mkt-surface-elevated rounded-3xl border-0 p-6 sm:p-8 lg:p-10">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
