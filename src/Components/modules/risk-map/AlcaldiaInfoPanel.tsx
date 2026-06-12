import { useNavigate } from "react-router-dom"
import { X, Wind, Droplets, Thermometer, AlertTriangle, ChevronRight, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { useRiskStore } from "@/store/useRiskStore"
import { useAlcaldiaPanel, type AlcaldiaPanelData } from "@/hooks/useAlcaldiaPanel"
import { cn } from "@/lib/utils"

export type { AlcaldiaPanelData }

// Claves en inglés: coinciden con riskLevel del backend (LOW | MODERATE | HIGH)
// Escala: LOW = 0-40 verde | MODERATE = 41-70 amarillo | HIGH = 71-100 rojo
const NIVEL_CONFIG: Record<string, { label: string; color: string; barColor: string; destructive: boolean }> = {
  HIGH:     { label: "IRSA Alto",    color: "text-red-500",    barColor: "bg-red-500",    destructive: true  },
  MODERATE: { label: "IRSA Regular", color: "text-yellow-500", barColor: "bg-yellow-400", destructive: false },
  LOW:      { label: "IRSA Bajo",    color: "text-emerald-500",barColor: "bg-emerald-500",destructive: false },
  // Retrocompatibilidad con registros históricos que puedan tener CRITICAL
  CRITICAL: { label: "IRSA Alto",    color: "text-red-500",    barColor: "bg-red-500",    destructive: true  },
}

function MiniProgress({ value, colorClass }: { value: number; colorClass: string }) {
  return (
    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
      <div
        className={cn("h-full rounded-full transition-all duration-500", colorClass)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

function StatRow({
  icon,
  label,
  value,
  unit = "%",
  colorClass,
}: {
  icon: React.ReactNode
  label: string
  value: number
  unit?: string
  colorClass: string
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          {icon}
          {label}
        </span>
        <span className="font-semibold tabular-nums">
          {value.toFixed(0)}{unit}
        </span>
      </div>
      <MiniProgress value={value} colorClass={colorClass} />
    </div>
  )
}

// ─── Vista presentacional ─────────────────────────────────────────────────────
// Recibe todos los datos como props — sin fetches, sin router, sin store.
// Es la versión que se usa en Storybook y en tests unitarios.

export interface AlcaldiaInfoPanelViewProps {
  /** Nombre de la alcaldía seleccionada */
  alcaldiaName: string
  /** Datos devueltos por el backend; null mientras carga o en error */
  data: AlcaldiaPanelData | null
  /** true mientras el fetch está en curso */
  loading: boolean
  /** Mensaje de error; null si no hubo error */
  error: string | null
  /** Callback al pulsar el botón cerrar (×) */
  onClose: () => void
  /** Callback al pulsar "Ver detalles completos" */
  onVerDetalles: () => void
}

export function AlcaldiaInfoPanelView({
  alcaldiaName,
  data,
  loading,
  error,
  onClose,
  onVerDetalles,
}: AlcaldiaInfoPanelViewProps) {
  const nivel = data ? NIVEL_CONFIG[data.nivelRiesgo] ?? NIVEL_CONFIG["MODERATE"] : null

  // puntajeAire viene del backend en escala 0-1. Lo convertimos a 0-100 e invertimos
  // para mostrar "calidad de aire" (mayor = mejor).
  const calidadAire = data ? Math.max(0, 100 - data.puntajeAire * 100) : null
  const aireColor   = calidadAire == null ? "bg-muted-foreground"
                    : calidadAire >= 70   ? "bg-emerald-500"
                    : calidadAire >= 40   ? "bg-amber-400"
                    : "bg-red-500"

  return (
    <Card className="w-72 shadow-xl border-border/50 bg-card/90 backdrop-blur-sm">
      {/* Header */}
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3 pt-4 px-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base leading-tight truncate">{alcaldiaName}</h3>
          {nivel ? (
            <Badge
              variant={nivel.destructive ? "destructive" : "outline"}
              className="mt-1.5 text-xs"
            >
              {nivel.label}
            </Badge>
          ) : (
            <div className="mt-1.5 h-5 w-20 rounded bg-muted animate-pulse" />
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full -mt-1 -mr-1 shrink-0"
          onClick={onClose}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </CardHeader>

      <CardContent className="px-4 pb-4 space-y-4">
        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center gap-2 py-4 text-xs text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Cargando datos...
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="flex items-start gap-2 text-xs text-muted-foreground py-1">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        {/* Data (success state) */}
        {data && !loading && (
          <>
            {/* IRSA value */}
            <div className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2">
              <span className="text-xs text-muted-foreground">Índice IRSA</span>
              <span className={cn("text-sm font-bold tabular-nums", nivel?.color)}>
                {data.valorIrsa.toFixed(1)}
                <span className="text-xs font-normal text-muted-foreground ml-0.5">/ 100</span>
              </span>
            </div>

            {/* Metrics */}
            <div className="space-y-3">
              {calidadAire !== null && (
                <StatRow
                  icon={<Wind className="h-3.5 w-3.5" />}
                  label="Calidad de aire"
                  value={calidadAire}
                  colorClass={aireColor}
                />
              )}

              {data.humedad !== null && (
                <StatRow
                  icon={<Droplets className="h-3.5 w-3.5" />}
                  label="Humedad"
                  value={data.humedad}
                  colorClass="bg-sky-400"
                />
              )}

              {data.temperatura !== null && (
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Thermometer className="h-3.5 w-3.5" />
                    Temperatura
                  </span>
                  <span className="font-semibold tabular-nums">{data.temperatura.toFixed(1)} °C</span>
                </div>
              )}
            </div>

            {/* Contaminantes */}
            {Object.keys(data.promediosPorContaminante).length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Contaminantes
                </p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  {Object.entries(data.promediosPorContaminante)
                    .slice(0, 4)
                    .map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{key}</span>
                        <span className="text-xs font-semibold tabular-nums">
                          {val.toFixed(1)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {!data.tieneDataClima && (
              <p className="text-xs text-muted-foreground/70 italic">
                Sin datos climáticos recientes
              </p>
            )}
          </>
        )}

        <Button
          size="sm"
          className="w-full h-8 text-xs gap-1.5"
          onClick={onVerDetalles}
        >
          Ver detalles completos
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </CardContent>
    </Card>
  )
}

// ─── Conector (versión real con store + hook) ─────────────────────────────────
// Esta es la que se monta en RiskMapPage; no se toca en Storybook.

export function AlcaldiaInfoPanel() {
  const navigate = useNavigate()
  const { selectedAlcaldia, setSelectedAlcaldia } = useRiskStore()
  const { data, loading, error } = useAlcaldiaPanel(selectedAlcaldia)

  if (!selectedAlcaldia) return null

  return (
    <AlcaldiaInfoPanelView
      alcaldiaName={selectedAlcaldia}
      data={data}
      loading={loading}
      error={error}
      onClose={() => setSelectedAlcaldia(null)}
      onVerDetalles={() => navigate("/detalle")}
    />
  )
}
