import type * as React from 'react';
import { cn } from '../../lib/utils';

const linkStyles =
  'cursor-pointer font-medium text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300';

/** Allowed URL schemes for href. Blocks javascript:, data:, vbscript:, etc. to prevent XSS. */
const ALLOWED_SCHEMES = ['http:', 'https:', 'mailto:', 'tel:', ''];

function sanitizeHref(to: string): string {
  const trimmed = to.trim();
  if (!trimmed) return '#';
  const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(trimmed);
  if (hasScheme) {
    const scheme = trimmed.split(':')[0];
    if (scheme && !ALLOWED_SCHEMES.includes(`${scheme.toLowerCase()}:`)) {
      return '#';
    }
  }
  return trimmed;
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** URL or path (rendered as href on a plain <a>) */
  to: string;
  /** Open in new tab with security attributes */
  external?: boolean;
}

/** @deprecated Unused in SPAs — prefer react-router `Link`. Kept for Storybook demos only. */
function Link({ className, external, to, ...props }: LinkProps) {
  const href = sanitizeHref(to);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(linkStyles, className)}
        {...props}
      />
    );
  }
  return <a href={href} className={cn(linkStyles, className)} {...props} />;
}

export { Link, linkStyles };
