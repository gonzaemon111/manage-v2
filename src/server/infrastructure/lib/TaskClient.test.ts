import { TaskClient } from "./TaskClient";
import { Success, Failure } from "@/server/shared/Result";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

interface Task {
  readonly id: number;
  readonly name: string;
  readonly memo: string;
  readonly deadline: string;
  readonly finished_at: string;
}

type CreateParams = Omit<Task, "id">;

interface UpdateParams {
  readonly name?: string;
  readonly memo?: string;
  readonly deadline?: string;
  readonly finished_at?: string;
}

interface GetTasksResponse {
  readonly tasks: Array<Task>;
}

// テスト用のデータ
const token = "test-token";

describe("TaskClient", () => {
  let target: TaskClient;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    // axios をモックする
    mockAxios = new MockAdapter(axios);
    target = new TaskClient();
  });

  afterEach(() => {
    // モックをクリアする
    mockAxios.reset();
  });

  describe("#getTasks", () => {
    it("正常系", async () => {
      const response: GetTasksResponse = {
        tasks: [
          {
            id: 1,
            name: "Task 1",
            memo: "Memo 1",
            deadline: "2023-01-01",
            finished_at: "2023-01-01",
          },
        ],
      };

      // モックの動作を定義
      mockAxios
        .onGet(`${process.env.LAGRING_BASE_URL}/api/tasks/`)
        .reply(200, response);

      const result = await target.getTasks(token);
      expect(result).toEqual(new Success(response));
    });

    it("異常系", async () => {
      // モックの動作を定義
      mockAxios
        .onGet(`${process.env.LAGRING_BASE_URL}/api/tasks/`)
        .replyOnce(500, { error: "Internal Server Error" });

      const result = await target.getTasks(token);
      expect(result).toEqual(
        new Failure({
          status: 500,
          data: { error: "Internal Server Error" },
          message: "Request failed with status code 500",
        })
      );
    });
  });

  describe("#getDetail", () => {
    it("正常系", async () => {
      const task = {
        id: 1,
        name: "Task 1",
        memo: "Memo 1",
        deadline: "2023-01-01",
        finished_at: "2023-01-01",
      };
      // モックの動作を定義
      mockAxios
        .onGet(`${process.env.LAGRING_BASE_URL}/api/tasks/1`)
        .reply(200, task);

      const result = await target.getDetail(1, token);
      expect(result).toEqual(new Success(task));
    });

    it("異常系", async () => {
      // モックの動作を定義
      mockAxios
        .onGet(`${process.env.LAGRING_BASE_URL}/api/tasks/1`)
        .replyOnce(500, { error: "Internal Server Error" });

      const result = await target.getDetail(1, token);
      expect(result).toEqual(
        new Failure({
          status: 500,
          data: { error: "Internal Server Error" },
          message: "Request failed with status code 500",
        })
      );
    });
  });

  describe("#create", () => {
    const params: CreateParams = {
      name: "タスク１",
      memo: "メモ",
      deadline: "2025/10/01 10:00",
      finished_at: "2023/10/12 09:59",
    };

    it("正常系", async () => {
      const response = {
        id: 1,
        name: "タスク１",
        memo: "メモ",
        deadline: "2025/10/01 10:00",
        finished_at: "2023/10/12 09:59",
      };

      // モックの動作を定義
      mockAxios
        .onPost(`${process.env.LAGRING_BASE_URL}/api/tasks/`)
        .reply(201, response);

      const result = await target.create(params, token);
      expect(result).toEqual(new Success(response));
    });

    it("異常系", async () => {
      // モックの動作を定義
      mockAxios
        .onPost(`${process.env.LAGRING_BASE_URL}/api/tasks/`)
        .replyOnce(500, { error: "Internal Server Error" });

      const result = await target.create(params, token);
      expect(result).toEqual(
        new Failure({
          status: 500,
          data: { error: "Internal Server Error" },
          message: "Request failed with status code 500",
        })
      );
    });
  });

  describe("#update", () => {
    const params: UpdateParams = {
      memo: "メモ",
    };

    it("正常系", async () => {
      const response = {
        id: 1,
        name: "タスク１",
        memo: "メモ",
        deadline: "2025/10/01 10:00",
        finished_at: "2023/10/12 09:59",
      };

      // モックの動作を定義
      mockAxios
        .onPatch(`${process.env.LAGRING_BASE_URL}/api/tasks/1`)
        .reply(200, response);

      const result = await target.update(params, 1, token);
      expect(result).toEqual(new Success(response));
    });

    it("異常系", async () => {
      // モックの動作を定義
      mockAxios
        .onPatch(`${process.env.LAGRING_BASE_URL}/api/tasks/1`)
        .replyOnce(500, { error: "Internal Server Error" });

      const result = await target.update(params, 1, token);
      expect(result).toEqual(
        new Failure({
          status: 500,
          data: { error: "Internal Server Error" },
          message: "Request failed with status code 500",
        })
      );
    });
  });

  describe("#delete", () => {
    it("正常系", async () => {
      const response = {
        id: 1,
        name: "タスク１",
        memo: "メモ",
        deadline: "2025/10/01 10:00",
        finished_at: "2023/10/12 09:59",
      };

      // モックの動作を定義
      mockAxios
        .onDelete(`${process.env.LAGRING_BASE_URL}/api/tasks/1`)
        .reply(200, response);

      const result = await target.delete(1, token);
      expect(result).toEqual(new Success(response));
    });

    it("異常系", async () => {
      // モックの動作を定義
      mockAxios
        .onDelete(`${process.env.LAGRING_BASE_URL}/api/tasks/1`)
        .replyOnce(500, { error: "Internal Server Error" });

      const result = await target.delete(1, token);
      expect(result).toEqual(
        new Failure({
          status: 500,
          data: { error: "Internal Server Error" },
          message: "Request failed with status code 500",
        })
      );
    });
  });
});
