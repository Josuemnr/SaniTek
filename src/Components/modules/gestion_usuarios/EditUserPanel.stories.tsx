import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditUserPanel } from "./EditUserPanel";
import type { User } from "./UserRow";

const meta: Meta<typeof EditUserPanel> = {
  title: "Módulos/Gestión Usuarios/EditUserPanel",
  component: EditUserPanel,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof EditUserPanel>;

const BASE_USER: User = {
  id: 1,
  name: "Ana Martínez",
  email: "ana.martinez@sanitek.mx",
  role: "Administrador",
  status: "Activo",
  lastAccessLabel: "Hace 2 horas",
  lastAccessDate: "19 abr. 2026, 10:30",
  avatarColor: "#3b82f6",
};

export const RolAdministrador: Story = {
  name: "Panel — Rol Administrador",
  args: { user: BASE_USER, onClose: () => {} },
};

export const RolGerente: Story = {
  name: "Panel — Rol Gerente",
  args: {
    user: {
      ...BASE_USER,
      id: 2,
      name: "Carlos Vega",
      email: "carlos.vega@sanitek.mx",
      role: "Gerente",
      avatarColor: "#10b981",
    },
    onClose: () => {},
  },
};

export const RolDirector: Story = {
  name: "Panel — Rol Director",
  args: {
    user: {
      ...BASE_USER,
      id: 3,
      name: "Lucía Torres",
      email: "lucia.torres@sanitek.mx",
      role: "Director",
      avatarColor: "#8b5cf6",
    },
    onClose: () => {},
  },
};

export const SinUsuario: Story = {
  name: "Sin usuario seleccionado (null)",
  args: { user: null, onClose: () => {} },
};
