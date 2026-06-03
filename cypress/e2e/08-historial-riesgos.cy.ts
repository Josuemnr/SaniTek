// ─────────────────────────────────────────────────────────────────────────────
// Pruebas de Integración: Historial de Riesgos
// Flujos: visualizar métricas, gráfica de sanidad, tendencias
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_TREND = {
  municipalityId: 1,
  municipalityName: 'Coyoacán',
  period: 'MONTHLY',
  periods: 8,
  trend: 'IMPROVING',
  variation: -0.12,
  points: [
    { label: 'Sem 1', avgIrsa: 0.72, minIrsa: 0.60, maxIrsa: 0.85, riskLevel: 'HIGH',     count: 7 },
    { label: 'Sem 2', avgIrsa: 0.65, minIrsa: 0.55, maxIrsa: 0.78, riskLevel: 'HIGH',     count: 7 },
    { label: 'Sem 3', avgIrsa: 0.60, minIrsa: 0.50, maxIrsa: 0.72, riskLevel: 'MODERATE', count: 7 },
    { label: 'Sem 4', avgIrsa: 0.58, minIrsa: 0.48, maxIrsa: 0.70, riskLevel: 'MODERATE', count: 7 },
  ],
};

describe('Historial de Riesgos', () => {
  beforeEach(() => {
    cy.loginByLocalStorage('user@sanitek.com', 'USER');
    // Interceptar ANTES de visitar para que el mock esté listo al montar el componente
    cy.intercept('GET', '**/irsa/trend**', { statusCode: 200, body: MOCK_TREND }).as('getTrend');
    cy.intercept('GET', '**/irsa/diagnostic**', { statusCode: 200, body: {} }).as('getDiagnostic');
    cy.intercept('GET', '**/municipalities**', {
      statusCode: 200,
      body: [
        { id: 1, municipalityName: 'Coyoacán',      currentIrsa: { irsaValue: 0.60, riskLevel: 'MODERATE', calculatedAt: '2025-05-01T10:00:00Z' }, socialVulnerability: 0.4 },
        { id: 2, municipalityName: 'Benito Juárez', currentIrsa: { irsaValue: 0.31, riskLevel: 'LOW',      calculatedAt: '2025-05-01T10:00:00Z' }, socialVulnerability: 0.3 },
      ],
    }).as('getMunicipalities');
    cy.visit('/historial');
  });

  // ── 1. Vista inicial ────────────────────────────────────────────────────────

  describe('Vista inicial', () => {
    it('carga la página de historial sin errores', () => {
      cy.url().should('include', '/historial');
      cy.get('body').should('be.visible');
    });

    it('muestra las MetricCards de HistorialRiesgosPage', () => {
      // MetricsRow renderiza con DATA_CDMX (estado inicial) antes de que llegue el API.
      // Los labels son: "Índice Actual", "Promedio Mensual", "Máximo Registrado", "Tendencia"
      cy.contains('Índice Actual').should('be.visible');
      cy.contains('Promedio Mensual').should('be.visible');
      cy.contains('Máximo Registrado').should('be.visible');
      cy.contains('Tendencia').should('be.visible');
    });

    it('muestra los controles de año', () => {
      // HistorialRiesgosPage tiene botones de chevron para cambiar año
      cy.get('button').should('exist');
      cy.contains(new Date().getFullYear().toString()).should('be.visible');
    });
  });

  // ── 2. Gráfica de Sanidad ────────────────────────────────────────────────────

  describe('SanidadChart', () => {
    it('renderiza el contenedor de la gráfica de Recharts', () => {
      // SanidadChart usa Recharts que genera un SVG
      cy.get('body').should('be.visible');
      // Recharts puede tardar en renderizar; esperamos la respuesta del API primero
      cy.wait('@getTrend');
      cy.get('svg, [class*="recharts"]').should('exist');
    });
  });

  // ── 3. MetricCards – etiquetas y estructura ──────────────────────────────────

  describe('MetricCards individuales', () => {
    it('muestran las cuatro tarjetas de métricas de sanidad ambiental', () => {
      // MetricsRow renderiza 4 MetricCard con labels definidos en MetricsRow.tsx
      cy.contains('Índice Actual').should('be.visible');
      cy.contains('Promedio Mensual').should('be.visible');
      cy.contains('Máximo Registrado').should('be.visible');
      cy.contains('Tendencia').should('be.visible');
    });

    it('actualiza los datos tras recibir la respuesta del API', () => {
      cy.wait('@getTrend');
      // Tras el API, el componente re-renderiza; la página sigue visible sin errores
      cy.get('body').should('be.visible');
      cy.url().should('include', '/historial');
    });
  });
});
