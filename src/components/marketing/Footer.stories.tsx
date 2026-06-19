import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const mockLogo = (
  <div className="flex items-center gap-2">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
      Y
    </div>
    <span className="font-semibold">YCA Software</span>
  </div>
);

const meta = {
  title: 'Marketing/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: () => <Footer logo={mockLogo} description="Building amazing products for developers." />,
};

export const WithContact: Story = {
  render: () => (
    <Footer
      logo={mockLogo}
      description="Building amazing products for developers."
      contact={{
        address: '123 Main St, City, Country',
        phone: '+1 (555) 123-4567',
        email: 'contact@example.com',
      }}
    />
  ),
};

export const Minimal: Story = {
  render: () => <Footer logo={mockLogo} />,
};

export const WithAttribution: Story = {
  render: () => (
    <Footer
      logo="ProductName"
      description="Short product blurb."
      attribution="A YCA Software product"
    />
  ),
};
