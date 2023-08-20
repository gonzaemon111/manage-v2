import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { MenuPanel } from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Organisms/MenuPanel",
  component: MenuPanel,
} satisfies Meta<typeof MenuPanel>;

export default meta;

type Story = StoryObj<typeof MenuPanel>;

export const Default: Story = {
  args: {
    menu: {
      name: "タスク",
      href: "/tasks",
      icon: <ShieldCheckIcon className="h-16 w-16 mx-auto" />,
    },
  },
};
