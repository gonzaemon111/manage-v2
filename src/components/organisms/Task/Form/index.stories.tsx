import type { Meta, StoryObj } from "@storybook/react";

import { TaskForm } from ".";

const meta = {
  title: "Organisms/Task/Form",
  component: TaskForm,
} satisfies Meta<typeof TaskForm>;

export default meta;

type Story = StoryObj<typeof TaskForm>;

export const Default: Story = {
  args: {},
};
