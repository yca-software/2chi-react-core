import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createBoundQueryState } from './createBoundQueryState';

const QueryState = createBoundQueryState(() => ({
  formatError: () => 'Bound error message',
  errorDescription: 'Fallback description',
  retryLabel: 'Retry now',
  loadingLabel: 'Loading data',
}));

describe('createBoundQueryState', () => {
  it('injects bindings into QueryState', () => {
    render(
      <QueryState isLoading={false} isError error={new Error('boom')}>
        <div>Loaded content</div>
      </QueryState>,
    );

    expect(screen.getByText('Bound error message')).toBeInTheDocument();
    expect(screen.queryByText('Loaded content')).not.toBeInTheDocument();
  });

  it('renders children when not loading or error', () => {
    render(
      <QueryState isLoading={false}>
        <div>Loaded content</div>
      </QueryState>,
    );

    expect(screen.getByText('Loaded content')).toBeInTheDocument();
  });
});
