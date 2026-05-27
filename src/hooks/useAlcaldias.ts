import { useState, useEffect } from 'react';
import { api } from '@/Services/backendApi';
import {
  ZONAS_MOCK,
  type Zona,
  type RiskLevel,
} from '@/Components/modules/filtrar-alcaldias/alcaldias-filter-data';

const NOMBRE_NORMALIZADO: Record<string, string> = {
  'Alvaro Obregon': 'Álvaro Obregón',
  'Benito Juarez': 'Benito Juárez',
  'Coyoacan': 'Coyoacán',
  'Cuajimalpa': 'Cuajimalpa de Morelos',
  'Cuauhtemoc': 'Cuauhtémoc',
  'Magdalena Contreras': 'La Magdalena Contreras',
  'Tlahuac': 'Tláhuac',
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

// El backend nuevo usa valores en inglés: LOW | MODERATE | HIGH | CRITICAL
function riskLevelToZona(level: string): RiskLevel {
  switch (level) {
    case 'LOW':      return 'seguro';
    case 'MODERATE': return 'moderado';
    case 'HIGH':     return 'alto';
    case 'CRITICAL': return 'critico';
    default:         return 'moderado';
  }
}

export function useAlcaldias() {
  const [zonas, setZonas]     = useState<Zona[]>(ZONAS_MOCK);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    api.municipalities.listAll()
      .then((municipalities) => {
        const mappedZonas: Zona[] = municipalities
          .filter((municipality) => municipality.currentIrsa)
          .map((municipality) => {
          const nombre = NOMBRE_NORMALIZADO[municipality.municipalityName]
            ?? municipality.municipalityName;
          const calidadAire = Math.round(municipality.currentIrsa?.irsaValue ?? 0);

          return {
            id:        String(municipality.id),
            nombre,
            alcaldia:  nombre,
            riskLevel: riskLevelToZona(municipality.currentIrsa?.riskLevel ?? ''),
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
  }, []);

  return { zonas, loading };
}
