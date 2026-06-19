import type * as React from 'react';

import { cn } from '../../lib/utils';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './sheet';

export interface FormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  /** Max width class - default sm:max-w-lg for form drawers */
  className?: string;
  /** Sheet content class for overflow/scrolling */
  contentClassName?: string;
}

/**
 * A drawer shell for forms. Provides consistent Sheet + Header layout.
 * The form content (including SheetFooter) is provided by children.
 * Mobile-friendly: full width on small screens, max-width on larger.
 */
export function FormDrawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  contentClassName,
}: FormDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        data-slot="form-drawer-content"
        className={cn(
          'flex flex-col gap-4 w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] sm:max-w-lg',
          contentClassName,
        )}
      >
        <SheetHeader className="flex-shrink-0 gap-2 pb-2">
          <SheetTitle className="text-base sm:text-lg">{title}</SheetTitle>
          {description && <SheetDescription className="text-sm">{description}</SheetDescription>}
        </SheetHeader>
        <div
          className={cn(
            // Inset so focus rings / box-shadow on full-width inputs are not clipped by overflow-y-auto
            'flex flex-col flex-1 min-h-0 gap-4 overflow-y-auto px-2 py-1',
            className,
          )}
        >
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
