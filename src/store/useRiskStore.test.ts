import { describe, it, expect, beforeEach } from 'vitest';
import { useRiskStore } from './useRiskStore';

const INITIAL_STATE = {
  selectedDayOffset: 0,
  riskPoints: [],
  selectedAlcaldia: null,
  alcaldiaIdMap: {},
};

describe('useRiskStore', () => {
  beforeEach(() => {
<<<<<<< HEAD
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
=======
    useRiskStore.setState(INITIAL_STATE);
  });

  // ── selectedDayOffset ──────────────────────────────────────────────────────

  it('setSelectedDayOffset actualiza el offset correctamente', () => {
    useRiskStore.getState().setSelectedDayOffset(-5);
    expect(useRiskStore.getState().selectedDayOffset).toBe(-5);
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
  });

  it('setSelectedDayOffset acepta valores positivos', () => {
    useRiskStore.getState().setSelectedDayOffset(10);
    expect(useRiskStore.getState().selectedDayOffset).toBe(10);
  });

  it('setSelectedDayOffset acepta 0 (hoy)', () => {
    useRiskStore.getState().setSelectedDayOffset(-3);
    useRiskStore.getState().setSelectedDayOffset(0);
    expect(useRiskStore.getState().selectedDayOffset).toBe(0);
  });

  // ── riskPoints ─────────────────────────────────────────────────────────────

  it('setRiskPoints actualiza el array de puntos de riesgo', () => {
    const points = [
      { lat: 19.4326, lng: -99.1332, intensity: 0.8, timestamp: Date.now() },
    ];
    useRiskStore.getState().setRiskPoints(points);
    expect(useRiskStore.getState().riskPoints).toEqual(points);
  });

  it('setRiskPoints acepta array vacío', () => {
    useRiskStore.getState().setRiskPoints([{ lat: 0, lng: 0, intensity: 1, timestamp: 0 }]);
    useRiskStore.getState().setRiskPoints([]);
    expect(useRiskStore.getState().riskPoints).toHaveLength(0);
  });

  it('setRiskPoints preserva todos los campos de RiskPoint', () => {
    const point = { lat: 19.0, lng: -99.0, intensity: 0.5, timestamp: 1000 };
    useRiskStore.getState().setRiskPoints([point]);
    const stored = useRiskStore.getState().riskPoints[0];
    expect(stored.lat).toBe(19.0);
    expect(stored.lng).toBe(-99.0);
    expect(stored.intensity).toBe(0.5);
    expect(stored.timestamp).toBe(1000);
  });

  // ── selectedAlcaldia ───────────────────────────────────────────────────────

  it('setSelectedAlcaldia actualiza la alcaldía seleccionada', () => {
    useRiskStore.getState().setSelectedAlcaldia('Coyoacán');
    expect(useRiskStore.getState().selectedAlcaldia).toBe('Coyoacán');
  });

  it('setSelectedAlcaldia acepta null para deseleccionar', () => {
    useRiskStore.getState().setSelectedAlcaldia('Iztapalapa');
    useRiskStore.getState().setSelectedAlcaldia(null);
    expect(useRiskStore.getState().selectedAlcaldia).toBeNull();
  });

  it('setSelectedAlcaldia reemplaza la selección anterior', () => {
    useRiskStore.getState().setSelectedAlcaldia('Coyoacán');
    useRiskStore.getState().setSelectedAlcaldia('Tlalpan');
    expect(useRiskStore.getState().selectedAlcaldia).toBe('Tlalpan');
  });

  // ── alcaldiaIdMap ──────────────────────────────────────────────────────────

  it('setAlcaldiaIdMap actualiza el mapa nombre→id', () => {
    const map = { Coyoacán: 1, Iztapalapa: 2 };
    useRiskStore.getState().setAlcaldiaIdMap(map);
    expect(useRiskStore.getState().alcaldiaIdMap).toEqual(map);
  });

  it('setAlcaldiaIdMap acepta mapa vacío', () => {
    useRiskStore.getState().setAlcaldiaIdMap({ Coyoacán: 1 });
    useRiskStore.getState().setAlcaldiaIdMap({});
    expect(useRiskStore.getState().alcaldiaIdMap).toEqual({});
  });

  it('setAlcaldiaIdMap preserva los IDs numéricos', () => {
    const map = { 'Gustavo A. Madero': 7, Tlalpan: 15 };
    useRiskStore.getState().setAlcaldiaIdMap(map);
    expect(useRiskStore.getState().alcaldiaIdMap['Gustavo A. Madero']).toBe(7);
    expect(useRiskStore.getState().alcaldiaIdMap['Tlalpan']).toBe(15);
  });

  // ── estado inicial ─────────────────────────────────────────────────────────

  it('el estado inicial tiene los valores por defecto correctos', () => {
    const state = useRiskStore.getState();
    expect(state.selectedDayOffset).toBe(0);
    expect(state.riskPoints).toEqual([]);
    expect(state.selectedAlcaldia).toBeNull();
    expect(state.alcaldiaIdMap).toEqual({});
  });

  it('should set alcaldiaIdMap', () => {
    const map = { Coyoacan: 62, 'Benito Juarez': 60 };
    useRiskStore.getState().setAlcaldiaIdMap(map);
    expect(useRiskStore.getState().alcaldiaIdMap).toEqual(map);
  });
});
