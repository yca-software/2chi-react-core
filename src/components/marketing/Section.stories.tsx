import type { Meta, StoryObj } from '@storybook/react';
import { Shield, Zap } from 'lucide-react';
import { Section } from './Section';
import { ServiceCard } from './ServiceCard';

const meta = {
  title: 'Marketing/Section',
  component: Section,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: () => (
    <Section title="Features" description="Everything you need to get started.">
      <p>Section content goes here.</p>
    </Section>
  ),
};

export const WithSubtitle: Story = {
  render: () => (
    <Section
      subtitle="Our Services"
      title="What We Offer"
      description="Comprehensive solutions for your business needs."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ServiceCard
          title="Service 1"
          description="Description for service 1"
          icon={<Zap className="h-6 w-6" />}
        />
        <ServiceCard
          title="Service 2"
          description="Description for service 2"
          icon={<Shield className="h-6 w-6" />}
        />
      </div>
    </Section>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Section>
      <p>Section with no title or description, just content.</p>
    </Section>
  ),
};
