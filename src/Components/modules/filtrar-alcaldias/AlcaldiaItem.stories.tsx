import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlcaldiaItem } from "./AlcaldiaItem";

const meta: Meta<typeof AlcaldiaItem> = {
  title: "Módulos/Filtrar Alcaldías/AlcaldiaItem",
  component: AlcaldiaItem,
  parameters: { layout: "padded", backgrounds: { default: "white" } },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof AlcaldiaItem>;

export const Critico: Story = {
  name: "Zona Crítica",
  args: {
    zona: { id: "1", nombre: "Tepito", alcaldia: "Cuauhtémoc", riskLevel: "critico", densidad: 95, calidadAire: 20, humedad: 40 },
  },
};

export const Alto: Story = {
  name: "Zona Alto Riesgo",
  args: {
    zona: { id: "2", nombre: "Neza Norte", alcaldia: "Nezahualcóyotl", riskLevel: "alto", densidad: 82, calidadAire: 45, humedad: 60 },
  },
};

export const Moderado: Story = {
  name: "Zona Moderada",
  args: {
    zona: { id: "3", nombre: "Xochimilco Centro", alcaldia: "Xochimilco", riskLevel: "moderado", densidad: 55, calidadAire: 60, humedad: 80 },
  },
};

export const Seguro: Story = {
  name: "Zona Segura",
  args: {
    zona: { id: "4", nombre: "Santa Fe", alcaldia: "Cuajimalpa", riskLevel: "seguro", densidad: 30, calidadAire: 80, humedad: 70 },
  },
};
