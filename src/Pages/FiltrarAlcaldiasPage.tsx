import { useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import {
  ZONAS_MOCK,
  filterZonas,
  getEstadisticas,
  type FilterType,
} from "@/components/modules/filtrar-alcaldias/alcaldias-filter-data";
import { FilterBar } from "@/components/modules/filtrar-alcaldias/FilterBar";
import { AlcaldiasList } from "@/components/modules/filtrar-alcaldias/AlcaldiasList";
import { EstadisticasRapidas } from "@/components/modules/filtrar-alcaldias/EstadisticasRapidas";

interface FiltrarAlcaldiasPageProps {
  onNavigate?: (screen: string) => void;
}

export function FiltrarAlcaldiasPage({ onNavigate }: FiltrarAlcaldiasPageProps) {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);

  const zonasFiltradas = useMemo(
    () => filterZonas(ZONAS_MOCK, activeFilters),
    [activeFilters]
  );

  const estadisticas = useMemo(
    () => getEstadisticas(zonasFiltradas),
    [zonasFiltradas]
  );

  const handleToggle = (filter: FilterType) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 p-6 gap-4 overflow-hidden">
      <button
        onClick={() => onNavigate?.("Mapa de Riesgo")}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors w-fit"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Volver al mapa
      </button>

      <div className="bg-white rounded-xl border border-gray-200 px-5 py-3 shrink-0">
        <FilterBar
          activeFilters={activeFilters}
          onToggleFilter={handleToggle}
          onClear={() => setActiveFilters([])}
        />
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        <AlcaldiasList zonas={zonasFiltradas} />
        <EstadisticasRapidas {...estadisticas} />
      </div>
    </div>
  );
}
