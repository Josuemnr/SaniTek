import { describe, it, expect, beforeEach } from 'vitest';
import { useRiskStore } from './useRiskStore';

describe('useRiskStore', () => {
  beforeEach(() => {
    useRiskStore.setState({
      selectedDayOffset: 0,
      riskPoints: [],
      selectedAlcaldia: null,
      alcaldiaIdMap: {},
    });
  });

  it('should set selectedDayOffset', () => {
    useRiskStore.getState().setSelectedDayOffset(-3);
    expect(useRiskStore.getState().selectedDayOffset).toBe(-3);
  });

  it('should set riskPoints', () => {
    const points = [
      { lat: 19.4326, lng: -99.1332, intensity: 0.8, timestamp: Date.now() },
    ];
    useRiskStore.getState().setRiskPoints(points);
    expect(useRiskStore.getState().riskPoints).toEqual(points);
  });

  it('should set selectedAlcaldia', () => {
    const alcaldia = 'Coyoacán';
    useRiskStore.getState().setSelectedAlcaldia(alcaldia);
    expect(useRiskStore.getState().selectedAlcaldia).toBe(alcaldia);
  });

  it('should set alcaldiaIdMap', () => {
    const map = { Coyoacan: 62, 'Benito Juarez': 60 };
    useRiskStore.getState().setAlcaldiaIdMap(map);
    expect(useRiskStore.getState().alcaldiaIdMap).toEqual(map);
  });
});
