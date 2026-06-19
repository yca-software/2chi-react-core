import type { DateRange } from 'react-day-picker';

/** Preset id used when using default presets (for translation keys). */
export type DefaultPresetId =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last14'
  | 'last30'
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth';

/** Labels for action buttons, form fields, and accessibility. Pass translated strings for i18n. */
export interface DateRangePickerTranslations {
  /** Apply/confirm button (e.g. "Apply"). */
  applyButton?: string;
  /** Cancel button (e.g. "Cancel"). */
  cancelButton?: string;
  /** Start date field label (e.g. "Start"). */
  startLabel?: string;
  /** End date field label (e.g. "End"). */
  endLabel?: string;
  /** Placeholder when no range selected (e.g. "Pick a date range"). Shown in trigger and inline inputs. */
  placeholder?: string;
  /** Accessibility label for the date range trigger input (e.g. "Date range"). */
  ariaLabel?: string;
  /** Labels for default presets when presets prop is not provided. Key is DefaultPresetId. */
  presetLabels?: Partial<Record<DefaultPresetId, string>>;
  /** Sidebar heading above preset buttons (e.g. "Quick ranges"). */
  presetsHeading?: string;
}

/** A selectable preset range. Use for custom or translated presets. */
export interface DateRangePickerPreset {
  id: string;
  label: string;
  getRange: () => DateRange;
}

export interface DateRangePickerProps {
  value: DateRange | undefined;
  onChange: (value: DateRange | undefined) => void;
  /** Minimum selectable date (inclusive). Dates before this will be disabled. */
  minDate?: Date;
  /** Maximum selectable date (inclusive). Dates after this will be disabled. */
  maxDate?: Date;
  /** Optional placeholder text when no range is selected. */
  placeholder?: string;
  /**
   * Show preset range buttons. When true and presets is not provided, default presets are shown (use translations.presetLabels to translate).
   * When presets is provided, that array is used. Default true.
   */
  showPresets?: boolean;
  /** Optional preset ranges. When provided, these are shown instead of default presets; labels are your translated strings. */
  presets?: DateRangePickerPreset[];
  /** Translations for action buttons, labels, and default preset names. Pass translated strings for i18n. */
  translations?: DateRangePickerTranslations;
  /** Locale for calendar month names and date formatting (e.g. from date-fns/locale). */
  locale?: import('date-fns').Locale;
  /** Callback when the user applies the selection (clicks Apply). If not set, selection is applied on every calendar change. */
  onApply?: (range: DateRange | undefined) => void;
  /** Optional function to disable specific dates (in addition to min/max). */
  isDateDisabled?: (date: Date) => boolean;
  className?: string;
}

export type PresetListItem = {
  id: string;
  label: string;
  getRange: () => DateRange;
};
