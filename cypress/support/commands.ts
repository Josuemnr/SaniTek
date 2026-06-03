// ─────────────────────────────────────────────────────────────────────────────
// Comandos personalizados de Cypress  –  cypress/support/commands.ts
// Los tipos de los comandos están declarados en cypress/support/index.d.ts
// ─────────────────────────────────────────────────────────────────────────────

/**
 * cy.loginByLocalStorage(email, role)
 *
 * Inyecta directamente en localStorage una sesión de auth simulada,
 * igual a la que guarda authService.ts, sin pasar por el formulario.
 * Úsalo como beforeEach en tests que no prueban el login mismo.
 *
 * Usa cy.session() para cachear la sesión entre tests (Cypress 9+),
 * y cy.window() para escribir en el localStorage del AUT (la app),
 * no en el contexto del test runner.
 */
Cypress.Commands.add('loginByLocalStorage', (email: string, role: string) => {
  const fakeUser = {
    id: 1,
    uid: 'fake-uid-cypress',
    email,
    displayName: 'Usuario Cypress',
    role,
    backendUser: {
      id: 1,
      firebaseUid: 'fake-uid-cypress',
      email,
      names: 'Usuario Cypress',
      isActive: true,
      role: { id: 1, roleName: role },
    },
  };

  // cy.session() cachea y restaura el estado de localStorage/cookies entre tests.
  // La clave [email, role] garantiza sesiones distintas por combinación de credenciales.
  cy.session([email, role], () => {
    // Visitar la raíz para asegurarnos de estar en el origen correcto (http://localhost:5173)
    // antes de escribir en localStorage. Sin esto, cy.window() apuntaría a about:blank.
    cy.visit('/');

    // cy.window() devuelve la ventana del AUT (la app), no la del test runner.
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'fake-cypress-token');
      win.localStorage.setItem('refreshToken', 'fake-cypress-refresh-token');
      win.localStorage.setItem('authUser', JSON.stringify(fakeUser));
    });
  });
});

/**
 * cy.clearAuth()
 * Limpia la sesión de localStorage (equivale a logout).
 * Usa cy.window() en lugar de cy.clearLocalStorage() para evitar que
 * Cypress navegue a about:blank entre tests.
 */
Cypress.Commands.add('clearAuth', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('token');
    win.localStorage.removeItem('refreshToken');
    win.localStorage.removeItem('authUser');
  });
});
