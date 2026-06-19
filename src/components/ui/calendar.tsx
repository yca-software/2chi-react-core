import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type DateRange, DayPicker, type DayPickerProps } from 'react-day-picker';

import { cn } from '../../lib/utils';
import { buttonVariants } from './button';

export type { DateRange };

export type CalendarProps = DayPickerProps;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  weekStartsOn,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      data-slot="calendar"
      showOutsideDays={showOutsideDays}
      weekStartsOn={weekStartsOn ?? 1}
      navLayout="around"
      className={cn('p-3', className)}
      classNames={{
        months:
          'flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-start sm:gap-6',
        month: 'relative min-w-0 space-y-3',
        month_caption: 'flex items-center justify-center w-full h-9 pt-1 px-10',
        caption_label: 'text-sm font-medium text-center pointer-events-none',
        nav: 'contents',
        button_previous: cn(
          buttonVariants({ variant: 'outline', size: 'icon-sm' }),
          'absolute left-0 top-1 z-10 h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100',
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline', size: 'icon-sm' }),
          'absolute right-0 top-1 z-10 h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100',
        ),
        month_grid: 'w-full border-collapse',
        weekdays: '',
        weekday: 'text-muted-foreground w-10 rounded-md font-normal text-[0.75rem] text-center p-1',
        weeks: 'mt-1',
        week: '',
        day: 'relative h-10 w-10 text-center text-sm p-0 align-top focus-within:relative focus-within:z-20',
        day_button: cn(
          'day-button inline-flex size-10 items-center justify-center rounded-md text-sm font-normal transition-colors cursor-pointer',
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'aria-disabled:text-muted-foreground/60 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed',
        ),
        selected:
          'bg-primary/10 text-primary [&_.day-button]:bg-primary [&_.day-button]:text-primary-foreground',
        today:
          'text-primary [&_.day-button]:border [&_.day-button]:border-primary [&_.day-button]:rounded-md [&.selected]:bg-primary [&.selected]:text-primary-foreground',
        outside:
          'text-muted-foreground/60 [&.selected]:bg-accent/40 [&.selected]:text-accent-foreground',
        range_middle:
          'bg-primary/15 text-foreground [&_.day-button]:bg-primary/15 [&_.day-button]:text-foreground [&_.day-button]:rounded-none',
        range_end:
          'rounded-r-md text-primary-foreground [&_.day-button]:bg-primary [&_.day-button]:text-primary-foreground [&_.day-button]:rounded-r-md [&_.day-button]:rounded-l-none [&.range_start_.day-button]:!rounded-md',
        range_start:
          'rounded-l-md text-primary-foreground [&_.day-button]:bg-primary [&_.day-button]:text-primary-foreground [&_.day-button]:rounded-l-md [&_.day-button]:rounded-r-none [&.range_end_.day-button]:!rounded-md',
        disabled: 'text-muted-foreground/60 opacity-50 [&_.day-button]:cursor-not-allowed',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === 'left' ? (
            <ChevronLeft className="size-4" aria-hidden />
          ) : (
            <ChevronRight className="size-4" aria-hidden />
          ),
      }}
      {...props}
    />
  );
}

export { Calendar };
