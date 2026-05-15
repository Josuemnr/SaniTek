import { useState, useEffect } from 'react';
import { api, ALCALDIA_ID, type IrsaDiagnosticoApiResponse } from '@/Services/backendApi';
import {
  getDetalleAlcaldia,
  type DetalleAlcaldia,
  type RiskTag,
} from '@/Components/modules/detalle-alcaldia/detalle-alcaldia-data';

export type { IrsaDiagnosticoApiResponse };

// ─── Helpers de conversión ────────────────────────────────────────────────────

function tempARiskTag(temp: number | null): RiskTag {
  if (temp === null) return 'Moderado';
  if (temp <= 22)   return 'Óptimo';
  if (temp <= 26)   return 'Moderado';
  if (temp <= 30)   return 'Alto';
  return 'Crítico';
}

function irsaDescripcion(irsa: number): string {
  if (irsa <= 40) return 'Nivel óptimo para operaciones normales';
  if (irsa <= 60) return 'Riesgo moderado, monitoreo continuo recomendado';
  if (irsa <= 80) return 'Nivel de riesgo elevado, atención prioritaria';
  return 'Riesgo crítico, intervención inmediata necesaria';
}

function toDetalle(diag: IrsaDiagnosticoApiResponse): DetalleAlcaldia {
  const irsa = Math.round(diag.valorIrsa * 1000) / 10; // 0-1 → 0-100
  const pm25 = diag.promediosPorContaminante['PM2.5'] ?? null;
  const calidadAire =
    pm25 !== null ? Math.min(100, Math.round((pm25 / 45) * 100)) : 50;

  return {
    nombre: diag.nombreAlcaldia,
    ciudad: 'Ciudad de México, México',
    irsa,
    irsaMax: 100,
    irsaDescripcion: irsaDescripcion(irsa),
    variables: {
      temperatura:       diag.temperatura ?? 20,
      humedad:           diag.humedad ?? 60,
      calidadAire,
      riesgoTemperatura: tempARiskTag(diag.temperatura),
    },
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useDetalleAlcaldia(nombreAlcaldia: string | null) {
  const [detalle, setDetalle]   = useState<DetalleAlcaldia | null>(null);
  const [diagRaw, setDiagRaw]   = useState<IrsaDiagnosticoApiResponse | null>(null);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (!nombreAlcaldia) return;
    const id = ALCALDIA_ID[nombreAlcaldia];
    if (!id) return;

    setLoading(true);
    api.irsa
      .diagnostico(id)
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
