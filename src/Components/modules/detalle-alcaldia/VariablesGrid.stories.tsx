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
  name: "Variables — riesgo óptimo (Benito Juárez)",
  args: {
    variables: {
      temperatura: 21,
      humedad: 62,
      calidadAire: 38,
      riesgoTemperatura: "Óptimo",
    },
  },
};

export const RiesgoModerado: Story = {
  name: "Variables — riesgo moderado (Iztacalco)",
  args: {
    variables: {
      temperatura: 27,
      humedad: 55,
      calidadAire: 60,
      riesgoTemperatura: "Moderado",
    },
  },
};

export const RiesgoAlto: Story = {
  name: "Variables — riesgo alto (Gustavo A. Madero)",
  args: {
    variables: {
      temperatura: 31,
      humedad: 42,
      calidadAire: 88,
      riesgoTemperatura: "Alto",
    },
  },
};

export const RiesgoCritico: Story = {
  name: "Variables — riesgo crítico (Iztapalapa)",
  args: {
    variables: {
      temperatura: 33,
      humedad: 40,
      calidadAire: 95,
      riesgoTemperatura: "Crítico",
    },
  },
};
