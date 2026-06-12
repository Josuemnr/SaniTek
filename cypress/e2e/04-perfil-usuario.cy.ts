// ─────────────────────────────────────────────────────────────────────────────
// Pruebas de Integración: Perfil de Usuario
// Flujos: visualizar datos, editar nombre/correo, cambiar contraseña, cancelar
// ─────────────────────────────────────────────────────────────────────────────

describe('Perfil de Usuario', () => {
  beforeEach(() => {
    cy.loginByLocalStorage('usuario@sanitek.com', 'USER');
    cy.visitAuth('/Perfil_Usuario');

    // Ancla: esperar a que la sección "Datos Personales" sea visible.
    // Confirma que AuthContext resolvió la sesión y el componente terminó de renderizar.
    cy.contains('Datos Personales', { timeout: 10000 }).should('be.visible');
  });

  // ── 1. Renderizado ──────────────────────────────────────────────────────────

  describe('Vista inicial', () => {
    it('muestra las secciones Datos Personales y Seguridad', () => {
      cy.contains('Datos Personales').should('be.visible');
      cy.contains('Seguridad').scrollIntoView().should('be.visible');
    });

    it('muestra el correo pre-cargado desde la sesión', () => {
      cy.get('input[type="email"]').should('have.value', 'usuario@sanitek.com');
    });

    it('muestra el nombre pre-cargado desde la sesión', () => {
      cy.get('input[type="text"]').first().should('have.value', 'Usuario Cypress');
    });

    it('muestra los botones Guardar Cambios y Cancelar', () => {
      // Los botones están al pie del formulario — scrollIntoView para evitar
      // el fallo de visibilidad por overflow-y: auto del contenedor raíz.
      cy.contains('Guardar Cambios').scrollIntoView().should('be.visible');
      cy.contains('Cancelar').scrollIntoView().should('be.visible');
    });
  });

  // ── 2. Editar datos personales ──────────────────────────────────────────────

  describe('Editar datos personales', () => {
    it('muestra error cuando el nombre está vacío', () => {
      cy.get('input[type="text"]').first().clear();
      cy.contains('Guardar Cambios').scrollIntoView().click();
      // El <p> de error aparece justo debajo del input de nombre.
      // scrollIntoView para garantizar que no lo corte el overflow del contenedor.
      cy.contains('Ingresa tu nombre').scrollIntoView().should('be.visible');
    });

    it('muestra error con formato de correo inválido', () => {
      cy.get('input[type="email"]').clear().type('nocorreo');
      cy.contains('Guardar Cambios').scrollIntoView().click();
      cy.contains('Correo invalido').scrollIntoView().should('be.visible');
    });

    it('guarda los cambios del perfil exitosamente (mock API)', () => {
      cy.intercept('PUT', /\/api\/me/, {
        statusCode: 200,
        body: {
          id: 1, firebaseUid: 'uid-test',
          email: 'usuario@sanitek.com',
          names: 'Nombre Actualizado',
          isActive: true,
          role: { id: 2, roleName: 'USER' },
          company: null,
        },
      }).as('updateProfile');

      cy.get('input[type="text"]').first().clear().type('Nombre Actualizado');
      cy.contains('Guardar Cambios').scrollIntoView().click();
      cy.wait('@updateProfile');

      cy.contains('Perfil actualizado', { timeout: 10000 }).should('be.visible');
    });

    it('cancela la edición y restaura los valores originales', () => {
      cy.get('input[type="text"]').first().clear().type('Nombre Temporal');
      cy.contains('Cancelar').scrollIntoView().click();
      cy.get('input[type="text"]').first().should('have.value', 'Usuario Cypress');
    });
  });

  // ── 3. Cambiar contraseña ───────────────────────────────────────────────────

  describe('Cambio de contraseña', () => {
    it('muestra error cuando el campo de contraseña actual está vacío', () => {
      cy.contains('Actualizar').scrollIntoView().click();
      cy.contains('Ingresa tu contrasena actual').scrollIntoView().should('be.visible');
    });

    it('muestra el error del primer requisito que falla en la nueva contraseña', () => {
      cy.get('input[placeholder="Ingresa tu contrasena actual"]').scrollIntoView().type('MiPassActual1!');
      cy.get('input[placeholder="Ingresa tu nueva contrasena"]').type('debil');
      cy.get('input[placeholder="Confirma tu nueva contrasena"]').type('debil');
      cy.contains('Actualizar').scrollIntoView().click();
      // validatePasswordStrict('debil') → falla la regla de longitud → 'Mínimo 8 caracteres'
      cy.contains('Mínimo 8 caracteres').scrollIntoView().should('be.visible');
    });

    it('muestra error cuando las contraseñas nuevas no coinciden', () => {
      cy.get('input[placeholder="Ingresa tu contrasena actual"]').scrollIntoView().type('MiPassActual1!');
      cy.get('input[placeholder="Ingresa tu nueva contrasena"]').type('NuevoPass123!');
      cy.get('input[placeholder="Confirma tu nueva contrasena"]').type('OtroPass456!');
      cy.contains('Actualizar').scrollIntoView().click();
      cy.contains('Las contrasenas no coinciden').scrollIntoView().should('be.visible');
    });
  });
});
