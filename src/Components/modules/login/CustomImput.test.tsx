import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CustomImput } from './CustomImput';

// ─── Constantes de testID ─────────────────────────────────────────────────────
const TEST_IDS = {
  input: 'custom-input',
  label: 'custom-input-label',
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const renderInput = (overrides?: Partial<Parameters<typeof CustomImput>[0]>) =>
  render(
    <CustomImput
      label="Correo electrónico"
      placeholder="ejemplo@correo.com"
      value=""
      onChangeText={vi.fn()}
      {...overrides}
    />,
  );

// ─── Suite ───────────────────────────────────────────────────────────────────
describe('CustomImput', () => {
  describe('Renderizado', () => {
    it('muestra el label recibido como prop (CI-01)', () => {
      renderInput({ label: 'Contraseña' });
      expect(screen.getByTestId(TEST_IDS.label)).toHaveTextContent('Contraseña');
    });

    it('muestra el placeholder en el input (CI-02)', () => {
      renderInput({ placeholder: 'Escribe aquí' });
      expect(screen.getByTestId(TEST_IDS.input)).toHaveAttribute('placeholder', 'Escribe aquí');
    });

    it('el label está asociado al input mediante htmlFor (CI-03)', () => {
      renderInput();
      const label = screen.getByTestId(TEST_IDS.label);
      const input = screen.getByTestId(TEST_IDS.input);
      // El atributo "for" del label debe coincidir con el "id" del input
      expect(label).toHaveAttribute('for', input.id);
    });
  });

  describe('Tipo de input', () => {
    it('usa type="text" por defecto (CI-04)', () => {
      renderInput();
      expect(screen.getByTestId(TEST_IDS.input)).toHaveAttribute('type', 'text');
    });

    it('usa type="password" cuando se indica (CI-05)', () => {
      renderInput({ type: 'password' });
      expect(screen.getByTestId(TEST_IDS.input)).toHaveAttribute('type', 'password');
    });
  });

  describe('Valor controlado', () => {
    it('refleja el value recibido como prop (CI-06)', () => {
      renderInput({ value: 'usuario@sanitek.mx' });
      expect(screen.getByTestId(TEST_IDS.input)).toHaveValue('usuario@sanitek.mx');
    });

    it('llama a onChangeText con el texto escrito (CI-07)', () => {
      const onChangeText = vi.fn();
      renderInput({ onChangeText });
      fireEvent.change(screen.getByTestId(TEST_IDS.input), {
        target: { value: 'nuevo valor' },
      });
      expect(onChangeText).toHaveBeenCalledWith('nuevo valor');
    });

    it('llama a onChangeText exactamente una vez por cambio (CI-08)', () => {
      const onChangeText = vi.fn();
      renderInput({ onChangeText });
      fireEvent.change(screen.getByTestId(TEST_IDS.input), {
        target: { value: 'x' },
      });
      expect(onChangeText).toHaveBeenCalledTimes(1);
    });
  });
});
