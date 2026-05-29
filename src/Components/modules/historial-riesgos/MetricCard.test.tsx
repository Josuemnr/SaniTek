import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MetricCard } from './MetricCard';

// ─── Constantes de testID ─────────────────────────────────────────────────────
const TEST_IDS = {
  card:  'metric-card',
  label: 'metric-label',
  value: 'metric-value',
  sub:   'metric-sub',
  icon:  'metric-icon',
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const renderCard = (overrides?: Partial<Parameters<typeof MetricCard>[0]>) =>
  render(
    <MetricCard
      label="Índice de Riesgo"
      value={42}
      {...overrides}
    />,
  );

// ─── Suite ───────────────────────────────────────────────────────────────────
describe('MetricCard', () => {
  describe('Renderizado básico', () => {
    it('muestra la tarjeta en el DOM (MC-01)', () => {
      renderCard();
      expect(screen.getByTestId(TEST_IDS.card)).toBeInTheDocument();
    });

    it('muestra el label recibido (MC-02)', () => {
      renderCard({ label: 'Alcaldías en Riesgo' });
      expect(screen.getByTestId(TEST_IDS.label)).toHaveTextContent('Alcaldías en Riesgo');
    });

    it('muestra el value numérico (MC-03)', () => {
      renderCard({ value: 7 });
      expect(screen.getByTestId(TEST_IDS.value)).toHaveTextContent('7');
    });

    it('muestra el value de tipo string (MC-04)', () => {
      renderCard({ value: '1.8M' });
      expect(screen.getByTestId(TEST_IDS.value)).toHaveTextContent('1.8M');
    });
  });

  describe('Subtexto (sub)', () => {
    it('muestra el subtexto cuando se provee (MC-05)', () => {
      renderCard({ sub: '+5% vs mes anterior' });
      expect(screen.getByTestId(TEST_IDS.sub)).toHaveTextContent('+5% vs mes anterior');
    });

    it('NO muestra el subtexto cuando no se provee (MC-06)', () => {
      renderCard({ sub: undefined });
      expect(screen.queryByTestId(TEST_IDS.sub)).not.toBeInTheDocument();
    });
  });

  describe('Ícono', () => {
    it('muestra el ícono cuando se provee (MC-07)', () => {
      const icon = <svg data-testid="custom-icon" />;
      renderCard({ icon });
      expect(screen.getByTestId(TEST_IDS.icon)).toBeInTheDocument();
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('NO muestra el contenedor de ícono cuando no se provee (MC-08)', () => {
      renderCard({ icon: undefined });
      expect(screen.queryByTestId(TEST_IDS.icon)).not.toBeInTheDocument();
    });
  });
});
