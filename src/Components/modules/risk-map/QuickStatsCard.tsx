import { Card, CardContent } from "@/components/ui/card"
import { ShieldAlert, Users, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function QuickStatsCard() {
  const stats = [
    {
      label: "Zonas en Riesgo",
      value: "12",
      icon: ShieldAlert,
      color: "text-red-500",
    },
    {
      label: "Población Afectada",
      value: "2,450",
      icon: Users,
      color: "text-blue-500",
    },
    {
      label: "Zonas Seguras",
      value: "45",
      icon: CheckCircle,
      color: "text-green-500",
    },
  ]

  return (
    <div className="flex gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="min-w-[180px] border-border/50 bg-card/80 backdrop-blur-sm shadow-lg transition-transform hover:scale-105">
          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className={cn("p-1.5 rounded-lg bg-background/50", stat.color.replace('text-', 'bg-').replace('500', '500/10'))}>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black tracking-tight">{stat.value}</span>
              {stat.label === "Población Afectada" && <span className="text-[10px] text-muted-foreground font-medium">pax</span>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
