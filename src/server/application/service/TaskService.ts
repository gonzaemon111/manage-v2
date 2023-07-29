import type { TaskRepository } from "@/server/di.interface";
import { TYPES } from "@/server/di.types";
import { inject, injectable } from "inversify";

@injectable()
export class TaskService {
  constructor(
    @inject(TYPES.TaskRepository) private readonly repository: TaskRepository
  ) {}

  /**
   * getList
   */
  public async getList() {
    return await this.repository.getTasks();
  }
}
