import type { Locale } from 'date-fns';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { DISPLAY_FORMAT, normalizeDate } from '../../lib/dates';
import { cn } from '../../lib/utils';
import { Calendar } from './calendar';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  /** Minimum selectable date (inclusive). */
  minDate?: Date;
  /** Maximum selectable date (inclusive). */
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
  /** Locale for calendar and formatting (e.g. from date-fns/locale). */
  locale?: Locale;
  className?: string;
  'aria-label'?: string;
}

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = 'Pick a date',
  disabled = false,
  locale,
  className,
  'aria-label': ariaLabel,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const normalizedMin = normalizeDate(minDate);
  const normalizedMax = normalizeDate(maxDate);

  const formatOpts = React.useMemo(() => (locale ? { locale } : undefined), [locale]);

  const disabledMatchers = React.useMemo(() => {
    const toStartOfDay = (d: Date) => {
      const copy = new Date(d);
      copy.setHours(0, 0, 0, 0);
      return copy.getTime();
    };
    const matchers: Array<(date: Date) => boolean> = [];
    if (normalizedMin) {
      matchers.push((date: Date) => toStartOfDay(date) < toStartOfDay(normalizedMin!));
    }
    if (normalizedMax) {
      matchers.push((date: Date) => toStartOfDay(date) > toStartOfDay(normalizedMax!));
    }
    return matchers;
  }, [normalizedMin, normalizedMax]);

  const handleSelect = (date: Date | undefined) => {
    const day = date ? normalizeDate(date) : undefined;
    onChange(day ?? undefined);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              setOpen((o) => !o);
            }
          }}
          className={cn(
            'flex w-full cursor-pointer items-center rounded-md border border-input bg-transparent shadow-xs focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
            disabled && 'pointer-events-none opacity-50',
            className,
          )}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-l-md border-r border-input text-muted-foreground">
            <CalendarIcon className="size-4" aria-hidden />
          </span>
          <Input
            type="text"
            readOnly
            value={value ? format(value, DISPLAY_FORMAT, formatOpts) : ''}
            placeholder={placeholder}
            onClick={() => !disabled && setOpen(true)}
            className={cn(
              'h-9 min-w-0 flex-1 cursor-pointer rounded-l-none border-0 bg-transparent py-2 pl-3 pr-3 text-base shadow-none focus-visible:ring-0 md:text-sm capitalize',
              !value && 'text-muted-foreground',
            )}
            aria-label={ariaLabel}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[120]" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          disabled={(date) => disabledMatchers.some((m) => m(date))}
          locale={locale}
        />
      </PopoverContent>
    </Popover>
  );
}
