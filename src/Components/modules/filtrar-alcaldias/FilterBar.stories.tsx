import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilterBar } from "./FilterBar";

const meta: Meta<typeof FilterBar> = {
  title: "Módulos/Filtrar Alcaldías/FilterBar",
  component: FilterBar,
  parameters: { layout: "padded", backgrounds: { default: "white" } },
  tags: ["autodocs"],
  argTypes: {
    onToggleFilter: { action: "toggled" },
    onClear:        { action: "cleared" },
  },
};
export default meta;

type Story = StoryObj<typeof FilterBar>;

export const SinFiltros: Story = {
  name: "Sin filtros activos",
  args: {
    activeFilters: [],
  },
};

export const UnFiltro: Story = {
  name: "Un filtro activo",
  args: {
    activeFilters: ["densidad"],
  },
};

export const TodosLosFiltros: Story = {
  name: "Todos los filtros activos",
  args: {
    activeFilters: ["densidad", "calidad-aire", "humedad"],
  },
};
