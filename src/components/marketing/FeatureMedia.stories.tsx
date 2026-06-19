import type { Meta, StoryObj } from '@storybook/react';
import { FeatureMedia } from './FeatureMedia';

const meta = {
  title: 'Marketing/FeatureMedia',
  component: FeatureMedia,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeatureMedia>;

export default meta;
type Story = StoryObj<typeof FeatureMedia>;

const img = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80';

export const ImageLeft: Story = {
  render: () => (
    <div className="container mx-auto max-w-6xl px-4">
      <FeatureMedia
        eyebrow="Workflow"
        title="From idea to launch in one pipeline"
        description="Static pages, SEO metadata, and reusable React sections—tuned for teams who ship often."
        image={{ src: img, alt: 'Analytics dashboard' }}
        imagePosition="left"
      />
    </div>
  ),
};

export const ImageRight: Story = {
  render: () => (
    <div className="container mx-auto max-w-6xl px-4">
      <FeatureMedia
        title="Built for performance"
        description="Lean bundles, accessible defaults, and tokens that stay consistent across apps."
        image={{ src: img, alt: 'Performance' }}
        imagePosition="right"
      />
    </div>
  ),
};
