import { Header } from ".";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  title: "Organisms/Header",
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};
