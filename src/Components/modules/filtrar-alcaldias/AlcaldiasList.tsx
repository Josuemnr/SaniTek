import { type Zona } from "./alcaldias-filter-data";
import { AlcaldiaItem } from "./AlcaldiaItem";

interface AlcaldiasListProps {
  zonas: Zona[];
}

export function AlcaldiasList({ zonas }: AlcaldiasListProps) {
  return (
    <div data-testid="alcaldias-list" className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
      {zonas.length === 0 ? (
        <div data-testid="alcaldias-empty" className="flex-1 flex items-center justify-center text-sm text-gray-400">
          No hay zonas que coincidan con los filtros seleccionados.
        </div>
      ) : (
        <div className="overflow-y-auto flex-1">
          {zonas.map((zona) => (
            <AlcaldiaItem key={zona.id} zona={zona} />
          ))}
        </div>
      )}
    </div>
  );
}
