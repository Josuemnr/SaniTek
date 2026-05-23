import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlcaldiasList } from "./AlcaldiasList";
import { ZONAS_MOCK } from "./alcaldias-filter-data";

const meta: Meta<typeof AlcaldiasList> = {
  title: "Módulos/Filtrar Alcaldías/AlcaldiasList",
  component: AlcaldiasList,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: 480, display: "flex", flexDirection: "column" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof AlcaldiasList>;

export const TodasLasZonas: Story = {
  name: "Lista completa de zonas",
  args: { zonas: ZONAS_MOCK },
};

export const SoloCriticas: Story = {
  name: "Solo zonas críticas",
  args: { zonas: ZONAS_MOCK.filter((z) => z.riskLevel === "critico") },
};

export const SoloSeguras: Story = {
  name: "Solo zonas seguras",
  args: { zonas: ZONAS_MOCK.filter((z) => z.riskLevel === "seguro") },
};

export const ListaVacia: Story = {
  name: "Sin resultados (filtros sin coincidencias)",
  args: { zonas: [] },
};
