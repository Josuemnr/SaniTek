// En desarrollo, Vite proxea /api → http://localhost:8080 (sin CORS)
// En producción, apuntar VITE_API_BASE_URL al backend real
const BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

// ─── DTOs del backend (nuevo — feature-inglish) ───────────────────────────────

export interface MunicipalitySummary {
  id: number;
  municipalityName: string;
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
  normNo2: number;
  normO3: number;
  normPm25: number;
  normUv: number;
  normTmp: number;
  pollutantScore: number;
  prevCopd: number;
  prevAsthma: number;
  prevPneumonia: number;
  prevSmoking: number;
  vulnerabilityFactor: number;
  irsaScore: number;
  riskLevel: string;
  no2Measurements: number;
  o3Measurements: number;
  pm25Measurements: number;
  uvMeasurements: number;
  tmpMeasurements: number;
  copdCount: number;
  asthmaCount: number;
  pneumoniaCount: number;
  smokingCount: number;
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

export interface AlertApiResponse {
  id: number;
  municipality: MunicipalitySummary;
  alertType: string;
  message: string;
  isActive: boolean;
  scheduledFor: string | null;
  createdAt: string;
}

export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface RoleApiResponse {
  id: number;
  roleName: UserRole;
}

export interface CompanySummaryApiResponse {
  id: number;
  companyName: string;
}

export interface UserApiResponse {
  id: number;
  names: string | null;
  firebaseUid: string;
  email: string;
  isActive: boolean;
  role: RoleApiResponse | null;
  company: CompanySummaryApiResponse | null;
}

export interface LoginApiRequest {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  idToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserApiResponse;
}

// ─── Cliente HTTP ─────────────────────────────────────────────────────────────

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: authHeaders(path),
  });
  if (!res.ok) throw new Error(await errorMessage(res, path));
  return res.json() as Promise<T>;
}

async function post<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders(path) },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await errorMessage(res, path));
  return res.json() as Promise<T>;
}

async function put<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders(path) },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await errorMessage(res, path));
  // Handle 204 No Content
  if (res.status === 204) return {} as T;
  return res.json() as Promise<T>;
}

function authHeaders(path: string): Record<string, string> {
  if (path.startsWith('/api/auth/')) return {};
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function errorMessage(res: Response, path: string): Promise<string> {
  try {
    const payload = await res.json();
    if (payload?.message) return `API ${res.status}: ${payload.message}`;
  } catch {
    // Ignore non-JSON error responses.
  }
  return `API ${res.status}: ${path}`;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const api = {
  auth: {
    login: (credentials: LoginApiRequest) =>
      post<LoginApiResponse>('/api/auth/login', credentials),
  },
  municipalities: {
    listAll: async () => {
      const irsaList = await get<IrsaApiResponse[]>('/api/irsa');
      return onlyCdmxIrsa(irsaList).map((irsa) => ({
        id: irsa.municipality.id,
        municipalityName: irsa.municipality.municipalityName,
        socialVulnerability: null,
        currentIrsa: {
          irsaValue: irsa.irsaValue,
          riskLevel: irsa.riskLevel,
          calculatedAt: irsa.calculatedAt,
        },
      }));
    },
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
      get<IrsaApiResponse[]>('/api/irsa').then(onlyCdmxIrsa),
    getByMunicipality: (id: number) =>
      get<IrsaApiResponse>(`/api/irsa/municipality/${id}`),
    daily: (date: string) =>
      get<IrsaApiResponse[]>(`/api/irsa/daily?date=${date}`).then(onlyCdmxIrsa),
    diagnostic: (id: number) =>
      get<IrsaDiagnosticApiResponse>(`/api/irsa/diagnostic/${id}`),
    trend: (id: number, period = 'MONTHLY', count = 12) =>
      get<IrsaTrendApiResponse>(
        `/api/irsa/trend/${id}?period=${period}&count=${count}`
      ),
  },
  alerts: {
    subscribe: (userId: number, municipalityId: number) =>
      post<AlertApiResponse>(`/api/alerts/subscribe?userId=${userId}&municipalityId=${municipalityId}`),
    listActiveByUser: (userId: number) =>
      get<AlertApiResponse[]>(`/api/alerts/user/${userId}/active`),
    deactivate: (alertId: number) =>
      put<void>(`/api/alerts/${alertId}/deactivate`),
  },
};

export const ALCALDIA_ID: Record<string, number> = {
  'Tlalpan':                2,
  'Benito Juarez':          4,
  'Benito Juárez':          4,
  'Azcapotzalco':           5,
  'Coyoacan':               6,
  'Coyoacán':               6,
  'Cuajimalpa':             8,
  'Cuajimalpa de Morelos':  8,
  'Gustavo A. Madero':      11,
  'Cuauhtemoc':             12,
  'Cuauhtémoc':             12,
  'Iztacalco':              14,
  'Venustiano Carranza':    17,
  'Miguel Hidalgo':         18,
  'Milpa Alta':             20,
  'Alvaro Obregon':         22,
  'Álvaro Obregón':         22,
  'Iztapalapa':             23,
  'Tlahuac':                24,
  'Tláhuac':                24,
};

export const CDMX_MUNICIPALITY_IDS = new Set(Object.values(ALCALDIA_ID));

export function getAlcaldiaId(nombreAlcaldia: string | null | undefined): number | null {
  if (!nombreAlcaldia) return null;
  return ALCALDIA_ID[nombreAlcaldia] ?? ALCALDIA_ID[withoutAccents(nombreAlcaldia)] ?? null;
}

function onlyCdmxIrsa(irsaList: IrsaApiResponse[]): IrsaApiResponse[] {
  return irsaList.filter((irsa) => CDMX_MUNICIPALITY_IDS.has(irsa.municipality.id));
}

function withoutAccents(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
