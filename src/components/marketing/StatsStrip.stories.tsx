import type { Meta, StoryObj } from '@storybook/react';
import { StatsStrip } from './StatsStrip';

const meta = {
  title: 'Marketing/StatsStrip',
  component: StatsStrip,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatsStrip>;

export default meta;
type Story = StoryObj<typeof StatsStrip>;

export const Default: Story = {
  render: () => (
    <StatsStrip
      stats={[
        { value: '99.9%', label: 'Uptime' },
        { value: '50+', label: 'Templates' },
        { value: '10k+', label: 'Deploys' },
        { value: '24/7', label: 'Support' },
      ]}
    />
  ),
};
