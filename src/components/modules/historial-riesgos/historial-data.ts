export interface DataPoint {
  mes: string;
  indice: number;
  tendencia: number;
}

export interface Metricas {
  indiceActual: number;
  variacionMes: number;
  promedioMensual: number;
  maximoRegistrado: number;
  mesesAtrasMaximo: number;
  tendencia: "Positiva" | "Negativa" | "Estable";
  tendenciaLabel: string;
}

export const DATA_CDMX: DataPoint[] = [
  { mes: "Ene", indice: 72, tendencia: 71 },
  { mes: "Feb", indice: 74, tendencia: 72 },
  { mes: "Mar", indice: 71, tendencia: 72 },
  { mes: "Abr", indice: 75, tendencia: 73 },
  { mes: "May", indice: 76, tendencia: 74 },
  { mes: "Jun", indice: 79, tendencia: 76 },
  { mes: "Jul", indice: 82, tendencia: 78 },
  { mes: "Ago", indice: 84, tendencia: 81 },
  { mes: "Sep", indice: 90, tendencia: 84 },
  { mes: "Oct", indice: 89, tendencia: 86 },
  { mes: "Nov", indice: 83, tendencia: 85 },
  { mes: "Dic", indice: 78, tendencia: 83 },
];

export function getMetricas(data: DataPoint[]): Metricas {
  const last     = data[data.length - 1].indice;
  const prev     = data[data.length - 2].indice;
  const promedio = Math.round(data.reduce((s, d) => s + d.indice, 0) / data.length * 10) / 10;
  const maximo   = Math.max(...data.map((d) => d.indice));
  const maxIdx   = data.findIndex((d) => d.indice === maximo);
  const mesesAtras = data.length - 1 - maxIdx;
  const variacion  = Math.round((last - prev) * 10) / 10;

  return {
    indiceActual: last,
    variacionMes: variacion,
    promedioMensual: promedio,
    maximoRegistrado: maximo,
    mesesAtrasMaximo: mesesAtras,
    tendencia: variacion >= 0 ? "Positiva" : "Negativa",
    tendenciaLabel: variacion >= 0 ? "Mejorando" : "Descendiendo",
  };
}
