import type { Meta, StoryObj } from "@storybook/react-vite";
import { TemporalControl } from "./TemporalControl";

const meta: Meta<typeof TemporalControl> = {
  title: "Módulos/Risk Map/TemporalControl",
  component: TemporalControl,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof TemporalControl>;

export const Default: Story = {
  name: "Control temporal del día",
};

export const SobreFondoOscuro: Story = {
  name: "Sobre fondo oscuro",
  parameters: { backgrounds: { default: "dark" } },
};
