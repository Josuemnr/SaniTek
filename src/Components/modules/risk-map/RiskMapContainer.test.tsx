import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RiskMapContainer } from './RiskMapContainer';

// Mock the Google Maps API Provider
vi.mock('@vis.gl/react-google-maps', () => ({
  APIProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="api-provider">{children}</div>,
  Map: ({ children }: { children: React.ReactNode }) => <div data-testid="google-map">{children}</div>,
  useMap: vi.fn(),
}));

vi.mock('@deck.gl/google-maps', () => ({
  GoogleMapsOverlay: vi.fn().mockImplementation(() => ({
    setMap: vi.fn(),
    setProps: vi.fn(),
  })),
}));

// Mock the SidebarAlcaldias and QuickStatsCard to avoid issues with their internal implementation
vi.mock('./SidebarAlcaldias', () => ({
  SidebarAlcaldias: () => <div data-testid="sidebar-alcaldias" />,
}));

vi.mock('./QuickStatsCard', () => ({
  QuickStatsCard: () => <div data-testid="quick-stats-card" />,
}));

vi.mock('./TemporalControl', () => ({
  TemporalControl: () => <div data-testid="temporal-control" />,
}));

describe('RiskMapContainer', () => {
  it('renders the RiskMapContainer with all its components', () => {
    render(<RiskMapContainer />);
    
    expect(screen.getByTestId('api-provider')).toBeInTheDocument();
    expect(screen.getByTestId('google-map')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-alcaldias')).toBeInTheDocument();
    expect(screen.getByTestId('quick-stats-card')).toBeInTheDocument();
    expect(screen.getByTestId('temporal-control')).toBeInTheDocument();
  });
});
