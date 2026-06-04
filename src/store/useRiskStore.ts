import { create } from 'zustand';

export interface RiskPoint {
  lat: number;
  lng: number;
  intensity: number;
  timestamp: number;
}

interface RiskState {
  selectedDayOffset: number;  // días relativo a hoy: -10 (pasado) … 0 (hoy) … +10 (futuro/predicción)
  riskPoints: RiskPoint[];
  selectedAlcaldia: string | null;
  /** Datos completos descargados para el snapshot actual (sincroniza mapa y panel) */
  alcaldiasSnapshot: Record<string, any>;
  /** Mapa nombre → id cargado dinámicamente desde /api/municipalities */
  alcaldiaIdMap: Record<string, number>;
  setSelectedDayOffset: (offset: number) => void;
  setRiskPoints: (points: RiskPoint[]) => void;
  setSelectedAlcaldia: (alcaldia: string | null) => void;
  setAlcaldiasSnapshot: (data: Record<string, any>) => void;
  setAlcaldiaIdMap: (map: Record<string, number>) => void;
}

export const useRiskStore = create<RiskState>((set) => ({
  selectedDayOffset: 0,
  riskPoints: [],
  selectedAlcaldia: null,
  alcaldiasSnapshot: {},
  alcaldiaIdMap: {},
  setSelectedDayOffset: (offset) => set({ selectedDayOffset: offset }),
  setRiskPoints: (points) => set({ riskPoints: points }),
  setSelectedAlcaldia: (alcaldia) => set({ selectedAlcaldia: alcaldia }),
  setAlcaldiasSnapshot: (data) => set({ alcaldiasSnapshot: data }),
  setAlcaldiaIdMap: (map) => set({ alcaldiaIdMap: map }),
}));
