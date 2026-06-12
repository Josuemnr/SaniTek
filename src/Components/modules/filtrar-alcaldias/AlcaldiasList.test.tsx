import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AlcaldiasList } from './AlcaldiasList';
import type { Zona } from './alcaldias-filter-data';

const ZONAS: Zona[] = [
  { id: '1', nombre: 'Tepito',   alcaldia: 'Cuauhtémoc', riskLevel: 'critico',  calidadAire: 20, humedad: 40 },
  { id: '2', nombre: 'Santa Fe', alcaldia: 'Cuajimalpa', riskLevel: 'seguro',   calidadAire: 80, humedad: 70 },
  { id: '3', nombre: 'Aragón',   alcaldia: 'G.A.Madero', riskLevel: 'alto',     calidadAire: 40, humedad: 50 },
];

describe('AlcaldiasList', () => {
  // ── Contenedor ──────────────────────────────────────────────────────────────

  it('renderiza el contenedor con data-testid="alcaldias-list"', () => {
    render(<AlcaldiasList zonas={ZONAS} />);
    expect(screen.getByTestId('alcaldias-list')).toBeInTheDocument();
  });

  // ── Estado vacío ────────────────────────────────────────────────────────────

  it('muestra mensaje de vacío con data-testid="alcaldias-empty" cuando no hay zonas', () => {
    render(<AlcaldiasList zonas={[]} />);
    expect(screen.getByTestId('alcaldias-empty')).toBeInTheDocument();
    expect(screen.getByText(/no hay zonas/i)).toBeInTheDocument();
  });

  it('NO muestra el mensaje de vacío cuando hay zonas', () => {
    render(<AlcaldiasList zonas={ZONAS} />);
    expect(screen.queryByTestId('alcaldias-empty')).not.toBeInTheDocument();
  });

  // ── Lista de items ──────────────────────────────────────────────────────────

  it('renderiza todos los items de zona', () => {
    render(<AlcaldiasList zonas={ZONAS} />);
    const items = screen.getAllByTestId('alcaldia-item');
    expect(items).toHaveLength(ZONAS.length);
  });

  it('muestra los nombres de todas las zonas', () => {
    render(<AlcaldiasList zonas={ZONAS} />);
    expect(screen.getByText('Tepito')).toBeInTheDocument();
    expect(screen.getByText('Santa Fe')).toBeInTheDocument();
    expect(screen.getByText('Aragón')).toBeInTheDocument();
  });

  it('con una sola zona renderiza exactamente 1 item', () => {
    render(<AlcaldiasList zonas={[ZONAS[0]]} />);
    expect(screen.getAllByTestId('alcaldia-item')).toHaveLength(1);
    expect(screen.getByText('Tepito')).toBeInTheDocument();
  });
});
