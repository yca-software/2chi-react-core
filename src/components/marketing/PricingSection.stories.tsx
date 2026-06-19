import type { Meta, StoryObj } from '@storybook/react';
import { PricingSection } from './PricingSection';

const meta = {
  title: 'Marketing/PricingSection',
  component: PricingSection,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof PricingSection>;

export default meta;
type Story = StoryObj<typeof PricingSection>;

export const ThreeTiers: Story = {
  render: () => (
    <PricingSection
      eyebrow="Pricing"
      title="Simple, transparent pricing"
      description="Pick the tier that matches your stage. Upgrade anytime."
      tiers={[
        {
          name: 'Starter',
          price: '$0',
          period: '/mo',
          description: 'For side projects and experiments.',
          features: ['Static hosting', 'Core marketing blocks', 'Community support'],
          cta: { label: 'Start free', href: '#' },
        },
        {
          name: 'Pro',
          price: '$49',
          period: '/mo',
          description: 'For teams shipping real campaigns.',
          features: [
            'Everything in Starter',
            'Priority build pipeline',
            'Custom domain & SSL',
            'Email capture forms',
          ],
          cta: { label: 'Start trial', href: '#' },
          highlighted: true,
          badge: '14-day trial',
        },
        {
          name: 'Enterprise',
          price: 'Let’s talk',
          description: 'Security, SSO, and dedicated support.',
          features: ['SLA', 'Audit logs', 'Dedicated success manager'],
          cta: { label: 'Contact sales', href: '#' },
        },
      ]}
    />
  ),
};

/** Matches SPA pricing modal: monthly/annual toggle + comparison grid */
export const WithBillingAndTable: Story = {
  render: () => (
    <PricingSection
      eyebrow="Plans"
      title="Choose how your team works"
      description="Monthly or annual—switch anytime. Annual saves 15%."
      annualDiscountPercent={15}
      comparisonTitle="Key features"
      tiers={[
        {
          name: 'Basic',
          price: '',
          priceMonthly: '$20',
          priceAnnual: '$204',
          periodMonthly: '/mo',
          periodAnnual: '/yr',
          description: 'Small teams getting started.',
          features: ['Up to 3 members', '90-day audit log'],
          cta: { label: 'Select Basic', href: '#' },
          badge: '30-day trial',
        },
        {
          name: 'Pro',
          price: '',
          priceMonthly: '$40',
          priceAnnual: '$408',
          periodMonthly: '/mo',
          periodAnnual: '/yr',
          description: 'Growing teams that need API and roles.',
          features: [
            'Up to 10 members',
            'Custom roles & teams',
            'API access',
            '365-day audit log',
            'Priority support',
          ],
          cta: { label: 'Select Pro', href: '#' },
          highlighted: true,
        },
        {
          name: 'Enterprise',
          price: 'Contact us',
          description: 'Security reviews, SLA, unlimited scale.',
          features: ['Unlimited members', 'SSO & audit', 'Dedicated success'],
          cta: { label: 'Talk to us', href: '#' },
        },
      ]}
      comparisonRows={[
        {
          label: 'Team members',
          values: ['Up to 3', 'Up to 10', 'Unlimited'],
        },
        {
          label: 'Custom roles',
          values: [false, true, true],
        },
        {
          label: 'API keys',
          values: [false, true, true],
        },
        {
          label: 'Audit log retention',
          values: ['90 days', '365 days', 'Unlimited'],
        },
      ]}
    />
  ),
};
