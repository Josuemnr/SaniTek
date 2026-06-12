import { describe, it, expect } from 'vitest';
import { getMetricas, DATA_CDMX, type DataPoint } from './historial-data';

// ── getMetricas ───────────────────────────────────────────────────────────────

describe('getMetricas', () => {
  it('array vacío devuelve métricas en cero y tendencia Estable', () => {
    const m = getMetricas([]);
    expect(m.indiceActual).toBe(0);
    expect(m.variacionMes).toBe(0);
    expect(m.promedioMensual).toBe(0);
    expect(m.maximoRegistrado).toBe(0);
    expect(m.mesesAtrasMaximo).toBe(0);
    expect(m.tendencia).toBe('Estable');
    expect(m.tendenciaLabel).toBe('Sin datos');
  });

  it('usa el último punto como indiceActual', () => {
    const data: DataPoint[] = [
      { mes: 'Ene', indice: 70, tendencia: 70 },
      { mes: 'Feb', indice: 85, tendencia: 77 },
    ];
    expect(getMetricas(data).indiceActual).toBe(85);
  });

  it('calcula variacionMes respecto al penúltimo punto', () => {
    const data: DataPoint[] = [
      { mes: 'Ene', indice: 70, tendencia: 70 },
      { mes: 'Feb', indice: 80, tendencia: 75 },
    ];
    expect(getMetricas(data).variacionMes).toBe(10);
  });

  it('variacion negativa cuando el último baja', () => {
    const data: DataPoint[] = [
      { mes: 'Ene', indice: 80, tendencia: 80 },
      { mes: 'Feb', indice: 70, tendencia: 75 },
    ];
    expect(getMetricas(data).variacionMes).toBe(-10);
    expect(getMetricas(data).tendencia).toBe('Negativa');
    expect(getMetricas(data).tendenciaLabel).toBe('Descendiendo');
  });

  it('variacion cero cuando los últimos dos puntos son iguales → Estable', () => {
    const data: DataPoint[] = [
      { mes: 'Ene', indice: 75, tendencia: 75 },
      { mes: 'Feb', indice: 75, tendencia: 75 },
    ];
    expect(getMetricas(data).variacionMes).toBe(0);
    expect(getMetricas(data).tendencia).toBe('Estable');
  });

  it('con un solo punto prev=last → variacion 0', () => {
    const data: DataPoint[] = [{ mes: 'Ene', indice: 75, tendencia: 75 }];
    expect(getMetricas(data).variacionMes).toBe(0);
  });

  it('calcula promedioMensual correctamente', () => {
    const data: DataPoint[] = [
      { mes: 'Ene', indice: 70, tendencia: 70 },
      { mes: 'Feb', indice: 80, tendencia: 75 },
      { mes: 'Mar', indice: 90, tendencia: 80 },
    ];
    // (70+80+90)/3 = 80
    expect(getMetricas(data).promedioMensual).toBe(80);
  });

  it('identifica el maximoRegistrado correctamente', () => {
    const data: DataPoint[] = [
      { mes: 'Ene', indice: 70, tendencia: 70 },
      { mes: 'Feb', indice: 95, tendencia: 80 },
      { mes: 'Mar', indice: 80, tendencia: 75 },
    ];
    expect(getMetricas(data).maximoRegistrado).toBe(95);
  });

  it('calcula mesesAtrasMaximo correctamente (máximo en posición 1 de 3)', () => {
    const data: DataPoint[] = [
      { mes: 'Ene', indice: 70, tendencia: 70 },
      { mes: 'Feb', indice: 95, tendencia: 80 },
      { mes: 'Mar', indice: 80, tendencia: 75 },
    ];
    // maxIdx=1, length-1-1 = 1
    expect(getMetricas(data).mesesAtrasMaximo).toBe(1);
  });

  it('mesesAtrasMaximo=0 cuando el máximo es el último punto', () => {
    const data: DataPoint[] = [
      { mes: 'Ene', indice: 60, tendencia: 60 },
      { mes: 'Feb', indice: 99, tendencia: 80 },
    ];
    expect(getMetricas(data).mesesAtrasMaximo).toBe(0);
  });

  it('tendencia Positiva cuando variacion > 0', () => {
    const data: DataPoint[] = [
      { mes: 'Ene', indice: 70, tendencia: 70 },
      { mes: 'Feb', indice: 80, tendencia: 75 },
    ];
    const m = getMetricas(data);
    expect(m.tendencia).toBe('Positiva');
    expect(m.tendenciaLabel).toBe('Mejorando');
  });

  it('funciona correctamente con DATA_CDMX completo', () => {
    const m = getMetricas(DATA_CDMX);
    expect(m.indiceActual).toBe(78);       // Dic
    expect(m.maximoRegistrado).toBe(90);   // Sep
    expect(m.promedioMensual).toBeGreaterThan(0);
    expect(['Positiva', 'Negativa', 'Estable']).toContain(m.tendencia);
  });
});

// ── DATA_CDMX ─────────────────────────────────────────────────────────────────

describe('DATA_CDMX', () => {
  it('tiene 12 puntos (uno por mes)', () => {
    expect(DATA_CDMX).toHaveLength(12);
  });

  it('cada punto tiene mes, indice y tendencia', () => {
    DATA_CDMX.forEach((d) => {
      expect(d).toHaveProperty('mes');
      expect(d).toHaveProperty('indice');
      expect(d).toHaveProperty('tendencia');
    });
  });

  it('todos los índices son números positivos', () => {
    DATA_CDMX.forEach((d) => {
      expect(d.indice).toBeGreaterThan(0);
    });
  });
});
