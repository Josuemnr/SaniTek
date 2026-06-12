import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EstadisticasRapidas } from './EstadisticasRapidas';

const DEFAULT_PROPS = {
  criticas: 3,
  altoRiesgo: 5,
  seguras: 7,
  poblacion: '2.5M',
};

describe('EstadisticasRapidas', () => {
  // ── Contenedor y título ─────────────────────────────────────────────────────

  it('renderiza el contenedor con data-testid="estadisticas-rapidas"', () => {
    render(<EstadisticasRapidas {...DEFAULT_PROPS} />);
    expect(screen.getByTestId('estadisticas-rapidas')).toBeInTheDocument();
  });

  it('muestra el título "Estadísticas Rápidas"', () => {
    render(<EstadisticasRapidas {...DEFAULT_PROPS} />);
    expect(screen.getByText('Estadísticas Rápidas')).toBeInTheDocument();
  });

  // ── Stats rows ──────────────────────────────────────────────────────────────

  it('renderiza la fila de Zonas Críticas con data-testid="stat-criticas"', () => {
    render(<EstadisticasRapidas {...DEFAULT_PROPS} />);
    expect(screen.getByTestId('stat-criticas')).toBeInTheDocument();
  });

  it('renderiza la fila de Zonas Alto Riesgo', () => {
    render(<EstadisticasRapidas {...DEFAULT_PROPS} />);
    expect(screen.getByTestId('stat-altoRiesgo')).toBeInTheDocument();
  });

  it('renderiza la fila de Zonas Seguras', () => {
    render(<EstadisticasRapidas {...DEFAULT_PROPS} />);
    expect(screen.getByTestId('stat-seguras')).toBeInTheDocument();
  });

  it('renderiza la fila de Población Afectada', () => {
    render(<EstadisticasRapidas {...DEFAULT_PROPS} />);
    expect(screen.getByTestId('stat-poblacion')).toBeInTheDocument();
  });

  // ── Labels ──────────────────────────────────────────────────────────────────

  it('muestra el label "Zonas Críticas"', () => {
    render(<EstadisticasRapidas {...DEFAULT_PROPS} />);
    expect(screen.getByText('Zonas Críticas')).toBeInTheDocument();
  });

  it('muestra el label "Zonas Alto Riesgo"', () => {
    render(<EstadisticasRapidas {...DEFAULT_PROPS} />);
    expect(screen.getByText('Zonas Alto Riesgo')).toBeInTheDocument();
  });

  it('muestra el label "Zonas Seguras"', () => {
    render(<EstadisticasRapidas {...DEFAULT_PROPS} />);
    expect(screen.getByText('Zonas Seguras')).toBeInTheDocument();
  });

  it('muestra el label "Población Afectada"', () => {
    render(<EstadisticasRapidas {...DEFAULT_PROPS} />);
    expect(screen.getByText('Población Afectada')).toBeInTheDocument();
  });

  // ── Valores ─────────────────────────────────────────────────────────────────

  it('muestra el valor de criticas', () => {
    render(<EstadisticasRapidas {...DEFAULT_PROPS} />);
    expect(screen.getByTestId('stat-value-criticas')).toHaveTextContent('3');
  });

  it('muestra el valor de altoRiesgo', () => {
    render(<EstadisticasRapidas {...DEFAULT_PROPS} />);
    expect(screen.getByTestId('stat-value-altoRiesgo')).toHaveTextContent('5');
  });

  it('muestra el valor de seguras', () => {
    render(<EstadisticasRapidas {...DEFAULT_PROPS} />);
    expect(screen.getByTestId('stat-value-seguras')).toHaveTextContent('7');
  });

  it('muestra el valor de poblacion', () => {
    render(<EstadisticasRapidas {...DEFAULT_PROPS} />);
    expect(screen.getByTestId('stat-value-poblacion')).toHaveTextContent('2.5M');
  });

  it('actualiza los valores cuando cambian las props', () => {
    const { rerender } = render(<EstadisticasRapidas {...DEFAULT_PROPS} />);
    rerender(<EstadisticasRapidas criticas={10} altoRiesgo={2} seguras={1} poblacion='8.0M' />);
    expect(screen.getByTestId('stat-value-criticas')).toHaveTextContent('10');
    expect(screen.getByTestId('stat-value-poblacion')).toHaveTextContent('8.0M');
  });

  it('muestra 0 correctamente cuando los valores son cero', () => {
    render(<EstadisticasRapidas criticas={0} altoRiesgo={0} seguras={0} poblacion='0.0M' />);
    expect(screen.getByTestId('stat-value-criticas')).toHaveTextContent('0');
  });
});
