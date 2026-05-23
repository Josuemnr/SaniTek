import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlacasRestringidasCard } from "./PlacasRestringidasCard";

const meta: Meta<typeof PlacasRestringidasCard> = {
  title: "Módulos/Hoy No Circula/PlacasRestringidasCard",
  component: PlacasRestringidasCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof PlacasRestringidasCard>;

export const Lunes: Story = {
  name: "Lunes — Terminación 3 y 4",
  args: {
    restriction: {
      plateEndings: [3, 4],
      schedule: "05:00 - 22:00",
      protocol: "active",
      hologramas: [],
    },
  },
};

export const Viernes: Story = {
  name: "Viernes — Terminación 1 y 2",
  args: {
    restriction: {
      plateEndings: [1, 2],
      schedule: "05:00 - 22:00",
      protocol: "active",
      hologramas: [],
    },
  },
};

export const Jueves: Story = {
  name: "Jueves — Terminación 9 y 0",
  args: {
    restriction: {
      plateEndings: [9, 0],
      schedule: "05:00 - 22:00",
      protocol: "active",
      hologramas: [],
    },
  },
};
