import { useState, useEffect } from 'react';
import { api, getAlcaldiaId, type IrsaDiagnosticApiResponse } from '@/Services/backendApi';
import {
  getDetalleAlcaldia,
  HUMEDAD_TIPICA,
  type DetalleAlcaldia,
  type RiskTag,
} from '@/Components/modules/detalle-alcaldia/detalle-alcaldia-data';

export type { IrsaDiagnosticApiResponse };

// ─── Helpers de conversión ────────────────────────────────────────────────────

function riskLevelToTag(level: string): RiskTag {
  switch (level) {
    case 'LOW':      return 'Óptimo';
    case 'MODERATE': return 'Moderado';
    case 'HIGH':
    case 'CRITICAL': return 'Alto';
    default:         return 'Moderado';
  }
}

function irsaDescripcion(irsa: number): string {
  if (irsa <= 40) return 'Nivel bajo de riesgo sanitario ambiental';
  if (irsa <= 70) return 'Nivel regular — monitoreo continuo recomendado';
  return 'Nivel alto — atención prioritaria requerida';
}

function toDetalle(diag: IrsaDiagnosticApiResponse): DetalleAlcaldia {
  const irsa        = Math.round((diag.irsaScore   || 0) * 10) / 10;
  // pollutantScore 0-1 → 0-100
  const calidadAire = Math.round((diag.pollutantScore || 0) * 100);
  // normTmp 0-1, umbral OMS = 35°C → temperatura real aproximada
  const temperatura = Math.round((diag.normTmp || 0) * 35 * 10) / 10;
  // Humedad no viene del backend → usamos valor típico por alcaldía
  const humedad     = HUMEDAD_TIPICA[diag.municipalityName] ?? 60;

  return {
    nombre: diag.municipalityName || 'Desconocida',
    ciudad: 'Ciudad de México, México',
    irsa,
    irsaMax: 100,
    irsaDescripcion: irsaDescripcion(irsa),
    variables: {
      temperatura,
      humedad,
      calidadAire,
      riesgoTemperatura: riskLevelToTag(diag.riskLevel || 'MODERATE'),
    },
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useDetalleAlcaldia(nombreAlcaldia: string | null) {
  const [detalle, setDetalle]   = useState<DetalleAlcaldia | null>(null);
  const [diagRaw, setDiagRaw]   = useState<IrsaDiagnosticApiResponse | null>(null);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (!nombreAlcaldia) {
      setDetalle(null);
      setDiagRaw(null);
      setLoading(false);
      return;
    }
    console.log('[useDetalleAlcaldia] Fetching data for:', nombreAlcaldia);
    const id = getAlcaldiaId(nombreAlcaldia);
    if (!id) {
      setDetalle(getDetalleAlcaldia(nombreAlcaldia));
      setDiagRaw(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    api.irsa
      .diagnostic(id)
      .then((diag) => {
        console.log('[useDetalleAlcaldia] respuesta backend:', diag);
        setDetalle(toDetalle(diag));
        setDiagRaw(diag);
      })
      .catch((err) => {
        console.error('[useDetalleAlcaldia] error al obtener datos:', err);
        setDetalle(getDetalleAlcaldia(nombreAlcaldia));
        setDiagRaw(null);
      })
      .finally(() => setLoading(false));
  }, [nombreAlcaldia]);

  return { detalle, diagRaw, loading };
}
