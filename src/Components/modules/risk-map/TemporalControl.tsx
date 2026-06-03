import { Slider } from "@/Components/ui/slider"
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import { useRiskStore } from "@/store/useRiskStore"

function labelForOffset(offset: number) {
  if (offset === 0) return "Hoy"
  if (offset === -1) return "Ayer"
  return `Hace ${Math.abs(offset)} dias`
}

export function TemporalControl() {
  const selectedDayOffset = useRiskStore((s) => s.selectedDayOffset)
  const setSelectedDayOffset = useRiskStore((s) => s.setSelectedDayOffset)
  const stepBackward = () => setSelectedDayOffset(Math.max(-10, selectedDayOffset - 1))
  const stepForward = () => setSelectedDayOffset(Math.min(0, selectedDayOffset + 1))

  return (
    <div className="w-[min(420px,calc(100vw-2rem))] rounded-lg border border-border/70 bg-background/90 px-3 py-2 shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-3">
        <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />

        <div className="min-w-14 text-[11px] font-semibold tabular-nums text-muted-foreground">
          -10 dias
        </div>

        <button
          type="button"
          className="flex size-6 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
          onClick={stepBackward}
          disabled={selectedDayOffset <= -10}
          aria-label="Dia anterior"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        <Slider
          value={selectedDayOffset}
          min={-10}
          max={0}
          step={1}
          className="min-w-0 flex-1"
          onValueChange={(value) => setSelectedDayOffset(typeof value === "number" ? value : value[0] ?? 0)}
          aria-label="Seleccionar dia historico"
        />

        <button
          type="button"
          className="flex size-6 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
          onClick={stepForward}
          disabled={selectedDayOffset >= 0}
          aria-label="Dia siguiente"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>

        <div className="min-w-20 text-right text-xs font-bold text-foreground">
          {labelForOffset(selectedDayOffset)}
        </div>
      </div>
    </div>
  )
}
