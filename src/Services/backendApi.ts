/**
 * @file backendApi.ts
 * @description Cliente HTTP centralizado para la API de SaniTek.
 *
 * Toda la comunicación con el backend pasa por este módulo.
 * La URL base se configura en la variable de entorno `VITE_API_BASE_URL`.
 *
 * ### Autenticación
 * Las peticiones a rutas protegidas envían automáticamente el JWT almacenado
 * en `localStorage` bajo la clave `"token"` como cabecera `Authorization: Bearer`.
 * Las rutas bajo `/api/auth/` quedan excluidas para permitir el login.
 *
 * ### Filtrado CDMX
 * Los endpoints de municipios e IRSA devuelven datos nacionales.
 * Las funciones internas `onlyCdmxMunicipalities` y `onlyCdmxIrsa` filtran
 * automáticamente solo los 16 municipios de la Ciudad de México.
 *
 * @module backendApi
 */

const BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

// ─── Interfaces — Municipios ──────────────────────────────────────────────────

/**
 * Identificador mínimo de un municipio, usado como objeto anidado en otras
 * respuestas (p. ej. dentro de {@link IrsaApiResponse}).
 */
export interface MunicipalitySummary {
  /** Identificador numérico único del municipio en la BD */
  id: number;
  /** Nombre oficial del municipio */
  municipalityName: string;
}

/**
 * Resumen del IRSA más reciente persistido para un municipio.
 * Se incluye en {@link MunicipalityApiResponse} para evitar una segunda petición.
 */
export interface IrsaSummaryApi {
  /** Valor del índice IRSA en escala 0–100 */
  irsaValue: number;
  /** Nivel de riesgo calculado a partir del `irsaValue` */
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  /** Timestamp ISO 8601 del momento en que se calculó el IRSA */
  calculatedAt: string;
}

/**
 * Respuesta completa de `GET /api/municipalities` y `GET /api/municipalities/:id`.
 *
 * Contiene el resumen del IRSA más reciente (`currentIrsa`) para poder pintar
 * el mapa en una sola petición sin llamar a `/api/irsa` por separado.
 */
export interface MunicipalityApiResponse {
  /** Identificador numérico único */
  id: number;
  /** Nombre oficial del municipio */
  municipalityName: string;
  /** Índice de vulnerabilidad social (0–1); puede no estar calculado aún */
  socialVulnerability: number | null;
  /**
   * Último IRSA persistido en la BD.
   * `null` si el municipio no tiene ningún IRSA calculado todavía.
   *
   * @remarks
   * Este valor puede estar desactualizado. Para datos en tiempo real usa
   * `api.irsa.diagnostic(id)` que recalcula el IRSA al momento.
   */
  currentIrsa: IrsaSummaryApi | null;
}

// ─── Interfaces — IRSA ───────────────────────────────────────────────────────

/**
 * Respuesta de `GET /api/irsa` (listado) y `GET /api/irsa/municipality/:id`.
 *
 * Representa un registro IRSA almacenado, que puede ser histórico o una
 * predicción futura.
 */
export interface IrsaApiResponse {
  /** Identificador del registro IRSA */
  id: number;
  /** Municipio al que pertenece este registro */
  municipality: MunicipalitySummary;
  /** Valor del índice IRSA en escala 0–100 */
  irsaValue: number;
  /** Nivel de riesgo: LOW (0–40) · MODERATE (41–70) · HIGH (71–100) */
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  /** `true` si el registro es una predicción futura, `false` si es real */
  isForecast: boolean;
  /** Fecha de la predicción en ISO 8601; `null` si `isForecast = false` */
  forecastDate: string | null;
  /** Timestamp ISO 8601 del cálculo */
  calculatedAt: string;
}

/**
 * Respuesta de `GET /api/irsa/diagnostic/:id`.
 *
 * **Fuente de verdad en tiempo real.** Recalcula el IRSA en el momento de la
 * petición a partir de las mediciones más recientes, en lugar de devolver el
 * último valor persistido.
 *
 * @remarks
 * Usa este endpoint (en lugar de `getByMunicipality`) cuando necesites el
 * valor más fresco para mostrar en el panel de la alcaldía.
 *
 * ### Desnormalización de contaminantes
 * Los campos `normNo2`, `normO3`, `normPm25`, `normUv`, `normTmp` están en
 * escala 0–1 (valor_real / umbral_OMS). Para obtener el valor real:
 * ```ts
 * no2_µg_m3  = normNo2  * 25   // umbral OMS NO₂  = 25 µg/m³
 * o3_µg_m3   = normO3   * 100  // umbral OMS O₃   = 100 µg/m³
 * pm25_µg_m3 = normPm25 * 15   // umbral OMS PM2.5 = 15 µg/m³
 * temp_c     = normTmp  * 35   // umbral OMS Tª   = 35 °C
 * ```
 */
export interface IrsaDiagnosticApiResponse {
  /** ID del municipio */
  municipalityId: number;
  /** Nombre del municipio */
  municipalityName: string;
  /** NO₂ normalizado 0–1 (1 = umbral OMS de 25 µg/m³) */
  normNo2: number;
  /** O₃ normalizado 0–1 (1 = umbral OMS de 100 µg/m³) */
  normO3: number;
  /** PM2.5 normalizado 0–1 (1 = umbral OMS de 15 µg/m³) */
  normPm25: number;
  /** UV normalizado 0–1 */
  normUv: number;
  /** Temperatura normalizada 0–1 (1 = 35 °C) */
  normTmp: number;
  /** Score de contaminantes combinado, escala 0–1 */
  pollutantScore: number;
  /** Prevalencia de EPOC en la alcaldía (casos por 100 000 hab.) */
  prevCopd: number;
  /** Prevalencia de asma (casos por 100 000 hab.) */
  prevAsthma: number;
  /** Prevalencia de neumonía (casos por 100 000 hab.) */
  prevPneumonia: number;
  /** Prevalencia de tabaquismo (casos por 100 000 hab.) */
  prevSmoking: number;
  /** Factor de vulnerabilidad poblacional (0–1) */
  vulnerabilityFactor: number;
  /** **Índice IRSA en escala 0–100** (fuente de verdad para el frontend) */
  irsaScore: number;
  /** Nivel de riesgo: `LOW` · `MODERATE` · `HIGH` */
  riskLevel: string;
  /** Número de mediciones de NO₂ usadas en el cálculo */
  no2Measurements: number;
  /** Número de mediciones de O₃ */
  o3Measurements: number;
  /** Número de mediciones de PM2.5 */
  pm25Measurements: number;
  /** Número de mediciones de UV */
  uvMeasurements: number;
  /** Número de mediciones de temperatura */
  tmpMeasurements: number;
  /** Casos absolutos de EPOC en el municipio */
  copdCount: number;
  /** Casos absolutos de asma */
  asthmaCount: number;
  /** Casos absolutos de neumonía */
  pneumoniaCount: number;
  /** Casos absolutos de tabaquismo */
  smokingCount: number;
}

<<<<<<< HEAD
export interface IrsaTimelinePointApi {
  offsetDays: number;
  label: string;
  windowFrom: string;
  windowTo: string;
  irsaScore: number;
  riskLevel: string;
  pollutantScore: number;
  vulnerabilityFactor: number;
}

export interface IrsaTimelineApiResponse {
  municipalityId: number;
  municipalityName: string;
  latestMeasurementAt: string;
  daysBack: number;
  points: IrsaTimelinePointApi[];
}

export interface IrsaTimelineMunicipalityPointApi {
  municipalityId: number;
  municipalityName: string;
  offsetDays: number;
  label: string;
  latestMeasurementAt: string | null;
  windowFrom: string | null;
  windowTo: string | null;
  irsaScore: number | null;
  riskLevel: string | null;
  pollutantScore: number | null;
  vulnerabilityFactor: number | null;
  status: 'OK' | 'ERROR' | string;
  error: string | null;
}

export interface IrsaTimelineSnapshotApiResponse {
  offsetDays: number;
  label: string;
  municipalities: IrsaTimelineMunicipalityPointApi[];
}

=======
// ─── Interfaces — Tendencia ───────────────────────────────────────────────────

/**
 * Un punto de datos en la serie de tendencia IRSA.
 * Cada punto representa un período (día, semana o mes).
 */
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
export interface TrendPointApi {
  /** Etiqueta del período, ej. `"Jan 2025"` */
  label: string;
  /** IRSA promedio del período */
  avgIrsa: number;
  /** IRSA mínimo del período */
  minIrsa: number;
  /** IRSA máximo del período */
  maxIrsa: number;
  /** Nivel de riesgo dominante en el período */
  riskLevel: string;
  /** Número de registros usados para calcular el promedio */
  count: number;
}

/**
 * Respuesta de `GET /api/irsa/trend/:id?period=MONTHLY&count=12`.
 *
 * @example
 * ```ts
 * // Obtener 48 meses (≈4 años) para la página de historial
 * const trend = await api.irsa.trend(municipalityId, 'MONTHLY', 48);
 * ```
 */
export interface IrsaTrendApiResponse {
  /** ID del municipio */
  municipalityId: number;
  /** Nombre del municipio */
  municipalityName: string;
  /** Granularidad: `DAILY` | `WEEKLY` | `MONTHLY` */
  period: string;
  /** Número de períodos solicitados */
  periods: number;
  /** Dirección de la tendencia: `UP` | `DOWN` | `STABLE` */
  trend: string;
  /** Variación porcentual respecto al período anterior */
  variation: number;
  /** Array de puntos de la serie temporal, ordenados cronológicamente */
  points: TrendPointApi[];
}

// ─── Interfaces — Salud ───────────────────────────────────────────────────────

/**
 * Respuesta de `GET /api/health` y `GET /api/health/municipality/:id`.
 *
 * Contiene los conteos de enfermedades respiratorias registradas en el municipio,
 * utilizados para calcular el factor de vulnerabilidad del IRSA.
 */
export interface HealthSummaryApiResponse {
  municipalityId: number;
  municipalityName: string;
  /** Casos de asma registrados */
  asthmaCount: number;
  /** Casos de EPOC registrados */
  copdCount: number;
  /** Casos de neumonía registrados */
  pneumoniaCount: number;
  /** Casos de tabaquismo registrados */
  smokingCount: number;
  /** Suma de todos los casos anteriores */
  totalCases: number;
}

// ─── Interfaces — Alertas ─────────────────────────────────────────────────────

/**
 * Respuesta de los endpoints de alertas (`/api/alerts/…`).
 *
 * Una alerta se crea cuando el IRSA de una alcaldía supera un umbral crítico
 * para un usuario suscrito.
 */
export interface AlertApiResponse {
  id: number;
  municipality: MunicipalitySummary;
  /** Tipo de alerta: `"IRSA_HIGH"`, `"IRSA_CRITICAL"`, etc. */
  alertType: string;
  /** Mensaje descriptivo legible para el usuario */
  message: string;
  /** `true` si la alerta sigue activa */
  isActive: boolean;
  /** Fecha programada de la alerta en ISO 8601; `null` si es inmediata */
  scheduledFor: string | null;
  /** Timestamp de creación en ISO 8601 */
  createdAt: string;
}

// ─── Interfaces — Usuarios y Empresas ────────────────────────────────────────

/** Roles de usuario disponibles en el sistema */
export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

/** Rol tal como llega del backend */
export interface RoleApiResponse {
  id: number;
  roleName: UserRole;
}

/** Empresa en formato reducido, usado como objeto anidado */
export interface CompanySummaryApiResponse {
  id: number;
  companyName: string;
}

/** Empresa con estado de activación, devuelta en listados de admin */
export interface CompanyApiResponse extends CompanySummaryApiResponse {
  isActive: boolean;
}

/** Body para `POST /api/companies` */
export interface CreateCompanyApiRequest {
  companyName: string;
}

/** Body para `POST /api/admins` */
export interface CreateAdminApiRequest {
  companyId: number;
  names: string;
  email: string;
  password: string;
}

/** Body para `POST /api/company-users` */
export interface CreateCompanyUserApiRequest {
  names: string;
  email: string;
  password: string;
}

/** Body para `PUT /api/admins/:id` */
export interface UpdateAdminApiRequest {
  names: string;
  email: string;
}

/** Body para `PUT /api/me` */
export interface UpdateProfileApiRequest {
  names: string;
  email: string;
}

/**
 * Usuario tal como llega del backend.
 * Incluye su rol y empresa asociada.
 */
export interface UserApiResponse {
  id: number;
  names: string | null;
  firebaseUid: string;
  email: string;
  isActive: boolean;
  role: RoleApiResponse | null;
  company: CompanySummaryApiResponse | null;
}

/** Body para `POST /api/auth/login` */
export interface LoginApiRequest {
  email: string;
  password: string;
}

/**
 * Respuesta de `POST /api/auth/login`.
 * El `idToken` debe almacenarse en `localStorage` bajo la clave `"token"`.
 */
export interface LoginApiResponse {
  /** JWT de sesión — incluir en `Authorization: Bearer <idToken>` */
  idToken: string;
  /** Token para renovar la sesión sin reautenticarse */
  refreshToken: string;
  /** Segundos hasta que expira el `idToken` */
  expiresIn: number;
  /** Datos del usuario autenticado */
  user: UserApiResponse;
}

// ─── Cliente HTTP ─────────────────────────────────────────────────────────────

/**
 * Realiza una petición GET autenticada y deserializa la respuesta como `T`.
 * Lanza un `Error` si la respuesta no es 2xx.
 *
 * @param path - Ruta relativa al BASE, ej. `"/api/municipalities"`
 * @returns Promesa con el cuerpo JSON tipado como `T`
 * @throws {Error} Con el mensaje del backend si `res.ok === false`
 */
async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: authHeaders(path),
  });
  if (!res.ok) throw new Error(await errorMessage(res, path));
  return res.json() as Promise<T>;
}

/**
 * Realiza una petición POST autenticada con body JSON.
 *
 * @param path - Ruta relativa al BASE
 * @param body - Objeto que se serializa como JSON; omitir para body vacío
 */
async function post<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders(path) },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await errorMessage(res, path));
  return res.json() as Promise<T>;
}

/**
 * Realiza una petición PUT autenticada con body JSON.
 * Maneja respuestas `204 No Content` devolviendo un objeto vacío.
 *
 * @param path - Ruta relativa al BASE
 * @param body - Objeto que se serializa como JSON; omitir para body vacío
 */
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

/**
 * Devuelve las cabeceras de autenticación para una ruta dada.
 * Las rutas de auth (`/api/auth/…`) no llevan token.
 */
function authHeaders(path: string): Record<string, string> {
  if (path.startsWith('/api/auth/')) return {};
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Extrae un mensaje legible del cuerpo de error de la respuesta.
 * Intenta parsear JSON; si falla, devuelve `"API <status>: <path>"`.
 */
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

/**
 * Objeto principal de acceso a la API.
 *
 * Todos los métodos devuelven Promesas tipadas y propagan errores como
 * instancias de `Error` con el mensaje del backend incluido.
 *
 * @example
 * ```ts
 * // Obtener diagnóstico en tiempo real de Cuauhtémoc (id = 68)
 * const diag = await api.irsa.diagnostic(68);
 * console.log(diag.irsaScore, diag.riskLevel);
 * ```
 */
export const api = {
  /** Autenticación — no requiere JWT */
  auth: {
    /**
     * `POST /api/auth/login`
     * Autentica al usuario y devuelve el JWT de sesión.
     */
    login: (credentials: LoginApiRequest) =>
      post<LoginApiResponse>('/api/auth/login', credentials),
  },

  /** Perfil del usuario autenticado */
  me: {
    /** `GET /api/me` — Obtiene los datos del usuario autenticado */
    get: () =>
      get<UserApiResponse>('/api/me'),
    /** `PUT /api/me` — Actualiza nombre y email del usuario autenticado */
    update: (data: UpdateProfileApiRequest) =>
      put<UserApiResponse>('/api/me', data),
  },

  /** Gestión de empresas (solo SUPER_ADMIN) */
  companies: {
    /** `POST /api/companies` */
    create: (data: CreateCompanyApiRequest) =>
      post<CompanyApiResponse>('/api/companies', data),
    /** `GET /api/companies` */
    listAll: () =>
      get<CompanyApiResponse[]>('/api/companies'),
  },

  /** Gestión de administradores (solo SUPER_ADMIN) */
  admins: {
    /** `POST /api/admins` */
    create: (data: CreateAdminApiRequest) =>
      post<UserApiResponse>('/api/admins', data),
    /** `GET /api/admins` */
    listAll: () =>
      get<UserApiResponse[]>('/api/admins'),
    /** `PUT /api/admins/:id` */
    update: (id: number, data: UpdateAdminApiRequest) =>
      put<UserApiResponse>(`/api/admins/${id}`, data),
  },

  /** Gestión de usuarios de empresa (ADMIN y SUPER_ADMIN) */
  companyUsers: {
    /** `POST /api/company-users` */
    create: (data: CreateCompanyUserApiRequest) =>
      post<UserApiResponse>('/api/company-users', data),
    /** `GET /api/company-users` */
    listAll: () =>
      get<UserApiResponse[]>('/api/company-users'),
    /** `PUT /api/company-users/:id/deactivate` */
    deactivate: (id: number) =>
      put<void>(`/api/company-users/${id}/deactivate`),
    /** `PUT /api/company-users/:id/activate` */
    activate: (id: number) =>
      put<UserApiResponse>(`/api/company-users/${id}/activate`),
  },

  /**
   * Municipios de CDMX.
   * El resultado ya está filtrado a las 16 alcaldías de la Ciudad de México.
   */
  municipalities: {
    /**
     * `GET /api/municipalities` — Devuelve solo los 16 municipios CDMX.
     * Cada municipio incluye `currentIrsa` para pintar el mapa sin peticiones extra.
     */
    listAll: () =>
      get<MunicipalityApiResponse[]>('/api/municipalities').then(onlyCdmxMunicipalities),
    /** `GET /api/municipalities/:id` */
    getById: (id: number) =>
      get<MunicipalityApiResponse>(`/api/municipalities/${id}`),
  },

  /** Datos de salud (enfermedades respiratorias) por municipio */
  health: {
    /** `GET /api/health` — Todos los municipios */
    listAll: () =>
      get<HealthSummaryApiResponse[]>('/api/health'),
    /** `GET /api/health/municipality/:id` — Municipio específico */
    getByMunicipality: (id: number) =>
      get<HealthSummaryApiResponse>(`/api/health/municipality/${id}`),
  },

  /**
   * Índice IRSA — Índice de Riesgo Sanitario Ambiental.
   *
   * Escala: **LOW** 0–40 · **MODERATE** 41–70 · **HIGH** 71–100
   */
  irsa: {
    /**
     * `GET /api/irsa` — Último IRSA persistido por municipio (datos almacenados).
     * Ya filtrado a CDMX. Prefiere {@link diagnostic} para datos en tiempo real.
     */
    listLatest: () =>
      get<IrsaApiResponse[]>('/api/irsa').then(onlyCdmxIrsa),
    /**
     * `GET /api/irsa/municipality/:id` — Último IRSA persistido de un municipio.
     * @deprecated Usa `api.irsa.diagnostic(id)` para el valor recalculado en tiempo real.
     */
    getByMunicipality: (id: number) =>
      get<IrsaApiResponse>(`/api/irsa/municipality/${id}`),
    /**
     * `GET /api/irsa/daily?date=YYYY-MM-DD` — IRSA del día indicado para todos
     * los municipios CDMX.
     */
    daily: (date: string) =>
      get<IrsaApiResponse[]>(`/api/irsa/daily?date=${date}`).then(onlyCdmxIrsa),
    /**
     * `GET /api/irsa/diagnostic/:id` — **Fuente de verdad en tiempo real.**
     *
     * Recalcula el IRSA al momento a partir de las mediciones más recientes.
     * Devuelve `irsaScore` (0–100) y los factores desglosados (contaminantes,
     * vulnerabilidad, clima) normalizados a 0–1.
     *
     * @param id - ID numérico del municipio (ver {@link ALCALDIA_ID})
     */
    diagnostic: (id: number) =>
      get<IrsaDiagnosticApiResponse>(`/api/irsa/diagnostic/${id}`),
<<<<<<< HEAD
    timelineSnapshot: (offsetDays = 0) =>
      get<IrsaTimelineSnapshotApiResponse>(`/api/irsa/diagnostic/timeline?offsetDays=${offsetDays}`),
    timeline: (id: number, daysBack = 10) =>
      get<IrsaTimelineApiResponse>(`/api/irsa/diagnostic/${id}/timeline?daysBack=${daysBack}`),
=======
    /**
     * `GET /api/irsa/trend/:id?period=MONTHLY&count=12`
     *
     * Serie temporal del IRSA para la página de Historial.
     * El frontend carga 48 meses de una sola vez y filtra por año en el cliente.
     *
     * @param id     - ID del municipio
     * @param period - Granularidad: `DAILY` | `WEEKLY` | `MONTHLY`
     * @param count  - Número de períodos hacia atrás desde hoy
     */
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
    trend: (id: number, period = 'MONTHLY', count = 12) =>
      get<IrsaTrendApiResponse>(
        `/api/irsa/trend/${id}?period=${period}&count=${count}`
      ),
  },

  /** Alertas de riesgo por usuario y municipio */
  alerts: {
    /**
     * `POST /api/alerts/subscribe` — Suscribe un usuario a las alertas de un municipio.
     * Crea una alerta activa si el IRSA ya supera el umbral.
     */
    subscribe: (userId: number, municipalityId: number) =>
      post<AlertApiResponse>(`/api/alerts/subscribe?userId=${userId}&municipalityId=${municipalityId}`),
    /** `GET /api/alerts/user/:userId/active` — Alertas activas del usuario */
    listActiveByUser: (userId: number) =>
      get<AlertApiResponse[]>(`/api/alerts/user/${userId}/active`),
    /** `PUT /api/alerts/:alertId/deactivate` — Desactiva una alerta */
    deactivate: (alertId: number) =>
      put<void>(`/api/alerts/${alertId}/deactivate`),
  },
};

// ─── Catálogo de IDs de alcaldías CDMX ───────────────────────────────────────

/**
 * Mapa de nombre de alcaldía → ID numérico en la BD del backend.
 * Incluye variantes con y sin acentos para mayor tolerancia.
 *
 * @example
 * ```ts
 * const id = ALCALDIA_ID['Coyoacán']; // 62
 * ```
 */
export const ALCALDIA_ID: Record<string, number> = {
  'Tlalpan':                58,
  'Benito Juarez':          60,
  'Benito Juárez':          60,
  'Azcapotzalco':           61,
  'Coyoacan':               62,
  'Coyoacán':               62,
  'Cuajimalpa':             64,
  'Cuajimalpa de Morelos':  64,
  'Gustavo A. Madero':      67,
  'Cuauhtemoc':             68,
  'Cuauhtémoc':             68,
  'Iztacalco':              70,
  'Venustiano Carranza':    73,
  'Miguel Hidalgo':         74,
  'Milpa Alta':             76,
  'Alvaro Obregon':         78,
  'Álvaro Obregón':         78,
  'Magdalena Contreras':    79,
  'La Magdalena Contreras': 79,
  'Iztapalapa':             80,
  'Tlahuac':                81,
  'Tláhuac':                81,
  'Xochimilco':             84,
};

/**
 * Set con los IDs numéricos de los 16 municipios de la CDMX.
 * Se usa para filtrar respuestas de la API que incluyen municipios nacionales.
 */
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

/**
 * Resuelve el ID numérico de una alcaldía dado su nombre.
 * Tolera variantes con/sin acentos.
 *
 * @param nombreAlcaldia - Nombre de la alcaldía (con o sin acentos)
 * @returns ID numérico si se encuentra, `null` en caso contrario
 *
 * @example
 * ```ts
 * getAlcaldiaId('Coyoacan')  // → 62
 * getAlcaldiaId('Coyoacán')  // → 62
 * getAlcaldiaId('XYZ')       // → null
 * ```
 */
export function getAlcaldiaId(nombreAlcaldia: string | null | undefined): number | null {
  if (!nombreAlcaldia) return null;
  return ALCALDIA_ID[nombreAlcaldia] ?? ALCALDIA_ID[withoutAccents(nombreAlcaldia)] ?? null;
}

/** Filtra un array de IRSA para incluir solo los municipios CDMX */
function onlyCdmxIrsa(irsaList: IrsaApiResponse[]): IrsaApiResponse[] {
  return irsaList.filter((irsa) =>
    CDMX_MUNICIPALITY_IDS.has(irsa.municipality.id) ||
    CDMX_MUNICIPALITY_NAMES.has(normalizeMunicipalityName(irsa.municipality.municipalityName))
  );
}

/** Filtra un array de municipios para incluir solo los de la CDMX */
function onlyCdmxMunicipalities(municipalities: MunicipalityApiResponse[]): MunicipalityApiResponse[] {
  return municipalities.filter((municipality) =>
    CDMX_MUNICIPALITY_IDS.has(municipality.id) ||
    CDMX_MUNICIPALITY_NAMES.has(normalizeMunicipalityName(municipality.municipalityName))
  );
}

/** Elimina acentos y diacríticos de un string */
function withoutAccents(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/** Normaliza un nombre de municipio: sin acentos, trim, espacios simples, minúsculas */
function normalizeMunicipalityName(value: string): string {
  return withoutAccents(value).trim().replace(/\s+/g, ' ').toLowerCase();
}
