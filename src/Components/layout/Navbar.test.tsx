import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  it('renders the SaniTek logo (NAV-01)', () => {
    render(<Navbar />);
    const logo = screen.getByAltText(/sanitek logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links from the public dashboard nav (NAV-02)', () => {
    render(<Navbar />);
    expect(screen.getByText(/mapa/i)).toBeInTheDocument();
    expect(screen.getByText(/historial/i)).toBeInTheDocument();
    expect(screen.getByText(/hoy no circula/i)).toBeInTheDocument();
    expect(screen.queryByText(/alertas sanitarias/i)).not.toBeInTheDocument();
  });

  it('renders user profile area with avatar', () => {
    render(<Navbar />);
    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toBeInTheDocument();
  });
});
