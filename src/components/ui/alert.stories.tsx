import type { Meta, StoryObj } from '@storybook/react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Alert, AlertDescription } from './alert';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert>
      <Info />
      <AlertDescription>This is a default alert message.</AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertDescription>This is a destructive alert message for errors.</AlertDescription>
    </Alert>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert>
        <CheckCircle2 />
        <AlertDescription>Success message with check icon.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle />
        <AlertDescription>Error message with alert icon.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Alert>
      <AlertDescription>Alert without an icon.</AlertDescription>
    </Alert>
  ),
};
