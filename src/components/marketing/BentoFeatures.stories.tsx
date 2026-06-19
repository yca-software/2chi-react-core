import type { Meta, StoryObj } from '@storybook/react';
import { LayoutGrid, Shield, Sparkles, Zap } from 'lucide-react';
import { BentoFeatures } from './BentoFeatures';

const meta = {
  title: 'Marketing/BentoFeatures',
  component: BentoFeatures,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BentoFeatures>;

export default meta;
type Story = StoryObj<typeof BentoFeatures>;

export const Default: Story = {
  render: () => (
    <BentoFeatures
      eyebrow="Why us"
      title="Everything you need for a standout page"
      description="Mix and match sections—each block is token-aware and accessible by default."
      cells={[
        {
          title: 'Design system first',
          description: 'Shared primitives so marketing and app UI never drift apart.',
          icon: <LayoutGrid className="size-5" aria-hidden />,
          className: 'md:col-span-2',
        },
        {
          title: 'Fast by default',
          description: 'Static output, lean JS, great Lighthouse scores.',
          icon: <Zap className="size-5" aria-hidden />,
        },
        {
          title: 'Polished motion',
          description: 'CSS-first effects with reduced-motion support.',
          icon: <Sparkles className="size-5" aria-hidden />,
        },
        {
          title: 'Accessible',
          description: 'Semantic structure, focus rings, and contrast-aware tokens.',
          icon: <Shield className="size-5" aria-hidden />,
          className: 'md:col-span-2',
        },
      ]}
    />
  ),
};
