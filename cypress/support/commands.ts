// ─────────────────────────────────────────────────────────────────────────────
// Comandos personalizados de Cypress  –  cypress/support/commands.ts
// Los tipos de los comandos están declarados en cypress/support/index.d.ts
// ─────────────────────────────────────────────────────────────────────────────

/**
 * cy.loginByLocalStorage(email, role)
 *
 * Prepara la sesión de auth simulada. No visita ninguna página por sí sola.
 * Debe usarse junto con cy.visitAuth(path) para que el localStorage quede
 * establecido ANTES de que React inicialice (via onBeforeLoad).
 *
 * Razón del cambio: cy.session en Cypress 15 no garantiza que el localStorage
 * esté disponible cuando React lee authUser en el primer render, lo que causa
 * que AuthContext quede en loading=true o que PrivateRoute redirija a /login.
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
  // Almacena el usuario en Cypress.env para que cy.visitAuth lo use en onBeforeLoad
  Cypress.env('__authUser', JSON.stringify(fakeUser));
});

/**
 * cy.visitAuth(path)
 *
 * Navega a `path` inyectando la sesión de auth en localStorage VIA onBeforeLoad,
 * antes de que el bundle de React se ejecute. Esto garantiza que AuthContext lea
 * la sesión en el primer render y no redirija a /login.
 *
 * Úsalo siempre después de cy.loginByLocalStorage().
 */
Cypress.Commands.add('visitAuth', (path: string) => {
  const authUser = Cypress.env('__authUser');
  cy.visit(path, {
    onBeforeLoad(win) {
      win.localStorage.setItem('token', 'fake-cypress-token');
      win.localStorage.setItem('refreshToken', 'fake-cypress-refresh-token');
      win.localStorage.setItem('authUser', authUser);
    },
  });
});

/**
 * cy.clearAuth()
 * Limpia la sesión de localStorage (equivale a logout).
 */
Cypress.Commands.add('clearAuth', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('token');
    win.localStorage.removeItem('refreshToken');
    win.localStorage.removeItem('authUser');
  });
});
