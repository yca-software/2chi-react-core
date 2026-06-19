import { create } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = 'storybook-theme';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem(STORAGE_KEY);
  return (saved === 'dark' ? 'dark' : 'light') as 'light' | 'dark';
};

if (typeof window !== 'undefined') {
  const initialTheme = getInitialTheme();
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(initialTheme);
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      localStorage.setItem(STORAGE_KEY, theme);
    }
  },
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);
        localStorage.setItem(STORAGE_KEY, newTheme);
      }
      return { theme: newTheme };
    }),
}));
