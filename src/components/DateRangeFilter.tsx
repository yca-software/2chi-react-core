import type { DateRange } from 'react-day-picker';

import { dateRangePickerTranslations } from '../lib/dateRangePickerTranslations';
import { cn } from '../lib/utils';
import { DateRangePicker } from './ui/date-range-picker';

export interface DateRangeFilterProps {
  label: string;
  value: DateRange | undefined;
  onChange: (value: DateRange | undefined) => void;
  onApply: (value: DateRange | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  hint?: string;
  /** Layout variant for toolbar vs panel contexts. */
  variant?: 'panel' | 'inline' | 'toolbar';
  /** i18n translate function (e.g. from useTranslationNamespace). */
  t: (key: string) => string;
  /** Namespace prefix for dateRange keys (default: `common`). */
  translationNs?: string;
}

export function DateRangeFilter({
  label,
  value,
  onChange,
  onApply,
  minDate,
  maxDate,
  className,
  hint,
  variant = 'panel',
  t,
  translationNs = 'common',
}: DateRangeFilterProps) {
  const inline = variant === 'inline';
  const toolbar = variant === 'toolbar';

  const picker = (
    <DateRangePicker
      className={cn(
        'w-full min-w-0 border-border/80 bg-background',
        toolbar ? 'w-full min-w-0' : inline ? 'sm:max-w-[280px]' : 'sm:max-w-[320px]',
      )}
      value={value}
      onChange={onChange}
      minDate={minDate}
      maxDate={maxDate}
      translations={dateRangePickerTranslations(t, translationNs)}
      onApply={onApply}
    />
  );

  if (toolbar) {
    return (
      <div className={cn('min-w-0 w-full', className)}>
        <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
        {picker}
      </div>
    );
  }

  if (inline) {
    return (
      <div className={cn('w-full shrink-0 sm:w-auto', className)}>
        <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
        {picker}
        {hint ? <p className="mt-1 text-[0.65rem] text-muted-foreground">{hint}</p> : null}
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg border border-border/80 bg-muted/25 p-3 shadow-sm', className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
        </div>
        {picker}
      </div>
    </div>
  );
}

export { dateRangePickerTranslations };
