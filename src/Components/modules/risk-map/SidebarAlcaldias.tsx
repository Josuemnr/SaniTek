import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MapPin, X } from "lucide-react"
import { useRiskStore } from "@/store/useRiskStore"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAlcaldias } from "@/hooks/useAlcaldias"
import { RISK_LEVEL_CONFIG } from "@/components/modules/filtrar-alcaldias/alcaldias-filter-data"

const ALCALDIAS = [
  "Álvaro Obregón",
  "Azcapotzalco",
  "Benito Juárez",
  "Coyoacán",
  "Cuajimalpa de Morelos",
  "Cuauhtémoc",
  "Gustavo A. Madero",
  "Iztacalco",
  "Iztapalapa",
  "La Magdalena Contreras",
  "Miguel Hidalgo",
  "Milpa Alta",
  "Tláhuac",
  "Tlalpan",
  "Venustiano Carranza",
  "Xochimilco",
]

export function SidebarAlcaldias() {
  const { selectedAlcaldia, setSelectedAlcaldia } = useRiskStore()
  const { zonas } = useAlcaldias()

  const riskByName = useMemo(
    () => Object.fromEntries(zonas.map((z) => [z.nombre, z.riskLevel])),
    [zonas]
  )

  return (
    <Card className="h-full w-80 flex flex-col shadow-xl border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <MapPin className="h-5 w-5 text-brand-primary" />
          Alcaldías
        </CardTitle>
        {selectedAlcaldia && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setSelectedAlcaldia(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="flex flex-col gap-1 p-4">
            {ALCALDIAS.map((alcaldia) => {
              const riskLevel = riskByName[alcaldia] ?? null
              const config    = riskLevel ? RISK_LEVEL_CONFIG[riskLevel] : null
              const isSelected = selectedAlcaldia === alcaldia

              return (
                <div
                  key={alcaldia}
                  onClick={() => setSelectedAlcaldia(isSelected ? null : alcaldia)}
                  className={cn(
                    "group flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent/50"
                  )}
                  role="button"
                  aria-pressed={isSelected}
                >
                  <span className="text-sm font-medium">{alcaldia}</span>

                  <Badge
                    variant="outline"
                    className={cn(
                      "border font-medium transition-colors",
                      isSelected
                        ? "bg-white text-primary border-white/50"
                        : config
                          ? `${config.color} border-current bg-transparent`
                          : "text-muted-foreground"
                    )}
                  >
                    {isSelected ? "Seleccionado" : (config?.label ?? "...")}
                  </Badge>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
