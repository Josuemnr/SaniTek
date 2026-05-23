import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRiskStore } from "@/store/useRiskStore";
import { useHistorial } from "@/hooks/useHistorial";
import { SanidadChart } from "@/components/modules/historial-riesgos/SanidadChart";
import { MetricsRow } from "@/components/modules/historial-riesgos/MetricsRow";
import { Button } from "@/components/ui/button";

export function HistorialRiesgosPage() {
  const { selectedAlcaldia } = useRiskStore();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data, metricas, loading, alcaldiaName, availableYears } =
    useHistorial(selectedAlcaldia, selectedYear);

  const minYear = availableYears.length > 0 ? Math.min(...availableYears) : currentYear;

  return (
    <div className="flex flex-col h-full bg-gray-100 p-6 gap-4 overflow-hidden">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSelectedYear((y) => y - 1)}
            disabled={selectedYear <= minYear}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm font-bold w-12 text-center">{selectedYear}</span>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSelectedYear((y) => y + 1)}
            disabled={selectedYear >= currentYear}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {loading && (
          <p className="text-xs text-blue-400">
            Cargando historial de {alcaldiaName}...
          </p>
        )}
      </div>

      <SanidadChart data={data} year={selectedYear} alcaldiaName={alcaldiaName} />
      <MetricsRow metricas={metricas} />
    </div>
  );
}
