import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "lucide-react"
import { useRiskStore } from "@/store/useRiskStore"
import { format, startOfDay } from "date-fns"

export function TemporalControl() {
  const { currentTime, setCurrentTime } = useRiskStore()
  
  // Base time for the slider (start of today)
  const today = startOfDay(new Date())
  
  // Convert current time to a 0-24 hour value for the slider
  const currentHour = (currentTime - today.getTime()) / (1000 * 60 * 60)
  
  const handleValueChange = (values: number[]) => {
    const newTime = today.getTime() + values[0] * 1000 * 60 * 60
    setCurrentTime(newTime)
  }

  return (
    <Card className="w-full max-w-xl">
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold">Control Temporal</span>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {format(currentTime, "HH:mm")} - {format(today, "dd MMM yyyy")}
          </span>
        </div>
        <Slider
          value={[currentHour]}
          onValueChange={handleValueChange}
          max={23.99}
          step={0.25}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-bold px-1">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:59</span>
        </div>
      </CardContent>
    </Card>
  )
}
