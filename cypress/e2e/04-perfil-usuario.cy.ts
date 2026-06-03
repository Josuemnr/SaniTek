// ─────────────────────────────────────────────────────────────────────────────
// Pruebas de Integración: Perfil de Usuario
// Flujos: visualizar datos, editar nombre/correo, cambiar contraseña, cancelar
// ─────────────────────────────────────────────────────────────────────────────

describe('Perfil de Usuario', () => {
  beforeEach(() => {
    cy.loginByLocalStorage('usuario@sanitek.com', 'USER');
    cy.visit('/Perfil_Usuario');
  });

  // ── 1. Renderizado ──────────────────────────────────────────────────────────

  describe('Vista inicial', () => {
    it('muestra las secciones de la página', () => {
      cy.contains('Datos Personales').should('be.visible');
      cy.contains('Seguridad').should('be.visible');
    });

    it('muestra el correo pre-cargado desde la sesión', () => {
      cy.get('input[type="email"]').should('have.value', 'usuario@sanitek.com');
    });

    it('muestra los botones de acción del perfil', () => {
      cy.contains('Guardar Cambios').should('be.visible');
      cy.contains('Cancelar').should('be.visible');
    });
  });

  // ── 2. Editar datos personales ──────────────────────────────────────────────

  describe('Editar datos personales', () => {
    it('valida que el nombre no esté vacío', () => {
      cy.get('input[type="text"]').first().clear();
      cy.contains('Guardar Cambios').click();
      cy.contains('Ingresa tu nombre').should('be.visible');
    });

    it('valida el formato del correo electrónico', () => {
      cy.get('input[type="email"]').clear().type('nocorreo');
      cy.contains('Guardar Cambios').click();
      cy.contains('Correo invalido').should('be.visible');
    });

    it('guarda los cambios del perfil exitosamente (mock API)', () => {
      cy.intercept('PUT', '**/me**', {
        statusCode: 200,
        body: {
          id: 1, firebaseUid: 'uid-test',
          email: 'usuario@sanitek.com',
          names: 'Nombre Actualizado',
          isActive: true, role: { id: 2, roleName: 'USER' },
        },
      }).as('updateProfile');

      cy.get('input[type="text"]').first().clear().type('Nombre Actualizado');
      cy.contains('Guardar Cambios').click();
      cy.wait('@updateProfile');

      cy.contains('Perfil actualizado').should('be.visible');
    });

    it('cancela la edición y restaura los valores originales', () => {
      const originalName = 'Usuario Cypress'; // Viene de loginByLocalStorage

      cy.get('input[type="text"]').first().clear().type('Nombre Temporal');
      cy.contains('Cancelar').click();

      cy.get('input[type="text"]').first().should('have.value', originalName);
    });
  });

  // ── 3. Cambiar contraseña ───────────────────────────────────────────────────

  describe('Cambio de contraseña', () => {
    it('valida que los campos de contraseña no estén vacíos', () => {
      cy.contains('Actualizar').click();
      cy.contains('Ingresa tu contrasena actual').should('be.visible');
    });

    it('valida que la nueva contraseña cumpla los requisitos de seguridad', () => {
      cy.get('input[placeholder="Ingresa tu contrasena actual"]').type('MiPassActual1!');
      cy.get('input[placeholder="Ingresa tu nueva contrasena"]').type('debil');
      cy.get('input[placeholder="Confirma tu nueva contrasena"]').type('debil');
      cy.contains('Actualizar').click();

      // validatePasswordStrict retorna el label de la primera regla que falla.
      // 'debil' tiene 5 chars → falla 'Mínimo 8 caracteres' primero.
      // NOTA: NO usar p[style*="color:#ef4444"] — los browsers normalizan hex a rgb().
      cy.contains('Mínimo 8 caracteres').should('be.visible');
    });

    it('valida que las contraseñas nuevas coincidan', () => {
      cy.get('input[placeholder="Ingresa tu contrasena actual"]').type('MiPassActual1!');
      cy.get('input[placeholder="Ingresa tu nueva contrasena"]').type('NuevoPass123!');
      cy.get('input[placeholder="Confirma tu nueva contrasena"]').type('OtroPass456!');
      cy.contains('Actualizar').click();
      cy.contains('Las contrasenas no coinciden').should('be.visible');
    });
  });
});
