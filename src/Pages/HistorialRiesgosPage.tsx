import { useState } from "react";
<<<<<<< HEAD
import { ChevronDown, ChevronLeft, ChevronRight, Loader2, MapPin } from "lucide-react";
=======
import { ChevronLeft, ChevronRight, ChevronDown, MapPin, Loader2, Check } from "lucide-react";
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
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
<<<<<<< HEAD
  const [selectedYear, setSelectedYear] = useState(currentYear);
=======
  const [selectedYear, setSelectedYear]         = useState(currentYear);
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
  const [selectedAlcaldia, setSelectedAlcaldia] = useState<string>("Cuauhtémoc");

  const { data, metricas, loading, alcaldiaName, availableYears } =
    useHistorial(selectedAlcaldia, selectedYear);

  const minYear = availableYears.length > 0 ? Math.min(...availableYears) : currentYear;

  return (
<<<<<<< HEAD
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

=======
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
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white shadow-sm"
<<<<<<< HEAD
            onClick={() => setSelectedYear((year) => year - 1)}
=======
            onClick={() => setSelectedYear((y) => y - 1)}
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
            disabled={selectedYear <= minYear || loading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

<<<<<<< HEAD
          <span className="w-12 text-center text-sm font-bold tabular-nums">
=======
          <span className="text-sm font-bold w-12 text-center tabular-nums">
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
            {selectedYear}
          </span>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white shadow-sm"
<<<<<<< HEAD
            onClick={() => setSelectedYear((year) => year + 1)}
=======
            onClick={() => setSelectedYear((y) => y + 1)}
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
            disabled={selectedYear >= currentYear || loading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Indicador de carga */}
        {loading && (
<<<<<<< HEAD
          <span className="ml-auto flex items-center gap-1.5 text-xs text-blue-500">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Cargando historial de {alcaldiaName}...
=======
          <span className="flex items-center gap-1.5 text-xs text-blue-500 ml-auto">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Cargando historial de {alcaldiaName}…
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
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
