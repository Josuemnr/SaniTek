// usePasswordStrength.ts
// Evalúa la fortaleza de una contraseña contra estándares NIST SP 800-63B

export interface PasswordRule {
  id: string;
  label: string;
  test: (pwd: string) => boolean;
}

export type StrengthLevel = "vacia" | "debil" | "regular" | "buena" | "fuerte";

// ─── Reglas de seguridad ─────────────────────────────────────────────────────
export const PASSWORD_RULES: PasswordRule[] = [
  {
    id:    "length",
    label: "Mínimo 8 caracteres",
    test:  (p) => p.length >= 8,
  },
  {
    id:    "upper",
    label: "Al menos una mayúscula (A-Z)",
    test:  (p) => /[A-Z]/.test(p),
  },
  {
    id:    "lower",
    label: "Al menos una minúscula (a-z)",
    test:  (p) => /[a-z]/.test(p),
  },
  {
    id:    "number",
    label: "Al menos un número (0-9)",
    test:  (p) => /[0-9]/.test(p),
  },
  {
    id:    "special",
    label: "Al menos un carácter especial (!@#$%...)",
    test:  (p) => /[!@#$%^&*()\-_=+[\]{};':",.<>/?\\|`~]/.test(p),
  },
];

// ─── Configuración visual por nivel ──────────────────────────────────────────
export const STRENGTH_CONFIG: Record<
  StrengthLevel,
  { label: string; color: string; segments: number }
> = {
  vacia:   { label: "",              color: "#e5e7eb", segments: 0 },
  debil:   { label: "Muy débil",     color: "#ef4444", segments: 1 },
  regular: { label: "Regular",       color: "#f97316", segments: 2 },
  buena:   { label: "Buena",         color: "#eab308", segments: 3 },
  fuerte:  { label: "Fuerte ✓",      color: "#22c55e", segments: 5 },
};

// ─── Hook ────────────────────────────────────────────────────────────────────
export function usePasswordStrength(password: string) {
  const results = PASSWORD_RULES.map((rule) => ({
    ...rule,
    passed: rule.test(password),
  }));

  const passedCount = results.filter((r) => r.passed).length;

  let level: StrengthLevel = "vacia";
  if (password.length === 0) {
    level = "vacia";
  } else if (passedCount <= 1) {
    level = "debil";
  } else if (passedCount === 2) {
    level = "regular";
  } else if (passedCount === 3 || passedCount === 4) {
    level = "buena";
  } else {
    level = "fuerte";
  }

  const isValid = passedCount === PASSWORD_RULES.length;

  return { results, passedCount, level, isValid };
}

// ─── Función pura para validar sin hook (útil en backend-like checks) ────────
export function validatePasswordStrict(password: string): string | null {
  for (const rule of PASSWORD_RULES) {
    if (!rule.test(password)) return rule.label;
  }
  return null; // contraseña válida
}
