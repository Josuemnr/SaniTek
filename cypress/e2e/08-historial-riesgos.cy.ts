// ─────────────────────────────────────────────────────────────────────────────
// Pruebas de Integración: Historial de Riesgos
// Flujos: visualizar métricas, gráfica de sanidad, tendencias
// ─────────────────────────────────────────────────────────────────────────────

<<<<<<< HEAD
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
=======
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
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
  ],
};

describe('Historial de Riesgos', () => {
  beforeEach(() => {
    cy.loginByLocalStorage('user@sanitek.com', 'USER');
<<<<<<< HEAD
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
=======

    // Usar regex en lugar de glob para garantizar el match con el host + path + query string.
    // URL real: http://localhost:5173/api/irsa/trend/68?period=MONTHLY&count=48
    cy.intercept('GET', /\/irsa\/trend/, { statusCode: 200, body: MOCK_TREND }).as('getTrend');

    // visitAuth inyecta el localStorage via onBeforeLoad, antes de que React corra.
    // Esto garantiza que AuthContext resuelva la sesión en el primer render.
    cy.visitAuth('/historial');

    // Ancla: MetricsRow siempre renderiza (no es condicional al API),
    // así que si 'Índice Actual' no aparece la causa es auth, no datos.
    cy.contains('Índice Actual', { timeout: 10000 }).should('be.visible');
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
  });

  // ── 1. Vista inicial ────────────────────────────────────────────────────────

  describe('Vista inicial', () => {
    it('carga la página de historial sin errores', () => {
      cy.url().should('include', '/historial');
<<<<<<< HEAD
      cy.get('body').should('be.visible');
    });

    it('muestra las MetricCards de HistorialRiesgosPage', () => {
      // MetricsRow renderiza con DATA_CDMX (estado inicial) antes de que llegue el API.
      // Los labels son: "Índice Actual", "Promedio Mensual", "Máximo Registrado", "Tendencia"
=======
    });

    it('muestra las cuatro MetricCards con sus labels', () => {
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
      cy.contains('Índice Actual').should('be.visible');
      cy.contains('Promedio Mensual').should('be.visible');
      cy.contains('Máximo Registrado').should('be.visible');
      cy.contains('Tendencia').should('be.visible');
    });

<<<<<<< HEAD
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
=======
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
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
    });
  });
});
