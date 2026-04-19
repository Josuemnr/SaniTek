import { useMemo } from "react";
import { DATA_CDMX, getMetricas } from "./historial-data";
import { SanidadChart } from "./SanidadChart";
import { MetricsRow } from "./MetricsRow";

export function HistorialRiesgosContainer() {
  const metricas = useMemo(() => getMetricas(DATA_CDMX), []);

  return (
    <div className="flex flex-col h-full bg-gray-100 p-6 gap-4 overflow-hidden">
      <SanidadChart data={DATA_CDMX} />
      <MetricsRow metricas={metricas} />
    </div>
  );
}
