import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PrimaryButton } from './PrimaryButton';

// ─── Constantes de testID ─────────────────────────────────────────────────────
const TEST_ID = 'primary-button';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const renderButton = (overrides?: Partial<Parameters<typeof PrimaryButton>[0]>) =>
  render(
    <PrimaryButton
      text="Iniciar sesión"
      {...overrides}
    />,
  );

// ─── Suite ───────────────────────────────────────────────────────────────────
describe('PrimaryButton', () => {
  describe('Renderizado', () => {
    it('muestra el texto de la prop "text" (PB-L01)', () => {
      renderButton({ text: 'Enviar' });
      expect(screen.getByTestId(TEST_ID)).toHaveTextContent('Enviar');
    });

    it('el botón está habilitado por defecto (PB-L02)', () => {
      renderButton();
      expect(screen.getByTestId(TEST_ID)).not.toBeDisabled();
    });
  });

  describe('Estado de carga', () => {
    it('muestra "Cargando..." cuando isLoading=true y no hay loadingText (PB-L03)', () => {
      renderButton({ isLoading: true });
      expect(screen.getByTestId(TEST_ID)).toHaveTextContent('Cargando...');
    });

    it('muestra loadingText personalizado cuando isLoading=true (PB-L04)', () => {
      renderButton({ isLoading: true, loadingText: 'Verificando...' });
      expect(screen.getByTestId(TEST_ID)).toHaveTextContent('Verificando...');
    });

    it('el botón está deshabilitado cuando isLoading=true (PB-L05)', () => {
      renderButton({ isLoading: true });
      expect(screen.getByTestId(TEST_ID)).toBeDisabled();
    });

    it('no muestra loadingText cuando isLoading=false (PB-L06)', () => {
      renderButton({ isLoading: false, text: 'Iniciar sesión', loadingText: 'Cargando...' });
      expect(screen.getByTestId(TEST_ID)).toHaveTextContent('Iniciar sesión');
      expect(screen.getByTestId(TEST_ID)).not.toHaveTextContent('Cargando...');
    });
  });

  describe('Interacción', () => {
    it('ejecuta onClick al hacer click cuando está habilitado (PB-L07)', () => {
      const handleClick = vi.fn();
      renderButton({ onClick: handleClick });
      fireEvent.click(screen.getByTestId(TEST_ID));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('NO ejecuta onClick cuando está deshabilitado por isLoading (PB-L08)', () => {
      const handleClick = vi.fn();
      renderButton({ isLoading: true, onClick: handleClick });
      fireEvent.click(screen.getByTestId(TEST_ID));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
