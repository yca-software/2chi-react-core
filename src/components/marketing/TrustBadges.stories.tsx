import type { Meta, StoryObj } from '@storybook/react';
import { Lock, Shield, Zap } from 'lucide-react';
import { TrustBadges } from './TrustBadges';

const meta = {
  title: 'Marketing/TrustBadges',
  component: TrustBadges,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof TrustBadges>;

export default meta;
type Story = StoryObj<typeof TrustBadges>;

export const Default: Story = {
  render: () => (
    <TrustBadges
      title="Trusted & secure"
      items={[
        { label: 'SOC2-ready practices', icon: <Shield aria-hidden /> },
        { label: 'Encryption in transit', icon: <Lock aria-hidden /> },
        { label: '99.9% uptime target', icon: <Zap aria-hidden /> },
      ]}
    />
  ),
};
