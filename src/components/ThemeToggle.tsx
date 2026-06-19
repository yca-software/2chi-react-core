import { Moon, Sun } from 'lucide-react';
import type { ThemeStore } from './ThemeProvider';
import { useDefaultThemeStore, useThemeStoreContext } from './ThemeProvider';
import { Button } from './ui/button';

/**
 * Props for the ThemeToggle component.
 */
export interface ThemeToggleProps {
  /** Hook function that returns the theme store (e.g., from Zustand) */
  useThemeStore?: () => ThemeStore;
  /** Accessible label for the toggle button */
  ariaLabel?: string;
}

function ThemeToggleWithStore({
  useThemeStore,
  ariaLabel,
}: {
  useThemeStore: () => ThemeStore;
  ariaLabel: string;
}) {
  const { theme, setTheme } = useThemeStore();
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      className="cursor-pointer"
    >
      {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}

function ThemeToggleWithContext({ ariaLabel }: { ariaLabel: string }) {
  const fromContext = useThemeStoreContext();
  const defaultStore = useDefaultThemeStore();
  const store = fromContext ?? defaultStore;
  const toggleTheme = () => store.setTheme(store.theme === 'dark' ? 'light' : 'dark');
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      className="cursor-pointer"
    >
      {store.theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}

/**
 * Theme toggle button component.
 * Displays a sun icon in dark mode and moon icon in light mode.
 * Toggles between light and dark themes when clicked.
 * When useThemeStore is passed, uses that store; otherwise uses ThemeProvider context or internal default (no conditional hook calls).
 *
 * @example
 * ```tsx
 * const useThemeStore = () => {
 *   const theme = useStore((state) => state.theme);
 *   const setTheme = useStore((state) => state.setTheme);
 *   return { theme, setTheme };
 * };
 *
 * <ThemeToggle useThemeStore={useThemeStore} ariaLabel="Toggle theme" />
 * ```
 */
export function ThemeToggle({
  useThemeStore: useThemeStoreProp,
  ariaLabel = 'Toggle theme',
}: ThemeToggleProps) {
  if (useThemeStoreProp) {
    return <ThemeToggleWithStore useThemeStore={useThemeStoreProp} ariaLabel={ariaLabel} />;
  }
  return <ThemeToggleWithContext ariaLabel={ariaLabel} />;
}
