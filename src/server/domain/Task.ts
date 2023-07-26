import { User } from "./User";

export interface Task {
  readonly id: number;
  readonly name: string;
  readonly memo: string;
  readonly deadline: string;
  readonly finishedAt: string;
}

interface ListResponse {
  readonly tasks: ReadonlyArray<Task>;
}

export interface TaskRepository {
  getTasks(): Promise<ListResponse>;
  getTask({ id }: { readonly id: number }): Promise<Readonly<Task> | null>;
}
