import { Link } from ".";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  title: "Atoms/Link",
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: "/",
    children: "リンク",
  },
};
