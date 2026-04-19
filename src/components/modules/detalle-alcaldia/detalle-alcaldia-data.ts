export type RiskTag = "Bajo" | "Moderado" | "Alto" | "Crítico" | "Óptimo";

export interface VariableCritica {
  temperatura: number;
  humedad: number;
  densidad: number;
  calidadAire: number;
  riesgoTemperatura: RiskTag;
  riesgoDensidad: RiskTag;
}

export interface DetalleAlcaldia {
  nombre: string;
  ciudad: string;
  irsa: number;
  irsaMax: number;
  irsaDescripcion: string;
  variables: VariableCritica;
}

const DATA: Record<string, DetalleAlcaldia> = {
  "Álvaro Obregón":          { nombre: "Álvaro Obregón",          ciudad: "Ciudad de México, México", irsa: 4.1, irsaMax: 10, irsaDescripcion: "Riesgo moderado, monitoreo continuo recomendado", variables: { temperatura: 22, humedad: 58, densidad: 11200, calidadAire: 52, riesgoTemperatura: "Óptimo",   riesgoDensidad: "Moderado" } },
  "Azcapotzalco":            { nombre: "Azcapotzalco",            ciudad: "Ciudad de México, México", irsa: 5.8, irsaMax: 10, irsaDescripcion: "Nivel de riesgo elevado, atención prioritaria",   variables: { temperatura: 26, humedad: 50, densidad: 15400, calidadAire: 68, riesgoTemperatura: "Moderado", riesgoDensidad: "Alto"     } },
  "Benito Juárez":           { nombre: "Benito Juárez",           ciudad: "Ciudad de México, México", irsa: 2.4, irsaMax: 10, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 21, humedad: 62, densidad: 14800, calidadAire: 38, riesgoTemperatura: "Óptimo",   riesgoDensidad: "Moderado" } },
  "Coyoacán":                { nombre: "Coyoacán",                ciudad: "Ciudad de México, México", irsa: 2.9, irsaMax: 10, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 20, humedad: 65, densidad: 9800,  calidadAire: 40, riesgoTemperatura: "Óptimo",   riesgoDensidad: "Bajo"     } },
  "Cuajimalpa de Morelos":   { nombre: "Cuajimalpa de Morelos",   ciudad: "Ciudad de México, México", irsa: 3.0, irsaMax: 10, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 18, humedad: 70, densidad: 4200,  calidadAire: 35, riesgoTemperatura: "Óptimo",   riesgoDensidad: "Bajo"     } },
  "Cuauhtémoc":              { nombre: "Cuauhtémoc",              ciudad: "Ciudad de México, México", irsa: 3.2, irsaMax: 10, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 28, humedad: 62, densidad: 16500, calidadAire: 45, riesgoTemperatura: "Moderado", riesgoDensidad: "Alto"     } },
  "Gustavo A. Madero":       { nombre: "Gustavo A. Madero",       ciudad: "Ciudad de México, México", irsa: 7.1, irsaMax: 10, irsaDescripcion: "Riesgo crítico, intervención inmediata necesaria", variables: { temperatura: 31, humedad: 42, densidad: 18900, calidadAire: 88, riesgoTemperatura: "Alto",     riesgoDensidad: "Crítico"  } },
  "Iztacalco":               { nombre: "Iztacalco",               ciudad: "Ciudad de México, México", irsa: 5.2, irsaMax: 10, irsaDescripcion: "Riesgo moderado, monitoreo continuo recomendado", variables: { temperatura: 27, humedad: 55, densidad: 16200, calidadAire: 60, riesgoTemperatura: "Moderado", riesgoDensidad: "Alto"     } },
  "Iztapalapa":              { nombre: "Iztapalapa",              ciudad: "Ciudad de México, México", irsa: 8.3, irsaMax: 10, irsaDescripcion: "Riesgo crítico, intervención inmediata necesaria", variables: { temperatura: 33, humedad: 40, densidad: 20100, calidadAire: 95, riesgoTemperatura: "Crítico",  riesgoDensidad: "Crítico"  } },
  "La Magdalena Contreras":  { nombre: "La Magdalena Contreras",  ciudad: "Ciudad de México, México", irsa: 2.1, irsaMax: 10, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 17, humedad: 72, densidad: 3900,  calidadAire: 30, riesgoTemperatura: "Óptimo",   riesgoDensidad: "Bajo"     } },
  "Miguel Hidalgo":          { nombre: "Miguel Hidalgo",          ciudad: "Ciudad de México, México", irsa: 3.4, irsaMax: 10, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 23, humedad: 60, densidad: 7100,  calidadAire: 42, riesgoTemperatura: "Óptimo",   riesgoDensidad: "Bajo"     } },
  "Milpa Alta":              { nombre: "Milpa Alta",              ciudad: "Ciudad de México, México", irsa: 1.8, irsaMax: 10, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 16, humedad: 75, densidad: 1800,  calidadAire: 22, riesgoTemperatura: "Óptimo",   riesgoDensidad: "Bajo"     } },
  "Tláhuac":                 { nombre: "Tláhuac",                 ciudad: "Ciudad de México, México", irsa: 5.5, irsaMax: 10, irsaDescripcion: "Riesgo moderado, monitoreo continuo recomendado", variables: { temperatura: 29, humedad: 48, densidad: 12300, calidadAire: 70, riesgoTemperatura: "Alto",     riesgoDensidad: "Moderado" } },
  "Tlalpan":                 { nombre: "Tlalpan",                 ciudad: "Ciudad de México, México", irsa: 2.6, irsaMax: 10, irsaDescripcion: "Nivel óptimo para operaciones normales",           variables: { temperatura: 19, humedad: 68, densidad: 5200,  calidadAire: 33, riesgoTemperatura: "Óptimo",   riesgoDensidad: "Bajo"     } },
  "Venustiano Carranza":     { nombre: "Venustiano Carranza",     ciudad: "Ciudad de México, México", irsa: 6.0, irsaMax: 10, irsaDescripcion: "Nivel de riesgo elevado, atención prioritaria",   variables: { temperatura: 30, humedad: 45, densidad: 17600, calidadAire: 78, riesgoTemperatura: "Alto",     riesgoDensidad: "Crítico"  } },
  "Xochimilco":              { nombre: "Xochimilco",              ciudad: "Ciudad de México, México", irsa: 4.0, irsaMax: 10, irsaDescripcion: "Riesgo moderado, monitoreo continuo recomendado", variables: { temperatura: 24, humedad: 80, densidad: 7800,  calidadAire: 48, riesgoTemperatura: "Moderado", riesgoDensidad: "Bajo"     } },
};

const FALLBACK: DetalleAlcaldia = {
  nombre: "Alcaldía",
  ciudad: "Ciudad de México, México",
  irsa: 5.0,
  irsaMax: 10,
  irsaDescripcion: "Datos no disponibles",
  variables: { temperatura: 25, humedad: 60, densidad: 10000, calidadAire: 50, riesgoTemperatura: "Moderado", riesgoDensidad: "Moderado" },
};

export function getDetalleAlcaldia(nombre: string): DetalleAlcaldia {
  return DATA[nombre] ?? FALLBACK;
}

export function getIrsaColor(irsa: number): string {
  if (irsa <= 3)  return "text-emerald-500";
  if (irsa <= 5)  return "text-yellow-500";
  if (irsa <= 7)  return "text-orange-500";
  return "text-red-600";
}

export const RISK_TAG_COLOR: Record<RiskTag, string> = {
  Óptimo:   "text-emerald-600 bg-emerald-50",
  Bajo:     "text-emerald-600 bg-emerald-50",
  Moderado: "text-yellow-600 bg-yellow-50",
  Alto:     "text-orange-600 bg-orange-50",
  Crítico:  "text-red-600   bg-red-50",
};
