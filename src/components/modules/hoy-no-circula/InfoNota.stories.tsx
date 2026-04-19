import type { Meta, StoryObj } from "@storybook/react-vite";
import { InfoNota } from "./InfoNota";

const meta: Meta<typeof InfoNota> = {
  title: "Módulos/Hoy No Circula/InfoNota",
  component: InfoNota,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof InfoNota>;

export const Default: Story = {
  name: "Nota informativa",
};

export const ConFondoOscuro: Story = {
  name: "Sobre fondo gris",
  parameters: { backgrounds: { default: "light-gray" } },
};
