import type { Meta, StoryObj } from "@storybook/react-vite";
import { PasswordInput } from "./PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  title: "Módulos/Perfil Usuario/PasswordInput",
  component: PasswordInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 340 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Vacio: Story = {
  name: "Campo vacío",
  args: { label: "Contraseña actual", placeholder: "Ingresa tu contraseña", value: "", onChange: () => {} },
};

export const ConValor: Story = {
  name: "Campo con valor",
  args: { label: "Nueva contraseña", placeholder: "Mínimo 8 caracteres", value: "MiPassword123", onChange: () => {} },
};

export const ConError: Story = {
  name: "Con mensaje de error",
  args: { label: "Confirmar contraseña", placeholder: "Repite tu contraseña", value: "pass", onChange: () => {}, error: "Las contraseñas no coinciden" },
};
