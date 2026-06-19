import type { Meta, StoryObj } from '@storybook/react';
import { Testimonial } from './Testimonial';

const meta = {
  title: 'Marketing/Testimonial',
  component: Testimonial,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Testimonial>;

export default meta;
type Story = StoryObj<typeof Testimonial>;

export const Default: Story = {
  render: () => (
    <Testimonial
      quote="This stack cut our time-to-page in half. We finally have marketing and product speaking the same design language."
      attribution="Alex Morgan"
      role="VP Product, Example Co."
      avatar={{
        src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop',
        alt: 'Alex Morgan',
      }}
    />
  ),
};

export const WithLogo: Story = {
  render: () => (
    <Testimonial
      quote="We shipped three campaigns in a week using the same blocks across landing and blog."
      attribution="Jamie Lee"
      role="Marketing Lead"
      logo={{
        src: 'https://cdn.simpleicons.org/vercel/000000',
        alt: 'Company',
      }}
    />
  ),
};
