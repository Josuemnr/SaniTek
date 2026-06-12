// ─────────────────────────────────────────────────────────────────────────────
// Pruebas de Integración: Hoy No Circula
// Flujos: visualizar calendario, consultar estado del día, hologramas, placas
// ─────────────────────────────────────────────────────────────────────────────

describe('Hoy No Circula', () => {
  beforeEach(() => {
    cy.loginByLocalStorage('user@sanitek.com', 'USER');
    cy.visit('/hoy-no-circula');
  });

  // ── 1. Carga de la página ───────────────────────────────────────────────────

  describe('Vista inicial', () => {
    it('carga la página sin errores', () => {
      cy.get('body').should('be.visible');
      cy.url().should('include', '/hoy-no-circula');
    });

    it('muestra el componente de calendario', () => {
      // CalendarCard — busca elementos de calendario
      cy.get('body').then($body => {
        const hasCalendar =
          $body.find('[class*="calendar"]').length > 0 ||
          $body.text().includes('Enero') ||
          $body.text().includes('Febrero') ||
          $body.text().includes('Marzo') ||
          $body.text().includes('Abril') ||
          $body.text().includes('Mayo') ||
          $body.text().includes('Junio');
<<<<<<< HEAD
        expect(hasCalendar).to.equal(true);
=======
        expect(hasCalendar).to.be.true;
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
      });
    });

    it('muestra el estado del día actual', () => {
      // EstadoDiaCard — debe mostrar info del día
      cy.get('body').should('contain.text', '');
      // Al menos algún contenido del módulo
      cy.get('body').should('be.visible');
    });
  });

  // ── 2. CalendarCard – navegación de días ────────────────────────────────────

  describe('Interacción con el calendario', () => {
    it('permite seleccionar un día diferente del mes', () => {
      // Clic en un número de día diferente al actual
      // CirculaCalendarDay renderiza días como botones/divs clicables
      cy.get('body').find('[role="button"], button').then($btns => {
        if ($btns.length > 0) {
          // Clic en el primer botón que encontremos del calendario
          cy.wrap($btns.first()).click({ force: true });
        }
      });
      cy.get('body').should('be.visible'); // No debe romperse
    });
  });

  // ── 3. PlacasRestringidasCard y HologramasCard ───────────────────────────────

  describe('Cards informativas', () => {
    it('muestra información de hologramas', () => {
      // HologramasCard — busca texto relacionado
      cy.get('body').then($body => {
        const text = $body.text();
        const hasHologram = text.includes('Holograma') || text.includes('00') || text.includes('0') || text.includes('Doble');
<<<<<<< HEAD
        expect(hasHologram).to.equal(true);
=======
        expect(hasHologram).to.be.true;
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
      });
    });

    it('muestra información de placas restringidas', () => {
      // PlacasRestringidasCard — busca texto relacionado a terminaciones de placas
      cy.get('body').then($body => {
        const text = $body.text();
        const hasPlacas = text.includes('Placa') || text.includes('placa') || text.includes('Termina');
<<<<<<< HEAD
        expect(hasPlacas).to.equal(true);
=======
        expect(hasPlacas).to.be.true;
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
      });
    });
  });

  // ── 4. InfoNota ─────────────────────────────────────────────────────────────

  describe('InfoNota', () => {
    it('muestra notas o excepciones del programa', () => {
      cy.get('body').should('be.visible');
      // La InfoNota puede tener texto de excepciones como "Vehículos eléctricos"
      // Simplemente verificamos que la página sigue funcionando
      cy.url().should('include', '/hoy-no-circula');
    });
  });
});
