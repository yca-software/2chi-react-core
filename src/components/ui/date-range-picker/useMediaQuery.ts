import * as React from 'react';

import { DATE_RANGE_MOBILE_MQ, DATE_RANGE_WIDE_MQ } from './constants';

export function useMediaQuery(query: string, fallback = false): boolean {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}

export function useIsDatePickerMobileLayout(): boolean {
  return useMediaQuery(DATE_RANGE_MOBILE_MQ, false);
}

export function useIsWideDatePickerLayout(): boolean {
  return useMediaQuery(DATE_RANGE_WIDE_MQ, false);
}
