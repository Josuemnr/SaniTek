import type { Meta, StoryObj } from "@storybook/react-vite";
import { EstadoDiaCard } from "./EstadoDiaCard";
import { getDayRestriction } from "./circula-data";

const meta: Meta<typeof EstadoDiaCard> = {
  title: "Módulos/Hoy No Circula/EstadoDiaCard",
  component: EstadoDiaCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof EstadoDiaCard>;

const weekday  = new Date(2026, 3, 14); // Martes
const weekend  = new Date(2026, 3, 19); // Domingo

export const DiaConRestriccion: Story = {
  name: "Día laboral — Protocolo Activo",
  args: { date: weekday, restriction: getDayRestriction(weekday) },
};

export const FinDeSemana: Story = {
  name: "Fin de semana — Sin restricciones",
  args: { date: weekend, restriction: null },
};
