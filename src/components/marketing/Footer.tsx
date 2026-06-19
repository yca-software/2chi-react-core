import type * as React from 'react';
import { cn } from '../../lib/utils';

/** Contact details shown in the footer. */
export interface FooterContact {
  address?: string;
  phone?: string;
  email?: string;
}

/** Link item for the footer nav column. */
export interface FooterLink {
  label: string;
  href: string;
}

/** Props for the Footer component. */
export interface FooterProps {
  logo: React.ReactNode;
  description?: string;
  contact?: FooterContact;
  links?: FooterLink[];
  /** Shown under the copyright line (e.g. “A YCA Software product”). */
  attribution?: string;
  className?: string;
}

/**
 * Marketing site footer with logo, optional description, contact block, and link column.
 * Renders a copyright line for the current year.
 */
export function Footer({ logo, description, contact, links, attribution, className }: FooterProps) {
  return (
    <footer
      className={cn(
        'ds-mkt-footer-depth w-full border-t border-border/60 text-foreground',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center">
              {typeof logo === 'string' ? (
                <span className="text-lg font-extrabold tracking-tight text-foreground">
                  {logo}
                </span>
              ) : (
                logo
              )}
            </div>
            {description && (
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {links && links.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Navigation</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-[24px] items-center py-0.5 pl-0 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {contact && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Contact</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                {contact.address && <p className="leading-relaxed">{contact.address}</p>}
                {contact.phone && (
                  <p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </p>
                )}
                {contact.email && (
                  <p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex min-h-[24px] items-center hover:text-foreground transition-colors"
                    >
                      {contact.email}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="mt-10 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          {attribution && <p className="mt-2 text-xs text-muted-foreground/90">{attribution}</p>}
        </div>
      </div>
    </footer>
  );
}
