import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldAlert, ShieldCheck, AlertTriangle, Activity, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAlcaldias } from "@/hooks/useAlcaldias"
import { api } from "@/Services/backendApi"

interface StatCard {
  label: string
  value: number
  unit?: string
  icon: React.ElementType
  colorText: string
  colorBg: string
}

export function QuickStatsCard() {
  const { zonas } = useAlcaldias()
  const [casosRespiratorios, setCasosRespiratorios] = useState<number | null>(null)

  useEffect(() => {
    api.salud
      .porAnio(new Date().getFullYear())
      .then((rows) => {
        if (rows.length === 0) return
        const total = rows.reduce(
          (sum, r) => sum + r.casosNeumonia + r.casosEpoc + r.casosAsma,
          0
        )
        setCasosRespiratorios(total)
      })
      .catch(() => {/* sin datos de salud, no mostramos la tarjeta */})
  }, [])

  const critico  = zonas.filter((z) => z.riskLevel === "critico").length
  const alto     = zonas.filter((z) => z.riskLevel === "alto").length
  const moderado = zonas.filter((z) => z.riskLevel === "moderado").length
  const seguro   = zonas.filter((z) => z.riskLevel === "seguro").length

  const indSalud = zonas.length > 0
    ? Math.round(100 - zonas.reduce((s, z) => s + z.calidadAire, 0) / zonas.length)
    : null

  const cards: StatCard[] = [
    critico + alto > 0 && {
      label:     critico > 0 ? "En riesgo crítico" : "En alto riesgo",
      value:     critico + alto,
      unit:      critico + alto === 1 ? "alcaldía" : "alcaldías",
      icon:      ShieldAlert,
      colorText: "text-red-500",
      colorBg:   "bg-red-500/10",
    },
    moderado > 0 && {
      label:     "Riesgo moderado",
      value:     moderado,
      unit:      moderado === 1 ? "alcaldía" : "alcaldías",
      icon:      AlertTriangle,
      colorText: "text-amber-500",
      colorBg:   "bg-amber-500/10",
    },
    seguro > 0 && {
      label:     "Zonas seguras",
      value:     seguro,
      unit:      seguro === 1 ? "alcaldía" : "alcaldías",
      icon:      ShieldCheck,
      colorText: "text-emerald-500",
      colorBg:   "bg-emerald-500/10",
    },
    casosRespiratorios !== null && {
      label:     "Casos respiratorios",
      value:     casosRespiratorios,
      unit:      "registros",
      icon:      Activity,
      colorText: "text-sky-500",
      colorBg:   "bg-sky-500/10",
    },
    indSalud !== null && {
      label:     "Índice de Salud",
      value:     indSalud,
      unit:      "/ 100",
      icon:      Heart,
      colorText: indSalud >= 70 ? "text-emerald-500" : indSalud >= 50 ? "text-amber-500" : "text-red-500",
      colorBg:   indSalud >= 70 ? "bg-emerald-500/10" : indSalud >= 50 ? "bg-amber-500/10" : "bg-red-500/10",
    },
  ].filter(Boolean) as StatCard[]

  if (cards.length === 0) return null

  return (
    <div className="flex gap-3">
      {cards.map((stat) => (
        <Card
          key={stat.label}
          className="min-w-42.5 border-border/50 bg-card/80 backdrop-blur-sm shadow-lg transition-transform hover:scale-105"
        >
          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className={cn("p-1.5 rounded-lg", stat.colorBg)}>
                <stat.icon className={cn("h-4 w-4", stat.colorText)} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black tracking-tight">
                {stat.value.toLocaleString("es-MX")}
              </span>
              {stat.unit && (
                <span className="text-[10px] text-muted-foreground font-medium">
                  {stat.unit}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
