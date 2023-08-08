import type { Meta, StoryObj } from "@storybook/react";

import { Sidebar } from ".";

const meta = {
  title: "Organisms/Sidebar",
  component: Sidebar,
  args: {
    sidebarOpen: true,
  },
  argTypes: {
    sidebarOpen: {
      variant: {
        control: {
          type: "inline-radio",
        },
        options: [true, false],
      },
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {},
};

export const SidebarClose: Story = {
  args: {
    sidebarOpen: false,
  },
};
SidebarClose.storyName = "サイドバーが閉じている";
