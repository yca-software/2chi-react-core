import type { Meta, StoryObj } from '@storybook/react';
import { FaqSection } from './FaqSection';

const meta = {
  title: 'Marketing/FaqSection',
  component: FaqSection,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof FaqSection>;

export default meta;
type Story = StoryObj<typeof FaqSection>;

export const Default: Story = {
  render: () => (
    <FaqSection
      title="Frequently asked questions"
      description="Quick answers about the template and design system."
      items={[
        {
          question: 'Can I use this in client projects?',
          answer:
            'Yes—swap branding, copy, and assets. The components are MIT-friendly patterns; do not redistribute Tailwind Plus source if you license that separately.',
        },
        {
          question: 'Does it work with dark mode?',
          answer:
            'Tokens are defined for light and dark. Toggle `.dark` on a parent or use the theme provider in app shells.',
        },
        {
          question: 'How do I connect the newsletter form?',
          answer:
            'Pass a formAction URL to Newsletter or render your own form as children for providers like Buttondown or Mailchimp.',
        },
      ]}
    />
  ),
};
