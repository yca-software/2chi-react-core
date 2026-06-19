import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding'),
  ],
  framework: getAbsolutePath('@storybook/react-vite'),
  async viteFinal(config) {
    const plugins = config.plugins ?? [];
    const hasTailwind = plugins.some(
      (p) =>
        typeof p === 'object' &&
        p !== null &&
        'name' in p &&
        (p as { name: string }).name === '@tailwindcss/vite',
    );
    if (!hasTailwind) {
      plugins.push(tailwindcss());
    }
    config.plugins = plugins;
    return config;
  },
};
export default config;
