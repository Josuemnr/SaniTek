import { useState, useEffect } from 'react';
import { api, getAlcaldiaId, type IrsaDiagnosticApiResponse, type IrsaApiResponse } from '@/Services/backendApi';

interface AlcaldiaPanelData {
  id: number;
  nombre: string;
  nivelRiesgo: string;
  valorIrsa: number;
  puntajeAire: number;
  puntajeClima: number;
  humedad: number | null;
  temperatura: number | null;
  promediosPorContaminante: Record<string, number>;
  tieneDataClima: boolean;
}

interface UseAlcaldiaPanelResult {
  data:    AlcaldiaPanelData | null;
  loading: boolean;
  error:   string | null;
}

export function useAlcaldiaPanel(nombreAlcaldia: string | null): UseAlcaldiaPanelResult {
  const [data,    setData]    = useState<AlcaldiaPanelData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!nombreAlcaldia) {
      setData(null);
      setError(null);
      return;
    }

    const id = getAlcaldiaId(nombreAlcaldia);
    if (!id) {
      setData(null);
      setLoading(false);
      setError('Alcaldía no encontrada en el catálogo');
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    // Llamamos ambos endpoints en paralelo:
    // - getByMunicipality: valor almacenado en DB
    // - diagnostic: detalles de clima y contaminantes
    Promise.all([
      api.irsa.getByMunicipality(id),
      api.irsa.diagnostic(id),
    ])
      .then(([stored, diag]: [IrsaApiResponse, IrsaDiagnosticApiResponse]) => {
        if (cancelled) return;
        setData({
          id:                       stored.municipality.id,
          nombre:                   stored.municipality.municipalityName,
          nivelRiesgo:              stored.riskLevel,
          valorIrsa:                stored.irsaValue,
          puntajeAire:              diag.pollutantScore,
          puntajeClima:             (diag.normUv + diag.normTmp) / 2,
          humedad:                  60, // Default local
          temperatura:              20, // Default local
          promediosPorContaminante: {
            NO2: diag.normNo2 * 100,
            O3: diag.normO3 * 110,
            'PM2.5': diag.normPm25 * 45,
          },
          tieneDataClima:           diag.uvMeasurements + diag.tmpMeasurements > 0,
        });
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('[useAlcaldiaPanel] error:', err);
        setData(null);
        setError('No se pudo cargar la información de esta alcaldía');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [nombreAlcaldia]);

  return { data, loading, error };
}
