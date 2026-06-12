import { describe, it, expect } from 'vitest';
import {
  usePasswordStrength,
  validatePasswordStrict,
  PASSWORD_RULES,
  STRENGTH_CONFIG,
} from './usePasswordStrength';

// ── PASSWORD_RULES ────────────────────────────────────────────────────────────

describe('PASSWORD_RULES', () => {
  it('contiene exactamente 5 reglas', () => {
    expect(PASSWORD_RULES).toHaveLength(5);
  });

  it('regla length: falla con menos de 8 caracteres', () => {
    const rule = PASSWORD_RULES.find((r) => r.id === 'length')!;
    expect(rule.test('1234567')).toBe(false);
  });

  it('regla length: pasa con exactamente 8 caracteres', () => {
    const rule = PASSWORD_RULES.find((r) => r.id === 'length')!;
    expect(rule.test('12345678')).toBe(true);
  });

  it('regla upper: falla sin mayúsculas', () => {
    const rule = PASSWORD_RULES.find((r) => r.id === 'upper')!;
    expect(rule.test('abcdefg')).toBe(false);
  });

  it('regla upper: pasa con al menos una mayúscula', () => {
    const rule = PASSWORD_RULES.find((r) => r.id === 'upper')!;
    expect(rule.test('Abcdefg')).toBe(true);
  });

  it('regla lower: falla sin minúsculas', () => {
    const rule = PASSWORD_RULES.find((r) => r.id === 'lower')!;
    expect(rule.test('ABCDEFG')).toBe(false);
  });

  it('regla lower: pasa con al menos una minúscula', () => {
    const rule = PASSWORD_RULES.find((r) => r.id === 'lower')!;
    expect(rule.test('ABCDEFa')).toBe(true);
  });

  it('regla number: falla sin dígitos', () => {
    const rule = PASSWORD_RULES.find((r) => r.id === 'number')!;
    expect(rule.test('abcdefg')).toBe(false);
  });

  it('regla number: pasa con al menos un dígito', () => {
    const rule = PASSWORD_RULES.find((r) => r.id === 'number')!;
    expect(rule.test('abcdefg1')).toBe(true);
  });

  it('regla special: falla sin caracteres especiales', () => {
    const rule = PASSWORD_RULES.find((r) => r.id === 'special')!;
    expect(rule.test('Abcdefg1')).toBe(false);
  });

  it('regla special: pasa con !', () => {
    const rule = PASSWORD_RULES.find((r) => r.id === 'special')!;
    expect(rule.test('Abcdefg1!')).toBe(true);
  });

  it('regla special: pasa con @', () => {
    const rule = PASSWORD_RULES.find((r) => r.id === 'special')!;
    expect(rule.test('Abcdefg1@')).toBe(true);
  });
});

// ── usePasswordStrength ───────────────────────────────────────────────────────

describe('usePasswordStrength', () => {
  it('password vacío → nivel vacia, passedCount 0, isValid false', () => {
    const result = usePasswordStrength('');
    expect(result.level).toBe('vacia');
    expect(result.passedCount).toBe(0);
    expect(result.isValid).toBe(false);
  });

  it('password con 1 regla cumplida → nivel debil', () => {
    // 'a': solo pasa lower
    const result = usePasswordStrength('a');
    expect(result.level).toBe('debil');
    expect(result.passedCount).toBe(1);
  });

  it('password con 0 reglas → nivel debil (no vacia si tiene chars)', () => {
    // Carácter sin ninguna regla válida (número solo, < 8 chars, no upper, no lower, no special)
    // '1': pasa number → passedCount=1 → debil
    const result = usePasswordStrength('1');
    expect(result.level).toBe('debil');
  });

  it('password con 2 reglas cumplidas → nivel regular', () => {
    // 'Aa': pasa upper + lower
    const result = usePasswordStrength('Aa');
    expect(result.level).toBe('regular');
    expect(result.passedCount).toBe(2);
  });

  it('password con 3 reglas cumplidas → nivel buena', () => {
    // 'Aa1': pasa upper + lower + number
    const result = usePasswordStrength('Aa1');
    expect(result.level).toBe('buena');
    expect(result.passedCount).toBe(3);
  });

  it('password con 4 reglas cumplidas → nivel buena', () => {
    // 'Aa123456': pasa length + upper + lower + number (sin special)
    const result = usePasswordStrength('Aa123456');
    expect(result.level).toBe('buena');
    expect(result.passedCount).toBe(4);
  });

  it('password con 5 reglas cumplidas → nivel fuerte, isValid true', () => {
    // 'Abcdef1!': pasa todas las reglas
    const result = usePasswordStrength('Abcdef1!');
    expect(result.level).toBe('fuerte');
    expect(result.passedCount).toBe(5);
    expect(result.isValid).toBe(true);
  });

  it('results tiene la longitud correcta (5 elementos)', () => {
    const result = usePasswordStrength('Abcdef1!');
    expect(result.results).toHaveLength(5);
  });

  it('results contiene passed=true para contraseña fuerte', () => {
    const result = usePasswordStrength('Abcdef1!');
    expect(result.results.every((r) => r.passed)).toBe(true);
  });

  it('results contiene passed=false para contraseña débil', () => {
    const result = usePasswordStrength('a');
    const passed = result.results.filter((r) => r.passed);
    expect(passed).toHaveLength(1); // solo lower
  });
});

// ── validatePasswordStrict ────────────────────────────────────────────────────

describe('validatePasswordStrict', () => {
  it('retorna null para contraseña que cumple todas las reglas', () => {
    expect(validatePasswordStrict('Abcdef1!')).toBeNull();
  });

  it('retorna label de la regla length para string vacío', () => {
    expect(validatePasswordStrict('')).toBe('Mínimo 8 caracteres');
  });

  it('retorna label de la regla length para contraseña corta', () => {
    expect(validatePasswordStrict('debil')).toBe('Mínimo 8 caracteres');
  });

  it('retorna label de upper cuando falta mayúscula', () => {
    // 'abcdefg1!' pasa length(9), falla upper
    expect(validatePasswordStrict('abcdefg1!')).toBe('Al menos una mayúscula (A-Z)');
  });

  it('retorna label de lower cuando falta minúscula', () => {
    // 'ABCDEFG1!' pasa length y upper, falla lower
    expect(validatePasswordStrict('ABCDEFG1!')).toBe('Al menos una minúscula (a-z)');
  });

  it('retorna label de number cuando falta número', () => {
    // 'Abcdefg!' pasa length, upper, lower, falla number
    expect(validatePasswordStrict('Abcdefg!')).toBe('Al menos un número (0-9)');
  });

  it('retorna label de special cuando falta carácter especial', () => {
    // 'Abcdefg1' pasa length, upper, lower, number, falla special
    expect(validatePasswordStrict('Abcdefg1')).toBe('Al menos un carácter especial (!@#$%...)');
  });
});

// ── STRENGTH_CONFIG ───────────────────────────────────────────────────────────

describe('STRENGTH_CONFIG', () => {
  it('tiene entradas para todos los niveles', () => {
    expect(STRENGTH_CONFIG.vacia).toBeDefined();
    expect(STRENGTH_CONFIG.debil).toBeDefined();
    expect(STRENGTH_CONFIG.regular).toBeDefined();
    expect(STRENGTH_CONFIG.buena).toBeDefined();
    expect(STRENGTH_CONFIG.fuerte).toBeDefined();
  });

  it('vacia tiene 0 segmentos', () => {
    expect(STRENGTH_CONFIG.vacia.segments).toBe(0);
  });

  it('fuerte tiene 5 segmentos', () => {
    expect(STRENGTH_CONFIG.fuerte.segments).toBe(5);
  });

  it('cada nivel tiene label, color y segments', () => {
    Object.values(STRENGTH_CONFIG).forEach((cfg) => {
      expect(cfg).toHaveProperty('color');
      expect(cfg).toHaveProperty('segments');
      expect(cfg).toHaveProperty('label');
    });
  });
});
