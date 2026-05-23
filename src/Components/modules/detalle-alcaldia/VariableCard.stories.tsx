import type { Meta, StoryObj } from "@storybook/react-vite";
import { Thermometer, Droplets, Wind, Gauge, Leaf } from "lucide-react";
import { VariableCard } from "./VariableCard";

const meta: Meta<typeof VariableCard> = {
  title: "Módulos/Detalle Alcaldía/VariableCard",
  component: VariableCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof VariableCard>;

// ─── Temperatura ──────────────────────────────────────────────────────────────

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

// ─── Humedad ──────────────────────────────────────────────────────────────────

export const Humedad: Story = {
  name: "Humedad — sin badge",
  args: {
    icon: <Droplets className="w-6 h-6 text-blue-400" />,
    label: "Humedad",
    value: "62%",
    subLabel: "Rango óptimo: 40–70%",
  },
};

// ─── Contaminantes (datos del backend: promediosPorContaminante) ──────────────

export const NO2_Bajo: Story = {
  name: "NO₂ · Dióxido de Nitrógeno — Bajo",
  args: {
    icon: <Wind className="w-6 h-6 text-amber-400" />,
    label: "NO₂ · Dióxido de Nitrógeno",
    value: "28.0",
    subLabel: "µg/m³ · límite NOM: 210",
    riskTag: "Bajo",
  },
};

export const NO2_Alto: Story = {
  name: "NO₂ · Dióxido de Nitrógeno — Alto",
  args: {
    icon: <Wind className="w-6 h-6 text-amber-400" />,
    label: "NO₂ · Dióxido de Nitrógeno",
    value: "112.5",
    subLabel: "µg/m³ · límite NOM: 210",
    riskTag: "Alto",
  },
};

export const O3_Moderado: Story = {
  name: "O₃ · Ozono — Moderado",
  args: {
    icon: <Gauge className="w-6 h-6 text-violet-400" />,
    label: "O₃ · Ozono",
    value: "68.3",
    subLabel: "µg/m³ · límite NOM: 140",
    riskTag: "Moderado",
  },
};

export const O3_Critico: Story = {
  name: "O₃ · Ozono — Crítico",
  args: {
    icon: <Gauge className="w-6 h-6 text-violet-400" />,
    label: "O₃ · Ozono",
    value: "145.0",
    subLabel: "µg/m³ · límite NOM: 140",
    riskTag: "Crítico",
  },
};

export const PM25_Optimo: Story = {
  name: "PM2.5 · Partículas finas — Óptimo",
  args: {
    icon: <Leaf className="w-6 h-6 text-emerald-400" />,
    label: "PM2.5 · Part. finas",
    value: "10.2",
    subLabel: "µg/m³ · límite NOM: 45",
    riskTag: "Óptimo",
  },
};

export const PM25_Critico: Story = {
  name: "PM2.5 · Partículas finas — Crítico",
  args: {
    icon: <Leaf className="w-6 h-6 text-emerald-400" />,
    label: "PM2.5 · Part. finas",
    value: "52.8",
    subLabel: "µg/m³ · límite NOM: 45",
    riskTag: "Crítico",
  },
};

// ─── Calidad del Aire (AQI general) ──────────────────────────────────────────

export const CalidadAire: Story = {
  name: "Calidad del Aire (AQI)",
  args: {
    icon: <Wind className="w-6 h-6 text-cyan-500" />,
    label: "Calidad del Aire (AQI)",
    value: "45",
    subLabel: "Rango saludable: 0–50",
    riskTag: "Bajo",
  },
};
