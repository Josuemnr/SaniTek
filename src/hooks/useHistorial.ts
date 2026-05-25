import { useState, useEffect } from 'react';
import { api, getAlcaldiaId, type TrendPointApi } from '@/Services/backendApi';
import {
  DATA_CDMX,
  getMetricas,
  type DataPoint,
  type Metricas,
} from '@/components/modules/historial-riesgos/historial-data';

const MES_INDEX: Record<string, number> = {
  // El backend nuevo devuelve etiquetas en inglés: "Jan 2025", "Feb 2025", …
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  // Soporte legacy por si los datos tienen meses en español
  Ene: 0, Abr: 3, Ago: 7, Dic: 11,
};

function etiquetaAMes(etiqueta: string): string {
  return etiqueta.split(' ')[0];
}

function etiquetaAnio(etiqueta: string): number {
  return parseInt(etiqueta.split(' ')[1], 10);
}

function etiquetaMesIndex(etiqueta: string): number {
  return MES_INDEX[etiqueta.split(' ')[0]] ?? 0;
}

function puntosADataPoints(puntos: TrendPointApi[]): DataPoint[] {
  return puntos.map((p, i, arr) => {
    const indice = Math.round(p.avgIrsa * 10) / 10;
    const ventana = arr.slice(Math.max(0, i - 2), i + 1);
    const tendencia = Math.round(
      (ventana.reduce((s, w) => s + w.avgIrsa, 0) / ventana.length) * 10
    ) / 10;
    return { mes: etiquetaAMes(p.label), indice, tendencia };
  });
}

export function useHistorial(nombreAlcaldia: string | null, selectedYear: number) {
  const [allPuntos, setAllPuntos]           = useState<TrendPointApi[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([new Date().getFullYear()]);
  const [data, setData]                     = useState<DataPoint[]>(DATA_CDMX);
  const [metricas, setMetricas]             = useState<Metricas>(getMetricas(DATA_CDMX));
  const [loading, setLoading]               = useState(false);
  const [alcaldiaName, setAlcaldiaName]     = useState<string>('CDMX');

  // Fetch a wide range (48 months) when alcaldía changes — covers ~4 years
  useEffect(() => {
    const nombre = nombreAlcaldia ?? 'Cuauhtémoc';
    const id     = getAlcaldiaId(nombre) ?? getAlcaldiaId('Cuauhtemoc') ?? 12;

    setLoading(true);
    api.irsa
      .trend(id, 'MONTHLY', 48)
      .then((resp) => {
        setAllPuntos(resp.points);
        setAlcaldiaName(resp.municipalityName);

        const years = [
          ...new Set(resp.points.map((p) => etiquetaAnio(p.label)).filter(Boolean)),
        ].sort((a, b) => a - b);

        setAvailableYears(years.length > 0 ? years : [new Date().getFullYear()]);
      })
      .catch((err) => {
        console.error('[useHistorial] error al obtener tendencia:', err);
        setAllPuntos([]);
        setAvailableYears([new Date().getFullYear()]);
      })
      .finally(() => setLoading(false));
  }, [nombreAlcaldia]);

  // Refilter data when year or fetched data changes
  useEffect(() => {
    const now          = new Date();
    const currentYear  = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed

    let filtered = allPuntos.filter((p) => etiquetaAnio(p.label) === selectedYear);

    if (selectedYear === currentYear) {
      filtered = filtered.filter((p) => etiquetaMesIndex(p.label) <= currentMonth);
    }

    if (filtered.length === 0) {
      setData(DATA_CDMX);
      setMetricas(getMetricas(DATA_CDMX));
      return;
    }

    const dataPoints = puntosADataPoints(filtered);
    setData(dataPoints);
    setMetricas(getMetricas(dataPoints));
  }, [allPuntos, selectedYear]);

  return { data, metricas, loading, alcaldiaName, availableYears };
}
