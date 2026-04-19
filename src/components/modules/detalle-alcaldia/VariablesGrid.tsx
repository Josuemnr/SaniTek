import { Thermometer, Droplets, Users, Wind } from "lucide-react";
import { VariableCard } from "./VariableCard";
import type { VariableCritica } from "./detalle-alcaldia-data";

interface VariablesGridProps {
  variables: VariableCritica;
}

export function VariablesGrid({ variables }: VariablesGridProps) {
  const { temperatura, humedad, densidad, calidadAire, riesgoTemperatura, riesgoDensidad } = variables;

  return (
    <div className="grid grid-cols-2 gap-4 flex-1">
      <VariableCard
        icon={<Thermometer className="w-6 h-6 text-orange-400" />}
        label="Temperatura"
        value={`${temperatura}°C`}
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
        icon={<Users className="w-6 h-6 text-purple-400" />}
        label="Densidad Poblacional"
        value={densidad.toLocaleString("es-MX")}
        subLabel="habitantes/km²"
        riskTag={riesgoDensidad}
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
