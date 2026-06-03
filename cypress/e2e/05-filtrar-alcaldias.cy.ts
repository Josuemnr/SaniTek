// ─────────────────────────────────────────────────────────────────────────────
// Pruebas de Integración: Filtrar Alcaldías
// Flujos: visualizar lista, filtros por calidad de aire y humedad,
//         estadísticas rápidas, niveles de riesgo
//
// NOTA SOBRE EL COMPONENTE REAL:
//   · FilterBar tiene dos filtros: "Calidad de aire" (calidadAire < 50)
//     y "Humedad" (humedad > 60). NO hay filtros por nivel de riesgo.
//   · No existe un buscador de texto en FiltrarAlcaldiasPage.
//   · AlcaldiaItem es solo display — no navega al hacer clic.
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_MUNICIPALITIES = [
  { id: 1, municipalityName: 'Álvaro Obregón',   currentIrsa: { irsaValue: 0.72, riskLevel: 'HIGH',     calculatedAt: '2025-05-01T10:00:00Z' }, socialVulnerability: 0.6 },
  { id: 2, municipalityName: 'Benito Juárez',     currentIrsa: { irsaValue: 0.31, riskLevel: 'LOW',      calculatedAt: '2025-05-01T10:00:00Z' }, socialVulnerability: 0.3 },
  { id: 3, municipalityName: 'Coyoacán',          currentIrsa: { irsaValue: 0.55, riskLevel: 'MODERATE', calculatedAt: '2025-05-01T10:00:00Z' }, socialVulnerability: 0.4 },
  { id: 4, municipalityName: 'Gustavo A. Madero', currentIrsa: { irsaValue: 0.88, riskLevel: 'CRITICAL', calculatedAt: '2025-05-01T10:00:00Z' }, socialVulnerability: 0.8 },
  { id: 5, municipalityName: 'Iztapalapa',        currentIrsa: { irsaValue: 0.79, riskLevel: 'HIGH',     calculatedAt: '2025-05-01T10:00:00Z' }, socialVulnerability: 0.75 },
];

describe('Filtrar Alcaldías', () => {
  beforeEach(() => {
    cy.loginByLocalStorage('user@sanitek.com', 'USER');
    cy.intercept('GET', '**/municipalities**', {
      statusCode: 200,
      body: MOCK_MUNICIPALITIES,
    }).as('getMunicipalities');
    cy.visit('/filtrar');
    cy.wait('@getMunicipalities');
  });

  // ── 1. Vista inicial ────────────────────────────────────────────────────────

  describe('Vista inicial', () => {
    it('carga y muestra la lista de alcaldías del mock', () => {
      cy.contains('Álvaro Obregón').should('be.visible');
      cy.contains('Benito Juárez').should('be.visible');
      cy.contains('Coyoacán').should('be.visible');
      cy.contains('Gustavo A. Madero').should('be.visible');
      cy.contains('Iztapalapa').should('be.visible');
    });

    it('muestra la sección de Estadísticas Rápidas', () => {
      cy.contains('Estadísticas Rápidas').should('be.visible');
      cy.contains('Zonas Críticas').should('be.visible');
      cy.contains('Zonas Alto Riesgo').should('be.visible');
      cy.contains('Zonas Seguras').should('be.visible');
      cy.contains('Población Afectada').should('be.visible');
    });

    it('muestra los badges de nivel de riesgo correctos por alcaldía', () => {
      // RISK_LEVEL_CONFIG: CRITICAL→"Crítico", HIGH→"Alto riesgo", LOW→"Seguro", MODERATE→"Moderado"
      cy.contains('Crítico').should('exist');      // Gustavo A. Madero
      cy.contains('Alto riesgo').should('exist');  // Álvaro Obregón, Iztapalapa
      cy.contains('Seguro').should('exist');       // Benito Juárez
      cy.contains('Moderado').should('exist');     // Coyoacán
    });
  });

  // ── 2. Filtros de calidad ───────────────────────────────────────────────────
  //
  //  FilterBar tiene dos filtros (FilterType):
  //    · "calidad-aire": muestra zonas con calidadAire < 50
  //    · "humedad":      muestra zonas con humedad > 60
  //
  //  calidadAire = Math.round(irsaValue) → con irsaValues 0-1, todos quedan en 0-1 (< 50).
  //  humedad proviene de HUMEDAD_TIPICA por nombre:
  //    Álvaro Obregón=52, Benito Juárez=55 → NO pasan (≤ 60)
  //    Coyoacán=65, Gustavo A. Madero=62, Iztapalapa=70 → SÍ pasan (> 60)

  describe('Filtros de calidad', () => {
    it('muestra los botones de filtro disponibles en FilterBar', () => {
      cy.contains('Calidad de aire').should('be.visible');
      cy.contains('Humedad').should('be.visible');
    });

    it('aplica el filtro "Humedad" y oculta zonas con humedad ≤ 60', () => {
      cy.contains('Humedad').click();

      // Pasan (humedad > 60)
      cy.contains('Coyoacán').should('be.visible');
      cy.contains('Gustavo A. Madero').should('be.visible');
      cy.contains('Iztapalapa').should('be.visible');

      // No pasan (humedad ≤ 60)
      cy.contains('Álvaro Obregón').should('not.exist');
      cy.contains('Benito Juárez').should('not.exist');
    });

    it('aplica el filtro "Calidad de aire" (todos los del mock pasan por irsaValue < 1)', () => {
      // Math.round(irsaValue ≤ 1) = 0 o 1 → todos < 50 → todos visibles
      cy.contains('Calidad de aire').click();
      cy.contains('Álvaro Obregón').should('be.visible');
      cy.contains('Coyoacán').should('be.visible');
    });

    it('combina ambos filtros y restringe el resultado', () => {
      cy.contains('Calidad de aire').click();
      cy.contains('Humedad').click();

      // Coyoacán: calidadAire=1 (<50 ✓) y humedad=65 (>60 ✓) → visible
      cy.contains('Coyoacán').should('be.visible');

      // Álvaro Obregón: humedad=52 (≤60 ✗) → oculto
      cy.contains('Álvaro Obregón').should('not.exist');
    });

    it('limpia los filtros con el botón "Limpiar" y restaura la lista completa', () => {
      cy.contains('Humedad').click();
      cy.contains('Álvaro Obregón').should('not.exist');

      cy.contains('Limpiar').click();

      cy.contains('Álvaro Obregón').should('be.visible');
      cy.contains('Benito Juárez').should('be.visible');
      cy.contains('Coyoacán').should('be.visible');
    });
  });
});
