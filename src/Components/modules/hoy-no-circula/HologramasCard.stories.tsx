import type { Meta, StoryObj } from "@storybook/react-vite";
import { HologramasCard } from "./HologramasCard";

const meta: Meta<typeof HologramasCard> = {
  title: "Módulos/Hoy No Circula/HologramasCard",
  component: HologramasCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof HologramasCard>;

export const DiaLaboral: Story = {
  name: "Día laboral — Holograma 2 restringido",
  args: {
    hologramas: [
      { type: "2",  label: "Holograma 2",  restricted: true,  badgeColor: "bg-amber-400" },
      { type: "0",  label: "Holograma 0",  restricted: false, badgeColor: "bg-emerald-500" },
      { type: "00", label: "Holograma 00", restricted: false, badgeColor: "bg-emerald-500" },
    ],
  },
};

export const TodosRestringidos: Story = {
  name: "Contingencia — todos restringidos",
  args: {
    hologramas: [
      { type: "2",  label: "Holograma 2",  restricted: true, badgeColor: "bg-amber-400" },
      { type: "0",  label: "Holograma 0",  restricted: true, badgeColor: "bg-red-500" },
      { type: "00", label: "Holograma 00", restricted: true, badgeColor: "bg-red-500" },
    ],
  },
};

export const TodosExentos: Story = {
  name: "Sin restricciones — todos exentos",
  args: {
    hologramas: [
      { type: "2",  label: "Holograma 2",  restricted: false, badgeColor: "bg-emerald-500" },
      { type: "0",  label: "Holograma 0",  restricted: false, badgeColor: "bg-emerald-500" },
      { type: "00", label: "Holograma 00", restricted: false, badgeColor: "bg-emerald-500" },
    ],
  },
};
