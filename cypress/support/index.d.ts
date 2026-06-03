// ─────────────────────────────────────────────────────────────────────────────
// Declaraciones de tipos para comandos personalizados de Cypress
// Los archivos .d.ts son ambientes globales: no necesitan `declare global`
// ni `export {}` para extender namespaces globales como `Cypress`.
// ─────────────────────────────────────────────────────────────────────────────

declare namespace Cypress {
  interface Chainable {
    /**
     * Inyecta una sesión de auth simulada en el localStorage de la app.
     * Úsalo en `beforeEach` para tests que no prueban el login mismo.
     * @param email   Correo del usuario simulado
     * @param role    Rol del usuario: USER | ADMIN | SUPER_ADMIN
     */
    loginByLocalStorage(email: string, role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'): void;

    /**
     * Limpia los tokens de sesión del localStorage (equivale a logout).
     */
    clearAuth(): void;
  }
}
