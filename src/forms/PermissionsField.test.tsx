import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';
import { Form } from '../components/ui/form';
import { TooltipProvider } from '../components/ui/tooltip';
import { PermissionsField } from './PermissionsField';

const groups = [
  {
    contextKey: 'members',
    labelKey: 'members.label',
    descriptionKey: 'members.desc',
    permissions: [
      { key: 'members:read', action: 'read' as const, labelKey: 'read' },
      { key: 'members:write', action: 'write' as const, labelKey: 'write' },
      { key: 'members:delete', action: 'delete' as const, labelKey: 'delete' },
    ],
  },
];

function TestForm() {
  const form = useForm<{ permissions: string[] }>({
    defaultValues: { permissions: [] },
  });
  const value = form.watch('permissions');

  return (
    <TooltipProvider>
      <Form {...form}>
        <PermissionsField
          control={form.control}
          name="permissions"
          label="Permissions"
          groups={groups}
          t={(key) => key}
        />
      </Form>
      <span data-testid="selected">{value.join(',')}</span>
    </TooltipProvider>
  );
}

describe('PermissionsField', () => {
  it('auto-adds read when write is selected', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    await user.click(screen.getByLabelText('write'));

    expect(screen.getByTestId('selected').textContent).toContain('members:write');
    expect(screen.getByTestId('selected').textContent).toContain('members:read');
  });

  it('auto-adds read and write when delete is selected', async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    await user.click(screen.getByLabelText('delete'));

    const selected = screen.getByTestId('selected').textContent ?? '';
    expect(selected).toContain('members:delete');
    expect(selected).toContain('members:write');
    expect(selected).toContain('members:read');
  });
});
