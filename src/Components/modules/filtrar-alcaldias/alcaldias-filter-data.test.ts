import { describe, it, expect } from 'vitest';
import {
  filterZonas,
  getEstadisticas,
  RISK_LEVEL_CONFIG,
  ZONAS_MOCK,
  type Zona,
} from './alcaldias-filter-data';

const ZONAS: Zona[] = [
  { id: '1', nombre: 'Zona A', alcaldia: 'Alc A', riskLevel: 'critico',  calidadAire: 20, humedad: 70 },
  { id: '2', nombre: 'Zona B', alcaldia: 'Alc B', riskLevel: 'alto',     calidadAire: 45, humedad: 55 },
  { id: '3', nombre: 'Zona C', alcaldia: 'Alc C', riskLevel: 'moderado', calidadAire: 60, humedad: 65 },
  { id: '4', nombre: 'Zona D', alcaldia: 'Alc D', riskLevel: 'seguro',   calidadAire: 80, humedad: 40 },
];

// ── RISK_LEVEL_CONFIG ─────────────────────────────────────────────────────────

describe('RISK_LEVEL_CONFIG', () => {
  it('tiene entradas para los 4 niveles de riesgo', () => {
    expect(RISK_LEVEL_CONFIG.critico).toBeDefined();
    expect(RISK_LEVEL_CONFIG.alto).toBeDefined();
    expect(RISK_LEVEL_CONFIG.moderado).toBeDefined();
    expect(RISK_LEVEL_CONFIG.seguro).toBeDefined();
  });

  it('critico tiene label "Crítico"', () => {
    expect(RISK_LEVEL_CONFIG.critico.label).toBe('Crítico');
  });

  it('alto tiene label "Alto riesgo"', () => {
    expect(RISK_LEVEL_CONFIG.alto.label).toBe('Alto riesgo');
  });

  it('moderado tiene label "Moderado"', () => {
    expect(RISK_LEVEL_CONFIG.moderado.label).toBe('Moderado');
  });

  it('seguro tiene label "Seguro"', () => {
    expect(RISK_LEVEL_CONFIG.seguro.label).toBe('Seguro');
  });

  it('cada nivel tiene color y bg', () => {
    Object.values(RISK_LEVEL_CONFIG).forEach((cfg) => {
      expect(cfg).toHaveProperty('color');
      expect(cfg).toHaveProperty('bg');
    });
  });
});

// ── ZONAS_MOCK ────────────────────────────────────────────────────────────────

describe('ZONAS_MOCK', () => {
  it('no está vacío', () => {
    expect(ZONAS_MOCK.length).toBeGreaterThan(0);
  });

  it('cada zona tiene los campos requeridos', () => {
    ZONAS_MOCK.forEach((z) => {
      expect(z).toHaveProperty('id');
      expect(z).toHaveProperty('nombre');
      expect(z).toHaveProperty('alcaldia');
      expect(z).toHaveProperty('riskLevel');
      expect(z).toHaveProperty('calidadAire');
      expect(z).toHaveProperty('humedad');
    });
  });
});

// ── filterZonas ───────────────────────────────────────────────────────────────

describe('filterZonas', () => {
  it('sin filtros activos devuelve todas las zonas ordenadas por riesgo', () => {
    const result = filterZonas(ZONAS, []);
    expect(result).toHaveLength(4);
    expect(result[0].riskLevel).toBe('critico');
    expect(result[1].riskLevel).toBe('alto');
    expect(result[2].riskLevel).toBe('moderado');
    expect(result[3].riskLevel).toBe('seguro');
  });

  it('filtro calidad-aire incluye solo zonas con calidadAire < 50', () => {
    const result = filterZonas(ZONAS, ['calidad-aire']);
    // Zona A (20) y Zona B (45) pasan; C (60) y D (80) no
    expect(result).toHaveLength(2);
    const ids = result.map((z) => z.id);
    expect(ids).toContain('1');
    expect(ids).toContain('2');
    expect(ids).not.toContain('3');
    expect(ids).not.toContain('4');
  });

  it('filtro humedad incluye solo zonas con humedad > 60', () => {
    const result = filterZonas(ZONAS, ['humedad']);
    // Zona A (70) y Zona C (65) pasan; B (55) y D (40) no
    expect(result).toHaveLength(2);
    const ids = result.map((z) => z.id);
    expect(ids).toContain('1');
    expect(ids).toContain('3');
    expect(ids).not.toContain('2');
    expect(ids).not.toContain('4');
  });

  it('ambos filtros aplican lógica AND', () => {
    const result = filterZonas(ZONAS, ['calidad-aire', 'humedad']);
    // Solo Zona A: calidadAire=20 (<50 ✓) y humedad=70 (>60 ✓)
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('devuelve array vacío si ninguna zona pasa los filtros', () => {
    const soloSegura: Zona[] = [
      { id: '9', nombre: 'Z', alcaldia: 'A', riskLevel: 'seguro', calidadAire: 80, humedad: 30 },
    ];
    const result = filterZonas(soloSegura, ['calidad-aire', 'humedad']);
    expect(result).toHaveLength(0);
  });

  it('resultado con filtros también está ordenado por nivel de riesgo', () => {
    const result = filterZonas(ZONAS, ['calidad-aire']);
    // Zona A=critico, Zona B=alto
    expect(result[0].riskLevel).toBe('critico');
    expect(result[1].riskLevel).toBe('alto');
  });

  it('no muta el array original', () => {
    const original = [...ZONAS];
    filterZonas(ZONAS, ['humedad']);
    expect(ZONAS[0].id).toBe(original[0].id);
  });

  it('el límite exacto de humedad (=60) NO pasa el filtro (necesita > 60)', () => {
    const exacta: Zona[] = [
      { id: '5', nombre: 'Z', alcaldia: 'A', riskLevel: 'seguro', calidadAire: 30, humedad: 60 },
    ];
    const result = filterZonas(exacta, ['humedad']);
    expect(result).toHaveLength(0);
  });

  it('el límite exacto de calidadAire (=50) NO pasa el filtro (necesita < 50)', () => {
    const exacta: Zona[] = [
      { id: '6', nombre: 'Z', alcaldia: 'A', riskLevel: 'seguro', calidadAire: 50, humedad: 30 },
    ];
    const result = filterZonas(exacta, ['calidad-aire']);
    expect(result).toHaveLength(0);
  });
});

// ── getEstadisticas ───────────────────────────────────────────────────────────

describe('getEstadisticas', () => {
  it('cuenta correctamente las zonas críticas', () => {
    expect(getEstadisticas(ZONAS).criticas).toBe(1);
  });

  it('cuenta correctamente las zonas de alto riesgo', () => {
    expect(getEstadisticas(ZONAS).altoRiesgo).toBe(1);
  });

  it('cuenta correctamente las zonas seguras', () => {
    expect(getEstadisticas(ZONAS).seguras).toBe(1);
  });

  it('poblacion tiene sufijo M', () => {
    expect(getEstadisticas(ZONAS).poblacion).toMatch(/M$/);
  });

  it('calcula poblacion con la fórmula: criticas*0.8 + alto*0.5 + seguras*0.1', () => {
    // 1*0.8 + 1*0.5 + 1*0.1 = 1.4
    expect(getEstadisticas(ZONAS).poblacion).toBe('1.4M');
  });

  it('devuelve ceros para array vacío', () => {
    const stats = getEstadisticas([]);
    expect(stats.criticas).toBe(0);
    expect(stats.altoRiesgo).toBe(0);
    expect(stats.seguras).toBe(0);
    expect(stats.poblacion).toBe('0.0M');
  });

  it('funciona correctamente con múltiples zonas del mismo nivel', () => {
    const criticas: Zona[] = [
      { id: '1', nombre: 'A', alcaldia: 'X', riskLevel: 'critico', calidadAire: 10, humedad: 10 },
      { id: '2', nombre: 'B', alcaldia: 'X', riskLevel: 'critico', calidadAire: 15, humedad: 15 },
      { id: '3', nombre: 'C', alcaldia: 'X', riskLevel: 'critico', calidadAire: 20, humedad: 20 },
    ];
    expect(getEstadisticas(criticas).criticas).toBe(3);
    expect(getEstadisticas(criticas).altoRiesgo).toBe(0);
  });
});
