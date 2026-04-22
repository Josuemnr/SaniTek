import { describe, it, expect, beforeEach } from 'vitest';
import { useRiskStore } from './useRiskStore';

describe('useRiskStore', () => {
  beforeEach(() => {
    useRiskStore.setState({
      currentTime: 0,
      riskPoints: [],
      selectedAlcaldia: null,
    });
  });

  it('should set currentTime', () => {
    const time = Date.now();
    useRiskStore.getState().setCurrentTime(time);
    expect(useRiskStore.getState().currentTime).toBe(time);
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
});
