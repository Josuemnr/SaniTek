import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  it('renders the SaniTek logo (NAV-01)', () => {
    render(<Navbar />);
    const logo = screen.getByAltText(/sanitek logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links: Mapa, Historial, Hoy NO circula, administración (NAV-02)', () => {
    render(<Navbar />);
    expect(screen.getByText(/mapa/i)).toBeInTheDocument();
    expect(screen.getByText(/historial/i)).toBeInTheDocument();
    expect(screen.getByText(/hoy no circula/i)).toBeInTheDocument();
    expect(screen.getByText(/administración/i)).toBeInTheDocument();
  });

  it('renders search input and allows typing (NAV-03)', () => {
    render(<Navbar />);
    const searchInput = screen.getByPlaceholderText(/buscar/i);
    expect(searchInput).toBeInTheDocument();
    
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(searchInput).toHaveValue('test search');
  });

  it('renders user profile area with avatar', () => {
    render(<Navbar />);
    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toBeInTheDocument();
  });
});
