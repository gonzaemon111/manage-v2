import { TaskNewPage } from "./new";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/Task/New",
  component: TaskNewPage,
} satisfies Meta<typeof TaskNewPage>;

export default meta;

type Story = StoryObj<typeof TaskNewPage>;

export const Default: Story = {
  args: {},
};
