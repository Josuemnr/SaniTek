// ─────────────────────────────────────────────────────────────────────────────
// Pruebas de Integración: Autenticación
// Flujos: Login exitoso, errores de validación, forgot-password, logout
// ─────────────────────────────────────────────────────────────────────────────

describe('Autenticación', () => {
  beforeEach(() => {
    cy.clearAuth();
  });

  // ── 1. Login ────────────────────────────────────────────────────────────────

  describe('Página de Login', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('muestra el formulario de login correctamente', () => {
      cy.contains('Inicia Sesión').should('be.visible');
      cy.contains('Bienvenido de vuelta!').should('be.visible');
      cy.get('input[placeholder="Correo"]').should('exist');
      cy.get('input[placeholder="Contraseña"]').should('exist');
      cy.contains('Iniciar Sesión').should('be.visible');
      cy.contains('Forgot password?').should('be.visible');
    });

    it('muestra error al enviar el formulario vacío', () => {
      cy.contains('Iniciar Sesión').click();
      cy.contains('Por favor, llena todos los campos.').should('be.visible');
    });

    it('muestra error con credenciales inválidas (mock backend)', () => {
      // Interceptamos la llamada al backend para simular credenciales incorrectas
      cy.intercept('POST', '**/auth/login', {
        statusCode: 401,
        body: { message: 'Invalid email or password' },
      }).as('loginRequest');

      cy.get('input[placeholder="Correo"]').type('wrong@email.com');
      cy.get('input[placeholder="Contraseña"]').type('wrongpassword');
      cy.contains('Iniciar Sesión').click();

      cy.wait('@loginRequest');
      cy.contains('Correo o contraseña incorrectos.').should('be.visible');
    });

    it('redirige al dashboard tras login exitoso (mock backend)', () => {
      // Simulamos una respuesta exitosa del backend
      cy.intercept('POST', '**/auth/login', {
        statusCode: 200,
        body: {
          idToken: 'fake-id-token',
          refreshToken: 'fake-refresh-token',
          expiresIn: 3600,
          user: {
            id: 1,
            firebaseUid: 'uid-test',
            email: 'user@sanitek.com',
            names: 'Usuario Test',
            isActive: true,
            role: { id: 2, roleName: 'USER' },
          },
        },
      }).as('loginRequest');

      cy.get('input[placeholder="Correo"]').type('user@sanitek.com');
      cy.get('input[placeholder="Contraseña"]').type('ValidPass123!');
      cy.contains('Iniciar Sesión').click();

      cy.wait('@loginRequest');
      cy.url().should('eq', Cypress.config('baseUrl') + '/');
    });

    it('redirige a "/" si el usuario ya tiene sesión activa', () => {
      cy.loginByLocalStorage('user@sanitek.com', 'USER');
      cy.visit('/login');
      cy.url().should('eq', Cypress.config('baseUrl') + '/');
    });
  });

  // ── 2. Forgot Password ──────────────────────────────────────────────────────

  describe('Página Forgot Password', () => {
    beforeEach(() => {
      cy.visit('/forgot');
    });

    it('muestra el formulario de recuperación', () => {
      cy.contains('¿Olvidaste tu contraseña?').should('be.visible');
      cy.get('input[placeholder="tu@correo.com"]').should('exist');
      cy.contains('Enviar enlace de recuperación').should('be.visible');
    });

    it('muestra error si el campo está vacío', () => {
      cy.contains('Enviar enlace de recuperación').click();
      cy.contains('Por favor ingresa tu correo.').should('be.visible');
    });

    it('muestra error con formato de correo inválido', () => {
      cy.get('input[placeholder="tu@correo.com"]').type('noesuncorreo');
      cy.contains('Enviar enlace de recuperación').click();
      cy.contains('Formato de correo inválido.').should('be.visible');
    });

    it('muestra pantalla de éxito tras enviar correo válido', () => {
      cy.get('input[placeholder="tu@correo.com"]').type('usuario@sanitek.com');
      cy.contains('Enviar enlace de recuperación').click();
      // Pantalla de éxito (hay un timeout simulado de 1800ms)
      cy.contains('¡Enlace enviado!', { timeout: 5000 }).should('be.visible');
      cy.contains('usuario@sanitek.com').should('be.visible');
      cy.contains('Reenviar enlace').should('be.visible');
    });

    it('navega de regreso al login desde el link "Volver al inicio de sesión"', () => {
      cy.contains('Volver al inicio de sesión').click();
      cy.url().should('include', '/login');
    });
  });

  // ── 3. Logout ───────────────────────────────────────────────────────────────

  describe('Logout', () => {
    it('redirige a /login al limpiar la sesión manualmente', () => {
      cy.loginByLocalStorage('user@sanitek.com', 'USER');
      cy.visit('/');
      cy.clearAuth();
      // Disparamos el evento que escucha AuthContext
      cy.window().then(win => win.dispatchEvent(new Event('auth-session-changed')));
      cy.url().should('include', '/login');
    });
  });
});
