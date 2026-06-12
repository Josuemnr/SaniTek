// ─────────────────────────────────────────────────────────────────────────────
// Pruebas de Integración: Perfil de Usuario
// Flujos: visualizar datos, editar nombre/correo, cambiar contraseña, cancelar
// ─────────────────────────────────────────────────────────────────────────────

describe('Perfil de Usuario', () => {
  beforeEach(() => {
    cy.loginByLocalStorage('usuario@sanitek.com', 'USER');
<<<<<<< HEAD
    cy.visit('/Perfil_Usuario');
=======
    cy.visitAuth('/Perfil_Usuario');

    // Ancla: esperar a que la sección "Datos Personales" sea visible.
    // Confirma que AuthContext resolvió la sesión y el componente terminó de renderizar.
    cy.contains('Datos Personales', { timeout: 10000 }).should('be.visible');
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
  });

  // ── 1. Renderizado ──────────────────────────────────────────────────────────

  describe('Vista inicial', () => {
<<<<<<< HEAD
    it('muestra las secciones de la página', () => {
      cy.contains('Datos Personales').should('be.visible');
      cy.contains('Seguridad').should('be.visible');
=======
    it('muestra las secciones Datos Personales y Seguridad', () => {
      cy.contains('Datos Personales').should('be.visible');
      cy.contains('Seguridad').scrollIntoView().should('be.visible');
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
    });

    it('muestra el correo pre-cargado desde la sesión', () => {
      cy.get('input[type="email"]').should('have.value', 'usuario@sanitek.com');
    });

<<<<<<< HEAD
    it('muestra los botones de acción del perfil', () => {
      cy.contains('Guardar Cambios').should('be.visible');
      cy.contains('Cancelar').should('be.visible');
=======
    it('muestra el nombre pre-cargado desde la sesión', () => {
      cy.get('input[type="text"]').first().should('have.value', 'Usuario Cypress');
    });

    it('muestra los botones Guardar Cambios y Cancelar', () => {
      // Los botones están al pie del formulario — scrollIntoView para evitar
      // el fallo de visibilidad por overflow-y: auto del contenedor raíz.
      cy.contains('Guardar Cambios').scrollIntoView().should('be.visible');
      cy.contains('Cancelar').scrollIntoView().should('be.visible');
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
    });
  });

  // ── 2. Editar datos personales ──────────────────────────────────────────────

  describe('Editar datos personales', () => {
<<<<<<< HEAD
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
=======
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
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
        statusCode: 200,
        body: {
          id: 1, firebaseUid: 'uid-test',
          email: 'usuario@sanitek.com',
          names: 'Nombre Actualizado',
<<<<<<< HEAD
          isActive: true, role: { id: 2, roleName: 'USER' },
=======
          isActive: true,
          role: { id: 2, roleName: 'USER' },
          company: null,
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
        },
      }).as('updateProfile');

      cy.get('input[type="text"]').first().clear().type('Nombre Actualizado');
<<<<<<< HEAD
      cy.contains('Guardar Cambios').click();
      cy.wait('@updateProfile');

      cy.contains('Perfil actualizado').should('be.visible');
    });

    it('cancela la edición y restaura los valores originales', () => {
      const originalName = 'Usuario Cypress'; // Viene de loginByLocalStorage

      cy.get('input[type="text"]').first().clear().type('Nombre Temporal');
      cy.contains('Cancelar').click();

      cy.get('input[type="text"]').first().should('have.value', originalName);
=======
      cy.contains('Guardar Cambios').scrollIntoView().click();
      cy.wait('@updateProfile');

      cy.contains('Perfil actualizado', { timeout: 10000 }).should('be.visible');
    });

    it('cancela la edición y restaura los valores originales', () => {
      cy.get('input[type="text"]').first().clear().type('Nombre Temporal');
      cy.contains('Cancelar').scrollIntoView().click();
      cy.get('input[type="text"]').first().should('have.value', 'Usuario Cypress');
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
    });
  });

  // ── 3. Cambiar contraseña ───────────────────────────────────────────────────

  describe('Cambio de contraseña', () => {
<<<<<<< HEAD
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
=======
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
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
    });
  });
});
