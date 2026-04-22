import type { Meta, StoryObj } from "@storybook/react-vite";
import { CustomImput } from "./CustomImput";

const meta: Meta<typeof CustomImput> = {
  title: "Módulos/Login/CustomImput",
  component: CustomImput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ background: "#0f172a", padding: 32, borderRadius: 16, width: 320 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CustomImput>;

export const TextoVacio: Story = {
  name: "Campo de texto vacío",
  args: { label: "Correo electrónico", placeholder: "usuario@empresa.com", type: "text", value: "", onChangeText: () => {} },
};

export const ConValor: Story = {
  name: "Campo con valor",
  args: { label: "Correo electrónico", placeholder: "usuario@empresa.com", type: "text", value: "admin@sanitek.mx", onChangeText: () => {} },
};

export const TipoPassword: Story = {
  name: "Campo de contraseña",
  args: { label: "Contraseña", placeholder: "••••••••", type: "password", value: "mipassword", onChangeText: () => {} },
};
