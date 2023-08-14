import { TaskService } from "@/server/di.interface";
import { CreateParams, UpdateParams } from "@/server/domain/Task";
import { TaskControllerImpl } from "./impl";

const task = {
  id: 1,
  name: "タスク名",
  memo: "メモ",
  deadline: "",
  finishedAt: "",
};

const tasks = [task];

class MockService implements TaskService {
  async get() {
    return Promise.resolve({ tasks });
  }
  async find(id: number) {
    return Promise.resolve(task);
  }
  async create(params: CreateParams) {
    return Promise.resolve(task);
  }
  async update(params: UpdateParams) {
    return Promise.resolve(task);
  }
  async delete(id: number) {
    return Promise.resolve(undefined);
  }
}

describe("TaskControllerImpl", () => {
  const target = new TaskControllerImpl(new MockService());

  describe("#get", () => {
    it("TaskListResponse型のオブジェクトが返ってくる", async () => {
      expect(await target.get()).toEqual({ tasks });
    });
  });

  describe("#find", () => {
    it("Task型のオブジェクトが返ってくる", async () => {
      expect(await target.find(1)).toEqual(task);
    });
  });

  describe("#delete", () => {
    it("undefinedが返ってくる", async () => {
      expect(await target.delete(1)).toEqual(undefined);
    });
  });
});
