import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PaginationBar } from './PaginationBar';

// ─── Constantes de testID ─────────────────────────────────────────────────────
const TEST_IDS = {
  bar:  'pagination-bar',
  info: 'pagination-info',
  prev: 'btn-prev',
  next: 'btn-next',
  page: (n: number) => `btn-page-${n}`,
} as const;

// ─── Props base reutilizables ─────────────────────────────────────────────────
const baseProps = {
  current:      1,
  totalPages:   3,
  totalItems:   25,
  itemsPerPage: 10,
  onPageChange: vi.fn(),
};

const renderPagination = (overrides?: Partial<typeof baseProps>) =>
  render(<PaginationBar {...baseProps} {...overrides} />);

// ─── Suite ───────────────────────────────────────────────────────────────────
describe('PaginationBar', () => {
  describe('Renderizado inicial', () => {
    it('muestra el componente completo (PB-01)', () => {
      renderPagination();
      expect(screen.getByTestId(TEST_IDS.bar)).toBeInTheDocument();
    });

    it('muestra el rango correcto de elementos (PB-02)', () => {
      renderPagination({ current: 1, totalItems: 25, itemsPerPage: 10 });
      // Página 1 → muestra 1-10 de 25
      expect(screen.getByTestId(TEST_IDS.info)).toHaveTextContent('Mostrando 1-10 de 25 usuarios');
    });

    it('recorta el rango en la última página (PB-03)', () => {
      renderPagination({ current: 3, totalItems: 25, itemsPerPage: 10 });
      // Página 3 → muestra 21-25 de 25
      expect(screen.getByTestId(TEST_IDS.info)).toHaveTextContent('Mostrando 21-25 de 25 usuarios');
    });

    it('genera un botón por cada página (PB-04)', () => {
      renderPagination({ totalPages: 4 });
      [1, 2, 3, 4].forEach((p) =>
        expect(screen.getByTestId(TEST_IDS.page(p))).toBeInTheDocument(),
      );
    });
  });

  describe('Botón Anterior', () => {
    it('está deshabilitado en la primera página (PB-05)', () => {
      renderPagination({ current: 1 });
      expect(screen.getByTestId(TEST_IDS.prev)).toBeDisabled();
    });

    it('está habilitado cuando no es la primera página (PB-06)', () => {
      renderPagination({ current: 2 });
      expect(screen.getByTestId(TEST_IDS.prev)).not.toBeDisabled();
    });

    it('llama a onPageChange con current-1 al hacer click (PB-07)', () => {
      const onPageChange = vi.fn();
      renderPagination({ current: 2, onPageChange });
      fireEvent.click(screen.getByTestId(TEST_IDS.prev));
      expect(onPageChange).toHaveBeenCalledWith(1);
    });
  });

  describe('Botón Siguiente', () => {
    it('está deshabilitado en la última página (PB-08)', () => {
      renderPagination({ current: 3, totalPages: 3 });
      expect(screen.getByTestId(TEST_IDS.next)).toBeDisabled();
    });

    it('está habilitado cuando no es la última página (PB-09)', () => {
      renderPagination({ current: 1, totalPages: 3 });
      expect(screen.getByTestId(TEST_IDS.next)).not.toBeDisabled();
    });

    it('llama a onPageChange con current+1 al hacer click (PB-10)', () => {
      const onPageChange = vi.fn();
      renderPagination({ current: 1, totalPages: 3, onPageChange });
      fireEvent.click(screen.getByTestId(TEST_IDS.next));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });
  });

  describe('Botones de página numerada', () => {
    it('llama a onPageChange con el número de página correcto (PB-11)', () => {
      const onPageChange = vi.fn();
      renderPagination({ totalPages: 3, onPageChange });
      fireEvent.click(screen.getByTestId(TEST_IDS.page(2)));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('la página activa tiene fondo azul (PB-12)', () => {
      renderPagination({ current: 2, totalPages: 3 });
      expect(screen.getByTestId(TEST_IDS.page(2))).toHaveStyle({ background: '#3b82f6' });
    });

    it('una página inactiva tiene fondo transparente (PB-13)', () => {
      renderPagination({ current: 1, totalPages: 3 });
      expect(screen.getByTestId(TEST_IDS.page(2))).toHaveStyle({ background: 'transparent' });
    });
  });
});
