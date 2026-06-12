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
<<<<<<< HEAD
  /** Datos completos descargados para el snapshot actual (sincroniza mapa y panel) */
  alcaldiasSnapshot: Record<string, any>;
=======
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
  /** Mapa nombre → id cargado dinámicamente desde /api/municipalities */
  alcaldiaIdMap: Record<string, number>;
  setSelectedDayOffset: (offset: number) => void;
  setRiskPoints: (points: RiskPoint[]) => void;
  setSelectedAlcaldia: (alcaldia: string | null) => void;
<<<<<<< HEAD
  setAlcaldiasSnapshot: (data: Record<string, any>) => void;
=======
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
  setAlcaldiaIdMap: (map: Record<string, number>) => void;
}

export const useRiskStore = create<RiskState>((set) => ({
  selectedDayOffset: 0,
  riskPoints: [],
  selectedAlcaldia: null,
<<<<<<< HEAD
  alcaldiasSnapshot: {},
=======
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
  alcaldiaIdMap: {},
  setSelectedDayOffset: (offset) => set({ selectedDayOffset: offset }),
  setRiskPoints: (points) => set({ riskPoints: points }),
  setSelectedAlcaldia: (alcaldia) => set({ selectedAlcaldia: alcaldia }),
<<<<<<< HEAD
  setAlcaldiasSnapshot: (data) => set({ alcaldiasSnapshot: data }),
=======
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
  setAlcaldiaIdMap: (map) => set({ alcaldiaIdMap: map }),
}));
