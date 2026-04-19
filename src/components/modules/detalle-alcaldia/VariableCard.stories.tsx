import type { Meta, StoryObj } from "@storybook/react-vite";
import { Thermometer, Droplets, Users, Wind } from "lucide-react";
import { VariableCard } from "./VariableCard";

const meta: Meta<typeof VariableCard> = {
  title: "Módulos/Detalle Alcaldía/VariableCard",
  component: VariableCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof VariableCard>;

export const Temperatura_Optima: Story = {
  name: "Temperatura — Óptima",
  args: {
    icon: <Thermometer className="w-6 h-6 text-orange-400" />,
    label: "Temperatura",
    value: "22°C",
    subLabel: "Rango óptimo: 18–25°C",
    riskTag: "Óptimo",
  },
};

export const Temperatura_Moderada: Story = {
  name: "Temperatura — Moderada",
  args: {
    icon: <Thermometer className="w-6 h-6 text-orange-400" />,
    label: "Temperatura",
    value: "28°C",
    subLabel: "Rango óptimo: 18–25°C",
    riskTag: "Moderado",
  },
};

export const Temperatura_Critica: Story = {
  name: "Temperatura — Crítica",
  args: {
    icon: <Thermometer className="w-6 h-6 text-orange-400" />,
    label: "Temperatura",
    value: "33°C",
    subLabel: "Rango óptimo: 18–25°C",
    riskTag: "Crítico",
  },
};

export const Humedad: Story = {
  name: "Humedad — sin badge",
  args: {
    icon: <Droplets className="w-6 h-6 text-blue-400" />,
    label: "Humedad",
    value: "62%",
    subLabel: "Rango óptimo: 40–70%",
  },
};

export const DensidadAlta: Story = {
  name: "Densidad Poblacional — Alto",
  args: {
    icon: <Users className="w-6 h-6 text-purple-400" />,
    label: "Densidad Poblacional",
    value: "16,500",
    subLabel: "habitantes/km²",
    riskTag: "Alto",
  },
};

export const CalidadAire: Story = {
  name: "Calidad del Aire (AQI)",
  args: {
    icon: <Wind className="w-6 h-6 text-cyan-500" />,
    label: "Calidad del Aire (AQI)",
    value: "45",
    subLabel: "Rango saludable: 0–50",
  },
};
