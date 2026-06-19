import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './link';

const meta = {
  title: 'UI/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  render: () => (
    <div className="space-y-2">
      <p>
        This is a <Link to="/about">link to about page</Link> in the middle of text.
      </p>
      <p>
        <Link to="/contact">Contact us</Link> for more information.
      </p>
    </div>
  ),
};

export const External: Story = {
  render: () => (
    <div className="space-y-2">
      <p>
        Visit our{' '}
        <Link to="https://example.com" external>
          external website
        </Link>
        .
      </p>
      <p>
        Check out{' '}
        <Link to="https://github.com" external>
          GitHub
        </Link>{' '}
        for more.
      </p>
    </div>
  ),
};

export const Standalone: Story = {
  render: () => (
    <div className="space-y-4">
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="https://example.com" external>
        External Link
      </Link>
    </div>
  ),
};
