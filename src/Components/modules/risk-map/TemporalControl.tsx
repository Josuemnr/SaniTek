import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp } from "lucide-react"
import { useRiskStore } from "@/store/useRiskStore"
import { format, addDays } from "date-fns"
import { es } from "date-fns/locale"

const DAYS_RANGE = 10

function dayLabel(offset: number): string {
  if (offset === 0)  return "Hoy"
  if (offset === -1) return "Ayer"
  if (offset === 1)  return "Mañana"
  if (offset < 0)    return `Hace ${Math.abs(offset)} días`
  return `En ${offset} días`
}

export function TemporalControl() {
  const { selectedDayOffset, setSelectedDayOffset } = useRiskStore()

  const selectedDate = addDays(new Date(), selectedDayOffset)
  const isFuture     = selectedDayOffset > 0

  return (
    <Card className="w-full max-w-xl">
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold">Control Temporal</span>
            {isFuture && (
              <Badge variant="secondary" className="text-[10px] gap-1 px-1.5 py-0.5">
                <TrendingUp className="h-3 w-3" />
                Predicción
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {format(selectedDate, "dd MMM yyyy", { locale: es })}
          </span>
        </div>

        <Slider
          value={[selectedDayOffset]}
          onValueChange={(value) => {
            const v = Array.isArray(value) ? value[0] : value
            setSelectedDayOffset(v)
          }}
          min={-DAYS_RANGE}
          max={DAYS_RANGE}
          step={1}
          className="w-full"
        />

        <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-bold px-1">
          <span>-10d</span>
          <span>-5d</span>
          <span className="text-foreground">Hoy</span>
          <span>+5d</span>
          <span>+10d</span>
        </div>

        <p className="text-center text-xs text-muted-foreground -mt-1">
          {dayLabel(selectedDayOffset)}
        </p>
      </CardContent>
    </Card>
  )
}
