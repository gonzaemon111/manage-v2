import { TopPage } from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/TopPage",
  component: TopPage,
} satisfies Meta<typeof TopPage>;

export default meta;

type Story = StoryObj<typeof TopPage>;

export const Default: Story = {
  args: {},
};
