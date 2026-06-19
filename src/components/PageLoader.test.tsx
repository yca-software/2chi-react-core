import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PageLoader } from './PageLoader';

describe('PageLoader', () => {
  it('renders accessible loading status', () => {
    render(<PageLoader loadingLabel="Loading..." />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('uses page variant layout', () => {
    render(<PageLoader variant="page" loadingLabel="Loading..." />);

    expect(screen.getByRole('status')).toHaveClass('min-h-screen');
  });
});
