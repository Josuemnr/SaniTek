// En desarrollo, Vite proxea /api → http://localhost:8080 (sin CORS)
// En producción, apuntar VITE_API_BASE_URL al backend real
const BASE = import.meta.env.VITE_API_BASE_URL ?? '';

// ─── DTOs del backend (nuevo — feature-inglish) ───────────────────────────────

export interface MunicipalitySummary {
  id: number;
  municipalityName: string;
  socialIndex: string;
}

export interface IrsaSummaryApi {
  irsaValue: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  calculatedAt: string;
}

export interface MunicipalityApiResponse {
  id: number;
  municipalityName: string;
  socialVulnerability: number | null;
  socialIndex: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  currentIrsa: IrsaSummaryApi | null;
}

export interface IrsaApiResponse {
  id: number;
  municipality: MunicipalitySummary;
  irsaValue: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  isForecast: boolean;
  forecastDate: string | null;
  calculatedAt: string;
}

export interface IrsaDiagnosticApiResponse {
  municipalityId: number;
  municipalityName: string;
  airScore: number;
  climateScore: number;
  socioScore: number;
  healthScore: number;
  weightedScore: number;
  irsaValue: number;
  riskLevel: string;
  no2Measurements: number;
  o3Measurements: number;
  pm25Measurements: number;
  averagesByPollutant: Record<string, number>;
  hasTemperatureData: boolean;
  socialIndex: string;
  socialVulnerability: number | null;
}

export interface TrendPointApi {
  label: string;
  avgIrsa: number;
  minIrsa: number;
  maxIrsa: number;
  riskLevel: string;
  count: number;
}

export interface IrsaTrendApiResponse {
  municipalityId: number;
  municipalityName: string;
  period: string;
  periods: number;
  trend: string;
  variation: number;
  points: TrendPointApi[];
}

export interface HealthSummaryApiResponse {
  municipalityId: number;
  municipalityName: string;
  asthmaCount: number;
  copdCount: number;
  pneumoniaCount: number;
  smokingCount: number;
  totalCases: number;
}

// ─── Cliente HTTP ─────────────────────────────────────────────────────────────

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const api = {
  municipalities: {
    listAll: (socialIndex?: string) =>
      get<MunicipalityApiResponse[]>(
        socialIndex
          ? `/api/municipalities?socialIndex=${socialIndex}`
          : '/api/municipalities'
      ),
    getById: (id: number) =>
      get<MunicipalityApiResponse>(`/api/municipalities/${id}`),
  },
  health: {
    listAll: () =>
      get<HealthSummaryApiResponse[]>('/api/health'),
    getByMunicipality: (id: number) =>
      get<HealthSummaryApiResponse>(`/api/health/municipality/${id}`),
  },
  irsa: {
    listLatest: () =>
      get<IrsaApiResponse[]>('/api/irsa'),
    getByMunicipality: (id: number) =>
      get<IrsaApiResponse>(`/api/irsa/municipality/${id}`),
    daily: (date: string) =>
      get<IrsaApiResponse[]>(`/api/irsa/daily?date=${date}`),
    diagnostic: (id: number) =>
      get<IrsaDiagnosticApiResponse>(`/api/irsa/diagnostic/${id}`),
    trend: (id: number, period = 'MONTHLY', count = 12) =>
      get<IrsaTrendApiResponse>(
        `/api/irsa/trend/${id}?period=${period}&count=${count}`
      ),
  },
};

// ─── Mapeo nombre → ID de municipio ──────────────────────────────────────────
// Fuente de verdad: IDs asignados por el backend al seed inicial de la DB.
// Usar api.municipalities.listAll() para obtenerlos dinámicamente si los IDs cambian.

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
