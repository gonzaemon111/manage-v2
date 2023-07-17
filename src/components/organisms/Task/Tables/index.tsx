import { Link } from "@/components/atoms/Link";

interface Task {
  readonly id: number;
  readonly name: string;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly finishedAt?: number;
  readonly memo?: string;
}

interface Props {
  readonly tasks: ReadonlyArray<Task>;
}

export function TaskTable({ tasks }: Props) {
  return (
    <div className="relative overflow-x-auto shadow-md">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-slate-800">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              タスク名
            </th>
            <th scope="col" className="px-6 py-3">
              終了日時
            </th>
            <th scope="col" className="px-6 py-3">
              更新日時
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {task.finishedAt !== undefined ? "✅" : null}
                </th>
                <td className="px-6 py-4">
                  <Link href={`/tasks/${task.id}`}>{task.name}</Link>
                </td>
                <td className="px-6 py-4">
                  {task.finishedAt !== undefined ? task.finishedAt : null}
                </td>
                <td className="px-6 py-4">{task.updatedAt}</td>
                <td className="px-6 py-4">
                  <Link href={`/tasks/${task.id}/edit`}>編集</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
