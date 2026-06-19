import type { Meta, StoryObj } from '@storybook/react';
import { CtaBanner } from './CtaBanner';

const meta = {
  title: 'Marketing/CtaBanner',
  component: CtaBanner,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CtaBanner>;

export default meta;
type Story = StoryObj<typeof CtaBanner>;

export const Gradient: Story = {
  render: () => (
    <CtaBanner
      variant="gradient"
      title="Ready to ship your next launch page?"
      description="Start from the template, swap copy, and publish in minutes."
      primaryAction={{ label: 'Start now', href: '#' }}
      secondaryAction={{ label: 'Talk to us', href: '#' }}
    />
  ),
};

export const Solid: Story = {
  render: () => (
    <CtaBanner
      variant="solid"
      title="Join the waitlist"
      description="We’ll notify you when new blocks drop."
      primaryAction={{ label: 'Subscribe', href: '#' }}
      secondaryAction={{ label: 'No thanks', href: '#' }}
    />
  ),
};
