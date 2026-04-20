import type { Meta, StoryObj } from "@storybook/react-vite";
import { NewUserModal } from "./NewUserModal";

const meta: Meta<typeof NewUserModal> = {
  title: "Módulos/Gestión Usuarios/NewUserModal",
  component: NewUserModal,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof NewUserModal>;

export const Default: Story = {
  name: "Modal — Crear nuevo usuario",
  args: { onClose: () => {}, onSave: () => {} },
};
