import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaginationBar } from "./PaginationBar";

const meta: Meta<typeof PaginationBar> = {
  title: "Módulos/Gestión Usuarios/PaginationBar",
  component: PaginationBar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof PaginationBar>;

export const PrimeraPagina: Story = {
  name: "Primera página (anterior deshabilitado)",
  args: { current: 1, totalPages: 5, totalItems: 50, itemsPerPage: 10, onPageChange: () => {} },
};

export const PaginaIntermedia: Story = {
  name: "Página intermedia",
  args: { current: 3, totalPages: 5, totalItems: 50, itemsPerPage: 10, onPageChange: () => {} },
};

export const UltimaPagina: Story = {
  name: "Última página (siguiente deshabilitado)",
  args: { current: 5, totalPages: 5, totalItems: 50, itemsPerPage: 10, onPageChange: () => {} },
};

export const PaginaUnica: Story = {
  name: "Página única",
  args: { current: 1, totalPages: 1, totalItems: 8, itemsPerPage: 10, onPageChange: () => {} },
};
