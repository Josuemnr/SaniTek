// ─────────────────────────────────────────────────────────────────────────────
// Pruebas de Integración: Gestión de Usuarios (ADMIN)
// Flujos: listar, buscar, filtrar, crear usuario, activar/desactivar, paginación
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_USERS = [
<<<<<<< HEAD
  { id: 1, firebaseUid: 'uid1', email: 'ana@example.com', names: 'Ana García', isActive: true,  role: { id: 2, roleName: 'USER' } },
  { id: 2, firebaseUid: 'uid2', email: 'bob@example.com', names: 'Bob López',  isActive: true,  role: { id: 2, roleName: 'USER' } },
  { id: 3, firebaseUid: 'uid3', email: 'carlos@example.com', names: 'Carlos Ruiz', isActive: false, role: { id: 2, roleName: 'USER' } },
  { id: 4, firebaseUid: 'uid4', email: 'diana@example.com', names: 'Diana Flores', isActive: true, role: { id: 1, roleName: 'ADMIN' } },
  { id: 5, firebaseUid: 'uid5', email: 'ernesto@example.com', names: 'Ernesto Vega', isActive: true, role: { id: 2, roleName: 'USER' } },
  { id: 6, firebaseUid: 'uid6', email: 'fiona@example.com', names: 'Fiona Cruz', isActive: false, role: { id: 2, roleName: 'USER' } },
=======
  { id: 1, firebaseUid: 'uid1', email: 'ana@example.com',     names: 'Ana García',    isActive: true,  role: { id: 2, roleName: 'USER' } },
  { id: 2, firebaseUid: 'uid2', email: 'bob@example.com',     names: 'Bob López',     isActive: true,  role: { id: 2, roleName: 'USER' } },
  { id: 3, firebaseUid: 'uid3', email: 'carlos@example.com',  names: 'Carlos Ruiz',   isActive: false, role: { id: 2, roleName: 'USER' } },
  { id: 4, firebaseUid: 'uid4', email: 'diana@example.com',   names: 'Diana Flores',  isActive: true,  role: { id: 1, roleName: 'ADMIN' } },
  { id: 5, firebaseUid: 'uid5', email: 'ernesto@example.com', names: 'Ernesto Vega',  isActive: true,  role: { id: 2, roleName: 'USER' } },
  { id: 6, firebaseUid: 'uid6', email: 'fiona@example.com',   names: 'Fiona Cruz',    isActive: false, role: { id: 2, roleName: 'USER' } },
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
];

describe('Gestión de Usuarios (ADMIN)', () => {
  beforeEach(() => {
    cy.loginByLocalStorage('admin@sanitek.com', 'ADMIN');
<<<<<<< HEAD
    cy.intercept('GET', '**/users**', { statusCode: 200, body: MOCK_USERS }).as('getUsers');
    cy.visit('/Gestion_Usuarios');
=======
    // Endpoint real: GET /api/company-users
    cy.intercept('GET', '**/company-users**', { statusCode: 200, body: MOCK_USERS }).as('getUsers');
    cy.visitAuth('/Gestion_Usuarios');
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
    cy.wait('@getUsers');
  });

  // ── 1. Renderizado inicial ──────────────────────────────────────────────────

  describe('Vista inicial', () => {
    it('muestra el título de la página', () => {
      cy.contains('Estatus de Usuarios').should('be.visible');
    });

    it('muestra el botón "Nuevo Usuario"', () => {
      cy.contains('Nuevo Usuario').should('be.visible');
    });

    it('muestra la tabla con columnas correctas', () => {
      cy.contains('Usuario').should('be.visible');
      cy.contains('Rol').should('be.visible');
      cy.contains('Estatus').should('be.visible');
      cy.contains('Ultimo Acceso').should('be.visible');
    });

    it('muestra los usuarios activos por defecto', () => {
      cy.contains('Ana García').should('be.visible');
      cy.contains('Bob López').should('be.visible');
      // Inactivos no deben aparecer en la pestaña Activos
      cy.contains('Carlos Ruiz').should('not.exist');
    });
  });

  // ── 2. Filtros ──────────────────────────────────────────────────────────────

  describe('Filtros Activos / Inactivos', () => {
    it('cambia a la pestaña "Inactivos" y muestra solo inactivos', () => {
      cy.contains('Inactivos').click();
      cy.contains('Carlos Ruiz').should('be.visible');
      cy.contains('Fiona Cruz').should('be.visible');
      cy.contains('Ana García').should('not.exist');
    });

    it('vuelve a la pestaña "Activos" y muestra activos', () => {
      cy.contains('Inactivos').click();
      cy.contains('Activos').click();
      cy.contains('Ana García').should('be.visible');
      cy.contains('Carlos Ruiz').should('not.exist');
    });
  });

  // ── 3. Búsqueda ─────────────────────────────────────────────────────────────

  describe('Buscador', () => {
    it('filtra por nombre', () => {
      cy.get('input[placeholder="Buscar por nombre o correo..."]').type('Diana');
      cy.contains('Diana Flores').should('be.visible');
      cy.contains('Ana García').should('not.exist');
    });

    it('filtra por correo electrónico', () => {
      cy.get('input[placeholder="Buscar por nombre o correo..."]').type('bob@');
      cy.contains('Bob López').should('be.visible');
      cy.contains('Diana Flores').should('not.exist');
    });

    it('muestra "No se encontraron usuarios." cuando no hay coincidencias', () => {
      cy.get('input[placeholder="Buscar por nombre o correo..."]').type('xyznoexiste');
      cy.contains('No se encontraron usuarios.').should('be.visible');
    });

    it('limpia la búsqueda y vuelve a mostrar todos', () => {
      cy.get('input[placeholder="Buscar por nombre o correo..."]').type('Ana').clear();
      cy.contains('Ana García').should('be.visible');
      cy.contains('Bob López').should('be.visible');
    });
  });

  // ── 4. Crear usuario ────────────────────────────────────────────────────────

  describe('Modal Nuevo Usuario', () => {
    it('abre el modal al hacer clic en "Nuevo Usuario"', () => {
      cy.contains('Nuevo Usuario').click();
      cy.contains('Crear Nuevo Usuario').should('be.visible');
    });

    it('cierra el modal con el botón Cancelar', () => {
      cy.contains('Nuevo Usuario').click();
      cy.contains('Cancelar').click();
      cy.contains('Crear Nuevo Usuario').should('not.exist');
    });

    it('crea un usuario nuevo exitosamente (mock backend)', () => {
      const newUser = {
        id: 99, firebaseUid: 'uid99', email: 'nuevo@sanitek.com',
        names: 'Nuevo Usuario', isActive: true, role: { id: 2, roleName: 'USER' },
      };

<<<<<<< HEAD
      cy.intercept('POST', '**/users**', { statusCode: 201, body: newUser }).as('createUser');

      cy.contains('Nuevo Usuario').click();
      cy.get('input[placeholder*="Nombre"]').type('Nuevo Usuario');
      cy.get('input[placeholder*="Correo"], input[placeholder*="correo"]').first().type('nuevo@sanitek.com');
      cy.get('input[placeholder*="Contraseña"], input[type="password"]').first().type('SecurePass123!');

      cy.contains('Guardar').click();
=======
      cy.intercept('POST', '**/company-users**', { statusCode: 201, body: newUser }).as('createUser');

      cy.contains('Nuevo Usuario').click();

      // Placeholders reales del modal NewUserModal
      cy.get('input[placeholder="Ej. Juan Perez Garcia"]').type('Nuevo Usuario');
      cy.get('input[type="email"]').type('nuevo@sanitek.com');
      // La contraseña debe cumplir los 5 requisitos de seguridad para habilitar el botón
      cy.get('input[placeholder="Min. 8 caracteres"]').type('TestPass1!');

      // El botón dice "Crear Usuario" (no "Guardar")
      cy.contains('Crear Usuario').click();
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
      cy.wait('@createUser');

      cy.contains('nuevo@sanitek.com').should('be.visible');
    });
  });

  // ── 5. Activar / Desactivar usuario ─────────────────────────────────────────

  describe('Cambio de estatus de usuario', () => {
    it('desactiva un usuario activo', () => {
<<<<<<< HEAD
      cy.intercept('PUT', '**/users/1/deactivate', {
=======
      // Endpoint real: PUT /api/company-users/:id/deactivate
      cy.intercept('PUT', '**/company-users/1/deactivate', {
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
        statusCode: 200,
        body: { ...MOCK_USERS[0], isActive: false },
      }).as('deactivate');

<<<<<<< HEAD
      // Hace clic en el toggle de Ana García (primer usuario activo)
      cy.contains('Ana García').parents('tr').find('button').last().click();
      cy.wait('@deactivate');

      // El toast de éxito debería aparecer
      cy.contains('desactivado', { matchCase: false }).should('be.visible');
    });

    it('activa un usuario inactivo', () => {
      cy.intercept('PUT', '**/users/3/activate', {
=======
      // El toggle button en UserRow tiene aria-label "Desactivar usuario"
      cy.contains('tr', 'Ana García').find('[aria-label="Desactivar usuario"]').click();
      cy.wait('@deactivate');

      cy.contains('Usuario desactivado', { timeout: 10000 }).should('be.visible');
    });

    it('activa un usuario inactivo', () => {
      // Endpoint real: PUT /api/company-users/:id/activate
      cy.intercept('PUT', '**/company-users/3/activate', {
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
        statusCode: 200,
        body: { ...MOCK_USERS[2], isActive: true },
      }).as('activate');

      cy.contains('Inactivos').click();
<<<<<<< HEAD
      cy.contains('Carlos Ruiz').parents('tr').find('button').last().click();
      cy.wait('@activate');

      cy.contains('activado', { matchCase: false }).should('be.visible');
=======
      cy.contains('tr', 'Carlos Ruiz').find('[aria-label="Activar usuario"]').click();
      cy.wait('@activate');

      cy.contains('Usuario activado', { timeout: 10000 }).should('be.visible');
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
    });
  });

  // ── 6. Paginación ───────────────────────────────────────────────────────────

  describe('Paginación', () => {
<<<<<<< HEAD
    it('muestra 5 usuarios por página en activos (4 activos en mock → 1 página)', () => {
      // Con 4 activos en MOCK_USERS solo hay 1 página
=======
    it('muestra los 4 usuarios activos en la primera página', () => {
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
      cy.contains('Ana García').should('exist');
      cy.contains('Bob López').should('exist');
      cy.contains('Diana Flores').should('exist');
      cy.contains('Ernesto Vega').should('exist');
    });
  });
});
