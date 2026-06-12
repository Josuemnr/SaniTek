import { useEffect, useState } from "react"
import { Card, CardContent } from "@/Components/ui/card"
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

function getHealthIndexColors(indSalud: number) {
  if (indSalud >= 70) {
    return { text: "text-emerald-500", bg: "bg-emerald-500/10" };
  }
  if (indSalud >= 50) {
    return { text: "text-amber-500", bg: "bg-amber-500/10" };
  }
  return { text: "text-red-500", bg: "bg-red-500/10" };
}

export function QuickStatsCard() {
  const { zonas } = useAlcaldias()
  const [casosRespiratorios, setCasosRespiratorios] = useState<number | null>(null)

  useEffect(() => {
    api.health
      .listAll()
      .then((rows) => {
        if (rows.length === 0) return
        const total = rows.reduce((sum, r) => sum + r.totalCases, 0)
        setCasosRespiratorios(total)
      })
      .catch(() => {/* sin datos de salud, no mostramos la tarjeta */})
  }, [])

  const counts = {
    critico:  zonas.filter((z) => z.riskLevel === "critico").length,
    alto:     zonas.filter((z) => z.riskLevel === "alto").length,
    moderado: zonas.filter((z) => z.riskLevel === "moderado").length,
    seguro:   zonas.filter((z) => z.riskLevel === "seguro").length,
  }

  const indSalud = zonas.length > 0
    ? Math.round(100 - zonas.reduce((s, z) => s + z.calidadAire, 0) / zonas.length)
    : null

  const statCards: (StatCard | false)[] = []

  // Tarjeta de Riesgo
  const totalRiesgo = counts.critico + counts.alto;
  if (totalRiesgo > 0) {
    statCards.push({
      label:     counts.critico > 0 ? "En riesgo crítico" : "En alto riesgo",
      value:     totalRiesgo,
      unit:      totalRiesgo === 1 ? "alcaldía" : "alcaldías",
      icon:      ShieldAlert,
      colorText: "text-red-500",
      colorBg:   "bg-red-500/10",
    });
  }

  // Tarjeta Moderada
  if (counts.moderado > 0) {
    statCards.push({
      label:     "Riesgo moderado",
      value:     counts.moderado,
      unit:      counts.moderado === 1 ? "alcaldía" : "alcaldías",
      icon:      AlertTriangle,
      colorText: "text-amber-500",
      colorBg:   "bg-amber-500/10",
    });
  }

  // Tarjeta Segura
  if (counts.seguro > 0) {
    statCards.push({
      label:     "Zonas seguras",
      value:     counts.seguro,
      unit:      counts.seguro === 1 ? "alcaldía" : "alcaldías",
      icon:      ShieldCheck,
      colorText: "text-emerald-500",
      colorBg:   "bg-emerald-500/10",
    });
  }

  // Tarjeta Salud (Casos)
  if (casosRespiratorios !== null) {
    statCards.push({
      label:     "Casos respiratorios",
      value:     casosRespiratorios,
      unit:      "registros",
      icon:      Activity,
      colorText: "text-sky-500",
      colorBg:   "bg-sky-500/10",
    });
  }

  // Tarjeta Índice Salud
  if (indSalud !== null) {
    const colors = getHealthIndexColors(indSalud);
    statCards.push({
      label:     "Índice de Salud",
      value:     indSalud,
      unit:      "/ 100",
      icon:      Heart,
      colorText: colors.text,
      colorBg:   colors.bg,
    });
  }

  if (statCards.length === 0) return null

  return (
    <div className="flex gap-3">
      {statCards.map((stat) => (
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
