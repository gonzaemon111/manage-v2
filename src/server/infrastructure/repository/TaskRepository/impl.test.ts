import { CreateParams } from "@/server/domain/Task";
import { Success } from "@/server/shared/Result";
import { TaskClient } from "../../lib";
import { mockUserRepository } from "../UserRepository/mock";
import { TaskRepositoryImpl } from "./Impl";

const task = {
  id: 1,
  name: "タスク１",
  memo: "メモ",
  deadline: "2023/08/01",
  finished_at: "2023/08/01",
};

const expectedTask = {
  id: 1,
  name: "タスク１",
  memo: "メモ",
  deadline: "2023/08/01",
  finishedAt: "2023/08/01",
};

interface UpdateParams {
  readonly name?: string;
  readonly memo?: string;
  readonly deadline?: string;
  readonly finished_at?: string;
}

jest.mock("../../lib/TaskClient");

const MockClient = TaskClient as jest.Mock;

MockClient.mockImplementation(() => {
  return {
    getTasks: (token: string) => {
      return Promise.resolve(
        new Success({
          tasks: [task],
        })
      );
    },
    getDetail: (id: number, token: string) => {
      return Promise.resolve(new Success(task));
    },
    create: (params: CreateParams, token: string) => {
      return Promise.resolve(
        new Success({
          id: 1,
          name: params.name,
          memo: params.memo,
          deadline: params.deadline,
          finished_at: params.finished_at,
        })
      );
    },
    update: (params: UpdateParams, taskId: number, token: string) => {
      return Promise.resolve(
        new Success({
          id: taskId,
          name: params.name,
          memo: params.memo,
          deadline: params.deadline,
          finished_at: params.finished_at,
        })
      );
    },
    delete: (taskId: number, token: string) => {
      return Promise.resolve(new Success(task));
    },
  };
});

describe("TaskRepositoryImpl", () => {
  const target = new TaskRepositoryImpl(new MockClient(), mockUserRepository);

  describe("#get", () => {
    test("正常系", async () => {
      const result = await target.get();
      expect(MockClient).toHaveBeenCalled();
      expect(result.tasks).toEqual([expectedTask]);
    });
  });

  describe("#find", () => {
    test("正常系", async () => {
      const result = await target.find({ id: 1 });
      expect(MockClient).toHaveBeenCalled();
      expect(result).toEqual(expectedTask);
    });
  });

  describe("#create", () => {
    test("正常系", async () => {
      const result = await target.create({
        name: "タスク１",
        memo: "メモ",
        deadline: "2023/08/01",
        finished_at: "2023/08/01",
      });
      expect(MockClient).toHaveBeenCalled();
      expect(result).toEqual(expectedTask);
    });
  });

  describe("#update", () => {
    test("正常系", async () => {
      const result = await target.update({
        id: 1,
        name: "更新",
        memo: "メモ",
        deadline: "2023/08/01",
        finished_at: "2023/08/01",
      });
      expect(MockClient).toHaveBeenCalled();
      expect(result).toEqual({
        ...expectedTask,
        name: "更新",
      });
    });
  });

  describe("#delete", () => {
    test("正常系", async () => {
      const result = await target.delete({ id: 1 });
      expect(MockClient).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
