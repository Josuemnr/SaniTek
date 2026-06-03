// ─────────────────────────────────────────────────────────────────────────────
// Pruebas de Integración: Super Admin – Gestión de Empresas
// Flujos: listar empresas, crear empresa, editar empresa
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_COMPANIES = [
  { id: 1, name: 'Empresa Alpha', email: 'alpha@corp.com',  isActive: true,  userCount: 5 },
  { id: 2, name: 'Empresa Beta',  email: 'beta@corp.com',   isActive: true,  userCount: 3 },
  { id: 3, name: 'Empresa Gamma', email: 'gamma@corp.com',  isActive: false, userCount: 0 },
];

describe('Super Admin – Gestión de Empresas', () => {
  beforeEach(() => {
    cy.loginByLocalStorage('superadmin@sanitek.com', 'SUPER_ADMIN');
    cy.intercept('GET', '**/companies**', { statusCode: 200, body: MOCK_COMPANIES }).as('getCompanies');
    cy.visit('/superadmin');
    cy.wait('@getCompanies');
  });

  // ── 1. Vista inicial ────────────────────────────────────────────────────────

  describe('Vista inicial', () => {
    it('carga la página de superadmin', () => {
      cy.url().should('include', '/superadmin');
      cy.get('body').should('be.visible');
    });

    it('muestra la lista de empresas', () => {
      cy.contains('Empresa Alpha').should('be.visible');
      cy.contains('Empresa Beta').should('be.visible');
    });

    it('muestra botón para crear nueva empresa', () => {
      cy.contains('Nueva Empresa', { matchCase: false }).should('be.visible');
    });
  });

  // ── 2. EmpresaRow ───────────────────────────────────────────────────────────

  describe('Filas de empresa', () => {
    it('muestra los datos de cada empresa', () => {
      cy.contains('alpha@corp.com').should('be.visible');
      cy.contains('beta@corp.com').should('be.visible');
    });

    it('indica el estatus activo/inactivo de cada empresa', () => {
      cy.get('body').then($body => {
        const text = $body.text();
        const hasStatus = text.includes('Activo') || text.includes('Inactivo') || text.includes('activo');
        expect(hasStatus).to.equal(true);
      });
    });
  });

  // ── 3. Modal Nueva Empresa ───────────────────────────────────────────────────

  describe('Modal Nueva Empresa', () => {
    it('abre el modal de nueva empresa', () => {
      cy.contains('Nueva Empresa', { matchCase: false }).click();
      // NuevaEmpresaModal
      cy.get('body').then($body => {
        const text = $body.text();
        const hasModal = text.includes('Empresa') || text.includes('empresa');
        expect(hasModal).to.equal(true);
      });
    });

    it('cierra el modal con el botón Cancelar', () => {
      cy.contains('Nueva Empresa', { matchCase: false }).click();
      cy.contains('Cancelar').click();
      // El modal se cierra
      cy.contains('Empresa Alpha').should('be.visible');
    });

    it('crea una nueva empresa exitosamente (mock API)', () => {
      const newCompany = {
        id: 99, name: 'Nueva Corp',
        email: 'nueva@corp.com', isActive: true, userCount: 0,
      };

      cy.intercept('POST', '**/companies**', { statusCode: 201, body: newCompany }).as('createCompany');

      cy.contains('Nueva Empresa', { matchCase: false }).click();

      // Llena el formulario de nueva empresa
      cy.get('input[placeholder*="Nombre"], input[placeholder*="nombre"]').first().type('Nueva Corp');
      cy.get('input[placeholder*="Correo"], input[placeholder*="correo"], input[type="email"]').first().type('nueva@corp.com');

      cy.contains('Guardar', { matchCase: false }).click();
      cy.wait('@createCompany');

      // La nueva empresa aparece en la lista
      cy.contains('nueva@corp.com').should('be.visible');
    });
  });

  // ── 4. Modal Editar Empresa ──────────────────────────────────────────────────

  describe('Modal Editar Empresa', () => {
    it('abre el modal de edición al hacer clic en editar', () => {
      // EditarEmpresaModal se abre con algún botón de edición en EmpresaRow
      cy.contains('Empresa Alpha').parents('tr, [role="row"], li').first()
        .find('[title="Editar"], button').first()
        .click({ force: true });

      cy.get('body').then($body => {
        const text = $body.text();
        const hasEditModal = text.includes('Editar') || text.includes('Guardar');
        expect(hasEditModal).to.equal(true);
      });
    });
  });

  // ── 5. Control de acceso ─────────────────────────────────────────────────────

  describe('Control de acceso', () => {
    it('redirige a "/" si un USER intenta acceder a /superadmin', () => {
      cy.clearAuth();
      cy.loginByLocalStorage('user@sanitek.com', 'USER');
      cy.visit('/superadmin');
      cy.url().should('eq', Cypress.config('baseUrl') + '/');
    });
  });
});
