import type { Meta, StoryObj } from '@storybook/react';
import { ContactSection } from './ContactSection';

const meta = {
  title: 'Marketing/ContactSection',
  component: ContactSection,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof ContactSection>;

export default meta;
type Story = StoryObj<typeof ContactSection>;

export const WithSlot: Story = {
  render: () => (
    <ContactSection
      eyebrow="Contact"
      title="Let’s build something great"
      description="Tell us about your launch timeline—we reply within two business days."
      email="hello@example.com"
      phone="+1 (555) 010-2030"
      address={'123 Market Street\nSan Francisco, CA'}
    >
      <p className="text-sm text-muted-foreground">
        Replace this panel with your form component or embed (Tally, Typeform, etc.).
      </p>
    </ContactSection>
  ),
};
