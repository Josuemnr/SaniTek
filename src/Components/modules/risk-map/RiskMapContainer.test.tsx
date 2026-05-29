import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RiskMapContainer } from './RiskMapContainer'

// ─── Mocks de hijos ───────────────────────────────────────────────────────────
// Test estructural aislado: solo verifica que el contenedor
// ensambla los cuatro subcomponentes correctos.
// Cada hijo tiene sus propios tests de detalle.

vi.mock('./SidebarAlcaldias', () => ({
  SidebarAlcaldias: () => <div data-testid="sidebar-alcaldias" />,
}))

vi.mock('./QuickStatsCard', () => ({
  QuickStatsCard: () => <div data-testid="quick-stats-card" />,
}))

vi.mock('./TemporalControl', () => ({
  TemporalControl: () => <div data-testid="temporal-control" />,
}))

// CdmxLeafletMap usa react-leaflet que no funciona en jsdom → mock obligatorio
vi.mock('./CdmxLeafletMap', () => ({
  CdmxLeafletMap: () => <div data-testid="cdmx-leaflet-map" />,
}))

// ─── Suite ───────────────────────────────────────────────────────────────────
describe('RiskMapContainer', () => {
  it('monta el contenedor principal en el DOM (RC-01)', () => {
    render(<RiskMapContainer />)
    expect(screen.getByTestId('risk-map-container')).toBeInTheDocument()
  })

  it('renderiza SidebarAlcaldias (RC-02)', () => {
    render(<RiskMapContainer />)
    expect(screen.getByTestId('sidebar-alcaldias')).toBeInTheDocument()
  })

  it('renderiza QuickStatsCard (RC-03)', () => {
    render(<RiskMapContainer />)
    expect(screen.getByTestId('quick-stats-card')).toBeInTheDocument()
  })

  it('renderiza el mapa CdmxLeafletMap (RC-04)', () => {
    render(<RiskMapContainer />)
    expect(screen.getByTestId('cdmx-leaflet-map')).toBeInTheDocument()
  })

  it('renderiza TemporalControl (RC-05)', () => {
    render(<RiskMapContainer />)
    expect(screen.getByTestId('temporal-control')).toBeInTheDocument()
  })
})
