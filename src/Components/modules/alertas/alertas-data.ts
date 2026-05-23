// ─────────────────────────────────────────────────────────────
//  alertas-data.ts
//  Tipos, catálogo de alcaldías y mock de alertas sanitarias
// ─────────────────────────────────────────────────────────────

export type NivelAlerta = "critico" | "alto" | "moderado" | "info";
export type TipoAlerta  = "calidad-aire" | "humedad" | "temperatura" | "sanitario";

export interface Alcaldia {
  id: string;
  nombre: string;
  /** Coordenadas aproximadas del centro (lat, lng) */
  lat: number;
  lng: number;
  poblacion: string;          // en millones, ej. "1.8M"
  nivelRiesgo: NivelAlerta;
}

export interface Alerta {
  id: string;
  alcaldiaId: string;
  alcaldianombre: string;
  tipo: TipoAlerta;
  nivel: NivelAlerta;
  titulo: string;
  descripcion: string;
  timestamp: Date;
  leida: boolean;
}

// ─── Config visual ──────────────────────────────────────────────────────────

export const NIVEL_CONFIG: Record<NivelAlerta, {
  label: string;
  color: string;
  bg: string;
  bgLight: string;
  border: string;
  dot: string;
}> = {
  critico:  {
    label: "Crítico",
    color: "text-red-700",
    bg: "bg-red-500",
    bgLight: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-500",
  },
  alto: {
    label: "Alto riesgo",
    color: "text-amber-700",
    bg: "bg-amber-400",
    bgLight: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-400",
  },
  moderado: {
    label: "Moderado",
    color: "text-yellow-700",
    bg: "bg-yellow-400",
    bgLight: "bg-yellow-50",
    border: "border-yellow-200",
    dot: "bg-yellow-400",
  },
  info: {
    label: "Informativo",
    color: "text-blue-700",
    bg: "bg-blue-400",
    bgLight: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-400",
  },
};

export const TIPO_CONFIG: Record<TipoAlerta, { label: string; icon: string }> = {
  "calidad-aire": { label: "Calidad del aire", icon: "Wind" },
  "humedad":      { label: "Humedad",          icon: "Droplets" },
  "temperatura":  { label: "Temperatura",      icon: "Thermometer" },
  "sanitario":    { label: "Riesgo sanitario", icon: "ShieldAlert" },
};

// ─── Las 16 alcaldías de la CDMX ────────────────────────────────────────────

export const ALCALDIAS_CDMX: Alcaldia[] = [
  { id: "alv", nombre: "Álvaro Obregón",          lat: 19.357, lng: -99.202, poblacion: "0.8M", nivelRiesgo: "moderado" },
  { id: "azc", nombre: "Azcapotzalco",             lat: 19.487, lng: -99.183, poblacion: "0.4M", nivelRiesgo: "alto"     },
  { id: "bj",  nombre: "Benito Juárez",             lat: 19.383, lng: -99.158, poblacion: "0.4M", nivelRiesgo: "info"     },
  { id: "coy", nombre: "Coyoacán",                 lat: 19.345, lng: -99.162, poblacion: "0.6M", nivelRiesgo: "moderado" },
  { id: "cua", nombre: "Cuajimalpa de Morelos",    lat: 19.359, lng: -99.299, poblacion: "0.2M", nivelRiesgo: "info"     },
  { id: "cuh", nombre: "Cuauhtémoc",               lat: 19.427, lng: -99.146, poblacion: "0.5M", nivelRiesgo: "critico"  },
  { id: "gam", nombre: "Gustavo A. Madero",        lat: 19.496, lng: -99.118, poblacion: "1.2M", nivelRiesgo: "critico"  },
  { id: "iza", nombre: "Iztacalco",                lat: 19.390, lng: -99.095, poblacion: "0.4M", nivelRiesgo: "alto"     },
  { id: "izp", nombre: "Iztapalapa",               lat: 19.357, lng: -99.069, poblacion: "1.8M", nivelRiesgo: "critico"  },
  { id: "mac", nombre: "La Magdalena Contreras",   lat: 19.316, lng: -99.235, poblacion: "0.2M", nivelRiesgo: "info"     },
  { id: "mh",  nombre: "Miguel Hidalgo",            lat: 19.422, lng: -99.205, poblacion: "0.4M", nivelRiesgo: "moderado" },
  { id: "mia", nombre: "Milpa Alta",               lat: 19.188, lng: -98.974, poblacion: "0.1M", nivelRiesgo: "info"     },
  { id: "tla", nombre: "Tláhuac",                  lat: 19.290, lng: -99.009, poblacion: "0.4M", nivelRiesgo: "moderado" },
  { id: "tlp", nombre: "Tlalpan",                  lat: 19.295, lng: -99.167, poblacion: "0.7M", nivelRiesgo: "info"     },
  { id: "vc",  nombre: "Venustiano Carranza",       lat: 19.427, lng: -99.103, poblacion: "0.4M", nivelRiesgo: "alto"     },
  { id: "xoc", nombre: "Xochimilco",               lat: 19.256, lng: -99.104, poblacion: "0.4M", nivelRiesgo: "moderado" },
];

// ─── Mock de alertas recientes ───────────────────────────────────────────────

const now = new Date();
const minsAgo = (m: number) => new Date(now.getTime() - m * 60_000);

export const ALERTAS_MOCK: Alerta[] = [
  {
    id: "a1",
    alcaldiaId: "cuh",
    alcaldianombre: "Cuauhtémoc",
    tipo: "calidad-aire",
    nivel: "critico",
    titulo: "Índice AQI supera 200",
    descripcion: "La calidad del aire es muy insalubre. Se recomienda evitar actividades al aire libre.",
    timestamp: minsAgo(5),
    leida: false,
  },
  {
    id: "a2",
    alcaldiaId: "gam",
    alcaldianombre: "Gustavo A. Madero",
    tipo: "sanitario",
    nivel: "critico",
    titulo: "Brote sanitario detectado",
    descripcion: "Se reportan casos de enfermedades gastrointestinales en la zona norte.",
    timestamp: minsAgo(18),
    leida: false,
  },
  {
    id: "a3",
    alcaldiaId: "izp",
    alcaldianombre: "Iztapalapa",
    tipo: "humedad",
    nivel: "alto",
    titulo: "Humedad crítica: 92%",
    descripcion: "Niveles de humedad favorecen proliferación de hongos y bacterias.",
    timestamp: minsAgo(35),
    leida: false,
  },
  {
    id: "a4",
    alcaldiaId: "azc",
    alcaldianombre: "Azcapotzalco",
    tipo: "calidad-aire",
    nivel: "alto",
    titulo: "Concentración alta de PM2.5",
    descripcion: "Partículas finas PM2.5 detectadas a 85 µg/m³. Grupos vulnerables en riesgo.",
    timestamp: minsAgo(62),
    leida: true,
  },
  {
    id: "a5",
    alcaldiaId: "vc",
    alcaldianombre: "Venustiano Carranza",
    tipo: "temperatura",
    nivel: "alto",
    titulo: "Ola de calor: 38°C",
    descripcion: "Temperatura excede umbral de riesgo. Hidratación constante recomendada.",
    timestamp: minsAgo(90),
    leida: true,
  },
  {
    id: "a6",
    alcaldiaId: "iza",
    alcaldianombre: "Iztacalco",
    tipo: "sanitario",
    nivel: "moderado",
    titulo: "Inspección sanitaria programada",
    descripcion: "Se realizarán verificaciones en mercados y centros de abasto.",
    timestamp: minsAgo(150),
    leida: true,
  },
  {
    id: "a7",
    alcaldiaId: "xoc",
    alcaldianombre: "Xochimilco",
    tipo: "humedad",
    nivel: "moderado",
    titulo: "Humedad elevada en zonas lacustres",
    descripcion: "Niveles del 78% detectados cerca de canales. Monitoreo activo.",
    timestamp: minsAgo(210),
    leida: true,
  },
  {
    id: "a8",
    alcaldiaId: "bj",
    alcaldianombre: "Benito Juárez",
    tipo: "calidad-aire",
    nivel: "info",
    titulo: "AQI dentro de parámetros normales",
    descripcion: "La calidad del aire se mantiene aceptable. Sin restricciones activas.",
    timestamp: minsAgo(300),
    leida: true,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatTimestamp(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 60_000);
  if (diff < 1)  return "Hace un momento";
  if (diff < 60) return `Hace ${diff} min`;
  const hrs = Math.floor(diff / 60);
  if (hrs < 24)  return `Hace ${hrs} h`;
  return `Hace ${Math.floor(hrs / 24)} d`;
}

export function getAlertasByAlcaldias(
  alertas: Alerta[],
  suscritas: Set<string>
): Alerta[] {
  return alertas
    .filter((a) => suscritas.has(a.alcaldiaId))
    .sort((a, b) => {
      const order: Record<NivelAlerta, number> = { critico: 0, alto: 1, moderado: 2, info: 3 };
      const byLevel = order[a.nivel] - order[b.nivel];
      if (byLevel !== 0) return byLevel;
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
}
