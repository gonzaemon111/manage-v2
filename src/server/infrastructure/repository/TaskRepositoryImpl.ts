import { TYPES } from "@/server/di.types";
import { TaskRepository } from "@/server/domain/Task";
import { inject, injectable } from "inversify";
import { TaskClient } from "../lib";
import { UserRepositoryImpl } from "./UserRepositoryImpl";

interface GetParams {
  readonly id: number;
}

@injectable()
export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @inject(TYPES.TaskClient)
    private readonly client: TaskClient,
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepositoryImpl
  ) {}

  public async getTasks() {
    const user = await this.userRepository.findOrCreateUser();
    const result = await this.client.getTasks(user.token);
    if (!result.isSuccess) {
      return { tasks: [] };
    }

    return {
      tasks: result.value.tasks.map((task) => {
        return {
          ...task,
          finishedAt: task.finished_at,
        };
      }),
    };
  }

  /**
   * getTask
   */
  public async getTask({ id }: GetParams) {
    const user = await this.userRepository.findOrCreateUser();
    const result = await this.client.getDetail(id, user.token);

    if (!result.isSuccess) {
      return null;
    }

    return {
      id: result.value.id,
      name: result.value.name,
      memo: result.value.memo,
      deadline: result.value.deadline,
      finishedAt: result.value.finished_at,
    };
  }
}
