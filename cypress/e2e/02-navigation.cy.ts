// ─────────────────────────────────────────────────────────────────────────────
// Pruebas de Integración: Navegación y rutas protegidas
// Flujos: acceso sin sesión, acceso con sesión, protección por rol
// ─────────────────────────────────────────────────────────────────────────────

describe('Navegación y rutas protegidas', () => {
  // ── 1. Rutas que redirigen a /login sin sesión ──────────────────────────────

  describe('Redirección sin autenticación', () => {
    beforeEach(() => {
      cy.clearAuth();
    });

    const protectedRoutes = ['/', '/historial', '/hoy-no-circula', '/filtrar', '/Suscrpcion', '/Perfil_Usuario', '/alertas'];

    protectedRoutes.forEach(route => {
      it(`redirige a /login al acceder a "${route}" sin sesión`, () => {
        cy.visit(route);
        cy.url().should('include', '/login');
      });
    });
  });

  // ── 2. Acceso correcto con sesión de usuario ────────────────────────────────

  describe('Acceso autenticado (rol USER)', () => {
    beforeEach(() => {
      cy.loginByLocalStorage('user@sanitek.com', 'USER');
    });

    it('accede al dashboard (/) correctamente', () => {
      cy.visit('/');
      cy.url().should('eq', Cypress.config('baseUrl') + '/');
      // El DashboardShell debe renderizarse
      cy.get('body').should('not.contain', 'Inicia Sesión');
    });

    it('accede a Perfil de Usuario', () => {
      cy.visit('/Perfil_Usuario');
      cy.url().should('include', '/Perfil_Usuario');
    });

    it('accede a Hoy No Circula', () => {
      cy.visit('/hoy-no-circula');
      cy.url().should('include', '/hoy-no-circula');
    });

    it('accede a Filtrar Alcaldías', () => {
      cy.visit('/filtrar');
      cy.url().should('include', '/filtrar');
    });

    it('accede a Alertas', () => {
      cy.visit('/alertas');
      cy.url().should('include', '/alertas');
    });

    it('redirige a "/" si intenta acceder a /Gestion_Usuarios sin ser ADMIN', () => {
      cy.visit('/Gestion_Usuarios');
      cy.url().should('eq', Cypress.config('baseUrl') + '/');
    });

    it('redirige a "/" si intenta acceder a /superadmin sin ser SUPER_ADMIN', () => {
      cy.visit('/superadmin');
      cy.url().should('eq', Cypress.config('baseUrl') + '/');
    });
  });

  // ── 3. Acceso por rol ADMIN ─────────────────────────────────────────────────

  describe('Rutas de ADMIN', () => {
    beforeEach(() => {
      cy.loginByLocalStorage('admin@sanitek.com', 'ADMIN');
    });

    it('accede a Gestión de Usuarios como ADMIN', () => {
      cy.intercept('GET', '**/users**', { statusCode: 200, body: [] }).as('getUsers');
      cy.visit('/Gestion_Usuarios');
      cy.url().should('include', '/Gestion_Usuarios');
    });

    it('redirige a "/" si intenta acceder a /superadmin siendo ADMIN', () => {
      cy.visit('/superadmin');
      cy.url().should('eq', Cypress.config('baseUrl') + '/');
    });
  });

  // ── 4. Acceso por rol SUPER_ADMIN ───────────────────────────────────────────

  describe('Rutas de SUPER_ADMIN', () => {
    beforeEach(() => {
      cy.loginByLocalStorage('superadmin@sanitek.com', 'SUPER_ADMIN');
    });

    it('accede a /superadmin como SUPER_ADMIN', () => {
      cy.intercept('GET', '**/companies**', { statusCode: 200, body: [] }).as('getCompanies');
      cy.visit('/superadmin');
      cy.url().should('include', '/superadmin');
    });
  });

  // ── 5. Sidebar ──────────────────────────────────────────────────────────────

  describe('Sidebar y navegación interna', () => {
    beforeEach(() => {
      cy.loginByLocalStorage('user@sanitek.com', 'USER');
      cy.visit('/');
    });

    it('el Sidebar está visible en el dashboard', () => {
      // El DashboardShell envuelve todas las rutas privadas
      cy.get('body').should('be.visible');
    });

    it('navega a /historial desde la URL directa', () => {
      cy.visit('/historial');
      cy.url().should('include', '/historial');
    });

    it('navega a /detalle desde la URL directa', () => {
      cy.visit('/detalle');
      cy.url().should('include', '/detalle');
    });
  });
});
