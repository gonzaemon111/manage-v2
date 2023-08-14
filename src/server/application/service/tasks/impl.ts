import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "@/server/di.types";
import { TaskService } from "./interface";
import type {
  CreateParams,
  TaskRepository,
  UpdateParams,
} from "@/server/di.interface";

@injectable()
export class TaskServiceImpl implements TaskService {
  constructor(
    @inject(TYPES.TaskRepository) private readonly repository: TaskRepository
  ) {}

  public async get() {
    return await this.repository.get();
  }

  public async find(id: number) {
    const task = await this.repository.find({ id });
    if (!task) {
      throw new Error("ありません");
    }
    return task;
  }

  public async create(params: CreateParams) {
    const task = await this.repository.create(params);
    if (task === null) {
      throw new Error("エラー");
    }

    return task;
  }

  public async update(params: UpdateParams) {
    const task = await this.repository.update(params);
    if (task === null) {
      throw new Error("エラー");
    }

    return task;
  }

  public async delete(id: number) {
    await this.repository.delete({ id });
  }
}
