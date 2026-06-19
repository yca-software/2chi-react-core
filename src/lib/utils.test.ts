import { describe, expect, it } from 'vitest';
import { cn, getFlagEmoji } from './utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', true && 'visible')).toBe('base visible');
  });

  it('deduplicates conflicting Tailwind classes', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
});

describe('getFlagEmoji', () => {
  it('returns flag for known language codes', () => {
    expect(getFlagEmoji('en')).toBe('🇬🇧');
    expect(getFlagEmoji('tr')).toBe('🇹🇷');
    expect(getFlagEmoji('fr')).toBe('🇫🇷');
  });

  it('returns globe for unknown codes', () => {
    expect(getFlagEmoji('xx')).toBe('🌐');
  });
});
