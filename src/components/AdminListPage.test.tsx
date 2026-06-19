import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { AdminListPage } from './AdminListPage';

type Item = { id: string; name: string };

const columns = [
  {
    key: 'name',
    header: 'Name',
    render: (item: Item) => item.name,
  },
];

const baseProps = {
  title: 'Users',
  description: 'Manage users',
  cardTitle: 'All users',
  searchPlaceholder: 'Search users',
  emptyMessage: 'No users found',
  columns,
  items: [] as Item[],
  isLoading: false,
  hasNextPage: false,
  isFetchingNextPage: false,
  loadMoreRef: createRef<HTMLTableRowElement>(),
  search: '',
  onSearchChange: vi.fn(),
  onRowClick: vi.fn(),
  getRowKey: (item: Item) => item.id,
};

describe('AdminListPage', () => {
  it('shows loading state', () => {
    render(<AdminListPage {...baseProps} isLoading loadingAriaLabel="Loading users" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading users')).toBeInTheDocument();
  });

  it('shows empty message when there are no items', () => {
    render(<AdminListPage {...baseProps} />);
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('renders rows and supports infinite scroll sentinel', () => {
    const loadMoreRef = createRef<HTMLTableRowElement>();
    render(
      <AdminListPage
        {...baseProps}
        items={[{ id: '1', name: 'Ada' }]}
        hasNextPage
        isFetchingNextPage
        loadMoreRef={loadMoreRef}
      />,
    );

    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(loadMoreRef.current).not.toBeNull();
  });
});
