// AlcaldiaSubscripcionCard.tsx
// Tarjeta para suscribirse / desuscribirse de alertas de una alcaldía

import { Check, Bell, BellOff, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Alcaldia, NIVEL_CONFIG } from "./alertas-data";

interface AlcaldiaSubscripcionCardProps {
  alcaldia: Alcaldia;
  suscrita: boolean;
  onToggle: (id: string) => void;
}

export function AlcaldiaSubscripcionCard({
  alcaldia,
  suscrita,
  onToggle,
}: AlcaldiaSubscripcionCardProps) {
  const nivel = NIVEL_CONFIG[alcaldia.nivelRiesgo];

  return (
    <button
      onClick={() => onToggle(alcaldia.id)}
      className={cn(
        "w-full text-left rounded-xl border-2 px-4 py-3 transition-all duration-200 group relative",
        "hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        suscrita
          ? "border-primary/30 bg-primary/5 shadow-sm"
          : "border-gray-100 bg-white hover:border-gray-200"
      )}
    >
      {/* Indicador suscrito */}
      {suscrita && (
        <span className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[10px] font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">
          <Check className="w-2.5 h-2.5" />
          Suscrito
        </span>
      )}

      <div className="flex items-start gap-3">
        {/* Dot de nivel de riesgo */}
        <span
          className={cn(
            "mt-1 flex-shrink-0 w-2.5 h-2.5 rounded-full",
            nivel.dot
          )}
        />

        <div className="flex-1 min-w-0 pr-14">
          <p className="text-sm font-semibold text-gray-900 leading-tight truncate">
            {alcaldia.nombre}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className={cn("text-[11px] font-medium", nivel.color)}>
              {nivel.label}
            </span>
            <span className="flex items-center gap-0.5 text-[11px] text-gray-400">
              <Users className="w-2.5 h-2.5" />
              {alcaldia.poblacion}
            </span>
          </div>
        </div>
      </div>

      {/* Ícono Bell / BellOff al hover */}
      <div
        className={cn(
          "absolute bottom-2.5 right-3 transition-opacity",
          suscrita ? "opacity-100" : "opacity-0 group-hover:opacity-60"
        )}
      >
        {suscrita ? (
          <BellOff className="w-3.5 h-3.5 text-primary/60" />
        ) : (
          <Bell className="w-3.5 h-3.5 text-gray-400" />
        )}
      </div>
    </button>
  );
}
