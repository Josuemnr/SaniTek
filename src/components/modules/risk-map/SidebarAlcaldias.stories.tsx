import type { Meta, StoryObj } from "@storybook/react-vite";
import { SidebarAlcaldias } from "./SidebarAlcaldias";

const meta: Meta<typeof SidebarAlcaldias> = {
  title: "Módulos/Risk Map/SidebarAlcaldias",
  component: SidebarAlcaldias,
  parameters: {
    layout: "padded",
    backgrounds: { default: "dark" },
  },
  tags: ["autodocs"],
  argTypes: { onNavigate: { action: "navigated" } },
  decorators: [
    (Story) => (
      <div style={{ height: 600 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SidebarAlcaldias>;

export const Default: Story = {
  name: "Lista de alcaldías",
};

export const SobreFondoClaro: Story = {
  name: "Sobre fondo claro",
  parameters: { backgrounds: { default: "white" } },
};
