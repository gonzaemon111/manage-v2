import { CreateParams, Task, UpdateParams } from "@/server/domain/Task";

interface TaskListResponse {
  readonly tasks: ReadonlyArray<Readonly<Task>>;
}

export interface TaskService {
  get(): Promise<TaskListResponse>;
  find(id: number): Promise<Readonly<Task>>;
  create(params: CreateParams): Promise<Task>;
  update(params: UpdateParams): Promise<Task>;
  delete(id: number): Promise<void>;
}
