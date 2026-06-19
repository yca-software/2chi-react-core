import { format, parse } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { DISPLAY_FORMAT, INPUT_FORMAT, INPUT_FORMAT_ALT, normalizeDate } from '../../../lib/dates';

export function rangesMatch(a: DateRange | undefined, b: DateRange): boolean {
  const af = normalizeDate(a?.from)?.getTime();
  const at = normalizeDate(a?.to)?.getTime();
  const bf = normalizeDate(b.from)?.getTime();
  const bt = normalizeDate(b.to)?.getTime();
  return af === bf && at === bt;
}

export function parseDate(part: string): Date | null {
  const p = part.trim();
  if (!p) return null;
  const ref = new Date();
  for (const fmt of [INPUT_FORMAT, INPUT_FORMAT_ALT, DISPLAY_FORMAT]) {
    try {
      const d = parse(p, fmt, ref);
      if (!Number.isNaN(d.getTime())) return d;
    } catch {
      // try next format
    }
  }
  return null;
}

export function parseInputToRange(text: string): DateRange | null {
  const trimmed = text.trim();
  if (!trimmed) return { from: undefined, to: undefined };
  const parts = trimmed.split(/\s*[–-]\s*/).map((p) => p.trim());
  try {
    if (parts.length >= 2) {
      const from = parseDate(parts[0]!);
      const to = parseDate(parts[1]!);
      if (from && to) return { from, to };
      if (from) return { from, to: undefined };
    } else if (parts.length === 1 && parts[0]) {
      const from = parseDate(parts[0]);
      if (from) return { from, to: undefined };
    }
  } catch {
    // ignore
  }
  return null;
}

export function formatRangeLabel(
  value: DateRange | undefined,
  placeholder: string,
  formatOpts: { locale?: import('date-fns').Locale } | undefined,
): string {
  const from = value?.from;
  const to = value?.to;

  if (from && to) {
    return `${format(from, DISPLAY_FORMAT, formatOpts)} \u2013 ${format(to, DISPLAY_FORMAT, formatOpts)}`;
  }

  if (from) {
    return format(from, DISPLAY_FORMAT, formatOpts);
  }

  return placeholder;
}

export { DISPLAY_FORMAT, INPUT_FORMAT, normalizeDate };
