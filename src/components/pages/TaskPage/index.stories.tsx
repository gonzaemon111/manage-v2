import { TaskListPage } from ".";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  title: "Pages/Task/List",
  component: TaskListPage,
} satisfies Meta<typeof TaskListPage>;

export default meta;

type Story = StoryObj<typeof TaskListPage>;

const tasks = [
  {
    id: 1,
    name: "タスク１",
    finishedAt: "",
    deadline: "2023/12/31",
    memo: "メモ",
  },
  {
    id: 2,
    name: "タスク２",
    finishedAt: "2023/09/12",
    deadline: "2023/10/31",
    memo: "メモ",
  },
];

export const Default: Story = {
  args: {
    tasks,
  },
};
