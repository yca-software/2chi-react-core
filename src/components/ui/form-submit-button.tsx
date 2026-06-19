import { Loader2 } from 'lucide-react';
import type * as React from 'react';

import { cn } from '../../lib/utils';
import { Button } from './button';

export interface FormSubmitButtonProps
  extends Omit<React.ComponentProps<typeof Button>, 'children'> {
  label: string;
  isPending?: boolean;
  /** Optional loading label when pending */
  pendingLabel?: string;
}

/**
 * A submit button with consistent loading state (spinner + disabled).
 * Use in form footers for create/edit flows.
 */
/** @deprecated Unused in SPAs — use app submit buttons with loading state. */
export function FormSubmitButton({
  label,
  isPending = false,
  pendingLabel,
  disabled,
  className,
  ...props
}: FormSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled ?? isPending}
      aria-busy={isPending}
      className={cn(className)}
      {...props}
    >
      {isPending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {isPending && pendingLabel ? pendingLabel : label}
    </Button>
  );
}
