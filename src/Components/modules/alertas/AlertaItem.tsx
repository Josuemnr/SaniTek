// AlertaItem.tsx
// Ítem de alerta individual en el feed

import { Wind, Droplets, Thermometer, ShieldAlert, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type Alerta,
  type TipoAlerta,
  NIVEL_CONFIG,
  TIPO_CONFIG,
  formatTimestamp,
} from "./alertas-data";

const TIPO_ICONS: Record<TipoAlerta, React.ElementType> = {
  "calidad-aire": Wind,
  "humedad":      Droplets,
  "temperatura":  Thermometer,
  "sanitario":    ShieldAlert,
};

interface AlertaItemProps {
  alerta: Alerta;
  onMarkRead?: (id: string) => void;
}

export function AlertaItem({ alerta, onMarkRead }: AlertaItemProps) {
  const nivel = NIVEL_CONFIG[alerta.nivel];
  const tipo  = TIPO_CONFIG[alerta.tipo];
  const Icon  = TIPO_ICONS[alerta.tipo];

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-3.5 border-b border-gray-100 last:border-0 transition-colors",
        !alerta.leida ? nivel.bgLight : "bg-white hover:bg-gray-50/60"
      )}
    >
      {/* Ícono de tipo */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
          nivel.bgLight,
          nivel.border,
          "border"
        )}
      >
        <Icon className={cn("w-4 h-4", nivel.color)} />
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Badge de nivel */}
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5",
                  nivel.bgLight,
                  nivel.color
                )}
              >
                <span className={cn("w-1.5 h-1.5 rounded-full inline-block", nivel.dot)} />
                {nivel.label}
              </span>
              {/* Tipo */}
              <span className="text-[10px] text-gray-400 font-medium">{tipo.label}</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 mt-0.5 leading-snug">
              {alerta.titulo}
            </p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              {alerta.alcaldianombre}
            </p>
          </div>

          {/* Timestamp + indicador no leído */}
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-[10px] text-gray-400 whitespace-nowrap">
              {formatTimestamp(alerta.timestamp)}
            </span>
            {!alerta.leida && onMarkRead && (
              <button
                onClick={() => onMarkRead(alerta.id)}
                className="flex items-center gap-1 text-[10px] text-primary hover:text-primary/80 transition-colors"
              >
                <Circle className="w-2 h-2 fill-primary" />
                Nueva
              </button>
            )}
          </div>
        </div>

        {/* Descripción */}
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
          {alerta.descripcion}
        </p>
      </div>
    </div>
  );
}
