export type RiskTag = "Bajo" | "Moderado" | "Alto" | "Crítico" | "Óptimo";

export interface VariableCritica {
  temperatura: number;
  humedad: number;
  calidadAire: number;
  riesgoTemperatura: RiskTag;
}

export interface DetalleAlcaldia {
  nombre: string;
  ciudad: string;
  irsa: number;
  irsaMax: number;
  irsaDescripcion: string;
  variables: VariableCritica;
}

// Escala 0-100 (consistente con el backend: valorIrsa × 100)
const DATA: Record<string, DetalleAlcaldia> = {
  "Álvaro Obregón":          { nombre: "Álvaro Obregón",          ciudad: "Ciudad de México, México", irsa: 41, irsaMax: 100, irsaDescripcion: "Riesgo moderado, monitoreo continuo recomendado", variables: { temperatura: 22, humedad: 58, calidadAire: 52, riesgoTemperatura: "Óptimo"   } },
  "Azcapotzalco":            { nombre: "Azcapotzalco",            ciudad: "Ciudad de México, México", irsa: 58, irsaMax: 100, irsaDescripcion: "Nivel de riesgo elevado, atención prioritaria",   variables: { temperatura: 26, humedad: 50, calidadAire: 68, riesgoTemperatura: "Moderado" } },
  "Benito Juárez":           { nombre: "Benito Juárez",           ciudad: "Ciudad de México, México", irsa: 24, irsaMax: 100, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 21, humedad: 62, calidadAire: 38, riesgoTemperatura: "Óptimo"   } },
  "Coyoacán":                { nombre: "Coyoacán",                ciudad: "Ciudad de México, México", irsa: 29, irsaMax: 100, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 20, humedad: 65, calidadAire: 40, riesgoTemperatura: "Óptimo"   } },
  "Cuajimalpa de Morelos":   { nombre: "Cuajimalpa de Morelos",   ciudad: "Ciudad de México, México", irsa: 30, irsaMax: 100, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 18, humedad: 70, calidadAire: 35, riesgoTemperatura: "Óptimo"   } },
  "Cuauhtémoc":              { nombre: "Cuauhtémoc",              ciudad: "Ciudad de México, México", irsa: 32, irsaMax: 100, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 28, humedad: 62, calidadAire: 45, riesgoTemperatura: "Moderado" } },
  "Gustavo A. Madero":       { nombre: "Gustavo A. Madero",       ciudad: "Ciudad de México, México", irsa: 71, irsaMax: 100, irsaDescripcion: "Riesgo crítico, intervención inmediata necesaria", variables: { temperatura: 31, humedad: 42, calidadAire: 88, riesgoTemperatura: "Alto"     } },
  "Iztacalco":               { nombre: "Iztacalco",               ciudad: "Ciudad de México, México", irsa: 52, irsaMax: 100, irsaDescripcion: "Riesgo moderado, monitoreo continuo recomendado", variables: { temperatura: 27, humedad: 55, calidadAire: 60, riesgoTemperatura: "Moderado" } },
  "Iztapalapa":              { nombre: "Iztapalapa",              ciudad: "Ciudad de México, México", irsa: 83, irsaMax: 100, irsaDescripcion: "Riesgo crítico, intervención inmediata necesaria", variables: { temperatura: 33, humedad: 40, calidadAire: 95, riesgoTemperatura: "Crítico"  } },
  "La Magdalena Contreras":  { nombre: "La Magdalena Contreras",  ciudad: "Ciudad de México, México", irsa: 21, irsaMax: 100, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 17, humedad: 72, calidadAire: 30, riesgoTemperatura: "Óptimo"   } },
  "Miguel Hidalgo":          { nombre: "Miguel Hidalgo",          ciudad: "Ciudad de México, México", irsa: 34, irsaMax: 100, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 23, humedad: 60, calidadAire: 42, riesgoTemperatura: "Óptimo"   } },
  "Milpa Alta":              { nombre: "Milpa Alta",              ciudad: "Ciudad de México, México", irsa: 18, irsaMax: 100, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 16, humedad: 75, calidadAire: 22, riesgoTemperatura: "Óptimo"   } },
  "Tláhuac":                 { nombre: "Tláhuac",                 ciudad: "Ciudad de México, México", irsa: 55, irsaMax: 100, irsaDescripcion: "Riesgo moderado, monitoreo continuo recomendado", variables: { temperatura: 29, humedad: 48, calidadAire: 70, riesgoTemperatura: "Alto"     } },
  "Tlalpan":                 { nombre: "Tlalpan",                 ciudad: "Ciudad de México, México", irsa: 26, irsaMax: 100, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 19, humedad: 68, calidadAire: 33, riesgoTemperatura: "Óptimo"   } },
  "Venustiano Carranza":     { nombre: "Venustiano Carranza",     ciudad: "Ciudad de México, México", irsa: 60, irsaMax: 100, irsaDescripcion: "Nivel de riesgo elevado, atención prioritaria",   variables: { temperatura: 30, humedad: 45, calidadAire: 78, riesgoTemperatura: "Alto"     } },
  "Xochimilco":              { nombre: "Xochimilco",              ciudad: "Ciudad de México, México", irsa: 40, irsaMax: 100, irsaDescripcion: "Riesgo moderado, monitoreo continuo recomendado", variables: { temperatura: 24, humedad: 80, calidadAire: 48, riesgoTemperatura: "Moderado" } },
};

const FALLBACK: DetalleAlcaldia = {
  nombre: "Alcaldía",
  ciudad: "Ciudad de México, México",
  irsa: 50,
  irsaMax: 100,
  irsaDescripcion: "Datos no disponibles",
  variables: { temperatura: 25, humedad: 60, calidadAire: 50, riesgoTemperatura: "Moderado" },
};

export function getDetalleAlcaldia(nombre: string): DetalleAlcaldia {
  return DATA[nombre] ?? FALLBACK;
}

export function getIrsaColor(irsa: number): string {
  if (irsa <= 40) return "text-emerald-500";
  if (irsa <= 60) return "text-yellow-500";
  if (irsa <= 80) return "text-orange-500";
  return "text-red-600";
}

// Clases bg como literales para que Tailwind las incluya en el bundle
export function getIrsaBgColor(irsa: number): string {
  if (irsa <= 40) return "bg-emerald-500";
  if (irsa <= 60) return "bg-yellow-400";
  if (irsa <= 80) return "bg-orange-500";
  return "bg-red-500";
}

export const RISK_TAG_COLOR: Record<RiskTag, string> = {
  Óptimo:   "text-emerald-600 bg-emerald-50",
  Bajo:     "text-emerald-600 bg-emerald-50",
  Moderado: "text-yellow-600 bg-yellow-50",
  Alto:     "text-orange-600 bg-orange-50",
  Crítico:  "text-red-600   bg-red-50",
};
