import type { Meta, StoryObj } from "@storybook/react-vite";
import { SanidadChart } from "./SanidadChart";
import { DATA_CDMX } from "./historial-data";

const meta: Meta<typeof SanidadChart> = {
  title: "Módulos/Historial de Riesgos/SanidadChart",
  component: SanidadChart,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: 360 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SanidadChart>;

export const DatosCDMX: Story = {
  name: "Datos CDMX — 12 meses",
  args: { data: DATA_CDMX },
};

export const UltimoSemestre: Story = {
  name: "Últimos 6 meses",
  args: { data: DATA_CDMX.slice(6) },
};

export const PrimerTrimestre: Story = {
  name: "Primer trimestre",
  args: { data: DATA_CDMX.slice(0, 3) },
};
