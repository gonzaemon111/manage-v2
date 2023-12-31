import { Panel } from ".";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  title: "Atoms/Panel",
  component: Panel,
} satisfies Meta<typeof Panel>;

export default meta;

type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  args: {
    children: <p>テキスト</p>,
  },
};
