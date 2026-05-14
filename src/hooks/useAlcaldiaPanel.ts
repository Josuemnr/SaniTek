import { useState, useEffect } from 'react';
import { api, type IrsaDiagnosticoApiResponse, type IrsaApiResponse, ALCALDIA_ID } from '@/Services/backendApi';

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
    // - porAlcaldia: valor almacenado en DB (misma fuente que el popup del mapa)
    // - diagnostico: detalles de clima y contaminantes (calculado al vuelo)
    Promise.all([
      api.irsa.porAlcaldia(id),
      api.irsa.diagnostico(id),
    ])
      .then(([stored, diag]: [IrsaApiResponse, IrsaDiagnosticoApiResponse]) => {
        if (cancelled) return;
        setData({
          id:                       stored.alcaldia.id,
          nombre:                   stored.alcaldia.nombre,
          // nivel e IRSA vienen del valor almacenado → consistente con el popup
          nivelRiesgo:              stored.nivelRiesgo,
          valorIrsa:                stored.valorIrsa,
          // detalles de calidad del aire y clima desde el diagnóstico
          puntajeAire:              diag.puntajeAire,
          puntajeClima:             diag.puntajeClima,
          humedad:                  diag.humedad,
          temperatura:              diag.temperatura,
          promediosPorContaminante: diag.promediosPorContaminante,
          tieneDataClima:           diag.tieneDataClima,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setError('No se pudo cargar la información de esta alcaldía');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [nombreAlcaldia]);

  return { data, loading, error };
}
