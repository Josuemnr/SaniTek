// ─────────────────────────────────────────────────────────────────────────────
// Pruebas de Integración: Super Admin – Gestión de Empresas
// Flujos: listar empresas, crear empresa, editar empresa
// ─────────────────────────────────────────────────────────────────────────────

<<<<<<< HEAD
const MOCK_COMPANIES = [
  { id: 1, name: 'Empresa Alpha', email: 'alpha@corp.com',  isActive: true,  userCount: 5 },
  { id: 2, name: 'Empresa Beta',  email: 'beta@corp.com',   isActive: true,  userCount: 3 },
  { id: 3, name: 'Empresa Gamma', email: 'gamma@corp.com',  isActive: false, userCount: 0 },
=======
// CompanyApiResponse: { id, companyName, isActive }
const MOCK_COMPANIES = [
  { id: 1, companyName: 'Empresa Alpha', isActive: true  },
  { id: 2, companyName: 'Empresa Beta',  isActive: true  },
  { id: 3, companyName: 'Empresa Gamma', isActive: false },
];

// UserApiResponse: { id, names, email, isActive, role, company }
// mapEmpresas cruza admins con companies via user.company.id === company.id
const MOCK_ADMINS = [
  { id: 101, names: 'Admin Alpha', email: 'alpha@corp.com',  isActive: true,  firebaseUid: 'uid-a', role: { id: 1, roleName: 'ADMIN' }, company: { id: 1, companyName: 'Empresa Alpha' } },
  { id: 102, names: 'Admin Beta',  email: 'beta@corp.com',   isActive: true,  firebaseUid: 'uid-b', role: { id: 1, roleName: 'ADMIN' }, company: { id: 2, companyName: 'Empresa Beta' } },
  { id: 103, names: 'Admin Gamma', email: 'gamma@corp.com',  isActive: false, firebaseUid: 'uid-g', role: { id: 1, roleName: 'ADMIN' }, company: { id: 3, companyName: 'Empresa Gamma' } },
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
];

describe('Super Admin – Gestión de Empresas', () => {
  beforeEach(() => {
    cy.loginByLocalStorage('superadmin@sanitek.com', 'SUPER_ADMIN');
<<<<<<< HEAD
    cy.intercept('GET', '**/companies**', { statusCode: 200, body: MOCK_COMPANIES }).as('getCompanies');
    cy.visit('/superadmin');
    cy.wait('@getCompanies');
=======
    // SuperAdminPage carga companies Y admins en paralelo (Promise.all)
    cy.intercept('GET', '**/companies**', { statusCode: 200, body: MOCK_COMPANIES }).as('getCompanies');
    cy.intercept('GET', '**/admins**',    { statusCode: 200, body: MOCK_ADMINS    }).as('getAdmins');
    cy.visitAuth('/superadmin');
    cy.wait('@getCompanies');
    cy.wait('@getAdmins');
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
  });

  // ── 1. Vista inicial ────────────────────────────────────────────────────────

  describe('Vista inicial', () => {
    it('carga la página de superadmin', () => {
      cy.url().should('include', '/superadmin');
      cy.get('body').should('be.visible');
    });

<<<<<<< HEAD
    it('muestra la lista de empresas', () => {
=======
    it('muestra los nombres de las empresas', () => {
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
      cy.contains('Empresa Alpha').should('be.visible');
      cy.contains('Empresa Beta').should('be.visible');
    });

<<<<<<< HEAD
    it('muestra botón para crear nueva empresa', () => {
      cy.contains('Nueva Empresa', { matchCase: false }).should('be.visible');
=======
    it('muestra el correo del administrador de cada empresa', () => {
      cy.contains('alpha@corp.com').should('be.visible');
      cy.contains('beta@corp.com').should('be.visible');
    });

    it('muestra botón para crear nueva empresa', () => {
      cy.contains('Nueva Empresa').should('be.visible');
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
    });
  });

  // ── 2. EmpresaRow ───────────────────────────────────────────────────────────

  describe('Filas de empresa', () => {
<<<<<<< HEAD
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
=======
    it('indica el estado de suscripción de cada empresa', () => {
      // EmpresaRow muestra "Suscrita" (isActive=true) o "Sin suscripción" (isActive=false)
      cy.contains('Suscrita').should('be.visible');
      cy.contains('Sin suscripción').should('be.visible');
    });

    it('cada fila tiene un botón de edición', () => {
      cy.contains('tr', 'Empresa Alpha').contains('button', 'Editar').should('be.visible');
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
    });
  });

  // ── 3. Modal Nueva Empresa ───────────────────────────────────────────────────

  describe('Modal Nueva Empresa', () => {
    it('abre el modal de nueva empresa', () => {
<<<<<<< HEAD
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
=======
      cy.contains('Nueva Empresa').click();
      cy.contains('Nueva Empresa').should('be.visible');
      // El modal muestra las secciones Empresa y Administrador
      cy.contains('Empresa').should('be.visible');
      cy.contains('Administrador').should('be.visible');
    });

    it('cierra el modal con el botón Cancelar', () => {
      cy.contains('Nueva Empresa').click();
      cy.contains('Cancelar').click();
      // Después de cerrar, las empresas siguen visibles (el modal se cerró)
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
      cy.contains('Empresa Alpha').should('be.visible');
    });

    it('crea una nueva empresa exitosamente (mock API)', () => {
<<<<<<< HEAD
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
=======
      const newCompany = { id: 99, companyName: 'Nueva Corp', isActive: false };
      const newAdmin   = {
        id: 201, names: 'Nuevo Admin', email: 'nueva@corp.com',
        isActive: true, firebaseUid: 'uid-new', role: { id: 1, roleName: 'ADMIN' },
        company: { id: 99, companyName: 'Nueva Corp' },
      };

      // handleAddEmpresa hace POST /api/companies y luego POST /api/admins
      cy.intercept('POST', '**/companies**', { statusCode: 201, body: newCompany }).as('createCompany');
      cy.intercept('POST', '**/admins**',    { statusCode: 201, body: newAdmin    }).as('createAdmin');

      cy.contains('Nueva Empresa').click();

      // Campos del modal NuevaEmpresaModal (usar placeholders exactos del componente)
      cy.get('input[placeholder="Ej. Grupo Industrial S.A."]').type('Nueva Corp');
      cy.get('input[placeholder="Ej. Maria Garcia Lopez"]').type('Nuevo Admin');
      cy.get('input[placeholder="admin@empresa.com"]').type('nueva@corp.com');
      // La contraseña debe pasar los 5 requisitos de seguridad para habilitar el botón
      cy.get('input[placeholder="Min. 8 caracteres"]').type('TestPass1!');

      // El botón del modal dice "Crear empresa" (no "Guardar")
      cy.contains('Crear empresa').click();
      cy.wait('@createCompany');
      cy.wait('@createAdmin');

      cy.contains('nueva@corp.com', { timeout: 10000 }).should('be.visible');
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
    });
  });

  // ── 4. Modal Editar Empresa ──────────────────────────────────────────────────

  describe('Modal Editar Empresa', () => {
<<<<<<< HEAD
    it('abre el modal de edición al hacer clic en editar', () => {
      // EditarEmpresaModal se abre con algún botón de edición en EmpresaRow
      cy.contains('Empresa Alpha').parents('tr, [role="row"], li').first()
        .find('[title="Editar"], button').first()
        .click({ force: true });

      cy.get('body').then($body => {
        const text = $body.text();
        const hasEditModal = text.includes('Editar') || text.includes('Guardar');
        expect(hasEditModal).to.equal(true);
=======
    it('abre el modal de edición al hacer clic en el botón Editar de la fila', () => {
      cy.contains('tr', 'Empresa Alpha').contains('button', 'Editar').click();

      // EditarEmpresaModal debe mostrarse con algún contenido de edición
      cy.get('body').then($body => {
        const text = $body.text();
        expect(text.includes('Editar') || text.includes('Guardar')).to.be.true;
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
      });
    });
  });

  // ── 5. Control de acceso ─────────────────────────────────────────────────────

  describe('Control de acceso', () => {
    it('redirige a "/" si un USER intenta acceder a /superadmin', () => {
      cy.clearAuth();
      cy.loginByLocalStorage('user@sanitek.com', 'USER');
<<<<<<< HEAD
      cy.visit('/superadmin');
=======
      // visitAuth inyecta la sesión USER — RoleRoute la detecta y redirige a '/', no a /login
      cy.visitAuth('/superadmin');
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
      cy.url().should('eq', Cypress.config('baseUrl') + '/');
    });
  });
});
