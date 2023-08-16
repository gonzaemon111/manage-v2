import { Panel } from "../Panel";
import { Container } from ".";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  title: "Atoms/Container",
  component: Container,
} satisfies Meta<typeof Container>;

export default meta;

const children = (
  <Panel>
    <h1>Header1</h1>
  </Panel>
);

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children,
  },
};
