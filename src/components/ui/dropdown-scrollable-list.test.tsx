import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DropdownScrollableList } from './dropdown-scrollable-list';

describe('DropdownScrollableList', () => {
  it('renders children', () => {
    render(
      <DropdownScrollableList
        grow={false}
        scrollAreaClassName="max-h-52 overflow-y-auto"
        scrollKey={1}
      >
        <p>Option A</p>
      </DropdownScrollableList>,
    );
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });
});
