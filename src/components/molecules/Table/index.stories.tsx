import { Table, Tbody, Td, Th, Thead, Tr } from ".";
import type { Meta, StoryObj } from "@storybook/react";

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

const component = (
  <>
    <Thead>
      <Tr>
        <Th scope="col" className="px-6 py-3"></Th>
        <Th scope="col" className="px-6 py-3">
          タスク名
        </Th>
        <Th scope="col" className="px-6 py-3">
          終了日時
        </Th>
        <Th scope="col" className="px-6 py-3">
          締切日時
        </Th>
        <Th scope="col" className="px-6 py-3"></Th>
      </Tr>
    </Thead>
    <Tbody>
      {tasks.map((task) => {
        return (
          <Tr className="bg-white dark:bg-gray-900" key={task.id}>
            <Th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {task.finishedAt !== undefined ? "✅" : null}
            </Th>
            <Td>{task.name}</Td>
            <Td>{task.finishedAt !== undefined ? task.finishedAt : null}</Td>
            <Td>{task.deadline}</Td>
            <Td>編集</Td>
          </Tr>
        );
      })}
    </Tbody>
  </>
);

const meta = {
  title: "Molecules/Table",
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    children: component,
  },
};
