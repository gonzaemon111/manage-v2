import { Container } from "@/components/atoms/Container";
import { Panel } from "@/components/atoms/Panel";
import { TaskForm } from "@/components/organisms/Task/Form";

export function TaskNewPage() {
  return (
    <>
      <Panel>
        <h1 className="text-2xl">タスクの新規作成</h1>
      </Panel>
      <Container>
        <TaskForm />
      </Container>
    </>
  );
}
