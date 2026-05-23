import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { SidebarAlcaldias } from "./SidebarAlcaldias";
import { useRiskStore } from "@/store/useRiskStore";

const meta: Meta<typeof SidebarAlcaldias> = {
  title: "Módulos/Risk Map/SidebarAlcaldias",
  component: SidebarAlcaldias,
  parameters: { layout: "padded" },
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

function WithSelectedAlcaldia({ name, children }: { name: string | null; children: React.ReactNode }) {
  const setSelectedAlcaldia = useRiskStore((s) => s.setSelectedAlcaldia);
  useEffect(() => {
    setSelectedAlcaldia(name);
    return () => setSelectedAlcaldia(null);
  }, [name, setSelectedAlcaldia]);
  return <>{children}</>;
}

export const SinSeleccion: Story = {
  name: "Sin alcaldía seleccionada",
};

export const ConAlcaldiaSeleccionada: Story = {
  name: "Iztapalapa seleccionada",
  decorators: [
    (Story) => (
      <WithSelectedAlcaldia name="Iztapalapa">
        <Story />
      </WithSelectedAlcaldia>
    ),
  ],
};

export const ConAlcaldiaSegura: Story = {
  name: "Coyoacán seleccionada",
  decorators: [
    (Story) => (
      <WithSelectedAlcaldia name="Coyoacán">
        <Story />
      </WithSelectedAlcaldia>
    ),
  ],
};
