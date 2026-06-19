import { describe, expect, it } from 'vitest';
import { filterSelectOptions, isSelectSearchable } from './select-search';

describe('filterSelectOptions', () => {
  const options = [
    { value: '1', label: 'Alpha Bar' },
    { value: '2', label: 'Beta Pub' },
  ];

  it('returns all options when query is empty', () => {
    expect(filterSelectOptions(options, '')).toEqual(options);
    expect(filterSelectOptions(options, '   ')).toEqual(options);
  });

  it('filters case-insensitively by label', () => {
    expect(filterSelectOptions(options, 'beta')).toEqual([options[1]]);
  });
});

describe('isSelectSearchable', () => {
  it('auto-enables at the threshold', () => {
    expect(isSelectSearchable(9)).toBe(false);
    expect(isSelectSearchable(10)).toBe(true);
  });

  it('respects explicit overrides', () => {
    expect(isSelectSearchable(3, true)).toBe(true);
    expect(isSelectSearchable(20, false)).toBe(false);
  });
});
