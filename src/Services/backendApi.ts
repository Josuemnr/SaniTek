const BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');


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

export interface CompanyApiResponse extends CompanySummaryApiResponse {
  isActive: boolean;
}

export interface CreateCompanyApiRequest {
  companyName: string;
}

export interface CreateAdminApiRequest {
  companyId: number;
  names: string;
  email: string;
  password: string;
}

export interface CreateCompanyUserApiRequest {
  names: string;
  email: string;
  password: string;
}

export interface UpdateAdminApiRequest {
  names: string;
  email: string;
}

export interface UpdateProfileApiRequest {
  names: string;
  email: string;
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
  me: {
    get: () =>
      get<UserApiResponse>('/api/me'),
    update: (data: UpdateProfileApiRequest) =>
      put<UserApiResponse>('/api/me', data),
  },
  companies: {
    create: (data: CreateCompanyApiRequest) =>
      post<CompanyApiResponse>('/api/companies', data),
    listAll: () =>
      get<CompanyApiResponse[]>('/api/companies'),
  },
  admins: {
    create: (data: CreateAdminApiRequest) =>
      post<UserApiResponse>('/api/admins', data),
    listAll: () =>
      get<UserApiResponse[]>('/api/admins'),
    update: (id: number, data: UpdateAdminApiRequest) =>
      put<UserApiResponse>(`/api/admins/${id}`, data),
  },
  companyUsers: {
    create: (data: CreateCompanyUserApiRequest) =>
      post<UserApiResponse>('/api/company-users', data),
    listAll: () =>
      get<UserApiResponse[]>('/api/company-users'),
    deactivate: (id: number) =>
      put<void>(`/api/company-users/${id}/deactivate`),
    activate: (id: number) =>
      put<UserApiResponse>(`/api/company-users/${id}/activate`),
  },
  municipalities: {
    listAll: () =>
      get<MunicipalityApiResponse[]>('/api/municipalities').then(onlyCdmxMunicipalities),
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

const CDMX_MUNICIPALITY_NAMES = new Set([
  'Alvaro Obregon',
  'Azcapotzalco',
  'Benito Juarez',
  'Coyoacan',
  'Cuajimalpa',
  'Cuajimalpa de Morelos',
  'Cuauhtemoc',
  'Gustavo A. Madero',
  'Iztacalco',
  'Iztapalapa',
  'La Magdalena Contreras',
  'Magdalena Contreras',
  'Miguel Hidalgo',
  'Milpa Alta',
  'Tlahuac',
  'Tlalpan',
  'Venustiano Carranza',
  'Xochimilco',
].map(normalizeMunicipalityName));

export function getAlcaldiaId(nombreAlcaldia: string | null | undefined): number | null {
  if (!nombreAlcaldia) return null;
  return ALCALDIA_ID[nombreAlcaldia] ?? ALCALDIA_ID[withoutAccents(nombreAlcaldia)] ?? null;
}

function onlyCdmxIrsa(irsaList: IrsaApiResponse[]): IrsaApiResponse[] {
  return irsaList.filter((irsa) =>
    CDMX_MUNICIPALITY_IDS.has(irsa.municipality.id) ||
    CDMX_MUNICIPALITY_NAMES.has(normalizeMunicipalityName(irsa.municipality.municipalityName))
  );
}

function onlyCdmxMunicipalities(municipalities: MunicipalityApiResponse[]): MunicipalityApiResponse[] {
  return municipalities.filter((municipality) =>
    CDMX_MUNICIPALITY_IDS.has(municipality.id) ||
    CDMX_MUNICIPALITY_NAMES.has(normalizeMunicipalityName(municipality.municipalityName))
  );
}

function withoutAccents(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normalizeMunicipalityName(value: string): string {
  return withoutAccents(value).trim().replace(/\s+/g, ' ').toLowerCase();
}
