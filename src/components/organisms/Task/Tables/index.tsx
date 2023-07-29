import { Link } from "@/components/atoms/Link";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/molecules/Table";

interface Task {
  readonly id: number;
  readonly name: string;
  readonly finishedAt: string;
  readonly deadline: string;
  readonly memo?: string;
}

interface Props {
  readonly tasks: ReadonlyArray<Task>;
}

export function TaskTable({ tasks }: Props) {
  return (
    <Table>
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
              <Td>
                <Link href={`/tasks/${task.id}`}>{task.name}</Link>
              </Td>
              <Td>{task.finishedAt !== undefined ? task.finishedAt : null}</Td>
              <Td>{task.deadline}</Td>
              <Td>
                <Link href={`/tasks/${task.id}/edit`}>編集</Link>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
