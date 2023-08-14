import { inject, injectable } from "inversify";
import { TYPES } from "@/server/di.types";
import { TaskRepository } from "@/server/domain/Task";
import type { TaskClient } from "../../lib";
import type {
  CreateParams,
  DeleteParams,
  UpdateParams,
  UserRepository,
} from "@/server/di.interface";

interface GetParams {
  readonly id: number;
}

interface ResponseTaskFormat {
  readonly id: number;
  readonly name: string;
  readonly memo?: string;
  readonly deadline?: string;
  readonly finished_at?: string;
}

@injectable()
export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @inject(TYPES.TaskClient)
    private readonly client: TaskClient,
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public async get() {
    const user = await this.userRepository.findOrCreateUser();
    const result = await this.client.getTasks(user.token);
    if (!result.isSuccess) {
      return { tasks: [] };
    }

    return {
      tasks: result.value.tasks.map((task) => this.formatTask(task)),
    };
  }

  public async find({ id }: GetParams) {
    const user = await this.userRepository.findOrCreateUser();
    const result = await this.client.getDetail(id, user.token);

    if (!result.isSuccess) {
      return null;
    }

    return this.formatTask(result.value);
  }

  public async create(params: CreateParams) {
    const user = await this.userRepository.findOrCreateUser();
    const result = await this.client.create(params, user.token);

    if (!result.isSuccess) {
      return null;
    }

    return this.formatTask(result.value);
  }

  public async update(params: UpdateParams) {
    const user = await this.userRepository.findOrCreateUser();
    const result = await this.client.update(params, params.id, user.token);

    if (result.isFailure) {
      return null;
    }

    return this.formatTask(result.value);
  }

  public async delete(params: DeleteParams) {
    const user = await this.userRepository.findOrCreateUser();
    const result = await this.client.delete(params.id, user.token);

    if (result.isFailure) {
      throw new Error(result.value.message);
    }
  }

  private formatTask(object: ResponseTaskFormat) {
    return {
      id: object.id,
      name: object.name,
      memo: object.memo,
      deadline: object.deadline,
      finishedAt: object.finished_at,
    };
  }
}
