import { Container } from "@/components/atoms/Container";
import { Panel } from "@/components/atoms/Panel";
import { TaskTable } from "@/components/organisms/Task/Tables";

const tasks = [
  {
    id: 1,
    name: "Alexに寝室の明かりを連携させる",
    memo: "",
    deadline: "",
  },
];

export function TopPage() {
  return (
    <>
      <Panel>
        <h1 className="text-2xl">タスク</h1>
      </Panel>
      <Container>
        <Panel>
          <TaskTable tasks={tasks} />
        </Panel>
      </Container>
    </>
  );
}
