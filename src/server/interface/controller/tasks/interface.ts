import { Task } from "@/server/domain/Task";

interface TaskListResponse {
  readonly tasks: ReadonlyArray<Readonly<Task>>;
}

export interface TaskController {
  getList(): Promise<TaskListResponse>;
}
