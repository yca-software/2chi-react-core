import type { Meta, StoryObj } from '@storybook/react';
import { HeroSplit } from './HeroSplit';

const meta = {
  title: 'Marketing/HeroSplit',
  component: HeroSplit,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroSplit>;

export default meta;
type Story = StoryObj<typeof HeroSplit>;

const sampleImg = 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80';

export const Default: Story = {
  render: () => (
    <HeroSplit
      subtitle="Product studio"
      title="Ship landing pages that feel bespoke"
      description="Composable blocks, static-first Astro, and a shared design system—without reinventing the wheel."
      image={{ src: sampleImg, alt: 'Team collaborating' }}
      primaryAction={{ label: 'Get started', href: '#' }}
      secondaryAction={{ label: 'View demo', href: '#' }}
    />
  ),
};

export const WithoutDecorative: Story = {
  render: () => (
    <HeroSplit
      decorative={false}
      title="Minimal hero split"
      description="No gradient backdrop or float animation on media."
      image={{ src: sampleImg, alt: 'Office' }}
      primaryAction={{ label: 'CTA', href: '#' }}
    />
  ),
};
