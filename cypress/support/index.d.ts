// ─────────────────────────────────────────────────────────────────────────────
// Declaraciones de tipos para comandos personalizados de Cypress
// ─────────────────────────────────────────────────────────────────────────────

declare namespace Cypress {
  interface Chainable {
    /**
     * Prepara la sesión de auth simulada (guarda el usuario en Cypress.env).
     * Úsalo antes de cy.visitAuth() en el beforeEach de cada spec.
     * @param email   Correo del usuario simulado
     * @param role    Rol del usuario: USER | ADMIN | SUPER_ADMIN
     */
    loginByLocalStorage(email: string, role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'): void;

    /**
     * Visita `path` inyectando la sesión de auth en localStorage via onBeforeLoad,
     * antes de que React inicialice. Garantiza que AuthContext lea la sesión
     * en el primer render y no redirija a /login.
     * Debe llamarse después de cy.loginByLocalStorage().
     */
    visitAuth(path: string): void;

    /**
     * Limpia los tokens de sesión del localStorage (equivale a logout).
     */
    clearAuth(): void;
  }
}
