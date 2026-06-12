import { useState, useEffect } from 'react';
import { api, type IrsaDiagnosticApiResponse } from '@/Services/backendApi';
import {
  ZONAS_MOCK,
  type Zona,
  type RiskLevel,
} from '@/Components/modules/filtrar-alcaldias/alcaldias-filter-data';
import { useRiskStore } from '@/store/useRiskStore';

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

export function useAlcaldias() {
  const [zonas, setZonas]     = useState<Zona[]>(ZONAS_MOCK);
  const [loading, setLoading] = useState(false);
  const setAlcaldiaIdMap      = useRiskStore((s) => s.setAlcaldiaIdMap);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    api.municipalities.listAll()
      .then(async (municipalities) => {
        if (cancelled) return;

        // ── 1. Construir el mapa nombre → id ────────────────────────────────
        const idMap: Record<string, number> = {};
        for (const m of municipalities) {
          const nombre = NOMBRE_NORMALIZADO[m.municipalityName] ?? m.municipalityName;
          idMap[nombre]             = m.id;
          idMap[m.municipalityName] = m.id;
        }
        setAlcaldiaIdMap(idMap);

        // ── 2. Fase 1: mostrar datos del mapa con valores almacenados (rápido)
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
        if (!cancelled && staleZonas.length > 0) setZonas(staleZonas);

        // ── 3. Fase 2: cargar diagnósticos en paralelo (fuente de verdad) ───
        const diagResults = await Promise.allSettled(
          municipalities.map((m) => api.irsa.diagnostic(m.id))
        );
        if (cancelled) return;

        const realtimeZonas: Zona[] = municipalities
          .map((m, i) => {
            const result = diagResults[i];
            if (result.status === 'fulfilled') {
              return diagToZona(m, result.value);
            }
            // Si el diagnóstico falló, usar valor almacenado como respaldo
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

        if (realtimeZonas.length > 0) setZonas(realtimeZonas);
      })
      .catch((err) => {
        console.error('[useAlcaldias] error al obtener datos:', err);
        if (!cancelled) setZonas(ZONAS_MOCK);
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [setAlcaldiaIdMap]);

  return { zonas, loading };
}
