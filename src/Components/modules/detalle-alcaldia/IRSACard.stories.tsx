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

// Escala 0-100 consistente con el backend (valorIrsa × 100)

export const Optimo: Story = {
  name: "Nivel Óptimo (≤ 40) — datos de referencia",
  args: {
    irsa: 24,
    irsaMax: 100,
    descripcion: "Nivel óptimo para operaciones normales",
    esDatoReal: false,
  },
};

export const OptimoEnVivo: Story = {
  name: "Nivel Óptimo (≤ 40) — dato en tiempo real",
  args: {
    irsa: 29,
    irsaMax: 100,
    descripcion: "Nivel óptimo para operaciones normales",
    esDatoReal: true,
  },
};

export const Moderado: Story = {
  name: "Riesgo Moderado (41–60)",
  args: {
    irsa: 52,
    irsaMax: 100,
    descripcion: "Riesgo moderado, monitoreo continuo recomendado",
    esDatoReal: false,
  },
};

export const Alto: Story = {
  name: "Riesgo Alto (61–80)",
  args: {
    irsa: 71,
    irsaMax: 100,
    descripcion: "Nivel de riesgo elevado, atención prioritaria",
    esDatoReal: false,
  },
};

export const Critico: Story = {
  name: "Riesgo Crítico (> 80) — dato en tiempo real",
  args: {
    irsa: 83,
    irsaMax: 100,
    descripcion: "Riesgo crítico, intervención inmediata necesaria",
    esDatoReal: true,
  },
};
