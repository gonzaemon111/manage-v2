import { PlusIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Panel } from "@/components/atoms/Panel";
import { TaskTable } from "@/components/organisms/Task/Tables";
import { Task } from "@/server/di.interface";

interface Props {
  readonly tasks: ReadonlyArray<Task>;
}

export function TaskListPage({ tasks }: Props) {
  return (
    <>
      <Panel>
        <h1 className="text-2xl">タスク</h1>
      </Panel>
      <Container>
        <Panel>
          <div className="text-right">
            <LinkButton
              href="/tasks/new"
              name="新規作成"
              icon={<PlusIcon className="h-4 w-4" />}
            />
          </div>
          <TaskTable tasks={tasks} />
        </Panel>
      </Container>
    </>
  );
}
