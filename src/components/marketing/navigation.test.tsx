import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Navigation } from './Navigation';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
];

describe('Navigation', () => {
  it('opens and closes mobile drawer from hamburger actions', async () => {
    render(<Navigation logo="YCA Software" links={links} />);

    const openButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(openButton);

    await waitFor(() =>
      expect(screen.getByRole('dialog', { name: /menu/i })).toHaveClass('pointer-events-auto'),
    );

    const closeButton = screen.getByRole('button', { name: /close menu/i });
    fireEvent.click(closeButton);

    await waitFor(() =>
      expect(screen.getByRole('dialog', { name: /menu/i })).toHaveClass('pointer-events-none'),
    );
  });

  it('renders a clickable logo when logoHref is provided', () => {
    render(<Navigation logo="YCA Software" logoHref="#home" links={links} />);
    const logoLinks = screen.getAllByRole('link', { name: /go to top/i });
    expect(logoLinks).toHaveLength(2);
    expect(logoLinks[0]).toHaveAttribute('href', '#home');
    expect(logoLinks[1]).toHaveAttribute('href', '#home');
  });
});
