import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AlcaldiaItem } from './AlcaldiaItem';
import type { Zona } from './alcaldias-filter-data';

const makeZona = (overrides: Partial<Zona> = {}): Zona => ({
  id: '1',
  nombre: 'Tepito',
  alcaldia: 'Cuauhtémoc',
  riskLevel: 'critico',
  calidadAire: 20,
  humedad: 40,
  ...overrides,
});

describe('AlcaldiaItem', () => {
  // ── Renderizado ─────────────────────────────────────────────────────────────

  it('renderiza el contenedor con data-testid="alcaldia-item"', () => {
    render(<AlcaldiaItem zona={makeZona()} />);
    expect(screen.getByTestId('alcaldia-item')).toBeInTheDocument();
  });

  it('muestra el nombre de la zona', () => {
    render(<AlcaldiaItem zona={makeZona({ nombre: 'Santa Fe' })} />);
    expect(screen.getByText('Santa Fe')).toBeInTheDocument();
  });

  it('muestra el nombre de la alcaldía', () => {
    render(<AlcaldiaItem zona={makeZona({ alcaldia: 'Cuajimalpa' })} />);
    expect(screen.getByText('Cuajimalpa')).toBeInTheDocument();
  });

  // ── Risk badge ──────────────────────────────────────────────────────────────

  it('badge con data-testid="risk-badge" está presente', () => {
    render(<AlcaldiaItem zona={makeZona()} />);
    expect(screen.getByTestId('risk-badge')).toBeInTheDocument();
  });

  it('nivel critico muestra "Crítico"', () => {
    render(<AlcaldiaItem zona={makeZona({ riskLevel: 'critico' })} />);
    expect(screen.getByTestId('risk-badge')).toHaveTextContent('Crítico');
  });

  it('nivel alto muestra "Alto riesgo"', () => {
    render(<AlcaldiaItem zona={makeZona({ riskLevel: 'alto' })} />);
    expect(screen.getByTestId('risk-badge')).toHaveTextContent('Alto riesgo');
  });

  it('nivel moderado muestra "Moderado"', () => {
    render(<AlcaldiaItem zona={makeZona({ riskLevel: 'moderado' })} />);
    expect(screen.getByTestId('risk-badge')).toHaveTextContent('Moderado');
  });

  it('nivel seguro muestra "Seguro"', () => {
    render(<AlcaldiaItem zona={makeZona({ riskLevel: 'seguro' })} />);
    expect(screen.getByTestId('risk-badge')).toHaveTextContent('Seguro');
  });

  it('badge critico tiene clase de color rojo', () => {
    render(<AlcaldiaItem zona={makeZona({ riskLevel: 'critico' })} />);
    expect(screen.getByTestId('risk-badge').className).toContain('text-red');
  });

  it('badge seguro tiene clase de color emerald', () => {
    render(<AlcaldiaItem zona={makeZona({ riskLevel: 'seguro' })} />);
    expect(screen.getByTestId('risk-badge').className).toContain('text-emerald');
  });
});
