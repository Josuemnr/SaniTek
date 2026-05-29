// RiskMapContainer.tsx
// Agrupa los componentes del mapa de riesgo en una sola unidad testeable.
// RiskMapPage (Pages/) usa este contenedor más BackgroundBeams y navegación.

import { SidebarAlcaldias } from "./SidebarAlcaldias"
import { QuickStatsCard }    from "./QuickStatsCard"
import { TemporalControl }   from "./TemporalControl"
import { CdmxLeafletMap }    from "./CdmxLeafletMap"

export function RiskMapContainer() {
  return (
    <div data-testid="risk-map-container" className="flex h-full w-full gap-4 p-4 overflow-hidden">
      {/* Sidebar izquierdo */}
      <div className="relative z-10">
        <SidebarAlcaldias />
      </div>

      {/* Área principal: mapa + overlays */}
      <div className="flex-1 flex flex-col gap-4 relative">
        <div className="z-20 absolute top-4 left-4 pointer-events-auto">
          <QuickStatsCard />
        </div>

        <div className="flex-1 rounded-xl border border-border overflow-hidden relative z-0 shadow-2xl">
          <CdmxLeafletMap />
        </div>

        <div className="z-20 absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
          <TemporalControl />
        </div>
      </div>
    </div>
  )
}
