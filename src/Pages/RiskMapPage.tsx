import { useNavigate } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { SidebarAlcaldias } from "@/Components/modules/risk-map/SidebarAlcaldias";
import { QuickStatsCard } from "@/Components/modules/risk-map/QuickStatsCard";
import { TemporalControl } from "@/Components/modules/risk-map/TemporalControl";
import { AlcaldiaInfoPanel } from "@/Components/modules/risk-map/AlcaldiaInfoPanel";
import { CdmxLeafletMap } from "@/Components/modules/risk-map/CdmxLeafletMap";
import { BackgroundBeams } from "@/Components/ui/background-beams";

export function RiskMapPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full gap-4 p-4 overflow-hidden bg-background relative">
      <BackgroundBeams className="opacity-40" />

      <div className="relative z-10">
        <SidebarAlcaldias />
      </div>

      <div className="flex-1 flex flex-col gap-4 relative">
        <div className="z-20 absolute top-4 left-4 pointer-events-auto">
          <QuickStatsCard />
        </div>

        <div className="z-20 absolute top-4 right-4 pointer-events-auto">
          <AlcaldiaInfoPanel />
        </div>

        <div className="flex-1 rounded-xl border border-border overflow-hidden relative z-0 shadow-2xl">
          <CdmxLeafletMap />
        </div>

        <div className="z-20 absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-auto">
          <div className="w-xl">
            <TemporalControl />
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="h-9 gap-2 shadow-md shrink-0"
            onClick={() => navigate("/filtrar")}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
