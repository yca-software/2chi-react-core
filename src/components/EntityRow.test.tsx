import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pencil, Trash2 } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import { EntityRow } from './EntityRow';
import { TooltipProvider } from './ui/tooltip';

function renderRow(ui: React.ReactElement) {
  return render(<TooltipProvider>{ui}</TooltipProvider>);
}

describe('EntityRow', () => {
  it('renders title and description', () => {
    renderRow(
      <EntityRow
        icon={Pencil}
        title="Admin role"
        description="Full access"
        subtitle="Created yesterday"
      />,
    );

    expect(screen.getByText('Admin role')).toBeInTheDocument();
    expect(screen.getByText('Full access')).toBeInTheDocument();
    expect(screen.getByText('Created yesterday')).toBeInTheDocument();
  });

  it('invokes onClick when the row is activated', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderRow(<EntityRow icon={Pencil} title="Team A" onClick={onClick} />);

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('runs action handlers from the menu', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    renderRow(
      <EntityRow
        icon={Pencil}
        title="API key"
        actions={[
          { label: 'Edit', icon: Pencil, onClick: onEdit },
          { label: 'Delete', icon: Trash2, onClick: onDelete, variant: 'destructive' },
        ]}
      />,
    );

    await user.click(screen.getByRole('button', { name: /open menu/i }));
    await user.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });
});
