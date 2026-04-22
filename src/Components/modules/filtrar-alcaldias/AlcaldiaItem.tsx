import { cn } from "@/lib/utils";
import { type Zona, RISK_LEVEL_CONFIG } from "./alcaldias-filter-data";

interface AlcaldiaItemProps {
  zona: Zona;
}

export function AlcaldiaItem({ zona }: AlcaldiaItemProps) {
  const config = RISK_LEVEL_CONFIG[zona.riskLevel];

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <span className={cn("w-3 h-3 rounded-full shrink-0", config.bg)} />
        <div>
          <p className="text-sm font-semibold text-gray-800">{zona.nombre}</p>
          <p className="text-xs text-gray-400">{zona.alcaldia}</p>
        </div>
      </div>
      <span className={cn("text-xs font-medium", config.color)}>
        {config.label}
      </span>
    </div>
  );
}
