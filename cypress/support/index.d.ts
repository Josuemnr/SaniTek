// ─────────────────────────────────────────────────────────────────────────────
// Declaraciones de tipos para comandos personalizados de Cypress
<<<<<<< HEAD
// Los archivos .d.ts son ambientes globales: no necesitan `declare global`
// ni `export {}` para extender namespaces globales como `Cypress`.
=======
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
// ─────────────────────────────────────────────────────────────────────────────

declare namespace Cypress {
  interface Chainable {
    /**
<<<<<<< HEAD
     * Inyecta una sesión de auth simulada en el localStorage de la app.
     * Úsalo en `beforeEach` para tests que no prueban el login mismo.
=======
     * Prepara la sesión de auth simulada (guarda el usuario en Cypress.env).
     * Úsalo antes de cy.visitAuth() en el beforeEach de cada spec.
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
     * @param email   Correo del usuario simulado
     * @param role    Rol del usuario: USER | ADMIN | SUPER_ADMIN
     */
    loginByLocalStorage(email: string, role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'): void;

    /**
<<<<<<< HEAD
=======
     * Visita `path` inyectando la sesión de auth en localStorage via onBeforeLoad,
     * antes de que React inicialice. Garantiza que AuthContext lea la sesión
     * en el primer render y no redirija a /login.
     * Debe llamarse después de cy.loginByLocalStorage().
     */
    visitAuth(path: string): void;

    /**
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
     * Limpia los tokens de sesión del localStorage (equivale a logout).
     */
    clearAuth(): void;
  }
}
