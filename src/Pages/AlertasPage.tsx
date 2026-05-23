// AlertasPage.tsx
// Página principal de alertas: suscripción a alcaldías + feed de alertas

import { useState, useMemo } from "react";
import {
  Bell,
  ShieldAlert,
  AlertTriangle,
  Info,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ALCALDIAS_CDMX,
  ALERTAS_MOCK,
  getAlertasByAlcaldias,
  type Alerta,
} from "@/components/modules/alertas/alertas-data";
import { SuscripcionesPanel } from "@/components/modules/alertas/SuscripcionesPanel";
import { AlertasFeed }        from "@/components/modules/alertas/AlertasFeed";

// ─── Stat card pequeña ───────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  bg: string;
}

function StatCard({ icon: Icon, label, value, color, bg }: StatCardProps) {
  return (
    <div className={cn("flex items-center gap-3 rounded-xl px-4 py-3 border", bg)}>
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-white/60", color)}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-lg font-black leading-none text-gray-900">{value}</p>
        <p className="text-[11px] text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ─── Página ──────────────────────────────────────────────────────────────────
export function AlertasPage() {
  // IDs de alcaldías suscritas (por defecto ninguna)
  const [suscritasIds, setSuscritasIds] = useState<Set<string>>(new Set());

  // Alertas con estado de leído local
  const [alertas, setAlertas] = useState<Alerta[]>(ALERTAS_MOCK);

  // Toggle de suscripción individual
  const handleToggle = (id: string) => {
    setSuscritasIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else              next.add(id);
      return next;
    });
  };

  // Suscribir / desuscribir todas
  const handleSuscribirTodas    = () => setSuscritasIds(new Set(ALCALDIAS_CDMX.map((a) => a.id)));
  const handleDesuscribirTodas  = () => setSuscritasIds(new Set());

  // Marcar una alerta como leída
  const handleMarkRead = (id: string) =>
    setAlertas((prev) => prev.map((a) => (a.id === id ? { ...a, leida: true } : a)));

  // Marcar todas como leídas
  const handleMarkAllRead = () =>
    setAlertas((prev) => prev.map((a) => ({ ...a, leida: true })));

  // Alertas filtradas por alcaldías suscritas
  const alertasFiltradas = useMemo(
    () => getAlertasByAlcaldias(alertas, suscritasIds),
    [alertas, suscritasIds]
  );

  // Métricas de resumen
  const stats = useMemo(() => {
    const noLeidas   = alertasFiltradas.filter((a) => !a.leida).length;
    const criticas   = alertasFiltradas.filter((a) => a.nivel === "critico").length;
    const altoRiesgo = alertasFiltradas.filter((a) => a.nivel === "alto").length;
    return { noLeidas, criticas, altoRiesgo, total: alertasFiltradas.length };
  }, [alertasFiltradas]);

  return (
    <div className="flex flex-col h-full bg-gray-50 p-6 gap-5 overflow-hidden">

      {/* ── Métricas de resumen ───────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
        <StatCard
          icon={Bell}
          label="Suscripciones activas"
          value={suscritasIds.size}
          color="text-primary"
          bg="bg-blue-50 border-blue-100"
        />
        <StatCard
          icon={TrendingUp}
          label="Alertas recibidas"
          value={stats.total}
          color="text-gray-600"
          bg="bg-white border-gray-100"
        />
        <StatCard
          icon={ShieldAlert}
          label="Críticas activas"
          value={stats.criticas}
          color="text-red-600"
          bg="bg-red-50 border-red-100"
        />
        <StatCard
          icon={AlertTriangle}
          label="Sin leer"
          value={stats.noLeidas}
          color="text-amber-600"
          bg={stats.noLeidas > 0 ? "bg-amber-50 border-amber-100" : "bg-white border-gray-100"}
        />
      </div>

      {/* ── Banner informativo (solo cuando no hay suscritas) ─ */}
      {suscritasIds.size === 0 && (
        <div className="shrink-0 flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
          <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            <span className="font-semibold">Configura tus alertas:</span> selecciona las alcaldías
            de las que deseas recibir notificaciones sanitarias. Puedes suscribirte a una o a todas.
          </p>
        </div>
      )}

      {/* ── Layout principal: panel izquierdo + feed ─────── */}
      <div className="flex gap-4 flex-1 min-h-0">
        <SuscripcionesPanel
          alcaldias={ALCALDIAS_CDMX}
          suscritasIds={suscritasIds}
          onToggle={handleToggle}
          onSuscribirTodas={handleSuscribirTodas}
          onDesuscribirTodas={handleDesuscribirTodas}
        />
        <AlertasFeed
          alertas={alertasFiltradas}
          totalSuscritas={suscritasIds.size}
          onMarkRead={handleMarkRead}
          onMarkAllRead={handleMarkAllRead}
        />
      </div>
    </div>
  );
}
