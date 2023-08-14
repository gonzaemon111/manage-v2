import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  CreateParams,
  Task,
  UpdateParams,
  type TaskService,
} from "@/server/di.interface";
import { TYPES } from "@/server/di.types";
import { TaskController } from "./interface";

@injectable()
export class TaskControllerImpl implements TaskController {
  constructor(
    @inject(TYPES.TaskService) private readonly service: TaskService
  ) {}

  public async get() {
    return await this.service.get();
  }

  public async find(id: number): Promise<Readonly<Task>> {
    return await this.service.find(id);
  }

  public async create(params: CreateParams): Promise<Readonly<Task>> {
    return await this.service.create(params);
  }

  public async update(params: UpdateParams): Promise<Readonly<Task>> {
    return await this.service.update(params);
  }

  public async delete(id: number) {
    await this.service.delete(id);
  }
}
