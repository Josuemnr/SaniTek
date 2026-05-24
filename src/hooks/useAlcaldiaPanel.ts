import { useState, useEffect } from 'react';
import { api, type IrsaDiagnosticApiResponse, type IrsaApiResponse, ALCALDIA_ID } from '@/Services/backendApi';

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

    const id = ALCALDIA_ID[nombreAlcaldia];
    if (!id) {
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
          puntajeAire:              diag.airScore,
          puntajeClima:             diag.climateScore,
          humedad:                  60, // Default local
          temperatura:              20, // Default local
          promediosPorContaminante: diag.averagesByPollutant,
          tieneDataClima:           diag.hasTemperatureData,
        });
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('[useAlcaldiaPanel] error:', err);
        setError('No se pudo cargar la información de esta alcaldía');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [nombreAlcaldia]);

  return { data, loading, error };
}
