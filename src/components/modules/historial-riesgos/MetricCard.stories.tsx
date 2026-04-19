import type { Meta, StoryObj } from "@storybook/react-vite";
import { TrendingUp, TrendingDown, BarChart2, Calendar } from "lucide-react";
import { MetricCard } from "./MetricCard";

const meta: Meta<typeof MetricCard> = {
  title: "Módulos/Historial de Riesgos/MetricCard",
  component: MetricCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MetricCard>;

export const IndiceActualPositivo: Story = {
  name: "Índice Actual — variación positiva",
  args: {
    label: "Índice Actual",
    value: 78,
    sub: "+2.3 vs mes anterior",
    subColor: "text-emerald-600",
    icon: <BarChart2 className="w-4 h-4" />,
  },
};

export const IndiceActualNegativo: Story = {
  name: "Índice Actual — variación negativa",
  args: {
    label: "Índice Actual",
    value: 72,
    sub: "-5.0 vs mes anterior",
    subColor: "text-red-500",
    icon: <BarChart2 className="w-4 h-4" />,
  },
};

export const PromedioMensual: Story = {
  name: "Promedio Mensual",
  args: {
    label: "Promedio Mensual",
    value: 75.2,
    sub: "Últimos 12 meses",
    icon: <Calendar className="w-4 h-4" />,
  },
};

export const TendenciaPositiva: Story = {
  name: "Tendencia — Mejorando",
  args: {
    label: "Tendencia",
    value: "Mejorando",
    sub: "Positiva",
    subColor: "text-emerald-600",
    icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
  },
};

export const TendenciaNegativa: Story = {
  name: "Tendencia — Descendiendo",
  args: {
    label: "Tendencia",
    value: "Descendiendo",
    sub: "Negativa",
    subColor: "text-red-500",
    icon: <TrendingDown className="w-4 h-4 text-red-500" />,
  },
};
