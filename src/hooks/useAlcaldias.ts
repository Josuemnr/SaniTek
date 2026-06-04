import { useState, useEffect } from 'react';
import {
  api,
  CDMX_MUNICIPALITY_IDS,
  type IrsaDiagnosticApiResponse,
  type IrsaTimelineMunicipalityPointApi,
} from '@/Services/backendApi';
import {
  ZONAS_MOCK,
  type Zona,
  type RiskLevel,
} from '@/Components/modules/filtrar-alcaldias/alcaldias-filter-data';
import { useRiskStore } from '@/store/useRiskStore';

const CACHE_KEY_PREFIX = 'sanitek:alcaldias-irsa-cache:v2';
const CACHE_TTL_MS = 10 * 60 * 1000;

interface AlcaldiasCache {
  savedAt: number;
  zonas: Zona[];
  alcaldiaIdMap: Record<string, number>;
}

const memoryCache = new Map<string, AlcaldiasCache>();
const inFlightLoads = new Map<string, Promise<AlcaldiasCache>>();

const NOMBRE_NORMALIZADO: Record<string, string> = {
  'Alvaro Obregon': 'Álvaro Obregón',
  'Benito Juarez': 'Benito Juárez',
  'Coyoacan': 'Coyoacán',
  'Cuajimalpa': 'Cuajimalpa de Morelos',
  'Cuauhtemoc': 'Cuauhtémoc',
  'Magdalena Contreras': 'La Magdalena Contreras',
  'Tlahuac': 'Tláhuac',
};

const HUMEDAD_TIPICA: Record<string, number> = {
  'Álvaro Obregón':         52,
  'Azcapotzalco':           60,
  'Benito Juárez':          55,
  'Coyoacán':               65,
  'Cuajimalpa de Morelos':  70,
  'Cuauhtémoc':             58,
  'Gustavo A. Madero':      62,
  'Iztacalco':              68,
  'Iztapalapa':             70,
  'La Magdalena Contreras': 72,
  'Miguel Hidalgo':         50,
  'Milpa Alta':             72,
  'Tláhuac':                75,
  'Tlalpan':                80,
  'Venustiano Carranza':    45,
  'Xochimilco':             80,
};

// El backend usa: LOW (0-40) | MODERATE (41-70) | HIGH (71-100)
function riskLevelToZona(level: string): RiskLevel {
  switch (level) {
    case 'LOW':      return 'seguro';
    case 'MODERATE': return 'moderado';
    case 'HIGH':
    case 'CRITICAL': return 'alto';   // CRITICAL por si queda algún registro antiguo
    default:         return 'moderado';
  }
}

function diagToZona(m: { id: number; municipalityName: string }, diag: IrsaDiagnosticApiResponse): Zona {
  const nombre = NOMBRE_NORMALIZADO[m.municipalityName] ?? m.municipalityName;
  return {
    id:          String(m.id),
    nombre,
    alcaldia:    nombre,
    // irsaScore ya está en escala 0-100; guardamos con 1 decimal para el popup
    riskLevel:   riskLevelToZona(diag.riskLevel),
    calidadAire: Math.round(diag.irsaScore * 10) / 10,
    humedad:     HUMEDAD_TIPICA[nombre] ?? 60,
  };
}

function timelinePointToZona(
  point: IrsaTimelineMunicipalityPointApi
): Zona {
  const nombre = NOMBRE_NORMALIZADO[point.municipalityName] ?? point.municipalityName;
  return {
    id:          String(point.municipalityId),
    nombre,
    alcaldia:    nombre,
    riskLevel:   riskLevelToZona(point.riskLevel ?? ''),
    calidadAire: Math.round((point.irsaScore ?? 0) * 10) / 10,
    humedad:     HUMEDAD_TIPICA[nombre] ?? 60,
  };
}

function cacheKey(dayOffset: number): string {
  return `${CACHE_KEY_PREFIX}:${dayOffset}`;
}

function readCache(dayOffset: number): AlcaldiasCache | null {
  const key = cacheKey(dayOffset);
  const cached = memoryCache.get(key) ?? readSessionCache(key);
  if (!cached) return null;

  if (Date.now() - cached.savedAt > CACHE_TTL_MS) {
    memoryCache.delete(key);
    sessionStorage.removeItem(key);
    return null;
  }

  memoryCache.set(key, cached);
  return cached;
}

function readSessionCache(key: string): AlcaldiasCache | null {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) as AlcaldiasCache : null;
  } catch {
    sessionStorage.removeItem(key);
    return null;
  }
}

function saveCache(dayOffset: number, cache: AlcaldiasCache) {
  const key = cacheKey(dayOffset);
  memoryCache.set(key, cache);
  try {
    sessionStorage.setItem(key, JSON.stringify(cache));
  } catch {
    // If storage is unavailable/full, the in-memory cache still prevents duplicate requests.
  }
}

async function loadAlcaldiasIrsa(dayOffset: number): Promise<AlcaldiasCache> {
  const cached = readCache(dayOffset);
  if (cached) return cached;
  const key = cacheKey(dayOffset);
  const inFlightLoad = inFlightLoads.get(key);
  if (inFlightLoad) return inFlightLoad;

  if (dayOffset < 0) {
    const load = loadTimelineSnapshot(Math.abs(dayOffset));
    inFlightLoads.set(key, load);
    load.finally(() => {
      inFlightLoads.delete(key);
    });
    return load;
  }

  const load = api.municipalities.listAll()
    .then(async (municipalities) => {
      const idMap = buildIdMap(municipalities);

      const staleZonas: Zona[] = municipalities
        .filter((m) => m.currentIrsa)
        .map((m) => {
          const nombre = NOMBRE_NORMALIZADO[m.municipalityName] ?? m.municipalityName;
          return {
            id:          String(m.id),
            nombre,
            alcaldia:    nombre,
            riskLevel:   riskLevelToZona(m.currentIrsa?.riskLevel ?? ''),
            calidadAire: Math.round(m.currentIrsa?.irsaValue ?? 0),
            humedad:     HUMEDAD_TIPICA[nombre] ?? 60,
          };
        });

      const diagResults = await Promise.allSettled(
        municipalities.map((m) => api.irsa.diagnostic(m.id))
      );

      const realtimeZonas: any[] = municipalities
        .map((m, i) => {
          const result = diagResults[i];
          if (result.status === 'fulfilled') {
            const diag = result.value;
            const nombre = NOMBRE_NORMALIZADO[m.municipalityName] ?? m.municipalityName;
            return {
              ...diagToZona(m, diag),
              // Guardamos el raw para el panel de información
              _fullDiagnostic: diag
            };
          }

          if (!m.currentIrsa) return null;
          const nombre = NOMBRE_NORMALIZADO[m.municipalityName] ?? m.municipalityName;
          return {
            id:          String(m.id),
            nombre,
            alcaldia:    nombre,
            riskLevel:   riskLevelToZona(m.currentIrsa.riskLevel),
            calidadAire: Math.round(m.currentIrsa.irsaValue ?? 0),
            humedad:     HUMEDAD_TIPICA[nombre] ?? 60,
          } satisfies Zona;
        })
        .filter((z): z is Zona => z !== null);

      const cache: AlcaldiasCache = {
        savedAt: Date.now(),
        zonas: realtimeZonas.length > 0 ? realtimeZonas : staleZonas,
        alcaldiaIdMap: idMap,
      };

      saveCache(dayOffset, cache);
      return cache;
    })
    .finally(() => {
      inFlightLoads.delete(key);
    });

  inFlightLoads.set(key, load);
  return load;
}

async function loadTimelineSnapshot(offsetDays: number): Promise<AlcaldiasCache> {
  const snapshot = await api.irsa.timelineSnapshot(offsetDays);
  const validMunicipalities = snapshot.municipalities.filter((point) =>
    CDMX_MUNICIPALITY_IDS.has(point.municipalityId) &&
    point.status === 'OK' &&
    point.irsaScore !== null &&
    point.riskLevel !== null
  );

  const cache: AlcaldiasCache = {
    savedAt: Date.now(),
    zonas: validMunicipalities.map(timelinePointToZona),
    alcaldiaIdMap: buildIdMap(
      validMunicipalities.map((point) => ({
        id: point.municipalityId,
        municipalityName: point.municipalityName,
      }))
    ),
  };

  saveCache(-offsetDays, cache);
  return cache;
}

function buildIdMap(municipalities: { id: number; municipalityName: string }[]) {
  const idMap: Record<string, number> = {};
  for (const m of municipalities) {
    const nombre = NOMBRE_NORMALIZADO[m.municipalityName] ?? m.municipalityName;
    idMap[nombre]             = m.id;
    idMap[m.municipalityName] = m.id;
  }
  return idMap;
}

export function useAlcaldias() {
  const selectedDayOffset    = useRiskStore((s) => s.selectedDayOffset);
  const setAlcaldiasSnapshot = useRiskStore((s) => s.setAlcaldiasSnapshot);
  const setAlcaldiaIdMap     = useRiskStore((s) => s.setAlcaldiaIdMap);
  
  const cached = readCache(selectedDayOffset);
  const [zonas, setZonas]     = useState<Zona[]>(cached?.zonas ?? ZONAS_MOCK);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const updateGlobalData = (result: AlcaldiasCache) => {
      setZonas(result.zonas);
      setAlcaldiaIdMap(result.alcaldiaIdMap);
      
      // Mapear zonas a snapshot para acceso instantáneo por nombre
      const snapshot: Record<string, any> = {};
      result.zonas.forEach(z => {
        snapshot[z.nombre] = z;
      });
      setAlcaldiasSnapshot(snapshot);
    };

    const cachedResult = readCache(selectedDayOffset);
    if (cachedResult) {
      updateGlobalData(cachedResult);
      return () => { cancelled = true; };
    }

    setLoading(true);
    if (selectedDayOffset < 0) setZonas([]);
    loadAlcaldiasIrsa(selectedDayOffset)
      .then((result) => {
        if (cancelled) return;
        updateGlobalData(result);
      })
      .catch((err) => {
        console.error('[useAlcaldias] error al obtener datos:', err);
        if (!cancelled) setZonas(ZONAS_MOCK);
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [selectedDayOffset, setAlcaldiaIdMap, setAlcaldiasSnapshot]);

  return { zonas, loading };
}
