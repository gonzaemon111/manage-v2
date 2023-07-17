import type { Meta, StoryObj } from "@storybook/react";

import { DefaultLayout } from "./DefaultLayout";

const meta = {
  title: "DefaultLayout",
  component: DefaultLayout,
} satisfies Meta<typeof DefaultLayout>;

export default meta;

type Story = StoryObj<typeof DefaultLayout>;

export const Default: Story = {
  args: {},
};
