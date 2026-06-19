import type { DateRangePickerTranslations } from '../components/ui/date-range-picker/types';

function tr(t: (key: string) => string, ns: string, key: string): string {
  return t(`${ns}:${key}`);
}

/**
 * Build `DateRangePickerTranslations` from an i18n `t()` function.
 * Expects keys under `{ns}.dateRange.*` (default namespace: `common`).
 */
export function dateRangePickerTranslations(
  t: (key: string) => string,
  ns = 'common',
): DateRangePickerTranslations {
  const p = (suffix: string) => tr(t, ns, `dateRange.${suffix}`);
  const preset = (id: string) => tr(t, ns, `dateRange.presets.${id}`);

  return {
    applyButton: p('apply'),
    cancelButton: p('cancel'),
    startLabel: p('startDate'),
    endLabel: p('endDate'),
    placeholder: p('placeholder'),
    ariaLabel: p('ariaLabel'),
    presetsHeading: p('presetsHeading'),
    presetLabels: {
      today: preset('today'),
      yesterday: preset('yesterday'),
      last7: preset('last7'),
      last14: preset('last14'),
      last30: preset('last30'),
      thisWeek: preset('thisWeek'),
      lastWeek: preset('lastWeek'),
      thisMonth: preset('thisMonth'),
      lastMonth: preset('lastMonth'),
    },
  };
}
