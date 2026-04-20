import type { Meta, StoryObj } from "@storybook/react-vite";
import { RoleBadge } from "./RoleBadge";

const meta: Meta<typeof RoleBadge> = {
  title: "Módulos/Gestión Usuarios/RoleBadge",
  component: RoleBadge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof RoleBadge>;

export const Administrador: Story = {
  name: "Rol Administrador",
  args: { role: "Administrador" },
};

export const Gerente: Story = {
  name: "Rol Gerente",
  args: { role: "Gerente" },
};

export const Director: Story = {
  name: "Rol Director",
  args: { role: "Director" },
};
