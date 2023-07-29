import "reflect-metadata";
import { type TaskService } from "@/server/di.interface";
import { TYPES } from "@/server/di.types";
import { inject, injectable } from "inversify";
import { TaskController } from "./interface";

@injectable()
export class TaskControllerImpl implements TaskController {
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
