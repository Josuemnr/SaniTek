import { useState, useMemo } from "react";
import {
  ZONAS_MOCK,
  filterZonas,
  getEstadisticas,
  type FilterType,
} from "./alcaldias-filter-data";
import { FilterBar } from "./FilterBar";
import { AlcaldiasList } from "./AlcaldiasList";
import { EstadisticasRapidas } from "./EstadisticasRapidas";

export function FiltrarAlcaldiasContainer() {
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
