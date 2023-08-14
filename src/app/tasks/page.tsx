import { getServerSession } from "next-auth/next";
import { TaskListPage } from "@/components/pages/TaskPage";
import { container } from "@/server/di.config";
import { Task, TaskController } from "@/server/di.interface";
import { TYPES } from "@/server/di.types";
import { authOptions } from "../api/auth/[...nextauth]/authOption";

const controller = container.get<TaskController>(TYPES.TaskController);

async function fetchTasks(): Promise<{ tasks: ReadonlyArray<Task> }> {
  return await controller.get();
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
