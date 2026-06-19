import type { Meta, StoryObj } from '@storybook/react';
import { de } from 'date-fns/locale';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';
import { Card } from './card';
import { DateRangePicker } from './date-range-picker';
import { Label } from './label';

const meta = {
  title: 'UI/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;

type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<DateRange | undefined>(() => {
      const today = new Date();
      const from = new Date(today);
      from.setDate(from.getDate() - 6);
      return { from, to: today };
    });

    return (
      <Card className="w-[360px] space-y-2 p-4">
        <Label className="text-sm font-medium">Time range</Label>
        <DateRangePicker value={value} onChange={setValue} />
      </Card>
    );
  },
};

/** Open on a viewport ≥768px wide to see two months side-by-side. */
export const DesktopWide: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
  parameters: {
    layout: 'padded',
    viewport: { defaultViewport: 'desktop' },
  },
  render: () => {
    const [value, setValue] = React.useState<DateRange | undefined>(() => {
      const to = new Date();
      const from = new Date(to.getFullYear(), to.getMonth(), 1);
      return { from, to };
    });

    return (
      <div className="min-w-[48rem] space-y-2 p-8">
        <Label className="text-sm font-medium">Date range (wide layout)</Label>
        <DateRangePicker value={value} onChange={setValue} onApply={setValue} />
      </div>
    );
  },
};

export const WithRetentionLimits: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<DateRange | undefined>(() => {
      const today = new Date();
      const from = new Date(today);
      from.setDate(from.getDate() - 6);
      return { from, to: today };
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = today;
    const minDate = new Date(maxDate);
    minDate.setDate(minDate.getDate() - 29);

    return (
      <Card className="w-[360px] space-y-2 p-4">
        <Label className="text-sm font-medium">Last 30 days (retention)</Label>
        <DateRangePicker value={value} onChange={setValue} minDate={minDate} maxDate={maxDate} />
      </Card>
    );
  },
};

export const WithApplyFlow: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<DateRange | undefined>(undefined);

    return (
      <Card className="w-[360px] space-y-2 p-4">
        <Label className="text-sm font-medium">Date range (Apply to confirm)</Label>
        <DateRangePicker value={value} onChange={setValue} onApply={(range) => setValue(range)} />
      </Card>
    );
  },
};

export const WithTranslations: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<DateRange | undefined>(undefined);

    const translations = {
      applyButton: 'Übernehmen',
      cancelButton: 'Abbrechen',
      startLabel: 'Von',
      endLabel: 'Bis',
      presetLabels: {
        today: 'Heute',
        yesterday: 'Gestern',
        last7: 'Letzte 7 Tage',
        last14: 'Letzte 14 Tage',
        last30: 'Letzte 30 Tage',
        thisWeek: 'Diese Woche',
        lastWeek: 'Letzte Woche',
        thisMonth: 'Dieser Monat',
        lastMonth: 'Letzter Monat',
      },
    };

    return (
      <Card className="w-[360px] space-y-2 p-4">
        <Label className="text-sm font-medium">Datumsbereich (übersetzt)</Label>
        <DateRangePicker
          value={value}
          onChange={setValue}
          translations={translations}
          locale={de}
        />
      </Card>
    );
  },
};

export const WithCustomPresets: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<DateRange | undefined>(undefined);

    const presets = [
      {
        id: 'last3',
        label: 'Last 3 days',
        getRange: (): DateRange => {
          const to = new Date();
          to.setHours(23, 59, 59, 999);
          const from = new Date(to);
          from.setDate(from.getDate() - 2);
          from.setHours(0, 0, 0, 0);
          return { from, to };
        },
      },
      {
        id: 'last7',
        label: 'Last 7 days',
        getRange: (): DateRange => {
          const to = new Date();
          to.setHours(23, 59, 59, 999);
          const from = new Date(to);
          from.setDate(from.getDate() - 6);
          from.setHours(0, 0, 0, 0);
          return { from, to };
        },
      },
      {
        id: 'last90',
        label: 'Last 90 days',
        getRange: (): DateRange => {
          const to = new Date();
          to.setHours(23, 59, 59, 999);
          const from = new Date(to);
          from.setDate(from.getDate() - 89);
          from.setHours(0, 0, 0, 0);
          return { from, to };
        },
      },
    ];

    return (
      <Card className="w-[360px] space-y-2 p-4">
        <Label className="text-sm font-medium">Custom presets only</Label>
        <DateRangePicker value={value} onChange={setValue} presets={presets} />
      </Card>
    );
  },
};

export const NoPresets: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<DateRange | undefined>(undefined);

    return (
      <Card className="w-[360px] space-y-2 p-4">
        <Label className="text-sm font-medium">Calendar only (no presets)</Label>
        <DateRangePicker value={value} onChange={setValue} showPresets={false} />
      </Card>
    );
  },
};
