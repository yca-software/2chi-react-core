import { describe, expect, it } from 'vitest';

import {
  capMaxSelectableDate,
  getDefaultLast7DaysRange,
  getMaxSelectableDate,
  getMaxSelectableDateInputValue,
  toEndOfDay,
  toStartOfDay,
} from './dates';

describe('date helpers', () => {
  it('caps future max dates to today', () => {
    const today = getMaxSelectableDate();
    const future = new Date(today);
    future.setDate(future.getDate() + 5);
    expect(capMaxSelectableDate(future).getTime()).toBe(today.getTime());
  });

  it('defaults max to today when omitted', () => {
    expect(capMaxSelectableDate().getTime()).toBe(getMaxSelectableDate().getTime());
  });

  it('formats today for native date inputs', () => {
    const today = getMaxSelectableDate();
    const expected = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    expect(getMaxSelectableDateInputValue()).toBe(expected);
  });

  it('returns last 7 calendar days including today', () => {
    const range = getDefaultLast7DaysRange();
    expect(range.from).toBeDefined();
    expect(range.to).toBeDefined();
    const days = (range.to!.getTime() - range.from!.getTime()) / (24 * 60 * 60 * 1000);
    expect(days).toBe(6);
  });

  it('normalizes start and end of day', () => {
    const date = new Date('2026-06-07T15:30:00');
    expect(toStartOfDay(date)?.getHours()).toBe(0);
    expect(toEndOfDay(date)?.getHours()).toBe(23);
    expect(toEndOfDay(date)?.getMinutes()).toBe(59);
  });
});
