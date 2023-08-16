import { Button } from ".";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  title: "Atoms/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    name: "新規作成",
  },
};
