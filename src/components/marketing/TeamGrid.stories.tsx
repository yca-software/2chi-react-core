import type { Meta, StoryObj } from '@storybook/react';
import { TeamGrid } from './TeamGrid';

const meta = {
  title: 'Marketing/TeamGrid',
  component: TeamGrid,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof TeamGrid>;

export default meta;
type Story = StoryObj<typeof TeamGrid>;

const img = (seed: string) => `https://images.unsplash.com/photo-${seed}?w=400&h=500&fit=crop`;

export const Default: Story = {
  render: () => (
    <TeamGrid
      eyebrow="Team"
      title="People behind the product"
      members={[
        {
          name: 'Alex Rivera',
          role: 'CEO',
          image: { src: img('1472099645785-5658abf4ff4e'), alt: 'Alex' },
        },
        {
          name: 'Sam Chen',
          role: 'Design',
          image: { src: img('1507003211169-0a1dd7228f2d'), alt: 'Sam' },
        },
        {
          name: 'Jordan Lee',
          role: 'Engineering',
          href: '#',
        },
      ]}
    />
  ),
};
