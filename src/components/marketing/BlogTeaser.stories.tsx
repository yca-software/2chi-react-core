import type { Meta, StoryObj } from '@storybook/react';
import { BlogTeaser } from './BlogTeaser';

const meta = {
  title: 'Marketing/BlogTeaser',
  component: BlogTeaser,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof BlogTeaser>;

export default meta;
type Story = StoryObj<typeof BlogTeaser>;

export const Default: Story = {
  render: () => (
    <BlogTeaser
      eyebrow="Journal"
      title="Latest from the blog"
      posts={[
        {
          title: 'Shipping static sites faster',
          excerpt: 'Why Astro plus a shared design system beats one-off landing page repos.',
          date: 'Mar 12, 2026',
          href: '#',
          image: {
            src: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
            alt: 'Laptop',
          },
        },
        {
          title: 'Motion without the bundle cost',
          excerpt: 'CSS-first effects that respect reduced motion.',
          date: 'Feb 28, 2026',
          href: '#',
        },
        {
          title: 'Design tokens in the real world',
          excerpt: 'Keeping marketing and product visually aligned.',
          date: 'Feb 1, 2026',
          href: '#',
        },
      ]}
    />
  ),
};
