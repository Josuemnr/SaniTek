import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FilterTab } from './FilterTab';

const TEST_ID = 'filter-tab';

const mockIcon = <span data-testid="filter-tab-icon">🔍</span>;

const renderTab = (overrides?: Partial<Parameters<typeof FilterTab>[0]>) =>
  render(
    <FilterTab
      label="Todos"
      icon={mockIcon}
      active={false}
      onClick={vi.fn()}
      {...overrides}
    />,
  );

// ─── Suite ───────────────────────────────────────────────────────────────────
describe('FilterTab', () => {
  describe('Renderizado', () => {
    it('muestra el label enviado como prop (FT-01)', () => {
      renderTab({ label: 'Administradores' });
      expect(screen.getByTestId(TEST_ID)).toHaveTextContent('Administradores');
    });

    it('renderiza el icono dentro del botón (FT-02)', () => {
      renderTab();
      expect(screen.getByTestId('filter-tab-icon')).toBeInTheDocument();
    });
  });

  describe('Estado activo / inactivo', () => {
    // JSDOM v26 normaliza colores hex → rgb() en element.style, pero mantiene
    // palabras clave CSS (white, transparent) sin cambios.
    // Usamos element.style en vez de toHaveStyle para evitar doble normalización.
    it('aplica fondo azul cuando active=true (FT-03)', () => {
      renderTab({ active: true });
      const btn = screen.getByTestId(TEST_ID);
      expect(btn.style.backgroundColor).toBe('rgb(59, 130, 246)'); // #3b82f6
      expect(btn.style.color).toBe('white');
    });

    it('aplica fondo blanco cuando active=false (FT-04)', () => {
      renderTab({ active: false });
      const btn = screen.getByTestId(TEST_ID);
      expect(btn.style.backgroundColor).toBe('white');
      expect(btn.style.color).toBe('rgb(107, 114, 128)'); // #6b7280
    });
  });

  describe('Interacción', () => {
    it('llama a onClick al hacer click (FT-05)', () => {
      const handleClick = vi.fn();
      renderTab({ onClick: handleClick });
      fireEvent.click(screen.getByTestId(TEST_ID));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('no lanza error cuando onClick no se provee (FT-06)', () => {
      renderTab({ onClick: undefined });
      expect(() => fireEvent.click(screen.getByTestId(TEST_ID))).not.toThrow();
    });
  });
});
