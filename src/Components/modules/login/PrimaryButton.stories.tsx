import type { Meta, StoryObj } from "@storybook/react-vite";
import { PrimaryButton } from "./PrimaryButton";

const meta: Meta<typeof PrimaryButton> = {
  title: "Módulos/Login/PrimaryButton",
  component: PrimaryButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof PrimaryButton>;

export const Default: Story = {
  name: "Estado normal",
  args: { text: "Iniciar sesión", isLoading: false },
};

export const Cargando: Story = {
  name: "Estado cargando",
  args: { text: "Iniciar sesión", isLoading: true, loadingText: "Verificando..." },
};

export const CargandoTextoDefault: Story = {
  name: "Estado cargando — texto por defecto",
  args: { text: "Entrar", isLoading: true },
};
