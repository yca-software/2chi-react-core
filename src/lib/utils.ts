import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution.
 * Combines clsx for conditional classes and tailwind-merge for deduplication.
 *
 * @param inputs - Class values (strings, objects, arrays, etc.)
 * @returns Merged class string
 *
 * @example
 * ```tsx
 * cn("base-class", condition && "conditional-class", { "active": isActive })
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Maps language codes (ISO 639-1) to flag emojis.
 * Returns a default globe emoji for unmapped languages.
 *
 * @param langCode - Two-letter language code (e.g., "en", "tr", "fr")
 * @returns Flag emoji string
 *
 * @example
 * ```tsx
 * getFlagEmoji("en") // "🇬🇧"
 * getFlagEmoji("tr") // "🇹🇷"
 * getFlagEmoji("xx") // "🌐" (default)
 * ```
 */
export function getFlagEmoji(langCode: string): string {
  const flagMap: Record<string, string> = {
    en: '🇬🇧',
    tr: '🇹🇷',
    fr: '🇫🇷',
    es: '🇪🇸',
    de: '🇩🇪',
    it: '🇮🇹',
    pt: '🇵🇹',
    ru: '🇷🇺',
    ja: '🇯🇵',
    zh: '🇨🇳',
    ko: '🇰🇷',
    ar: '🇸🇦',
    hi: '🇮🇳',
    nl: '🇳🇱',
    pl: '🇵🇱',
    sv: '🇸🇪',
    da: '🇩🇰',
    fi: '🇫🇮',
    no: '🇳🇴',
    cs: '🇨🇿',
    ro: '🇷🇴',
    hu: '🇭🇺',
    el: '🇬🇷',
    he: '🇮🇱',
    th: '🇹🇭',
    vi: '🇻🇳',
    id: '🇮🇩',
    ms: '🇲🇾',
  };
  return flagMap[langCode] || '🌐';
}
