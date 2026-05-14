import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { api } from '@/Services/backendApi';
import { useRiskStore } from '@/store/useRiskStore';
import {
  ZONAS_MOCK,
  type Zona,
  type RiskLevel,
} from '@/components/modules/filtrar-alcaldias/alcaldias-filter-data';

const NOMBRE_NORMALIZADO: Record<string, string> = {
  'Cuajimalpa': 'Cuajimalpa de Morelos',
};

const HUMEDAD_TIPICA: Record<string, number> = {
  'Álvaro Obregón':         52,
  'Azcapotzalco':           60,
  'Benito Juárez':          55,
  'Coyoacán':               65,
  'Cuajimalpa de Morelos':  70,
  'Cuauhtémoc':             58,
  'Gustavo A. Madero':      62,
  'Iztacalco':              68,
  'Iztapalapa':             70,
  'La Magdalena Contreras': 72,
  'Miguel Hidalgo':         50,
  'Milpa Alta':             72,
  'Tláhuac':                75,
  'Tlalpan':                80,
  'Venustiano Carranza':    45,
  'Xochimilco':             80,
};

function nivelARiskLevel(nivel: string): RiskLevel {
  switch (nivel) {
    case 'BAJO':     return 'seguro';
    case 'MODERADO': return 'moderado';
    case 'ALTO':     return 'alto';
    case 'CRITICO':  return 'critico';
    default:         return 'moderado';
  }
}

export function useAlcaldias() {
  const [zonas, setZonas]     = useState<Zona[]>(ZONAS_MOCK);
  const [loading, setLoading] = useState(false);

  const selectedDayOffset = useRiskStore((s) => s.selectedDayOffset);

  useEffect(() => {
    setLoading(true);

    const fetchPromise = selectedDayOffset === 0
      ? api.irsa.listar()
      : api.irsa.diario(format(addDays(new Date(), selectedDayOffset), 'yyyy-MM-dd'));

    fetchPromise
      .then((irsaList) => {
        const mappedZonas: Zona[] = irsaList.map((irsa) => {
          const nombre = NOMBRE_NORMALIZADO[irsa.alcaldia.nombre] ?? irsa.alcaldia.nombre;
          const calidadAire = Math.round(irsa.valorIrsa * 100);

          return {
            id:        String(irsa.alcaldia.id),
            nombre,
            alcaldia:  nombre,
            riskLevel: nivelARiskLevel(irsa.nivelRiesgo),
            calidadAire,
            humedad:   HUMEDAD_TIPICA[nombre] ?? 60,
          };
        });

        setZonas(mappedZonas);
      })
      .catch((err) => {
        console.error('[useAlcaldias] error al obtener IRSA:', err);
        setZonas(ZONAS_MOCK);
      })
      .finally(() => setLoading(false));
  }, [selectedDayOffset]);

  return { zonas, loading };
}
