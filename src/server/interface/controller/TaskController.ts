import "reflect-metadata";
import { TaskService } from "@/server/di.interface";
import { TYPES } from "@/server/di.types";
import { inject, injectable } from "inversify";

@injectable()
export class TaskController {
  constructor(
    @inject(TYPES.TaskService) private readonly service: TaskService
  ) {}

  /**
   * getLists
   */
  public async getList() {
    return await this.service.getList();
  }
}
