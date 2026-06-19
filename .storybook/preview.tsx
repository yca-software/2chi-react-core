import type { Preview } from '@storybook/react-vite';
import type React from 'react';
import { ThemeProvider } from '../src/components/ThemeProvider';
import { useThemeStore } from '../src/storybook/theme-store';
import '../src/storybook.css';

const withThemeProvider = (Story: React.ComponentType) => {
  return (
    <ThemeProvider useThemeStore={useThemeStore}>
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withThemeProvider],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
