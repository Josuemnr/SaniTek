import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MetricsRow } from './MetricsRow';
import type { Metricas } from './historial-data';

const METRICAS_POSITIVA: Metricas = {
  indiceActual: 85,
  variacionMes: 5,
  promedioMensual: 80,
  maximoRegistrado: 90,
  mesesAtrasMaximo: 2,
  tendencia: 'Positiva',
  tendenciaLabel: 'Mejorando',
};

const METRICAS_NEGATIVA: Metricas = {
  indiceActual: 70,
  variacionMes: -8,
  promedioMensual: 75,
  maximoRegistrado: 90,
  mesesAtrasMaximo: 1,
  tendencia: 'Negativa',
  tendenciaLabel: 'Descendiendo',
};

const METRICAS_ESTABLE: Metricas = {
  indiceActual: 75,
  variacionMes: 0,
  promedioMensual: 75,
  maximoRegistrado: 75,
  mesesAtrasMaximo: 0,
  tendencia: 'Estable',
  tendenciaLabel: 'Estable',
};

describe('MetricsRow', () => {
  // ── Contenedor ──────────────────────────────────────────────────────────────

  it('renderiza el contenedor con data-testid="metrics-row"', () => {
    render(<MetricsRow metricas={METRICAS_POSITIVA} />);
    expect(screen.getByTestId('metrics-row')).toBeInTheDocument();
  });

  // ── Cuatro MetricCards ──────────────────────────────────────────────────────

  it('renderiza exactamente 4 tarjetas', () => {
    render(<MetricsRow metricas={METRICAS_POSITIVA} />);
    expect(screen.getAllByTestId('metric-card')).toHaveLength(4);
  });

  it('muestra el label "Índice Actual"', () => {
    render(<MetricsRow metricas={METRICAS_POSITIVA} />);
    expect(screen.getByText('Índice Actual')).toBeInTheDocument();
  });

  it('muestra el label "Promedio Mensual"', () => {
    render(<MetricsRow metricas={METRICAS_POSITIVA} />);
    expect(screen.getByText('Promedio Mensual')).toBeInTheDocument();
  });

  it('muestra el label "Máximo Registrado"', () => {
    render(<MetricsRow metricas={METRICAS_POSITIVA} />);
    expect(screen.getByText('Máximo Registrado')).toBeInTheDocument();
  });

  it('muestra el label "Tendencia"', () => {
    render(<MetricsRow metricas={METRICAS_POSITIVA} />);
    expect(screen.getByText('Tendencia')).toBeInTheDocument();
  });

  // ── Valores ─────────────────────────────────────────────────────────────────

  it('muestra el indiceActual', () => {
    render(<MetricsRow metricas={METRICAS_POSITIVA} />);
    expect(screen.getByText('85')).toBeInTheDocument();
  });

  it('muestra el promedioMensual', () => {
    render(<MetricsRow metricas={METRICAS_POSITIVA} />);
    expect(screen.getByText('80')).toBeInTheDocument();
  });

  it('muestra el maximoRegistrado', () => {
    render(<MetricsRow metricas={METRICAS_POSITIVA} />);
    expect(screen.getByText('90')).toBeInTheDocument();
  });

  it('muestra el tendenciaLabel', () => {
    render(<MetricsRow metricas={METRICAS_POSITIVA} />);
    expect(screen.getByText('Mejorando')).toBeInTheDocument();
  });

  // ── Variación y colores ─────────────────────────────────────────────────────

  it('variacion positiva muestra "+" en el sub-label', () => {
    render(<MetricsRow metricas={METRICAS_POSITIVA} />);
    expect(screen.getByText('+5 vs mes anterior')).toBeInTheDocument();
  });

  it('variacion negativa muestra "-" sin "+" extra', () => {
    render(<MetricsRow metricas={METRICAS_NEGATIVA} />);
    expect(screen.getByText('-8 vs mes anterior')).toBeInTheDocument();
  });

  it('variacion cero muestra "+0 vs mes anterior"', () => {
    render(<MetricsRow metricas={METRICAS_ESTABLE} />);
    expect(screen.getByText('+0 vs mes anterior')).toBeInTheDocument();
  });

  // ── Plural de meses ─────────────────────────────────────────────────────────

  it('mesesAtrasMaximo=1 muestra "mes" (singular)', () => {
    render(<MetricsRow metricas={METRICAS_NEGATIVA} />);
    expect(screen.getByText('Hace 1 mes')).toBeInTheDocument();
  });

  it('mesesAtrasMaximo=2 muestra "meses" (plural)', () => {
    render(<MetricsRow metricas={METRICAS_POSITIVA} />);
    expect(screen.getByText('Hace 2 meses')).toBeInTheDocument();
  });

  // ── Tendencia Negativa ──────────────────────────────────────────────────────

  it('tendencia Negativa muestra "Descendiendo"', () => {
    render(<MetricsRow metricas={METRICAS_NEGATIVA} />);
    expect(screen.getByText('Descendiendo')).toBeInTheDocument();
  });

  it('tendencia Estable muestra "Estable" al menos una vez', () => {
    render(<MetricsRow metricas={METRICAS_ESTABLE} />);
    // "Estable" aparece dos veces: como tendenciaLabel (value) y como tendencia (sub)
    const elements = screen.getAllByText('Estable');
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });
});
