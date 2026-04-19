import { TrendingUp, TrendingDown, BarChart2, Calendar } from "lucide-react";
import { MetricCard } from "./MetricCard";
import type { Metricas } from "./historial-data";

interface MetricsRowProps {
  metricas: Metricas;
}

export function MetricsRow({ metricas }: MetricsRowProps) {
  const { indiceActual, variacionMes, promedioMensual, maximoRegistrado, mesesAtrasMaximo, tendencia, tendenciaLabel } = metricas;

  const variacionLabel = `${variacionMes >= 0 ? "+" : ""}${variacionMes} vs mes anterior`;
  const variacionColor = variacionMes >= 0 ? "text-emerald-600" : "text-red-500";

  const TendenciaIcon = tendencia === "Positiva" ? TrendingUp : TrendingDown;
  const tendenciaColor = tendencia === "Positiva" ? "text-emerald-600" : "text-red-500";

  return (
    <div className="flex gap-4 shrink-0">
      <MetricCard
        label="Índice Actual"
        value={indiceActual}
        sub={variacionLabel}
        subColor={variacionColor}
        icon={<BarChart2 className="w-4 h-4" />}
      />
      <MetricCard
        label="Promedio Mensual"
        value={promedioMensual}
        sub="Últimos 12 meses"
        icon={<Calendar className="w-4 h-4" />}
      />
      <MetricCard
        label="Máximo Registrado"
        value={maximoRegistrado}
        sub={`Hace ${mesesAtrasMaximo} ${mesesAtrasMaximo === 1 ? "mes" : "meses"}`}
        icon={<TrendingUp className="w-4 h-4" />}
      />
      <MetricCard
        label="Tendencia"
        value={tendenciaLabel}
        sub={tendencia}
        subColor={tendenciaColor}
        icon={<TendenciaIcon className={`w-4 h-4 ${tendenciaColor}`} />}
      />
    </div>
  );
}
