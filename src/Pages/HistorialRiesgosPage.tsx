import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Loader2, MapPin } from "lucide-react";
import { useHistorial } from "@/hooks/useHistorial";
import { SanidadChart } from "@/Components/modules/historial-riesgos/SanidadChart";
import { MetricsRow } from "@/Components/modules/historial-riesgos/MetricsRow";
import { Button } from "@/Components/ui/button";

const ALCALDIAS_CDMX = [
  "Álvaro Obregón",
  "Azcapotzalco",
  "Benito Juárez",
  "Coyoacán",
  "Cuajimalpa de Morelos",
  "Cuauhtémoc",
  "Gustavo A. Madero",
  "Iztacalco",
  "Iztapalapa",
  "La Magdalena Contreras",
  "Miguel Hidalgo",
  "Milpa Alta",
  "Tláhuac",
  "Tlalpan",
  "Venustiano Carranza",
  "Xochimilco",
] as const;

export function HistorialRiesgosPage() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedAlcaldia, setSelectedAlcaldia] = useState<string>("Cuauhtémoc");

  const { data, metricas, loading, alcaldiaName, availableYears } =
    useHistorial(selectedAlcaldia, selectedYear);

  const minYear = availableYears.length > 0 ? Math.min(...availableYears) : currentYear;

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden bg-gray-100 p-6">
      <div className="flex shrink-0 flex-wrap items-center gap-3">
        <label className="relative flex h-12 min-w-72 max-w-full items-center rounded-lg border border-border bg-white shadow-sm transition-colors hover:bg-muted focus-within:ring-2 focus-within:ring-ring">
          <MapPin className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" />
          <select
            className="h-full w-full appearance-none rounded-lg bg-transparent pl-12 pr-11 text-lg font-semibold text-foreground outline-none"
            value={selectedAlcaldia}
            onChange={(event) => {
              setSelectedAlcaldia(event.target.value);
              setSelectedYear(currentYear);
            }}
          >
            {ALCALDIAS_CDMX.map((alcaldia) => (
              <option key={alcaldia} value={alcaldia}>
                {alcaldia}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 h-5 w-5 text-muted-foreground" />
        </label>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white shadow-sm"
            onClick={() => setSelectedYear((year) => year - 1)}
            disabled={selectedYear <= minYear || loading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="w-12 text-center text-sm font-bold tabular-nums">
            {selectedYear}
          </span>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white shadow-sm"
            onClick={() => setSelectedYear((year) => year + 1)}
            disabled={selectedYear >= currentYear || loading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {loading && (
          <span className="ml-auto flex items-center gap-1.5 text-xs text-blue-500">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Cargando historial de {alcaldiaName}...
          </span>
        )}
      </div>

      <SanidadChart data={data} year={selectedYear} alcaldiaName={alcaldiaName} />
      <MetricsRow metricas={metricas} />
    </div>
  );
}
