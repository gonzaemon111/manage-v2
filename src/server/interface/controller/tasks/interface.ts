import { CreateParams, Task, UpdateParams } from "@/server/domain/Task";

interface TaskListResponse {
  readonly tasks: ReadonlyArray<Readonly<Task>>;
}

export interface TaskController {
  get(): Promise<TaskListResponse>;
  find(id: number): Promise<Readonly<Task>>;
  create(params: CreateParams): Promise<Readonly<Task>>;
  update(params: UpdateParams): Promise<Readonly<Task>>;
  delete(id: number): Promise<void>;
}
