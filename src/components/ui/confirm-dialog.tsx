import { Loader2 } from 'lucide-react';
import { useRef } from 'react';

import { cn } from '../../lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog';

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  /** Optional note shown below the description (e.g. policy or retention info) */
  descriptionNote?: string;
  cancelLabel?: string;
  confirmLabel: string;
  variant?: 'default' | 'destructive';
  onConfirm: () => void;
  isPending?: boolean;
  /** Accessibility: describe the action for screen readers */
  confirmAriaLabel?: string;
  className?: string;
  /** When true, clicking outside the dialog (e.g. overlay) closes it. Useful when dialog is opened from a drawer. */
  closeOnOutsideClick?: boolean;
}

/**
 * A reusable confirmation dialog for destructive or important actions.
 * By default uses AlertDialog so Escape does not accidentally dismiss.
 * Enter focuses and activates the confirm action (not cancel).
 * Set closeOnOutsideClick to allow closing when opened from a drawer or when overlay click is desired.
 * Mobile-friendly: stacks buttons vertically on small screens.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  descriptionNote,
  cancelLabel = 'Cancel',
  confirmLabel,
  variant = 'default',
  onConfirm,
  isPending = false,
  confirmAriaLabel,
  className,
  closeOnOutsideClick = false,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);
  const isDestructive = variant === 'destructive';
  const confirmClassName = isDestructive
    ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20'
    : undefined;

  const handleConfirm = () => {
    if (isPending) return;
    onConfirm();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        data-slot="confirm-dialog-content"
        className={cn('gap-4 sm:gap-6', className)}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          confirmRef.current?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key !== 'Enter' || isPending) return;
          const target = event.target as HTMLElement;
          if (target.closest('[data-slot="alert-dialog-cancel"]')) return;
          if (target.closest('[data-slot="alert-dialog-action"]')) return;
          event.preventDefault();
          handleConfirm();
        }}
        {...(closeOnOutsideClick && {
          onOverlayClick: () => onOpenChange(false),
        })}
      >
        <AlertDialogHeader className="gap-2">
          <AlertDialogTitle className="text-base sm:text-lg">{title}</AlertDialogTitle>
          <div className="space-y-2">
            <AlertDialogDescription className="text-sm">{description}</AlertDialogDescription>
            {descriptionNote && <p className="text-sm text-muted-foreground">{descriptionNote}</p>}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end sm:gap-2 sm:pt-0">
          <AlertDialogCancel
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="m-0 w-full sm:w-auto"
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            ref={confirmRef}
            onClick={handleConfirm}
            disabled={isPending}
            aria-label={confirmAriaLabel ?? confirmLabel}
            className={cn('m-0 w-full sm:w-auto', confirmClassName)}
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
