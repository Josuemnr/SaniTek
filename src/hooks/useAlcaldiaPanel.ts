import { useState, useEffect } from 'react';
import { api, getAlcaldiaId, type IrsaDiagnosticApiResponse } from '@/Services/backendApi';
import { useRiskStore } from '@/store/useRiskStore';

export interface AlcaldiaPanelData {
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

export interface UseAlcaldiaPanelResult {
  data:    AlcaldiaPanelData | null;
  loading: boolean;
  error:   string | null;
}

export function useAlcaldiaPanel(nombreAlcaldia: string | null): UseAlcaldiaPanelResult {
  const [data,    setData]    = useState<AlcaldiaPanelData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
<<<<<<< HEAD
  const snapshot              = useRiskStore((s) => s.alcaldiasSnapshot);
=======
  const alcaldiaIdMap         = useRiskStore((s) => s.alcaldiaIdMap);
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f

  useEffect(() => {
    if (!nombreAlcaldia) {
      setData(null);
      return;
    }

<<<<<<< HEAD
    const localData = snapshot[nombreAlcaldia];
    if (!localData) {
      // Si no hay datos en el snapshot (ej. el mapa aún no carga)
=======
    // Primero el mapa dinámico (cargado desde la API), luego el catálogo estático como fallback
    const id = alcaldiaIdMap[nombreAlcaldia] ?? getAlcaldiaId(nombreAlcaldia);
    if (!id) {
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
      setData(null);
      return;
    }

<<<<<<< HEAD
    // Si tenemos el diagnóstico completo (datos de hoy)
    if (localData._fullDiagnostic) {
      const diag = localData._fullDiagnostic;
      setData({
        id:      diag.municipalityId,
        nombre:  diag.municipalityName,
        nivelRiesgo: diag.riskLevel,
        valorIrsa:   diag.irsaScore,
        puntajeAire: diag.pollutantScore,
        puntajeClima: (diag.normUv + diag.normTmp) / 2,
        temperatura: Math.round(diag.normTmp * 35 * 10) / 10,
        humedad: null,
        promediosPorContaminante: {
          NO2:     diag.normNo2  * 25,
          O3:      diag.normO3   * 100,
          'PM2.5': diag.normPm25 * 15,
        },
        tieneDataClima: diag.uvMeasurements + diag.tmpMeasurements > 0,
      });
    } else {
      // Datos resumidos (historial/snapshot del pasado)
      setData({
        id:          parseInt(localData.id),
        nombre:      localData.nombre,
        nivelRiesgo: localData.riskLevel, // Mantenemos la clave original (seguro/moderado/alto)
        valorIrsa:   localData.calidadAire, // En zonas, calidadAire es el IRSA
        puntajeAire: localData.calidadAire / 100, // Estimación basada en IRSA
        puntajeClima: 0.5,
        temperatura: 22, 
        humedad:     localData.humedad,
        promediosPorContaminante: {},
        tieneDataClima: false,
      });
    }
  }, [nombreAlcaldia, snapshot]);
=======
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
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f

  return { data, loading, error };
}
