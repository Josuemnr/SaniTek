import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FilterBar } from './FilterBar';

describe('FilterBar', () => {
  const onToggle = vi.fn();
  const onClear  = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ── Renderizado base ────────────────────────────────────────────────────────

  it('renderiza el contenedor con data-testid="filter-bar"', () => {
    render(<FilterBar activeFilters={[]} onToggleFilter={onToggle} onClear={onClear} />);
    expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
  });

  it('muestra el botón "Filtrar" deshabilitado', () => {
    render(<FilterBar activeFilters={[]} onToggleFilter={onToggle} onClear={onClear} />);
    const btn = screen.getByRole('button', { name: /filtrar/i });
    expect(btn).toBeDisabled();
  });

  it('muestra el botón de calidad de aire', () => {
    render(<FilterBar activeFilters={[]} onToggleFilter={onToggle} onClear={onClear} />);
    expect(screen.getByTestId('filter-btn-calidad-aire')).toBeInTheDocument();
    expect(screen.getByText('Calidad de aire')).toBeInTheDocument();
  });

  it('muestra el botón de humedad', () => {
    render(<FilterBar activeFilters={[]} onToggleFilter={onToggle} onClear={onClear} />);
    expect(screen.getByTestId('filter-btn-humedad')).toBeInTheDocument();
    expect(screen.getByText('Humedad')).toBeInTheDocument();
  });

  it('NO muestra el botón Limpiar cuando no hay filtros activos', () => {
    render(<FilterBar activeFilters={[]} onToggleFilter={onToggle} onClear={onClear} />);
    expect(screen.queryByTestId('filter-clear-btn')).not.toBeInTheDocument();
  });

  // ── Filtros activos ─────────────────────────────────────────────────────────

  it('muestra el botón Limpiar cuando hay al menos un filtro activo', () => {
    render(<FilterBar activeFilters={['humedad']} onToggleFilter={onToggle} onClear={onClear} />);
    expect(screen.getByTestId('filter-clear-btn')).toBeInTheDocument();
  });

  it('botón calidad-aire activo tiene clase de fondo azul', () => {
    render(<FilterBar activeFilters={['calidad-aire']} onToggleFilter={onToggle} onClear={onClear} />);
    const btn = screen.getByTestId('filter-btn-calidad-aire');
    expect(btn.className).toContain('bg-blue-600');
  });

  it('botón humedad inactivo NO tiene clase bg-blue-600', () => {
    render(<FilterBar activeFilters={[]} onToggleFilter={onToggle} onClear={onClear} />);
    const btn = screen.getByTestId('filter-btn-humedad');
    expect(btn.className).not.toContain('bg-blue-600');
  });

  // ── Interacciones ───────────────────────────────────────────────────────────

  it('llama onToggleFilter con "calidad-aire" al hacer clic', () => {
    render(<FilterBar activeFilters={[]} onToggleFilter={onToggle} onClear={onClear} />);
    fireEvent.click(screen.getByTestId('filter-btn-calidad-aire'));
    expect(onToggle).toHaveBeenCalledOnce();
    expect(onToggle).toHaveBeenCalledWith('calidad-aire');
  });

  it('llama onToggleFilter con "humedad" al hacer clic', () => {
    render(<FilterBar activeFilters={[]} onToggleFilter={onToggle} onClear={onClear} />);
    fireEvent.click(screen.getByTestId('filter-btn-humedad'));
    expect(onToggle).toHaveBeenCalledWith('humedad');
  });

  it('llama onClear al hacer clic en el botón Limpiar', () => {
    render(<FilterBar activeFilters={['humedad']} onToggleFilter={onToggle} onClear={onClear} />);
    fireEvent.click(screen.getByTestId('filter-clear-btn'));
    expect(onClear).toHaveBeenCalledOnce();
  });

  it('NO llama onToggleFilter al hacer clic en el botón Filtrar (está disabled)', () => {
    render(<FilterBar activeFilters={[]} onToggleFilter={onToggle} onClear={onClear} />);
    fireEvent.click(screen.getByRole('button', { name: /filtrar/i }));
    expect(onToggle).not.toHaveBeenCalled();
  });
});
