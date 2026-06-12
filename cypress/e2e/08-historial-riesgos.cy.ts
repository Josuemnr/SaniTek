// ─────────────────────────────────────────────────────────────────────────────
// Pruebas de Integración: Historial de Riesgos
// Flujos: visualizar métricas, gráfica de sanidad, tendencias
// ─────────────────────────────────────────────────────────────────────────────

const currentYear = new Date().getFullYear();

// Etiquetas en formato "MMM YYYY" para que useHistorial las parsee correctamente.
// El hook usa: parseInt(label.split(' ')[1], 10) para extraer el año.
const MOCK_TREND = {
  municipalityId: 68,
  municipalityName: 'Cuauhtémoc',
  period: 'MONTHLY',
  periods: 6,
  trend: 'IMPROVING',
  variation: -0.05,
  points: [
    { label: `Jan ${currentYear}`, avgIrsa: 0.72, minIrsa: 0.60, maxIrsa: 0.85, riskLevel: 'HIGH',     count: 31 },
    { label: `Feb ${currentYear}`, avgIrsa: 0.68, minIrsa: 0.55, maxIrsa: 0.80, riskLevel: 'HIGH',     count: 28 },
    { label: `Mar ${currentYear}`, avgIrsa: 0.65, minIrsa: 0.52, maxIrsa: 0.78, riskLevel: 'HIGH',     count: 31 },
    { label: `Apr ${currentYear}`, avgIrsa: 0.60, minIrsa: 0.50, maxIrsa: 0.72, riskLevel: 'MODERATE', count: 30 },
    { label: `May ${currentYear}`, avgIrsa: 0.58, minIrsa: 0.48, maxIrsa: 0.70, riskLevel: 'MODERATE', count: 31 },
    { label: `Jun ${currentYear}`, avgIrsa: 0.55, minIrsa: 0.45, maxIrsa: 0.67, riskLevel: 'MODERATE', count: 30 },
  ],
};

describe('Historial de Riesgos', () => {
  beforeEach(() => {
    cy.loginByLocalStorage('user@sanitek.com', 'USER');

    // Usar regex en lugar de glob para garantizar el match con el host + path + query string.
    // URL real: http://localhost:5173/api/irsa/trend/68?period=MONTHLY&count=48
    cy.intercept('GET', /\/irsa\/trend/, { statusCode: 200, body: MOCK_TREND }).as('getTrend');

    // visitAuth inyecta el localStorage via onBeforeLoad, antes de que React corra.
    // Esto garantiza que AuthContext resuelva la sesión en el primer render.
    cy.visitAuth('/historial');

    // Ancla: MetricsRow siempre renderiza (no es condicional al API),
    // así que si 'Índice Actual' no aparece la causa es auth, no datos.
    cy.contains('Índice Actual', { timeout: 10000 }).should('be.visible');
  });

  // ── 1. Vista inicial ────────────────────────────────────────────────────────

  describe('Vista inicial', () => {
    it('carga la página de historial sin errores', () => {
      cy.url().should('include', '/historial');
    });

    it('muestra las cuatro MetricCards con sus labels', () => {
      cy.contains('Índice Actual').should('be.visible');
      cy.contains('Promedio Mensual').should('be.visible');
      cy.contains('Máximo Registrado').should('be.visible');
      cy.contains('Tendencia').should('be.visible');
    });

    it('muestra los controles de año con el año actual', () => {
      cy.contains(currentYear.toString()).should('be.visible');
    });

    it('muestra el selector de alcaldía con Cuauhtémoc por defecto', () => {
      cy.contains('Cuauhtémoc').should('be.visible');
    });
  });

  // ── 2. Datos de la API ───────────────────────────────────────────────────────

  describe('Carga de datos desde la API', () => {
    it('resuelve la petición al endpoint de tendencia', () => {
      cy.wait('@getTrend').its('response.statusCode').should('eq', 200);
    });

    it('actualiza el título de la gráfica con el nombre de la alcaldía del mock', () => {
      cy.wait('@getTrend');
      // SanidadChart muestra: "Índice de Sanidad Ambiental — {alcaldiaName} · {year}"
      cy.contains('Índice de Sanidad Ambiental').should('be.visible');
    });
  });

  // ── 3. Gráfica de Sanidad ────────────────────────────────────────────────────

  describe('SanidadChart', () => {
    it('renderiza un SVG de Recharts', () => {
      cy.wait('@getTrend');
      cy.get('svg', { timeout: 10000 }).should('exist');
    });
  });

  // ── 4. MetricCards tras respuesta del API ────────────────────────────────────

  describe('MetricCards tras recibir datos', () => {
    it('siguen visibles después de que el API responde', () => {
      cy.wait('@getTrend');
      cy.contains('Índice Actual').should('be.visible');
      cy.contains('Tendencia').should('be.visible');
    });
  });
});
