import { TaskForm } from ".";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  title: "Organisms/Task/Form",
  component: TaskForm,
} satisfies Meta<typeof TaskForm>;

export default meta;

type Story = StoryObj<typeof TaskForm>;

export const Default: Story = {
  args: {},
};
