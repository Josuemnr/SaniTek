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
  setSelectedDayOffset: (offset: number) => void;
  setRiskPoints: (points: RiskPoint[]) => void;
  setSelectedAlcaldia: (alcaldia: string | null) => void;
}

export const useRiskStore = create<RiskState>((set) => ({
  selectedDayOffset: 0,
  riskPoints: [],
  selectedAlcaldia: null,
  setSelectedDayOffset: (offset) => set({ selectedDayOffset: offset }),
  setRiskPoints: (points) => set({ riskPoints: points }),
  setSelectedAlcaldia: (alcaldia) => set({ selectedAlcaldia: alcaldia }),
}));
