import { useState, useEffect } from 'react';
import { api, getAlcaldiaId, type IrsaDiagnosticApiResponse } from '@/Services/backendApi';
import { useRiskStore } from '@/store/useRiskStore';

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
  const alcaldiaIdMap         = useRiskStore((s) => s.alcaldiaIdMap);

  useEffect(() => {
    if (!nombreAlcaldia) {
      setData(null);
      setError(null);
      return;
    }

    // Primero el mapa dinámico (cargado desde la API), luego el catálogo estático como fallback
    const id = alcaldiaIdMap[nombreAlcaldia] ?? getAlcaldiaId(nombreAlcaldia);
    if (!id) {
      setData(null);
      setLoading(false);
      setError('Alcaldía no encontrada en el catálogo');
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    // Usamos SOLO el endpoint diagnostic como fuente de verdad:
    // - irsaScore: recálculo en tiempo real (más fresco que el dato guardado en BD)
    // - riskLevel: nivel calculado en el mismo momento que el irsaScore
    // - pollutantScore, normXxx: datos de contaminantes del mismo recálculo
    //
    // Evitamos getByMunicipality porque devuelve el último valor persistido, que puede
    // estar desactualizado respecto al recálculo en tiempo real del diagnostic.
    api.irsa
      .diagnostic(id)
      .then((diag: IrsaDiagnosticApiResponse) => {
        if (cancelled) return;
        setData({
          id:      diag.municipalityId,
          nombre:  diag.municipalityName,
          // irsaScore ya está en escala 0-100 (el engine hace × 100)
          nivelRiesgo: diag.riskLevel,
          valorIrsa:   diag.irsaScore,
          puntajeAire: diag.pollutantScore,
          puntajeClima: (diag.normUv + diag.normTmp) / 2,
          // normTmp normalizado 0-1 con umbral OMS 35 °C → temperatura real aproximada
          temperatura: Math.round(diag.normTmp * 35 * 10) / 10,
          // Humedad: el backend no mide humedad → null para no mostrar dato falso
          humedad: null,
          // Desnormalizar contaminantes: normX * umbral_OMS = valor aprox. µg/m³
          // THRESHOLD_NO2=25, THRESHOLD_O3=100, THRESHOLD_PM25=15
          promediosPorContaminante: {
            NO2:     diag.normNo2  * 25,
            O3:      diag.normO3   * 100,
            'PM2.5': diag.normPm25 * 15,
          },
          tieneDataClima: diag.uvMeasurements + diag.tmpMeasurements > 0,
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
  }, [nombreAlcaldia, alcaldiaIdMap]);

  return { data, loading, error };
}
