import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilterTab } from "./FilterTab";
import { Users, Shield, UserCheck, UserX } from "lucide-react";

const meta: Meta<typeof FilterTab> = {
  title: "Módulos/Gestión Usuarios/FilterTab",
  component: FilterTab,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof FilterTab>;

export const Inactivo: Story = {
  name: "Estado Inactivo",
  render: () => <FilterTab label="Todos" icon={<Users size={14} />} active={false} />,
};

export const Activo: Story = {
  name: "Estado Activo",
  render: () => <FilterTab label="Administradores" icon={<Shield size={14} />} active={true} />,
};

export const UsuariosActivos: Story = {
  name: "Filtro Activos",
  render: () => <FilterTab label="Activos" icon={<UserCheck size={14} />} active={false} />,
};

export const UsuariosInactivos: Story = {
  name: "Filtro Inactivos",
  render: () => <FilterTab label="Inactivos" icon={<UserX size={14} />} active={false} />,
};
