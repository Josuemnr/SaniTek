export type RiskLevel = "critico" | "alto" | "moderado" | "seguro";
export type FilterType = "densidad" | "calidad-aire" | "humedad";

export interface Zona {
  id: string;
  nombre: string;
  alcaldia: string;
  riskLevel: RiskLevel;
  densidad: number;
  calidadAire: number;
  humedad: number;
}

export const RISK_LEVEL_CONFIG: Record<RiskLevel, { label: string; color: string; bg: string }> = {
  critico:  { label: "Crítico",    color: "text-red-600",    bg: "bg-red-500" },
  alto:     { label: "Alto riesgo", color: "text-amber-500",  bg: "bg-amber-400" },
  moderado: { label: "Moderado",   color: "text-yellow-500", bg: "bg-yellow-400" },
  seguro:   { label: "Seguro",     color: "text-emerald-600", bg: "bg-emerald-500" },
};

export const FILTER_CONFIG: Record<FilterType, { label: string; icon: string }> = {
  "densidad":     { label: "Densidad",       icon: "BarChart2" },
  "calidad-aire": { label: "Calidad de aire", icon: "Wind" },
  "humedad":      { label: "Humedad",        icon: "Droplets" },
};

export const ZONAS_MOCK: Zona[] = [
  { id: "1",  nombre: "Neza Norte",         alcaldia: "Nezahualcóyotl", riskLevel: "alto",     densidad: 82, calidadAire: 45, humedad: 60 },
  { id: "2",  nombre: "Tepito",             alcaldia: "Cuauhtémoc",     riskLevel: "critico",  densidad: 95, calidadAire: 20, humedad: 40 },
  { id: "3",  nombre: "Doctores",           alcaldia: "Cuauhtémoc",     riskLevel: "alto",     densidad: 78, calidadAire: 35, humedad: 55 },
  { id: "4",  nombre: "Santa Fe",           alcaldia: "Cuajimalpa",     riskLevel: "seguro",   densidad: 30, calidadAire: 80, humedad: 70 },
  { id: "5",  nombre: "Pedregal",           alcaldia: "Coyoacán",       riskLevel: "seguro",   densidad: 25, calidadAire: 85, humedad: 65 },
  { id: "6",  nombre: "Xochimilco Centro",  alcaldia: "Xochimilco",     riskLevel: "moderado", densidad: 55, calidadAire: 60, humedad: 80 },
  { id: "7",  nombre: "Tláhuac Centro",     alcaldia: "Tláhuac",        riskLevel: "moderado", densidad: 60, calidadAire: 55, humedad: 75 },
  { id: "8",  nombre: "Indios Verdes",      alcaldia: "Gustavo A. Madero", riskLevel: "critico", densidad: 90, calidadAire: 15, humedad: 35 },
  { id: "9",  nombre: "Aragón",             alcaldia: "Gustavo A. Madero", riskLevel: "alto",  densidad: 75, calidadAire: 40, humedad: 50 },
  { id: "10", nombre: "Iztapalapa Centro",  alcaldia: "Iztapalapa",     riskLevel: "critico",  densidad: 92, calidadAire: 18, humedad: 38 },
  { id: "11", nombre: "Ermita Iztapalapa",  alcaldia: "Iztapalapa",     riskLevel: "alto",     densidad: 80, calidadAire: 32, humedad: 48 },
  { id: "12", nombre: "Tlalpan Centro",     alcaldia: "Tlalpan",        riskLevel: "seguro",   densidad: 28, calidadAire: 88, humedad: 72 },
];

export function getEstadisticas(zonas: Zona[]) {
  const criticas  = zonas.filter((z) => z.riskLevel === "critico").length;
  const altoRiesgo = zonas.filter((z) => z.riskLevel === "alto").length;
  const seguras   = zonas.filter((z) => z.riskLevel === "seguro").length;
  const poblacion = (criticas * 0.8 + altoRiesgo * 0.5 + seguras * 0.1).toFixed(1);
  return { criticas, altoRiesgo, seguras, poblacion: `${poblacion}M` };
}

const RISK_ORDER: Record<RiskLevel, number> = {
  critico:  0,
  alto:     1,
  moderado: 2,
  seguro:   3,
};

export function filterZonas(zonas: Zona[], activeFilters: FilterType[]): Zona[] {
  const filtered = activeFilters.length === 0
    ? zonas
    : zonas.filter((z) =>
        activeFilters.every((f) => {
          if (f === "densidad")     return z.densidad > 70;
          if (f === "calidad-aire") return z.calidadAire < 50;
          if (f === "humedad")      return z.humedad > 60;
          return true;
        })
      );

  return [...filtered].sort((a, b) => RISK_ORDER[a.riskLevel] - RISK_ORDER[b.riskLevel]);
}
