import { fireEvent, render, screen } from '@testing-library/react';
import type { DateRange } from 'react-day-picker';
import { describe, expect, it, vi } from 'vitest';
import { DateRangePicker } from './date-range-picker/DateRangePicker';

describe('DateRangePicker', () => {
  it('renders placeholder when no date is selected', () => {
    render(<DateRangePicker value={undefined} onChange={() => {}} />);

    expect(screen.getByRole('textbox', { name: /date range/i })).toHaveAttribute(
      'placeholder',
      'YYYY/MM/DD',
    );
  });

  it('renders formatted range when value is provided', () => {
    const from = new Date(2026, 0, 9);
    const to = new Date(2026, 0, 24);
    const value: DateRange = { from, to };

    render(<DateRangePicker value={value} onChange={() => {}} />);

    expect(screen.getByRole('textbox', { name: /date range/i })).toHaveValue(
      'Jan 09, 2026 – Jan 24, 2026',
    );
  });

  it('calls onChange when a day is selected', () => {
    const handleChange = vi.fn();

    render(<DateRangePicker value={undefined} onChange={handleChange} />);

    // Open the calendar (clicking the input opens the popover)
    fireEvent.click(screen.getByRole('textbox', { name: /date range/i }));

    // Click on a day button (any available day)
    const dayButton = screen
      .getAllByRole('button')
      .find((btn) => btn.textContent && /^\d+$/.test(btn.textContent));

    expect(dayButton).toBeDefined();
    if (dayButton) {
      fireEvent.click(dayButton);
    }

    expect(handleChange).toHaveBeenCalled();
  });
});
