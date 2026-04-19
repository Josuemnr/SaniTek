import { create } from 'zustand';

export interface RiskPoint {
  lat: number;
  lng: number;
  intensity: number;
  timestamp: number;
}

interface RiskState {
  currentTime: number;
  riskPoints: RiskPoint[];
  selectedAlcaldia: string | null;
  setCurrentTime: (time: number) => void;
  setRiskPoints: (points: RiskPoint[]) => void;
  setSelectedAlcaldia: (alcaldia: string | null) => void;
}

export const useRiskStore = create<RiskState>((set) => ({
  currentTime: Date.now(),
  riskPoints: [],
  selectedAlcaldia: null,
  setCurrentTime: (time) => set({ currentTime: time }),
  setRiskPoints: (points) => set({ riskPoints: points }),
  setSelectedAlcaldia: (alcaldia) => set({ selectedAlcaldia: alcaldia }),
}));
