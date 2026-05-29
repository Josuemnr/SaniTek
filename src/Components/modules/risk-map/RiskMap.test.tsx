import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { SidebarAlcaldias } from "./SidebarAlcaldias"
import { TemporalControl }  from "./TemporalControl"

// ─── Mocks ───────────────────────────────────────────────────────────────────
// useAlcaldias hace fetch a Firebase → lo reemplazamos con zonas vacías.
// SidebarAlcaldias muestra igualmente las 16 alcaldías hardcodeadas.
vi.mock('@/hooks/useAlcaldias', () => ({
  useAlcaldias: () => ({ zonas: [] }),
}))

// ─── SidebarAlcaldias ─────────────────────────────────────────────────────────
describe("SidebarAlcaldias", () => {
  it("muestra el título 'Alcaldías' (SA-01)", () => {
    render(<SidebarAlcaldias />)
    expect(screen.getByText(/Alcaldías/i)).toBeInTheDocument()
  })

  it("lista las 16 alcaldías de la CDMX (SA-02)", () => {
    render(<SidebarAlcaldias />)
    // Muestra de alcaldías representativas
    expect(screen.getByText("Iztapalapa")).toBeInTheDocument()
    expect(screen.getByText("Coyoacán")).toBeInTheDocument()
    expect(screen.getByText("Cuauhtémoc")).toBeInTheDocument()
    expect(screen.getByText("Xochimilco")).toBeInTheDocument()
    expect(screen.getByText("Azcapotzalco")).toBeInTheDocument()
  })

  it("cada alcaldía es un elemento interactivo (SA-03)", () => {
    render(<SidebarAlcaldias />)
    // El componente usa role="button" en cada ítem de alcaldía
    const items = screen.getAllByRole("button")
    // Hay 16 alcaldías + potencialmente el botón de limpiar selección
    expect(items.length).toBeGreaterThanOrEqual(16)
  })

  it("al hacer click en una alcaldía, muestra 'Seleccionado' (SA-04)", () => {
    render(<SidebarAlcaldias />)
    const iztapalapa = screen.getByText("Iztapalapa")
    fireEvent.click(iztapalapa)
    // El badge de la alcaldía seleccionada cambia a "Seleccionado"
    expect(screen.getByText("Seleccionado")).toBeInTheDocument()
  })
})

// ─── TemporalControl ─────────────────────────────────────────────────────────
describe("TemporalControl", () => {
  it("muestra el encabezado 'Control Temporal' (TC-01)", () => {
    render(<TemporalControl />)
    expect(screen.getByText(/Control Temporal/i)).toBeInTheDocument()
  })

  it("renderiza un slider accesible (TC-02)", () => {
    render(<TemporalControl />)
    expect(screen.getByRole("slider")).toBeInTheDocument()
  })

  it("el slider está deshabilitado (modo histórico) (TC-03)", () => {
    render(<TemporalControl />)
    expect(screen.getByRole("slider")).toBeDisabled()
  })

  it("muestra la etiqueta de base histórica (TC-04)", () => {
    render(<TemporalControl />)
    expect(screen.getByText(/Base historica/i)).toBeInTheDocument()
  })

  it("muestra el badge 'Historico' (TC-05)", () => {
    render(<TemporalControl />)
    expect(screen.getByText(/Historico/i)).toBeInTheDocument()
  })
})
