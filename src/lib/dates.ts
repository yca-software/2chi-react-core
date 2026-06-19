import type { DateRange } from 'react-day-picker';

/** Display format for calendar trigger labels (e.g. Jan 09, 2026). */
export const DISPLAY_FORMAT = 'LLL dd, y';

/** Format for typing in date inputs (e.g. 2026/03/01). */
export const INPUT_FORMAT = 'yyyy/MM/dd';

export const INPUT_FORMAT_ALT = 'yyyy-MM-dd';

export function normalizeDate(d: Date | undefined | null): Date | undefined {
  if (!d) return undefined;
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

/** Latest selectable calendar day (start of today, local timezone). */
export function getMaxSelectableDate(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

/** `max` attribute for native `<input type="date">` (today, local). */
export function getMaxSelectableDateInputValue(): string {
  const d = getMaxSelectableDate();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Cap an optional max date to today (reporting / historical filters). */
export function capMaxSelectableDate(maxDate?: Date): Date {
  const today = getMaxSelectableDate();
  if (!maxDate) return today;
  const normalized = new Date(maxDate);
  normalized.setHours(0, 0, 0, 0);
  return normalized.getTime() > today.getTime() ? today : normalized;
}

export function getDefaultLast7DaysRange(): DateRange {
  const today = new Date();
  const end = new Date(today);
  end.setHours(0, 0, 0, 0);
  const start = new Date(end);
  start.setDate(end.getDate() - 6);
  return { from: start, to: end };
}

export function toStartOfDay(date: Date | undefined): Date | undefined {
  if (!date) return undefined;
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function toEndOfDay(date: Date | undefined): Date | undefined {
  if (!date) return undefined;
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}
