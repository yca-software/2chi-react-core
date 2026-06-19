import { describe, expect, it } from 'vitest';
import { parseDate, parseInputToRange, rangesMatch } from './parseDateRange';
import { getPresetRange } from './useDateRangePresets';

describe('date range parse helpers', () => {
  it('parses yyyy/MM/dd input', () => {
    const d = parseDate('2026/03/01');
    expect(d?.getFullYear()).toBe(2026);
    expect(d?.getMonth()).toBe(2);
    expect(d?.getDate()).toBe(1);
  });

  it('parses range from dash-separated input', () => {
    const range = parseInputToRange('2026/03/01 – 2026/03/15');
    expect(range?.from?.getDate()).toBe(1);
    expect(range?.to?.getDate()).toBe(15);
  });

  it('matches equivalent ranges', () => {
    const from = new Date(2026, 0, 9);
    const to = new Date(2026, 0, 24);
    expect(rangesMatch({ from, to }, { from: new Date(from), to: new Date(to) })).toBe(true);
  });
});

describe('getPresetRange', () => {
  it('returns today with from at start of day', () => {
    const { from, to } = getPresetRange('today');
    expect(from).toBeDefined();
    expect(to).toBeDefined();
    expect(from!.getHours()).toBe(0);
  });

  it('returns last7 spanning 7 days', () => {
    const { from, to } = getPresetRange('last7');
    const diffDays = Math.round((to!.getTime() - from!.getTime()) / (1000 * 60 * 60 * 24));
    expect(diffDays).toBeGreaterThanOrEqual(6);
    expect(diffDays).toBeLessThanOrEqual(7);
  });
});
