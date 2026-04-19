import { render, screen, fireEvent, act } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { RiskMapContainer } from "./RiskMapContainer"
import { useRiskStore } from "@/store/useRiskStore"

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

describe("RiskMap Module Foundation", () => {
  it("renders SidebarAlcaldias within the RiskMapContainer", async () => {
    await act(async () => {
      render(<RiskMapContainer />)
    })
    expect(screen.getByText(/Alcaldías/i)).toBeInTheDocument()
    // Check for some mock alcaldías
    expect(screen.getByText(/Iztapalapa/i)).toBeInTheDocument()
    expect(screen.getByText(/Coyoacán/i)).toBeInTheDocument()
  })

  it("renders QuickStatsCard with summary metrics", async () => {
    await act(async () => {
      render(<RiskMapContainer />)
    })
    expect(screen.getByText(/Zonas en Riesgo/i)).toBeInTheDocument()
    expect(screen.getByText(/Población Afectada/i)).toBeInTheDocument()
    expect(screen.getByText(/Zonas Seguras/i)).toBeInTheDocument()
  })

  it("renders TemporalControl with a slider", async () => {
    await act(async () => {
      render(<RiskMapContainer />)
    })
    expect(screen.getByText(/Control Temporal/i)).toBeInTheDocument()
    const slider = await screen.findByRole("slider")
    expect(slider).toBeInTheDocument()
  })

  it("updates store time when slider is changed", async () => {
    await act(async () => {
      render(<RiskMapContainer />)
    })
    
    const slider = await screen.findByRole("slider")
    const initialTime = useRiskStore.getState().currentTime
    
    // Simulate moving the slider
    // In Radix Slider, we can trigger change via keyboard or fireEvent
    // For a simple unit test, we might need to find the input if it's there, 
    // but fireEvent on the slider role with specific value might work if handled by the component
    
    await act(async () => {
      fireEvent.keyDown(slider, { key: 'ArrowRight', code: 'ArrowRight' })
    })

    const newTime = useRiskStore.getState().currentTime
    expect(newTime).not.toBe(initialTime)
  })

  it("arranges components in a layout", async () => {
    let container: HTMLElement;
    await act(async () => {
      const { container: c } = render(<RiskMapContainer />)
      container = c
    })
    const mainContainer = container!.firstChild as HTMLElement
    expect(mainContainer).toHaveClass("flex")
  })
})
