import React, { useEffect, useState } from 'react';

/**
 * Theme store interface for theme state management.
 */
export interface ThemeStore {
  /** Current theme mode */
  theme: 'light' | 'dark';
  /** Function to update theme */
  setTheme: (theme: 'light' | 'dark') => void;
}

/** Default in-memory theme store when no external store is provided. */
export function useDefaultThemeStore(): ThemeStore {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return { theme, setTheme };
}

const ThemeStoreContext = React.createContext<ThemeStore | null>(null);

/** Hook to read theme store from ThemeProvider context. */
export function useThemeStoreContext(): ThemeStore | null {
  return React.useContext(ThemeStoreContext);
}

/**
 * Props for the ThemeProvider component.
 */
export interface ThemeProviderProps {
  /** Child components */
  children: React.ReactNode;
  /** Hook function that returns the theme store (e.g., from Zustand) */
  useThemeStore?: () => ThemeStore;
}

/**
 * Theme provider component that applies theme classes to the document root.
 * Works with any state management solution via the `useThemeStore` prop.
 * When `useThemeStore` is not provided, uses an internal default store so hooks are always called unconditionally.
 *
 * @example
 * ```tsx
 * // With Zustand
 * const useThemeStore = () => {
 *   const theme = useStore((state) => state.theme);
 *   const setTheme = useStore((state) => state.setTheme);
 *   return { theme, setTheme };
 * };
 *
 * <ThemeProvider useThemeStore={useThemeStore}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children, useThemeStore: useThemeStoreProp }: ThemeProviderProps) {
  const useResolvedStore = useThemeStoreProp ?? useDefaultThemeStore;
  const store = useResolvedStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(store.theme);
  }, [store.theme]);

  return <ThemeStoreContext.Provider value={store}>{children}</ThemeStoreContext.Provider>;
}
