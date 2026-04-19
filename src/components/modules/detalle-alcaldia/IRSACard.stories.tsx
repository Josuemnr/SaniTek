import type { Meta, StoryObj } from "@storybook/react-vite";
import { IRSACard } from "./IRSACard";

const meta: Meta<typeof IRSACard> = {
  title: "Módulos/Detalle Alcaldía/IRSACard",
  component: IRSACard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof IRSACard>;

export const Optimo: Story = {
  name: "Nivel Óptimo (≤ 3)",
  args: {
    irsa: 2.4,
    irsaMax: 10,
    descripcion: "Nivel óptimo para operaciones normales",
  },
};

export const Moderado: Story = {
  name: "Riesgo Moderado (3–5)",
  args: {
    irsa: 3.2,
    irsaMax: 10,
    descripcion: "Nivel óptimo para operaciones normales",
  },
};

export const Alto: Story = {
  name: "Riesgo Alto (5–7)",
  args: {
    irsa: 5.8,
    irsaMax: 10,
    descripcion: "Nivel de riesgo elevado, atención prioritaria",
  },
};

export const Critico: Story = {
  name: "Riesgo Crítico (> 7)",
  args: {
    irsa: 8.3,
    irsaMax: 10,
    descripcion: "Riesgo crítico, intervención inmediata necesaria",
  },
};
