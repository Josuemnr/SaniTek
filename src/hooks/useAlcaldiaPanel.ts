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
  const snapshot              = useRiskStore((s) => s.alcaldiasSnapshot);

  useEffect(() => {
    if (!nombreAlcaldia) {
      setData(null);
      return;
    }

    const localData = snapshot[nombreAlcaldia];
    if (!localData) {
      // Si no hay datos en el snapshot (ej. el mapa aún no carga)
      setData(null);
      return;
    }

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

  return { data, loading, error };
}
