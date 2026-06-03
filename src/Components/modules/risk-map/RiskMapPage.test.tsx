import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { RiskMapPage } from '@/Pages/RiskMapPage';

vi.mock('@/Components/modules/risk-map/SidebarAlcaldias', () => ({
  SidebarAlcaldias: () => <aside data-testid="sidebar-alcaldias" />,
}));

vi.mock('@/Components/modules/risk-map/QuickStatsCard', () => ({
  QuickStatsCard: () => <section data-testid="quick-stats-card" />,
}));

vi.mock('@/Components/modules/risk-map/AlcaldiaInfoPanel', () => ({
  AlcaldiaInfoPanel: () => <section data-testid="alcaldia-info-panel" />,
}));

vi.mock('@/Components/modules/risk-map/CdmxLeafletMap', () => ({
  CdmxLeafletMap: () => <div data-testid="cdmx-leaflet-map" />,
}));

vi.mock('@/Components/modules/risk-map/TemporalControl', () => ({
  TemporalControl: () => <div data-testid="temporal-control" />,
}));

vi.mock('@/Components/ui/background-beams', () => ({
  BackgroundBeams: () => <div data-testid="background-beams" />,
}));

describe('RiskMapPage', () => {
  it('renders the current risk map module composition', () => {
    render(
      <MemoryRouter>
        <RiskMapPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('sidebar-alcaldias')).toBeInTheDocument();
    expect(screen.getByTestId('quick-stats-card')).toBeInTheDocument();
    expect(screen.getByTestId('alcaldia-info-panel')).toBeInTheDocument();
    expect(screen.getByTestId('cdmx-leaflet-map')).toBeInTheDocument();
    expect(screen.getByTestId('temporal-control')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filtros/i })).toBeInTheDocument();
  });
});
