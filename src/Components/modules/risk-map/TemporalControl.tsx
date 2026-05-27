import { Card, CardContent } from "@/Components/ui/card"
import { Slider } from "@/Components/ui/slider"
import { Badge } from "@/Components/ui/badge"
import { Calendar, Database } from "lucide-react"

export function TemporalControl() {
  return (
    <Card className="w-full max-w-xl">
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold">Control Temporal</span>
            <Badge variant="secondary" className="text-[10px] gap-1 px-1.5 py-0.5">
              <Database className="h-3 w-3" />
              Historico
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            Ultimo registro
          </span>
        </div>

        <Slider
          value={[0]}
          min={0}
          max={0}
          step={1}
          className="w-full"
          disabled
        />

        <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-bold px-1">
          <span>Base historica</span>
          <span className="text-foreground">Ultimo calculo disponible</span>
        </div>

        <p className="text-center text-xs text-muted-foreground -mt-1">
          El mapa usa el ultimo IRSA guardado por alcaldia.
        </p>
      </CardContent>
    </Card>
  )
}
