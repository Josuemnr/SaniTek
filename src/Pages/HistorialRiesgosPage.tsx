import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, MapPin, Loader2, Check } from "lucide-react";
import { useHistorial } from "@/hooks/useHistorial";
import { SanidadChart } from "@/Components/modules/historial-riesgos/SanidadChart";
import { MetricsRow } from "@/Components/modules/historial-riesgos/MetricsRow";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/Components/ui/dropdown-menu";

// Lista canónica de las 16 alcaldías de CDMX
const ALCALDIAS: string[] = [
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
];

export function HistorialRiesgosPage() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear]         = useState(currentYear);
  const [selectedAlcaldia, setSelectedAlcaldia] = useState<string>("Cuauhtémoc");

  const { data, metricas, loading, alcaldiaName, availableYears } =
    useHistorial(selectedAlcaldia, selectedYear);

  const minYear = availableYears.length > 0 ? Math.min(...availableYears) : currentYear;

  return (
    <div className="flex flex-col h-full bg-gray-100 p-6 gap-4 overflow-hidden">
      {/* ── Barra de controles ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">

        {/* Selector de alcaldía — mismo patrón que Navbar */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center justify-between gap-2 min-w-56 h-9 rounded-lg border border-border bg-white px-3 text-sm font-medium shadow-sm hover:bg-muted transition-colors outline-none cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-semibold truncate">{selectedAlcaldia}</span>
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto">
            <DropdownMenuLabel>Seleccionar alcaldía</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {ALCALDIAS.map((a) => (
              <DropdownMenuItem
                key={a}
                onClick={() => {
                  setSelectedAlcaldia(a);
                  // Volver al año actual al cambiar alcaldía
                  setSelectedYear(currentYear);
                }}
              >
                <span className="flex-1">{a}</span>
                {a === selectedAlcaldia && (
                  <Check className="h-3.5 w-3.5 ml-2 text-primary shrink-0" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Navegación por año */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white shadow-sm"
            onClick={() => setSelectedYear((y) => y - 1)}
            disabled={selectedYear <= minYear || loading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm font-bold w-12 text-center tabular-nums">
            {selectedYear}
          </span>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white shadow-sm"
            onClick={() => setSelectedYear((y) => y + 1)}
            disabled={selectedYear >= currentYear || loading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Indicador de carga */}
        {loading && (
          <span className="flex items-center gap-1.5 text-xs text-blue-500 ml-auto">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Cargando historial de {alcaldiaName}…
          </span>
        )}
      </div>

      {/* ── Gráfica ────────────────────────────────────────────────────────── */}
      <SanidadChart data={data} year={selectedYear} alcaldiaName={alcaldiaName} />

      {/* ── Métricas ───────────────────────────────────────────────────────── */}
      <MetricsRow metricas={metricas} />
    </div>
  );
}
