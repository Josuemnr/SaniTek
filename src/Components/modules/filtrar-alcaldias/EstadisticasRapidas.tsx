import { AlertTriangle, CircleDot, CheckCircle2, Users } from "lucide-react";

interface EstadisticasRapidasProps {
  criticas: number;
  altoRiesgo: number;
  seguras: number;
  poblacion: string;
}

const STATS = [
  {
    key: "criticas" as const,
    label: "Zonas Críticas",
    icon: AlertTriangle,
    iconClass: "text-red-500",
    bgClass: "bg-red-50",
  },
  {
    key: "altoRiesgo" as const,
    label: "Zonas Alto Riesgo",
    icon: CircleDot,
    iconClass: "text-amber-500",
    bgClass: "bg-amber-50",
  },
  {
    key: "seguras" as const,
    label: "Zonas Seguras",
    icon: CheckCircle2,
    iconClass: "text-emerald-500",
    bgClass: "bg-emerald-50",
  },
  {
    key: "poblacion" as const,
    label: "Población Afectada",
    icon: Users,
    iconClass: "text-blue-500",
    bgClass: "bg-blue-50",
  },
] as const;

export function EstadisticasRapidas({
  criticas,
  altoRiesgo,
  seguras,
  poblacion,
}: EstadisticasRapidasProps) {
  const values = { criticas, altoRiesgo, seguras, poblacion };

  return (
    <div className="w-72 shrink-0 bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4 h-fit">
      <h3 className="text-sm font-bold text-gray-800">Estadísticas Rápidas</h3>
      <div className="flex flex-col gap-3">
        {STATS.map(({ key, label, icon: Icon, iconClass, bgClass }) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${bgClass}`}>
                <Icon className={`w-4 h-4 ${iconClass}`} />
              </div>
              <span className="text-sm text-gray-600">{label}</span>
            </div>
            <span className="text-sm font-bold text-gray-800">{values[key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
