import { TaskControllerImpl } from "./impl";
import { TaskService } from "@/server/di.interface";

const tasks = [
  {
    id: 1,
    name: "タスク名",
    memo: "メモ",
    deadline: "",
    finishedAt: "",
  },
];

class MockService implements TaskService {
  public async getList() {
    return await { tasks };
  }
}

describe("TaskControllerImpl", () => {
  const target = new TaskControllerImpl(new MockService());

  describe("#getList", () => {
    it("TaskListResponse型のオブジェクトが返ってくる", async () => {
      expect(await target.getList()).toEqual({ tasks });
    });
  });
});
