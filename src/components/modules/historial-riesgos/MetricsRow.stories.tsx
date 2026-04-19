import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetricsRow } from "./MetricsRow";

const meta: Meta<typeof MetricsRow> = {
  title: "Módulos/Historial de Riesgos/MetricsRow",
  component: MetricsRow,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MetricsRow>;

export const MesOptimo: Story = {
  name: "Mes óptimo — índices bajos y mejorando",
  args: {
    metricas: {
      indiceActual: 45,
      variacionMes: +8.5,
      promedioMensual: 41.2,
      maximoRegistrado: 55,
      mesesAtrasMaximo: 3,
      tendencia: "Positiva",
      tendenciaLabel: "Mejorando",
    },
  },
};

export const MesCritico: Story = {
  name: "Mes crítico — índices altos y bajando",
  args: {
    metricas: {
      indiceActual: 91,
      variacionMes: -6.0,
      promedioMensual: 87.4,
      maximoRegistrado: 97,
      mesesAtrasMaximo: 1,
      tendencia: "Negativa",
      tendenciaLabel: "Descendiendo",
    },
  },
};

export const MesEstable: Story = {
  name: "Mes estable — sin cambios relevantes",
  args: {
    metricas: {
      indiceActual: 68,
      variacionMes: +0.5,
      promedioMensual: 67.8,
      maximoRegistrado: 74,
      mesesAtrasMaximo: 6,
      tendencia: "Positiva",
      tendenciaLabel: "Mejorando",
    },
  },
};
