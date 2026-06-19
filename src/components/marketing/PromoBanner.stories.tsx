import type { Meta, StoryObj } from '@storybook/react';
import { PromoBanner } from './PromoBanner';

const meta = {
  title: 'Marketing/PromoBanner',
  component: PromoBanner,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof PromoBanner>;

export default meta;
type Story = StoryObj<typeof PromoBanner>;

export const WithLink: Story = {
  render: () => (
    <PromoBanner href="#" linkLabel="Details">
      New: marketing blocks with depth utilities—see the changelog.
    </PromoBanner>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <PromoBanner dismissible href="#" linkLabel="View">
      Limited offer: audit your landing page structure with our checklist.
    </PromoBanner>
  ),
};
