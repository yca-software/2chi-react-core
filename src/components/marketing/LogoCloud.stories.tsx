import type { Meta, StoryObj } from '@storybook/react';
import { LogoCloud } from './LogoCloud';

const meta = {
  title: 'Marketing/LogoCloud',
  component: LogoCloud,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LogoCloud>;

export default meta;
type Story = StoryObj<typeof LogoCloud>;

const logos = [
  { src: 'https://cdn.simpleicons.org/react/0891b2', alt: 'React' },
  { src: 'https://cdn.simpleicons.org/astro/ff5d01', alt: 'Astro' },
  { src: 'https://cdn.simpleicons.org/typescript/3178c6', alt: 'TypeScript' },
  { src: 'https://cdn.simpleicons.org/tailwindcss/06b6d4', alt: 'Tailwind' },
];

export const Default: Story = {
  render: () => <LogoCloud title="Trusted by teams shipping with modern stacks" logos={logos} />,
};
