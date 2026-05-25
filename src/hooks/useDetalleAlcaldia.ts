import { useState, useEffect } from 'react';
import { api, getAlcaldiaId, type IrsaDiagnosticApiResponse } from '@/Services/backendApi';
import {
  getDetalleAlcaldia,
  type DetalleAlcaldia,
  type RiskTag,
} from '@/Components/modules/detalle-alcaldia/detalle-alcaldia-data';

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
  const irsa = Math.round((diag.irsaScore || 0) * 10) / 10;
  const calidadAire = Math.round((diag.pollutantScore || 0) * 100);

  return {
    nombre: diag.municipalityName || 'Desconocida',
    ciudad: 'Ciudad de México, México',
    irsa,
    irsaMax: 100,
    irsaDescripcion: irsaDescripcion(irsa),
    variables: {
      temperatura:       20,
      humedad:           60,
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
