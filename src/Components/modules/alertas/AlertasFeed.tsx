// AlertasFeed.tsx
// Panel derecho: feed de alertas de las alcaldías suscritas

import { Bell, BellOff, CheckCheck, Filter } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { type Alerta, type NivelAlerta, NIVEL_CONFIG } from "./alertas-data";
import { AlertaItem } from "./AlertaItem";

interface AlertasFeedProps {
  alertas: Alerta[];
  totalSuscritas: number;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

const FILTROS: Array<{ label: string; value: NivelAlerta | "todas" }> = [
  { label: "Todas",     value: "todas"    },
  { label: "Crítico",   value: "critico"  },
  { label: "Alto",      value: "alto"     },
  { label: "Moderado",  value: "moderado" },
  { label: "Info",      value: "info"     },
];

export function AlertasFeed({
  alertas,
  totalSuscritas,
  onMarkRead,
  onMarkAllRead,
}: AlertasFeedProps) {
  const [filtroNivel, setFiltroNivel] = useState<NivelAlerta | "todas">("todas");

  const noLeidas   = alertas.filter((a) => !a.leida).length;
  const alertasFiltradas = filtroNivel === "todas"
    ? alertas
    : alertas.filter((a) => a.nivel === filtroNivel);

  // Estado vacío: no hay suscripciones
  if (totalSuscritas === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm gap-3 p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
          <BellOff className="w-7 h-7 text-gray-300" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">Sin suscripciones activas</p>
          <p className="text-xs text-gray-400 mt-1 max-w-[220px]">
            Selecciona al menos una alcaldía para comenzar a recibir alertas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-0">
      {/* Header del feed */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-100 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-bold text-gray-900">Alertas recientes</h3>
            {noLeidas > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-destructive text-white text-[10px] font-bold">
                {noLeidas}
              </span>
            )}
          </div>
          {noLeidas > 0 && (
            <button
              onClick={onMarkAllRead}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Marcar todas como leídas
            </button>
          )}
        </div>

        {/* Filtro por nivel */}
        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          <Filter className="w-3 h-3 text-gray-400 shrink-0" />
          {FILTROS.map((f) => {
            const active = filtroNivel === f.value;
            const cfg    = f.value !== "todas" ? NIVEL_CONFIG[f.value] : null;
            return (
              <button
                key={f.value}
                onClick={() => setFiltroNivel(f.value)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all",
                  active
                    ? cfg
                      ? cn(cfg.bgLight, cfg.color, cfg.border)
                      : "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista de alertas */}
      <div className="flex-1 overflow-y-auto">
        {alertasFiltradas.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-center p-8">
            <Bell className="w-8 h-8 text-gray-200" />
            <p className="text-sm text-gray-400">
              {filtroNivel === "todas"
                ? "No hay alertas de tus alcaldías suscritas."
                : `No hay alertas de nivel "${NIVEL_CONFIG[filtroNivel as NivelAlerta]?.label}" por ahora.`}
            </p>
          </div>
        ) : (
          alertasFiltradas.map((alerta) => (
            <AlertaItem
              key={alerta.id}
              alerta={alerta}
              onMarkRead={onMarkRead}
            />
          ))
        )}
      </div>

      {/* Footer con resumen */}
      <div className="px-5 py-2.5 border-t border-gray-100 shrink-0 bg-gray-50/50">
        <p className="text-[11px] text-gray-400 text-center">
          Mostrando alertas de <span className="font-semibold text-gray-600">{totalSuscritas}</span> alcald{totalSuscritas === 1 ? "ía" : "ías"} suscrita{totalSuscritas === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
