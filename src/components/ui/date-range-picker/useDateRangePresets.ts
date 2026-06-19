import type { DateRange } from 'react-day-picker';

import type { DefaultPresetId } from './types';

export function getPresetRange(presetId: DefaultPresetId): DateRange {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const from = new Date(today);
  from.setHours(0, 0, 0, 0);
  const to = new Date(today);

  switch (presetId) {
    case 'today':
      return { from, to };
    case 'yesterday':
      from.setDate(from.getDate() - 1);
      to.setDate(to.getDate() - 1);
      return { from, to };
    case 'last7':
      from.setDate(from.getDate() - 6);
      return { from, to };
    case 'last14':
      from.setDate(from.getDate() - 13);
      return { from, to };
    case 'last30':
      from.setDate(from.getDate() - 29);
      return { from, to };
    case 'thisWeek': {
      const day = from.getDay();
      const mondayOffset = day === 0 ? -6 : 1 - day;
      from.setDate(from.getDate() + mondayOffset);
      return { from, to };
    }
    case 'lastWeek': {
      const day = from.getDay();
      const mondayOffset = day === 0 ? -6 : 1 - day;
      const thisMonday = from.getDate() + mondayOffset;
      from.setDate(thisMonday - 7);
      to.setDate(thisMonday - 1);
      to.setHours(23, 59, 59, 999);
      return { from, to };
    }
    case 'thisMonth':
      from.setDate(1);
      return { from, to };
    case 'lastMonth':
      from.setMonth(from.getMonth() - 1);
      from.setDate(1);
      to.setDate(0);
      to.setHours(23, 59, 59, 999);
      return { from, to };
    default:
      return { from, to };
  }
}
