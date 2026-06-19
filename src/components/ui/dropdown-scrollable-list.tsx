import { ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

export type DropdownScrollableListProps = {
  children: React.ReactNode;
  /** When this changes, overflow and fade visibility are recomputed */
  scrollKey?: string | number;
  className?: string;
  /**
   * When true (default), the list fills a flex parent with max-height (e.g. Select).
   * When false, only `scrollAreaClassName` sizes the scroll region (e.g. MultiSelect).
   */
  grow?: boolean;
  /** Extra classes on the scrollable element; when `grow` is false, this must include max-height and overflow */
  scrollAreaClassName?: string;
};

export function DropdownScrollableList({
  children,
  scrollKey,
  className,
  scrollAreaClassName,
  grow = true,
}: DropdownScrollableListProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = React.useState(false);
  const [showBottom, setShowBottom] = React.useState(false);

  const update = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      setShowTop(false);
      setShowBottom(false);
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = el;
    const overflow = scrollHeight - clientHeight > 2;
    if (!overflow) {
      setShowTop(false);
      setShowBottom(false);
      return;
    }
    setShowTop(scrollTop > 2);
    setShowBottom(scrollTop + clientHeight < scrollHeight - 2);
  }, []);

  React.useLayoutEffect(() => {
    update();
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(update);
    });
    return () => cancelAnimationFrame(id);
  }, [update, scrollKey]);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    const ro = new ResizeObserver(() => {
      window.requestAnimationFrame(update);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  return (
    <div className={cn('relative flex min-h-0 flex-col', grow && 'flex-1', className)}>
      <div
        ref={scrollRef}
        className={cn(
          grow
            ? cn('min-h-0 flex-1 overflow-y-auto overscroll-y-contain p-1', scrollAreaClassName)
            : scrollAreaClassName,
        )}
        onScroll={update}
      >
        {children}
      </div>
      {showTop ? (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] flex h-6 flex-col items-center justify-start pt-px"
          aria-hidden
        >
          <div className="absolute inset-0 bg-gradient-to-b from-popover via-popover/35 to-transparent backdrop-blur-[0.5px]" />
          <ChevronUp
            className="relative z-[2] h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-90 drop-shadow-sm"
            strokeWidth={2.5}
          />
        </div>
      ) : null}
      {showBottom ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex h-6 flex-col items-center justify-end pb-px"
          aria-hidden
        >
          <div className="absolute inset-0 bg-gradient-to-t from-popover via-popover/35 to-transparent backdrop-blur-[0.5px]" />
          <ChevronDown
            className="relative z-[2] h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-90 drop-shadow-sm"
            strokeWidth={2.5}
          />
        </div>
      ) : null}
    </div>
  );
}
