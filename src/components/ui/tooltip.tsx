import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '../../lib/utils';

export const TooltipProvider = TooltipPrimitive.Provider;

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  /**
   * Delay (in ms) before the tooltip opens on hover.
   */
  delayDuration?: number;
  /**
   * Delay (in ms) before the tooltip closes after hover ends.
   */
  closeDelay?: number;
}

/**
 * Tooltip that opens only on hover (not on focus), so it does not open when
 * the trigger receives focus from keyboard or from opening a dialog/sheet.
 *
 * Includes a small hover delay to avoid "tooltip spam" when simply moving
 * the mouse across the screen.
 */
export function Tooltip({
  content,
  children,
  side = 'top',
  align = 'center',
  delayDuration = 400,
  closeDelay = 100,
}: TooltipProps) {
  const [open, setOpen] = React.useState(false);

  const openTimeoutRef = React.useRef<number | null>(null);
  const closeTimeoutRef = React.useRef<number | null>(null);

  const clearOpenTimeout = React.useCallback(() => {
    if (openTimeoutRef.current !== null) {
      window.clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
  }, []);

  const clearCloseTimeout = React.useCallback(() => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      // Let Radix close the tooltip (e.g. on Escape, outside interactions),
      // but we control opening via our own hover timers.
      if (!next) {
        clearOpenTimeout();
        clearCloseTimeout();
        setOpen(false);
      }
    },
    [clearCloseTimeout, clearOpenTimeout],
  );

  const handlePointerEnter = React.useCallback(() => {
    clearCloseTimeout();
    clearOpenTimeout();

    openTimeoutRef.current = window.setTimeout(() => {
      setOpen(true);
    }, delayDuration);
  }, [clearCloseTimeout, clearOpenTimeout, delayDuration]);

  const handlePointerLeave = React.useCallback(() => {
    clearOpenTimeout();
    clearCloseTimeout();

    if (closeDelay === 0) {
      setOpen(false);
      return;
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  }, [clearCloseTimeout, clearOpenTimeout, closeDelay]);

  React.useEffect(
    () => () => {
      clearOpenTimeout();
      clearCloseTimeout();
    },
    [clearCloseTimeout, clearOpenTimeout],
  );

  return (
    <TooltipPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <TooltipPrimitive.Trigger
        asChild
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          sideOffset={6}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          className={cn(
            'z-110 max-w-xs rounded-md border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md outline-none',
            'animate-in fade-in-0 zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          )}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
