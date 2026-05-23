import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProfileCard } from "./ProfileCard";

const meta: Meta<typeof ProfileCard> = {
  title: "Módulos/Perfil Usuario/ProfileCard",
  component: ProfileCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ProfileCard>;

export const Default: Story = {
  name: "Perfil de usuario",
  args: {
    name: "Ana Martínez",
    email: "ana.martinez@sanitek.mx",
    onChangeImage: () => {},
  },
};

export const NombreLargo: Story = {
  name: "Nombre largo",
  args: {
    name: "María Guadalupe Hernández Rodríguez",
    email: "maria.guadalupe.hdz@sanitek.mx",
    onChangeImage: () => {},
  },
};
