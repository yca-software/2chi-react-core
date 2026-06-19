import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from './Navigation';

const mockLogo = (
  <div className="flex items-center gap-2">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
      Y
    </div>
    <span className="font-semibold">YCA Software</span>
  </div>
);

const meta = {
  title: 'Marketing/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  render: () => (
    <Navigation
      logo={mockLogo}
      links={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '/contact' },
      ]}
    />
  ),
};

export const WithCTA: Story = {
  render: () => (
    <Navigation
      logo={mockLogo}
      links={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
      ]}
      cta={{ label: 'Get Started', href: '/signup' }}
    />
  ),
};

export const Minimal: Story = {
  render: () => <Navigation logo={mockLogo} links={[{ label: 'Home', href: '/' }]} />,
};
