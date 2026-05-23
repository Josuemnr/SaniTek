import type { Meta, StoryObj } from "@storybook/react-vite";
import { UserRow } from "./UserRow";
import type { User } from "./UserRow";

const meta: Meta<typeof UserRow> = {
  title: "Módulos/Gestión Usuarios/UserRow",
  component: UserRow,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <Story />
        </tbody>
      </table>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof UserRow>;

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

export const UsuarioActivo: Story = {
  name: "Usuario Activo — Administrador",
  args: { user: BASE_USER, onEdit: () => {} },
};

export const UsuarioInactivo: Story = {
  name: "Usuario Inactivo — Gerente",
  args: {
    user: {
      ...BASE_USER,
      id: 2,
      name: "Carlos Vega",
      email: "carlos.vega@sanitek.mx",
      role: "Gerente",
      status: "Inactivo",
      lastAccessLabel: "Hace 3 días",
      lastAccessDate: "16 abr. 2026, 08:00",
      avatarColor: "#10b981",
    },
    onEdit: () => {},
  },
};

export const RolDirector: Story = {
  name: "Usuario Activo — Director",
  args: {
    user: {
      ...BASE_USER,
      id: 3,
      name: "Lucía Torres",
      email: "lucia.torres@sanitek.mx",
      role: "Director",
      avatarColor: "#8b5cf6",
    },
    onEdit: () => {},
  },
};
