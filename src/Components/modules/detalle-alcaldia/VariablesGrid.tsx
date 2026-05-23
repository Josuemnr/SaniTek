import { Thermometer, Droplets, Wind } from "lucide-react";
import { VariableCard } from "./VariableCard";
import type { VariableCritica } from "./detalle-alcaldia-data";

interface VariablesGridProps {
  variables: VariableCritica;
}

export function VariablesGrid({ variables }: VariablesGridProps) {
  const { temperatura, humedad, calidadAire, riesgoTemperatura } = variables;

  return (
    <div className="grid grid-cols-3 gap-4 flex-1">
      <VariableCard
        icon={<Thermometer className="w-6 h-6 text-orange-400" />}
        label="Temperatura"
        value={`${Number(temperatura).toFixed(1)}°C`}
        subLabel="Rango óptimo: 18–25°C"
        riskTag={riesgoTemperatura}
      />
      <VariableCard
        icon={<Droplets className="w-6 h-6 text-blue-400" />}
        label="Humedad"
        value={`${humedad}%`}
        subLabel="Rango óptimo: 40–70%"
      />
      <VariableCard
        icon={<Wind className="w-6 h-6 text-cyan-500" />}
        label="Calidad del Aire (AQI)"
        value={String(calidadAire)}
        subLabel="Rango saludable: 0–50"
      />
    </div>
  );
}
