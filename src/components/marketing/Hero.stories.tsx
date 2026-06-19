import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';

const meta = {
  title: 'Marketing/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  render: () => (
    <Hero
      title="Build amazing products"
      description="Start building your next great idea with our powerful platform."
    />
  ),
};

export const WithSubtitle: Story = {
  render: () => (
    <Hero
      subtitle="Welcome"
      title="Build amazing products"
      description="Start building your next great idea with our powerful platform."
    />
  ),
};

export const WithActions: Story = {
  render: () => (
    <Hero
      title="Get Started Today"
      description="Join thousands of developers building amazing products."
      primaryAction={{ label: 'Get Started', href: '/signup' }}
      secondaryAction={{ label: 'Learn More', href: '/about' }}
    />
  ),
};

export const Minimal: Story = {
  render: () => <Hero title="Simple Hero" />,
};
