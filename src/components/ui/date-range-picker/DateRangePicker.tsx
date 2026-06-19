import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';

import { cn } from '../../../lib/utils';
import { Button } from '../button';
import { Calendar } from '../calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../dialog';
import { Input } from '../input';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { DEFAULT_PRESET_IDS, DEFAULT_PRESET_LABELS, DEFAULT_TRANSLATIONS } from './constants';
import {
  DISPLAY_FORMAT,
  formatRangeLabel,
  INPUT_FORMAT,
  normalizeDate,
  parseDate,
  parseInputToRange,
  rangesMatch,
} from './parseDateRange';
import type { DateRangePickerProps, PresetListItem } from './types';
import { getPresetRange } from './useDateRangePresets';
import { useIsDatePickerMobileLayout, useIsWideDatePickerLayout } from './useMediaQuery';

export function DateRangePicker({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder,
  showPresets = true,
  presets: customPresets,
  translations,
  locale,
  onApply,
  isDateDisabled,
  className,
}: DateRangePickerProps) {
  const t = { ...DEFAULT_TRANSLATIONS, ...translations };
  const effectivePlaceholder = placeholder ?? t.placeholder;
  const presetList: PresetListItem[] = React.useMemo(() => {
    if (customPresets?.length) return customPresets;
    if (!showPresets) return [];
    return DEFAULT_PRESET_IDS.map(({ id }) => ({
      id,
      label: translations?.presetLabels?.[id] ?? DEFAULT_PRESET_LABELS[id],
      getRange: () => getPresetRange(id),
    }));
  }, [customPresets, showPresets, translations?.presetLabels]);
  const normalizedMin = normalizeDate(minDate);
  const normalizedMax = normalizeDate(maxDate);
  const isMobileLayout = useIsDatePickerMobileLayout();
  const isWideLayout = useIsWideDatePickerLayout();
  const calendarMonths = isMobileLayout ? 1 : isWideLayout ? 2 : 1;
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<DateRange | undefined>(value);
  const [displayedMonth, setDisplayedMonth] = React.useState(() => value?.from ?? new Date());
  const appliedRef = React.useRef<DateRange | undefined>(value);
  const wasOpenRef = React.useRef(false);
  const useApplyFlow = !!onApply;
  const idScope = React.useId();
  const startInputId = `date-range-start-${idScope}`;
  const endInputId = `date-range-end-${idScope}`;

  React.useEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = open;

    if (open && !wasOpen) {
      appliedRef.current = value;
      setDraft(value);
      setDisplayedMonth(value?.from ?? new Date());
    } else if (open && wasOpen) {
      setDraft(value);
    }
  }, [open, value]);

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!next && open && !useApplyFlow) {
        onChange(appliedRef.current);
        setDraft(appliedRef.current);
      }
      setOpen(next);
    },
    [open, useApplyFlow, onChange],
  );

  const formatOpts = React.useMemo(() => (locale ? { locale } : undefined), [locale]);

  const label = React.useMemo(
    () => formatRangeLabel(value, effectivePlaceholder, formatOpts),
    [effectivePlaceholder, value, formatOpts],
  );

  const [inputText, setInputText] = React.useState(label);
  const inputFocusedRef = React.useRef(false);

  React.useEffect(() => {
    if (!inputFocusedRef.current) setInputText(label);
  }, [label]);

  const handleInputBlur = () => {
    inputFocusedRef.current = false;
    const next = parseInputToRange(inputText);
    if (next) {
      const formatted =
        next.from && next.to
          ? `${format(next.from, DISPLAY_FORMAT, formatOpts)} \u2013 ${format(next.to, DISPLAY_FORMAT, formatOpts)}`
          : next.from
            ? format(next.from, DISPLAY_FORMAT, formatOpts)
            : effectivePlaceholder;

      if (useApplyFlow) {
        setDraft(next);
        setInputText(formatted);
      } else {
        onChange(next);
        setInputText(formatted);
      }
    } else {
      setInputText(label);
    }
  };

  const disabledMatchers = React.useMemo(() => {
    const toStartOfDay = (d: Date) => {
      const copy = new Date(d);
      copy.setHours(0, 0, 0, 0);
      return copy.getTime();
    };
    const matchers: Array<unknown> = [];
    if (normalizedMin) {
      matchers.push((date: Date) => toStartOfDay(date) < toStartOfDay(normalizedMin!));
    }
    if (normalizedMax) {
      matchers.push((date: Date) => toStartOfDay(date) > toStartOfDay(normalizedMax!));
    }
    if (isDateDisabled) {
      matchers.push((date: Date) => isDateDisabled(date));
    }
    return matchers as unknown as import('react-day-picker').Matcher[];
  }, [normalizedMin, normalizedMax, isDateDisabled]);

  const isEmpty = !value?.from;

  const handlePreset = (getRange: () => DateRange) => {
    const range = getRange();
    setDraft(range);
    if (!useApplyFlow) {
      onChange(range);
    }
  };

  const handleApply = () => {
    if (useApplyFlow) {
      onChange(draft);
      onApply?.(draft);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    if (useApplyFlow) {
      setDraft(appliedRef.current);
    } else {
      onChange(appliedRef.current);
      setDraft(appliedRef.current);
    }
    setOpen(false);
  };

  const handleSelect = (_next: DateRange | undefined, triggerDate: Date) => {
    const day = normalizeDate(triggerDate);
    if (!day) return;

    setDraft((prev) => {
      if (!prev?.from || (prev.from && prev.to)) {
        const nextRange = { from: day, to: undefined };
        if (!useApplyFlow) onChange(nextRange);
        return nextRange;
      }

      if (day < prev.from) {
        const nextRange = { from: day, to: undefined };
        if (!useApplyFlow) onChange(nextRange);
        return nextRange;
      }

      const nextRange = { from: prev.from, to: day };
      if (!useApplyFlow) onChange(nextRange);
      return nextRange;
    });
  };

  const [startInputText, setStartInputText] = React.useState('');
  const [endInputText, setEndInputText] = React.useState('');

  React.useEffect(() => {
    if (open) {
      setStartInputText(draft?.from ? format(draft.from, INPUT_FORMAT) : '');
      setEndInputText(draft?.to ? format(draft.to, INPUT_FORMAT) : '');
    }
  }, [open, draft?.from, draft?.to]);

  const commitStartInput = () => {
    const d = parseDate(startInputText);
    if (d) {
      setDraft((prev) => ({
        from: d,
        to: prev?.to && prev.to >= d ? prev.to : undefined,
      }));
    } else {
      setStartInputText(draft?.from ? format(draft.from, INPUT_FORMAT) : '');
    }
  };

  const commitEndInput = () => {
    const d = parseDate(endInputText);
    if (d) {
      setDraft((prev) => ({
        from: prev?.from && prev.from <= d ? prev.from : d,
        to: d,
      }));
    } else {
      setEndInputText(draft?.to ? format(draft.to, INPUT_FORMAT) : '');
    }
  };

  const triggerClassName = cn(
    'flex w-full min-w-[17rem] max-w-full cursor-pointer items-center rounded-lg border border-input bg-background shadow-sm transition-shadow focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/30',
    className,
  );

  const triggerInner = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center border-r border-input/80 bg-muted/40 text-muted-foreground">
        <CalendarIcon className="size-4" aria-hidden="true" />
      </span>
      <Input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onFocus={() => {
          inputFocusedRef.current = true;
        }}
        onBlur={handleInputBlur}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            (e.target as HTMLInputElement).blur();
          }
        }}
        placeholder={effectivePlaceholder}
        data-empty={isEmpty || undefined}
        className={cn(
          'h-10 min-w-0 flex-1 cursor-pointer rounded-l-none border-0 bg-transparent py-2 pl-3 pr-3 text-sm shadow-none focus-visible:ring-0 whitespace-nowrap',
          isEmpty && 'text-muted-foreground',
        )}
        title={!isEmpty ? inputText : undefined}
        aria-label={t.ariaLabel}
      />
    </>
  );

  const dateFieldsAndCalendar = (
    <div className="flex w-full flex-col gap-4">
      <div
        className={cn(
          'grid w-full grid-cols-1 gap-3 rounded-lg border border-border/70 bg-muted/20 p-3 sm:grid-cols-2',
          calendarMonths === 2 ? 'max-w-none' : 'max-w-md',
        )}
      >
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor={startInputId} className="text-xs font-medium text-muted-foreground">
            {t.startLabel}
          </label>
          <Input
            id={startInputId}
            type="text"
            value={startInputText}
            onChange={(e) => setStartInputText(e.target.value)}
            onBlur={commitStartInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                commitStartInput();
              }
            }}
            placeholder={effectivePlaceholder}
            className="h-9 bg-background font-mono text-sm tabular-nums"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor={endInputId} className="text-xs font-medium text-muted-foreground">
            {t.endLabel}
          </label>
          <Input
            id={endInputId}
            type="text"
            value={endInputText}
            onChange={(e) => setEndInputText(e.target.value)}
            onBlur={commitEndInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                commitEndInput();
              }
            }}
            placeholder={effectivePlaceholder}
            className="h-9 bg-background font-mono text-sm tabular-nums"
          />
        </div>
      </div>
      <div className="flex w-full justify-center rounded-lg border border-border/60 bg-card p-1 shadow-sm">
        <Calendar
          mode="range"
          numberOfMonths={calendarMonths}
          month={displayedMonth}
          onMonthChange={setDisplayedMonth}
          selected={draft}
          onSelect={handleSelect}
          disabled={disabledMatchers}
          locale={locale}
          className={cn(calendarMonths === 2 && 'p-2')}
        />
      </div>
    </div>
  );

  const actionFooter = (extraClassName?: string) =>
    (useApplyFlow || isMobileLayout) && (
      <div
        className={cn(
          'flex w-full items-center justify-end gap-2 border-t border-border/80 bg-muted/15 px-4 py-3',
          isMobileLayout &&
            'mt-auto shrink-0 bg-background pb-[max(1rem,env(safe-area-inset-bottom))] pt-4',
          extraClassName,
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn(isMobileLayout && 'min-h-10 flex-1 sm:min-h-9 sm:flex-initial')}
          onClick={handleCancel}
        >
          {t.cancelButton}
        </Button>
        <Button
          type="button"
          size="sm"
          className={cn(isMobileLayout && 'min-h-10 flex-1 sm:min-h-9 sm:flex-initial')}
          onClick={handleApply}
        >
          {t.applyButton}
        </Button>
      </div>
    );

  const triggerShell = (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen((o) => !o);
        }
      }}
      className={triggerClassName}
    >
      {triggerInner}
    </div>
  );

  if (isMobileLayout) {
    return (
      <>
        {triggerShell}
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent
            showCloseButton
            className={cn(
              'h-dvh max-h-dvh w-full max-w-full gap-0 rounded-none border-0 p-0 shadow-lg',
              'top-0 left-0 flex translate-x-0 translate-y-0 flex-col',
            )}
            overlayClassName="z-110"
          >
            <DialogHeader className="shrink-0 items-start border-b border-border px-4 py-4 text-left">
              <DialogTitle className="pr-10 text-left text-base">{t.ariaLabel}</DialogTitle>
            </DialogHeader>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              {presetList.length > 0 && (
                <div className="shrink-0 border-b border-border/80 bg-muted/25 px-2 py-2">
                  <div className="flex gap-1 overflow-x-auto overscroll-x-contain px-1 py-1 [scrollbar-width:thin] [-webkit-overflow-scrolling:touch]">
                    {presetList.map((preset) => {
                      const active = rangesMatch(draft, preset.getRange());
                      return (
                        <Button
                          key={preset.id}
                          type="button"
                          variant="ghost"
                          size="sm"
                          className={cn(
                            'h-9 shrink-0 whitespace-nowrap rounded-md px-2.5 text-sm font-normal',
                            active && 'bg-accent font-medium text-accent-foreground',
                          )}
                          onClick={() => handlePreset(preset.getRange)}
                        >
                          {preset.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4">
                <div className="mx-auto flex w-full max-w-md flex-col items-center">
                  {dateFieldsAndCalendar}
                </div>
              </div>
              {actionFooter()}
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  const presetSidebar = presetList.length > 0 && (
    <div
      className={cn(
        'shrink-0 border-border/80 bg-muted/25',
        isMobileLayout ? 'border-b' : 'w-[11.5rem] border-r',
      )}
    >
      <div
        className={cn(
          isMobileLayout
            ? 'flex gap-1 overflow-x-auto overscroll-x-contain px-2 py-2 [scrollbar-width:thin]'
            : 'flex max-h-[min(420px,70vh)] flex-col gap-0.5 overflow-y-auto p-2 [scrollbar-width:thin]',
        )}
      >
        {!isMobileLayout ? (
          <p className="px-2 pb-1 pt-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
            {t.presetsHeading}
          </p>
        ) : null}
        {presetList.map((preset) => {
          const active = rangesMatch(draft, preset.getRange());
          return (
            <Button
              key={preset.id}
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                'h-9 shrink-0 justify-start rounded-md px-2.5 text-left text-sm font-normal',
                isMobileLayout && 'whitespace-nowrap',
                !isMobileLayout && 'w-full',
                active && 'bg-accent font-medium text-accent-foreground',
              )}
              onClick={() => handlePreset(preset.getRange)}
            >
              {preset.label}
            </Button>
          );
        })}
      </div>
    </div>
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>{triggerShell}</PopoverTrigger>
      <PopoverContent
        className={cn(
          'w-auto max-w-[min(calc(100vw-1.5rem),52rem)] overflow-hidden rounded-xl border-border/80 p-0 shadow-lg',
          calendarMonths === 2 && 'min-w-[36rem]',
        )}
        align="start"
        sideOffset={8}
      >
        <div className="flex flex-col sm:flex-row">
          {presetSidebar}
          <div className="flex min-w-0 flex-1 flex-col bg-background">
            <div className="flex w-full flex-col items-stretch p-4">{dateFieldsAndCalendar}</div>
            {actionFooter()}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export type { DateRange } from 'react-day-picker';
export type {
  DateRangePickerPreset,
  DateRangePickerProps,
  DateRangePickerTranslations,
  DefaultPresetId,
} from './types';
