// En desarrollo, Vite proxea /api → http://localhost:8080 (sin CORS)
// En producción, apuntar VITE_API_BASE_URL al backend real
const BASE = import.meta.env.VITE_API_BASE_URL ?? '';

// ─── DTOs del backend ────────────────────────────────────────────────────────

export interface AlcaldiaResumen {
  id: number;
  nombre: string;
  nivelRezago: string;
}

export interface IrsaApiResponse {
  id: number;
  alcaldia: AlcaldiaResumen;
  valorIrsa: number;
  nivelRiesgo: 'BAJO' | 'MODERADO' | 'ALTO' | 'CRITICO';
  fechaCalculo: string;
  prediccionFutura: number | null;
  fechaPrediccion: string | null;
  origenCalculo: string;
}

export interface IrsaDiagnosticoApiResponse {
  idAlcaldia: number;
  nombreAlcaldia: string;
  puntajeAire: number;
  puntajeClima: number;
  puntajeSocioeconomico: number;
  scoreMotor: number;
  valorIrsa: number;
  nivelRiesgo: string;
  medicionesAireEncontradas: number;
  promediosPorContaminante: Record<string, number>;
  tieneDataClima: boolean;
  nivelRezagoSocial: string;
  temperatura: number | null;
  humedad: number | null;
}

export interface PuntoTendenciaApi {
  etiqueta: string;
  promedioIrsa: number;
  minIrsa: number;
  maxIrsa: number;
  nivelPromedio: string;
  cantidad: number;
}

export interface TendenciaIrsaApiResponse {
  idAlcaldia: number;
  nombreAlcaldia: string;
  periodo: string;
  cantidadPeriodos: number;
  tendencia: string;
  variacion: number;
  puntos: PuntoTendenciaApi[];
}

export interface SaludAnioResponse {
  id: number;
  alcaldia: AlcaldiaResumen;
  anio: number;
  mes: number;
  totalCasos: number;
  totalDefunciones: number;
  casosNeumonia: number;
  casosEpoc: number;
  casosAsma: number;
  casosTabaquismo: number;
  promedioEdad: number | null;
}

export interface IrsaResumenApi {
  valorIrsa: number;
  nivelRiesgo: 'BAJO' | 'MODERADO' | 'ALTO' | 'CRITICO';
  fechaCalculo: string;
}

export interface AlcaldiaResponse {
  id: number;
  nombre: string;
  indiceRezagoSocial: number | null;
  nivelRezago: 'BAJO' | 'MEDIO' | 'ALTO' | 'MUY_ALTO';
  irsaActual: IrsaResumenApi | null;
}

// ─── Cliente HTTP ─────────────────────────────────────────────────────────────

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const api = {
  alcaldias: {
    listar: (nivelRezago?: string) =>
      get<AlcaldiaResponse[]>(
        nivelRezago ? `/api/alcaldias?nivelRezago=${nivelRezago}` : '/api/alcaldias'
      ),
    porId: (id: number) =>
      get<AlcaldiaResponse>(`/api/alcaldias/${id}`),
  },
  salud: {
    porAnio: (anio: number) =>
      get<SaludAnioResponse[]>(`/api/salud/anio/${anio}`),
  },
  irsa: {
    listar: () =>
      get<IrsaApiResponse[]>('/api/irsa'),
    porAlcaldia: (id: number) =>
      get<IrsaApiResponse>(`/api/irsa/alcaldia/${id}`),
    diario: (fecha: string) =>
      get<IrsaApiResponse[]>(`/api/irsa/diario?fecha=${fecha}`),
    diagnostico: (id: number) =>
      get<IrsaDiagnosticoApiResponse>(`/api/irsa/diagnostico/${id}`),
    tendencia: (id: number, periodo = 'MENSUAL', cantidad = 12) =>
      get<TendenciaIrsaApiResponse>(
        `/api/irsa/tendencia/${id}?periodo=${periodo}&cantidad=${cantidad}`
      ),
  },
};

// ─── Mapeo nombre → ID de alcaldía ───────────────────────────────────────────
// Fuente de verdad: IDs asignados por el backend al seed inicial de la DB.
// Usar api.alcaldias.listar() para obtenerlos dinámicamente si los IDs cambian.

export const ALCALDIA_ID: Record<string, number> = {
  'Álvaro Obregón':         1,
  'Azcapotzalco':           2,
  'Benito Juárez':          3,
  'Coyoacán':               4,
  'Cuajimalpa':             5,
  'Cuajimalpa de Morelos':  5,
  'Cuauhtémoc':             6,
  'Gustavo A. Madero':      7,
  'Iztacalco':              8,
  'Iztapalapa':             9,
  'La Magdalena Contreras': 10,
  'Miguel Hidalgo':         11,
  'Milpa Alta':             12,
  'Tláhuac':                13,
  'Tlalpan':                14,
  'Venustiano Carranza':    15,
  'Xochimilco':             16,
};
