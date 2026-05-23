// SuscripcionesPanel.tsx
// Panel izquierdo: lista de las 16 alcaldías con toggle de suscripción

import { Bell, Search, X, CheckCheck, XCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { type Alcaldia, type NivelAlerta, NIVEL_CONFIG } from "./alertas-data";
import { AlcaldiaSubscripcionCard } from "./AlcaldiaSubscripcionCard";

interface SuscripcionesPanelProps {
  alcaldias: Alcaldia[];
  suscritasIds: Set<string>;
  onToggle: (id: string) => void;
  onSuscribirTodas: () => void;
  onDesuscribirTodas: () => void;
}

const NIVEL_FILTROS: Array<{ label: string; value: NivelAlerta | "todas" }> = [
  { label: "Todas", value: "todas" },
  { label: "Crítico", value: "critico" },
  { label: "Alto", value: "alto" },
  { label: "Moderado", value: "moderado" },
  { label: "Info", value: "info" },
];

export function SuscripcionesPanel({
  alcaldias,
  suscritasIds,
  onToggle,
  onSuscribirTodas,
  onDesuscribirTodas,
}: SuscripcionesPanelProps) {
  const [busqueda, setBusqueda] = useState("");
  const [filtroNivel, setFiltroNivel] = useState<NivelAlerta | "todas">("todas");

  const todasSuscritas = suscritasIds.size === alcaldias.length;

  const alcaldiasFiltradas = alcaldias.filter((a) => {
    const matchBusq = a.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const matchNivel = filtroNivel === "todas" || a.nivelRiesgo === filtroNivel;
    return matchBusq && matchNivel;
  });

  // Ordenar: suscritas primero, luego por nivel de riesgo
  const ordenadas = [...alcaldiasFiltradas].sort((a, b) => {
    const aSusc = suscritasIds.has(a.id) ? 0 : 1;
    const bSusc = suscritasIds.has(b.id) ? 0 : 1;
    if (aSusc !== bSusc) return aSusc - bSusc;
    const orden: Record<NivelAlerta, number> = { critico: 0, alto: 1, moderado: 2, info: 3 };
    return orden[a.nivelRiesgo] - orden[b.nivelRiesgo];
  });

  return (
    <div className="w-80 flex-shrink-0 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-100 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-gray-900">Mis suscripciones</h3>
          </div>
          <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {suscritasIds.size}/{alcaldias.length}
          </span>
        </div>

        {/* Acciones rápidas */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={todasSuscritas ? onDesuscribirTodas : onSuscribirTodas}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold py-1.5 rounded-lg border transition-colors",
              todasSuscritas
                ? "border-red-200 text-red-600 hover:bg-red-50"
                : "border-primary/30 text-primary hover:bg-primary/5"
            )}
          >
            {todasSuscritas ? (
              <><XCircle className="w-3 h-3" /> Desuscribir todas</>
            ) : (
              <><CheckCheck className="w-3 h-3" /> Suscribir todas</>
            )}
          </button>
        </div>

        {/* Buscador */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar alcaldía..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-8 pr-8 py-2 text-xs bg-gray-50 rounded-lg border border-gray-100 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 placeholder:text-gray-400"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda("")}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filtros de riesgo */}
        <div className="flex gap-1 mt-2 flex-wrap">
          {NIVEL_FILTROS.map((f) => {
            const active = filtroNivel === f.value;
            const cfg    = f.value !== "todas" ? NIVEL_CONFIG[f.value] : null;
            return (
              <button
                key={f.value}
                onClick={() => setFiltroNivel(f.value)}
                className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-all",
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

      {/* Lista de alcaldías */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
        {ordenadas.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 py-10 text-center">
            <Search className="w-8 h-8 text-gray-200" />
            <p className="text-xs text-gray-400">
              No se encontraron alcaldías con ese filtro.
            </p>
          </div>
        ) : (
          ordenadas.map((alcaldia) => (
            <AlcaldiaSubscripcionCard
              key={alcaldia.id}
              alcaldia={alcaldia}
              suscrita={suscritasIds.has(alcaldia.id)}
              onToggle={onToggle}
            />
          ))
        )}
      </div>
    </div>
  );
}
