import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RoleBadge, type Role } from './RoleBadge';

// ─── Constantes de testID ─────────────────────────────────────────────────────
const TEST_ID = 'role-badge';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const renderBadge = (role: Role) => render(<RoleBadge role={role} />);

// ─── Suite ───────────────────────────────────────────────────────────────────
describe('RoleBadge', () => {
  describe('Renderizado por rol', () => {
    const roles: Role[] = ['Administrador', 'Gerente', 'Director', 'Usuario'];

    roles.forEach((role) => {
      it(`muestra el texto del rol "${role}" (RB-01-${role})`, () => {
        renderBadge(role);
        const badge = screen.getByTestId(TEST_ID);
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveTextContent(role);
      });
    });
  });

  describe('Estilos visuales por rol', () => {
    it('aplica fondo rojo para Administrador (RB-02)', () => {
      renderBadge('Administrador');
      const badge = screen.getByTestId(TEST_ID);
      expect(badge).toHaveStyle({ backgroundColor: '#fee2e2', color: '#ef4444' });
    });

    it('aplica fondo azul para Gerente (RB-03)', () => {
      renderBadge('Gerente');
      const badge = screen.getByTestId(TEST_ID);
      expect(badge).toHaveStyle({ backgroundColor: '#dbeafe', color: '#3b82f6' });
    });

    it('aplica fondo morado para Director (RB-04)', () => {
      renderBadge('Director');
      const badge = screen.getByTestId(TEST_ID);
      expect(badge).toHaveStyle({ backgroundColor: '#ede9fe', color: '#7c3aed' });
    });

    it('aplica fondo verde para Usuario (RB-05)', () => {
      renderBadge('Usuario');
      const badge = screen.getByTestId(TEST_ID);
      expect(badge).toHaveStyle({ backgroundColor: '#dcfce7', color: '#16a34a' });
    });
  });
});
