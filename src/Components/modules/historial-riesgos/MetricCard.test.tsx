import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MetricCard } from './MetricCard';

describe('MetricCard', () => {
  // ── Renderizado base ────────────────────────────────────────────────────────

  it('renderiza el contenedor con data-testid="metric-card"', () => {
    render(<MetricCard label="Índice" value={75} />);
    expect(screen.getByTestId('metric-card')).toBeInTheDocument();
  });

  it('muestra el label con data-testid="metric-label"', () => {
    render(<MetricCard label="Índice Actual" value={75} />);
    expect(screen.getByTestId('metric-label')).toHaveTextContent('Índice Actual');
  });

  it('muestra el value numérico con data-testid="metric-value"', () => {
    render(<MetricCard label="Índice" value={88} />);
    expect(screen.getByTestId('metric-value')).toHaveTextContent('88');
  });

  it('muestra el value string', () => {
    render(<MetricCard label="Tendencia" value="Mejorando" />);
    expect(screen.getByTestId('metric-value')).toHaveTextContent('Mejorando');
  });

  // ── Sub-label ───────────────────────────────────────────────────────────────

  it('muestra sub cuando se proporciona', () => {
    render(<MetricCard label="Índice" value={75} sub="+5 vs mes anterior" />);
    expect(screen.getByTestId('metric-sub')).toHaveTextContent('+5 vs mes anterior');
  });

  it('NO renderiza data-testid="metric-sub" cuando sub no se proporciona', () => {
    render(<MetricCard label="Índice" value={75} />);
    expect(screen.queryByTestId('metric-sub')).not.toBeInTheDocument();
  });

  it('aplica subColor cuando se proporciona', () => {
    render(<MetricCard label="Índice" value={75} sub="texto" subColor="text-emerald-600" />);
    expect(screen.getByTestId('metric-sub').className).toContain('text-emerald-600');
  });

  it('usa text-gray-400 por defecto cuando no se proporciona subColor', () => {
    render(<MetricCard label="Índice" value={75} sub="texto" />);
    expect(screen.getByTestId('metric-sub').className).toContain('text-gray-400');
  });

  // ── Ícono ───────────────────────────────────────────────────────────────────

  it('renderiza el ícono cuando se proporciona', () => {
    render(<MetricCard label="Índice" value={75} icon={<span data-testid="icono">★</span>} />);
    expect(screen.getByTestId('icono')).toBeInTheDocument();
  });

  it('NO renderiza contenedor de ícono cuando icon es undefined', () => {
    const { container } = render(<MetricCard label="Índice" value={75} />);
    // Sin icon, no hay span.text-gray-400 extra
    const iconSpans = container.querySelectorAll('.text-gray-400');
    expect(iconSpans).toHaveLength(0);
  });
});
