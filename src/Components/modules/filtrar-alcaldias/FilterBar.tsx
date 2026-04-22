import { BarChart2, Wind, Droplets, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type FilterType, FILTER_CONFIG } from "./alcaldias-filter-data";

const FILTER_ICONS: Record<FilterType, React.ElementType> = {
  "densidad":     BarChart2,
  "calidad-aire": Wind,
  "humedad":      Droplets,
};

interface FilterBarProps {
  activeFilters: FilterType[];
  onToggleFilter: (filter: FilterType) => void;
  onClear: () => void;
}

export function FilterBar({ activeFilters, onToggleFilter, onClear }: FilterBarProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Button size="sm" className="gap-2 shrink-0" disabled>
        <SlidersHorizontal className="w-4 h-4" />
        Filtrar
      </Button>

      {(Object.keys(FILTER_CONFIG) as FilterType[]).map((filter) => {
        const Icon = FILTER_ICONS[filter];
        const isActive = activeFilters.includes(filter);
        return (
          <button
            key={filter}
            onClick={() => onToggleFilter(filter)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
              isActive
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {FILTER_CONFIG[filter].label}
          </button>
        );
      })}

      {activeFilters.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-gray-500 hover:text-red-500 px-2"
          onClick={onClear}
        >
          <X className="w-3.5 h-3.5" />
          Limpiar
        </Button>
      )}
    </div>
  );
}
