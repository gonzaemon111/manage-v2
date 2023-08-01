import { TaskListPage } from "@/components/pages/TaskPage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOption";
import { container } from "@/server/di.config";
import { TYPES } from "@/server/di.types";
import { Task, TaskController } from "@/server/di.interface";

const controller = container.get<TaskController>(TYPES.TaskController);

async function fetchTasks(): Promise<{ tasks: ReadonlyArray<Task> }> {
  return await controller.getList();
}

export const metadata = {
  title: "タスク一覧 - Manage",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Page() {
  const { tasks } = await fetchTasks();
  const session = await getServerSession(authOptions);
  console.log("ServerSession");
  console.log(session);
  return <TaskListPage tasks={tasks} />;
}
