export interface Task {
  readonly id: number;
  readonly name: string;
  readonly memo?: string;
  readonly deadline?: string;
  readonly finishedAt?: string;
}

interface ListResponse {
  readonly tasks: ReadonlyArray<Task>;
}

export interface CreateParams {
  readonly name: string;
  readonly memo?: string;
  readonly deadline?: string;
  readonly finished_at?: string;
}

export interface UpdateParams {
  readonly id: number;
  readonly name?: string;
  readonly memo?: string;
  readonly deadline?: string;
  readonly finished_at?: string;
}

export interface DeleteParams {
  readonly id: number;
}

export interface TaskRepository {
  get(): Promise<ListResponse>;
  find({ id }: { readonly id: number }): Promise<Readonly<Task> | null>;
  create(params: CreateParams): Promise<Readonly<Task> | null>;
  update(params: UpdateParams): Promise<Readonly<Task> | null>;
  delete(params: DeleteParams): Promise<void>;
}
