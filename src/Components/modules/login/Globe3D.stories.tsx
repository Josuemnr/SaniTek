import type { Meta, StoryObj } from "@storybook/react-vite";
import { Globe3D } from "./Globe3D";

const meta: Meta<typeof Globe3D> = {
  title: "Módulos/Login/Globe3D",
  component: Globe3D,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Globe3D>;

export const Default: Story = {
  name: "Globo 3D animado",
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
