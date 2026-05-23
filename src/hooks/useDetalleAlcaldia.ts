import { useState, useEffect } from 'react';
import { api, ALCALDIA_ID, type IrsaDiagnosticApiResponse } from '@/Services/backendApi';
import {
  getDetalleAlcaldia,
  type DetalleAlcaldia,
  type RiskTag,
} from '@/components/modules/detalle-alcaldia/detalle-alcaldia-data';

export type { IrsaDiagnosticApiResponse };

// ─── Helpers de conversión ────────────────────────────────────────────────────

function riskLevelToTag(level: string): RiskTag {
  switch (level) {
    case 'LOW':      return 'Óptimo';
    case 'MODERATE': return 'Moderado';
    case 'HIGH':     return 'Alto';
    case 'CRITICAL': return 'Crítico';
    default:         return 'Moderado';
  }
}

function irsaDescripcion(irsa: number): string {
  if (irsa <= 40) return 'Nivel óptimo para operaciones normales';
  if (irsa <= 60) return 'Riesgo moderado, monitoreo continuo recomendado';
  if (irsa <= 80) return 'Nivel de riesgo elevado, atención prioritaria';
  return 'Riesgo crítico, intervención inmediata necesaria';
}

function toDetalle(diag: IrsaDiagnosticApiResponse): DetalleAlcaldia {
  const irsa = Math.round(diag.irsaValue * 1000) / 10; // 0-1 → 0-100
  const pm25 = diag.averagesByPollutant['PM2.5'] ?? null;
  const calidadAire =
    pm25 !== null ? Math.min(100, Math.round((pm25 / 45) * 100)) : 50;

  return {
    nombre: diag.municipalityName,
    ciudad: 'Ciudad de México, México',
    irsa,
    irsaMax: 100,
    irsaDescripcion: irsaDescripcion(irsa),
    variables: {
      // El nuevo backend no retorna temperatura/humedad directamente en el diagnóstico;
      // se usan valores por defecto razonables para CDMX.
      temperatura:       20,
      humedad:           60,
      calidadAire,
      riesgoTemperatura: riskLevelToTag(diag.riskLevel),
    },
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useDetalleAlcaldia(nombreAlcaldia: string | null) {
  const [detalle, setDetalle]   = useState<DetalleAlcaldia | null>(null);
  const [diagRaw, setDiagRaw]   = useState<IrsaDiagnosticApiResponse | null>(null);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (!nombreAlcaldia) return;
    const id = ALCALDIA_ID[nombreAlcaldia];
    if (!id) return;

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
