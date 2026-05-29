import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AlertaItem } from './AlertaItem';
import type { Alerta } from './alertas-data';

// ─── Constantes de testID ─────────────────────────────────────────────────────
const TEST_IDS = {
  item:        'alerta-item',
  nivelBadge:  'nivel-badge',
  tipoLabel:   'tipo-label',
  titulo:      'alerta-titulo',
  alcaldia:    'alerta-alcaldia',
  descripcion: 'alerta-descripcion',
  timestamp:   'alerta-timestamp',
  markReadBtn: 'mark-read-btn',
} as const;

// ─── Fixtures ─────────────────────────────────────────────────────────────────
const alertaBase: Alerta = {
  id:              'test-001',
  alcaldiaId:      'cuh',
  alcaldianombre:  'Cuauhtémoc',
  tipo:            'calidad-aire',
  nivel:           'critico',
  titulo:          'Índice AQI supera 200',
  descripcion:     'La calidad del aire es muy insalubre.',
  timestamp:       new Date(Date.now() - 5 * 60_000), // hace 5 minutos
  leida:           false,
};

const alertaLeida: Alerta = {
  ...alertaBase,
  id:    'test-002',
  leida: true,
  nivel: 'moderado',
  tipo:  'temperatura',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const renderAlerta = (
  alerta: Alerta = alertaBase,
  onMarkRead?: (id: string) => void,
) => render(<AlertaItem alerta={alerta} onMarkRead={onMarkRead} />);

// ─── Suite ───────────────────────────────────────────────────────────────────
describe('AlertaItem', () => {
  describe('Renderizado básico', () => {
    it('muestra el contenedor principal (AI-01)', () => {
      renderAlerta();
      expect(screen.getByTestId(TEST_IDS.item)).toBeInTheDocument();
    });

    it('muestra el título de la alerta (AI-02)', () => {
      renderAlerta();
      expect(screen.getByTestId(TEST_IDS.titulo)).toHaveTextContent('Índice AQI supera 200');
    });

    it('muestra la descripción de la alerta (AI-03)', () => {
      renderAlerta();
      expect(screen.getByTestId(TEST_IDS.descripcion)).toHaveTextContent(
        'La calidad del aire es muy insalubre.',
      );
    });

    it('muestra el nombre de la alcaldía (AI-04)', () => {
      renderAlerta();
      expect(screen.getByTestId(TEST_IDS.alcaldia)).toHaveTextContent('Cuauhtémoc');
    });

    it('muestra el timestamp formateado (AI-05)', () => {
      renderAlerta();
      // Hace ~5 min → "Hace 5 min"
      expect(screen.getByTestId(TEST_IDS.timestamp)).toHaveTextContent(/Hace \d+ min/);
    });
  });

  describe('Badge de nivel', () => {
    it('muestra "Crítico" para nivel crítico (AI-06)', () => {
      renderAlerta({ ...alertaBase, nivel: 'critico' });
      expect(screen.getByTestId(TEST_IDS.nivelBadge)).toHaveTextContent('Crítico');
    });

    it('muestra "Alto riesgo" para nivel alto (AI-07)', () => {
      renderAlerta({ ...alertaBase, nivel: 'alto' });
      expect(screen.getByTestId(TEST_IDS.nivelBadge)).toHaveTextContent('Alto riesgo');
    });

    it('muestra "Moderado" para nivel moderado (AI-08)', () => {
      renderAlerta({ ...alertaBase, nivel: 'moderado' });
      expect(screen.getByTestId(TEST_IDS.nivelBadge)).toHaveTextContent('Moderado');
    });

    it('muestra "Informativo" para nivel info (AI-09)', () => {
      renderAlerta({ ...alertaBase, nivel: 'info' });
      expect(screen.getByTestId(TEST_IDS.nivelBadge)).toHaveTextContent('Informativo');
    });
  });

  describe('Etiqueta de tipo', () => {
    it('muestra "Calidad del aire" para tipo calidad-aire (AI-10)', () => {
      renderAlerta({ ...alertaBase, tipo: 'calidad-aire' });
      expect(screen.getByTestId(TEST_IDS.tipoLabel)).toHaveTextContent('Calidad del aire');
    });

    it('muestra "Temperatura" para tipo temperatura (AI-11)', () => {
      renderAlerta({ ...alertaBase, tipo: 'temperatura' });
      expect(screen.getByTestId(TEST_IDS.tipoLabel)).toHaveTextContent('Temperatura');
    });

    it('muestra "Humedad" para tipo humedad (AI-12)', () => {
      renderAlerta({ ...alertaBase, tipo: 'humedad' });
      expect(screen.getByTestId(TEST_IDS.tipoLabel)).toHaveTextContent('Humedad');
    });
  });

  describe('Botón "Marcar como leída"', () => {
    it('aparece cuando la alerta NO está leída y se provee onMarkRead (AI-13)', () => {
      renderAlerta(alertaBase, vi.fn());
      expect(screen.getByTestId(TEST_IDS.markReadBtn)).toBeInTheDocument();
    });

    it('NO aparece cuando la alerta ya está leída (AI-14)', () => {
      renderAlerta(alertaLeida, vi.fn());
      expect(screen.queryByTestId(TEST_IDS.markReadBtn)).not.toBeInTheDocument();
    });

    it('NO aparece cuando onMarkRead no se provee (AI-15)', () => {
      renderAlerta(alertaBase, undefined);
      expect(screen.queryByTestId(TEST_IDS.markReadBtn)).not.toBeInTheDocument();
    });

    it('llama a onMarkRead con el id correcto al hacer click (AI-16)', () => {
      const onMarkRead = vi.fn();
      renderAlerta(alertaBase, onMarkRead);
      fireEvent.click(screen.getByTestId(TEST_IDS.markReadBtn));
      expect(onMarkRead).toHaveBeenCalledWith('test-001');
      expect(onMarkRead).toHaveBeenCalledTimes(1);
    });
  });
});
