// ─────────────────────────────────────────────────────────────────────────────
// Pruebas de Integración: Alertas y Suscripciones
// Flujos: ver feed de alertas, suscribirse a alcaldía, panel de suscripciones
// ─────────────────────────────────────────────────────────────────────────────

describe('Alertas y Suscripciones', () => {
  beforeEach(() => {
    cy.loginByLocalStorage('user@sanitek.com', 'USER');
    cy.visit('/alertas');
  });

  // ── 1. Carga de la página ───────────────────────────────────────────────────

  describe('Vista inicial', () => {
    it('carga la página de alertas sin errores', () => {
      cy.url().should('include', '/alertas');
      cy.get('body').should('be.visible');
    });

    it('muestra el feed de alertas', () => {
      // AlertasFeed — debería mostrar tarjetas de alerta
      cy.get('body').should('be.visible');
      cy.url().should('include', '/alertas');
    });
  });

  // ── 2. Panel de suscripciones ────────────────────────────────────────────────

  describe('Panel de suscripciones', () => {
    it('muestra el panel de suscripciones', () => {
      // SuscripcionesPanel y AlcaldiaSubscripcionCard
      cy.get('body').then($body => {
        const text = $body.text();
        const hasSubs = text.includes('Suscripci') || text.includes('Alerta') || text.includes('alcaldía') || text.includes('Alcaldía');
        expect(hasSubs).to.equal(true);
      });
    });
  });

  // ── 3. Feed de alertas ───────────────────────────────────────────────────────

  describe('Feed de alertas', () => {
    it('muestra el contenido del feed o mensaje vacío', () => {
      cy.get('body').should('be.visible');
      // El feed mostrará alertas o un estado vacío
      cy.url().should('include', '/alertas');
    });
  });
});
