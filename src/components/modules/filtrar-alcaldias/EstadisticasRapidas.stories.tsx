import type { Meta, StoryObj } from "@storybook/react-vite";
import { EstadisticasRapidas } from "./EstadisticasRapidas";

const meta: Meta<typeof EstadisticasRapidas> = {
  title: "Módulos/Filtrar Alcaldías/EstadisticasRapidas",
  component: EstadisticasRapidas,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof EstadisticasRapidas>;

export const SituacionCritica: Story = {
  name: "Situación crítica — muchas zonas de riesgo",
  args: { criticas: 4, altoRiesgo: 5, seguras: 2, poblacion: "4.9M" },
};

export const SituacionEstable: Story = {
  name: "Situación estable — pocas zonas críticas",
  args: { criticas: 1, altoRiesgo: 2, seguras: 8, poblacion: "1.1M" },
};

export const SinFiltros: Story = {
  name: "Sin filtros — datos base",
  args: { criticas: 3, altoRiesgo: 4, seguras: 3, poblacion: "3.4M" },
};
