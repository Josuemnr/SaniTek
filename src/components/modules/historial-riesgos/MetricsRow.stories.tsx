import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetricsRow } from "./MetricsRow";
import { getMetricas, DATA_CDMX } from "./historial-data";

const metricasBase = getMetricas(DATA_CDMX);

const meta: Meta<typeof MetricsRow> = {
  title: "Módulos/Historial de Riesgos/MetricsRow",
  component: MetricsRow,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MetricsRow>;

export const TendenciaPositiva: Story = {
  name: "Tendencia Positiva",
  args: { metricas: metricasBase },
};

export const TendenciaNegativa: Story = {
  name: "Tendencia Negativa",
  args: {
    metricas: {
      ...metricasBase,
      variacionMes: -5,
      tendencia: "Negativa",
      tendenciaLabel: "Descendiendo",
    },
  },
};
