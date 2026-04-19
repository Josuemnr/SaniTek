import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { TemporalControl } from "./TemporalControl";
import { useRiskStore } from "@/store/useRiskStore";

const meta: Meta<typeof TemporalControl> = {
  title: "Módulos/Risk Map/TemporalControl",
  component: TemporalControl,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof TemporalControl>;

function WithTime({ hours, children }: { hours: number; children: React.ReactNode }) {
  const setCurrentTime = useRiskStore((s) => s.setCurrentTime);
  useEffect(() => {
    const today = new Date();
    today.setHours(hours, 0, 0, 0);
    setCurrentTime(today.getTime());
  }, [hours, setCurrentTime]);
  return <>{children}</>;
}

export const Mediodia: Story = {
  name: "12:00 — Mediodía",
  decorators: [(Story) => <WithTime hours={12}><Story /></WithTime>],
};

export const Madrugada: Story = {
  name: "03:00 — Madrugada",
  decorators: [(Story) => <WithTime hours={3}><Story /></WithTime>],
};

export const HoraMaximaTrafico: Story = {
  name: "08:00 — Hora pico mañana",
  decorators: [(Story) => <WithTime hours={8}><Story /></WithTime>],
};

export const Noche: Story = {
  name: "22:00 — Noche",
  decorators: [(Story) => <WithTime hours={22}><Story /></WithTime>],
};
