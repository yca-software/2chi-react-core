import type { Meta, StoryObj } from '@storybook/react';
import { Rocket, Shield, Zap } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

const meta = {
  title: 'Marketing/ServiceCard',
  component: ServiceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ServiceCard>;

export default meta;
type Story = StoryObj<typeof ServiceCard>;

export const Default: Story = {
  render: () => (
    <ServiceCard
      title="Fast Performance"
      description="Lightning-fast performance for all your applications."
    />
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <ServiceCard
        title="Fast Performance"
        description="Lightning-fast performance for all your applications."
        icon={<Zap className="h-6 w-6" />}
      />
      <ServiceCard
        title="Secure"
        description="Enterprise-grade security for your data."
        icon={<Shield className="h-6 w-6" />}
      />
      <ServiceCard
        title="Scalable"
        description="Grow without limits with our scalable infrastructure."
        icon={<Rocket className="h-6 w-6" />}
      />
    </div>
  ),
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ServiceCard
          key={i}
          title={`Service ${i + 1}`}
          description={`Description for service ${i + 1}. This is a sample service card.`}
          icon={<Zap className="h-6 w-6" />}
        />
      ))}
    </div>
  ),
};
