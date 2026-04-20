import type { Meta, StoryObj } from "@storybook/react-vite";
import { PantallaCarga } from "./Pantalla_Carga";

const meta: Meta<typeof PantallaCarga> = {
  title: "Módulos/Login/PantallaCarga",
  component: PantallaCarga,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof PantallaCarga>;

export const Visible: Story = {
  name: "Pantalla de carga visible",
  args: { isVisible: true, mensaje: "Cargando..." },
};

export const AutenticandoSesion: Story = {
  name: "Autenticando sesión",
  args: { isVisible: true, mensaje: "Autenticando sesión..." },
};

export const Oculta: Story = {
  name: "Pantalla oculta (isVisible: false)",
  args: { isVisible: false, mensaje: "Cargando..." },
};
