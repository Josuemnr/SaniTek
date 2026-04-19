import type { Meta, StoryObj } from "@storybook/react-vite";
import { VariablesGrid } from "./VariablesGrid";

const meta: Meta<typeof VariablesGrid> = {
  title: "Módulos/Detalle Alcaldía/VariablesGrid",
  component: VariablesGrid,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof VariablesGrid>;

export const RiesgoOptimo: Story = {
  name: "Variables — riesgo óptimo",
  args: {
    variables: {
      temperatura: 21,
      humedad: 62,
      densidad: 7100,
      calidadAire: 38,
      riesgoTemperatura: "Óptimo",
      riesgoDensidad: "Bajo",
    },
  },
};

export const RiesgoModerado: Story = {
  name: "Variables — riesgo moderado",
  args: {
    variables: {
      temperatura: 28,
      humedad: 62,
      densidad: 16500,
      calidadAire: 45,
      riesgoTemperatura: "Moderado",
      riesgoDensidad: "Alto",
    },
  },
};

export const RiesgoCritico: Story = {
  name: "Variables — riesgo crítico",
  args: {
    variables: {
      temperatura: 33,
      humedad: 40,
      densidad: 20100,
      calidadAire: 95,
      riesgoTemperatura: "Crítico",
      riesgoDensidad: "Crítico",
    },
  },
};
