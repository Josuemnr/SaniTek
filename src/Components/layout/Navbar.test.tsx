import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  it('renders the SaniTek logo (NAV-01)', () => {
    render(<Navbar />);
    const logo = screen.getByAltText(/sanitek logo/i);
    expect(logo).toBeInTheDocument();
  });

<<<<<<< HEAD
  it('renders navigation links from the public dashboard nav (NAV-02)', () => {
=======
  it('renders navigation links: Mapa, Historial, Hoy no Circula, Alertas (NAV-02)', () => {
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
    render(<Navbar />);
    expect(screen.getByText(/mapa/i)).toBeInTheDocument();
    expect(screen.getByText(/historial/i)).toBeInTheDocument();
    expect(screen.getByText(/hoy no circula/i)).toBeInTheDocument();
<<<<<<< HEAD
    expect(screen.queryByText(/alertas sanitarias/i)).not.toBeInTheDocument();
=======
    expect(screen.getByText(/alertas/i)).toBeInTheDocument();
  });

  it('renders search input and allows typing (NAV-03)', () => {
    render(<Navbar />);
    const searchInput = screen.getByPlaceholderText(/buscar/i);
    expect(searchInput).toBeInTheDocument();
    
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(searchInput).toHaveValue('test search');
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
  });

  it('renders user profile area with avatar', () => {
    render(<Navbar />);
    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toBeInTheDocument();
  });
});
