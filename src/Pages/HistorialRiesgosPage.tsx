import { useMemo } from "react";
import { DATA_CDMX, getMetricas } from "@/components/modules/historial-riesgos/historial-data";
import { SanidadChart } from "@/components/modules/historial-riesgos/SanidadChart";
import { MetricsRow } from "@/components/modules/historial-riesgos/MetricsRow";

export function HistorialRiesgosPage() {
  const metricas = useMemo(() => getMetricas(DATA_CDMX), []);

  return (
    <div className="flex flex-col h-full bg-gray-100 p-6 gap-4 overflow-hidden">
      <SanidadChart data={DATA_CDMX} />
      <MetricsRow metricas={metricas} />
    </div>
  );
}
