import { TaskRepository, TaskServiceImpl } from "@/server/di.interface";

const task1 = {
  id: 1,
  name: "タスク１",
  memo: "メモ",
  deadline: "2023/08/01",
  finishedAt: "2023/08/01",
};

const task2 = {
  id: 2,
  name: "タスク２",
  memo: "メモ２",
  deadline: "2023/08/02",
  finishedAt: "2023/08/02",
};

const tasks = [task1, task2];

const mockRepository: TaskRepository = {
  get() {
    return Promise.resolve({ tasks });
  },
  find({ id }) {
    const task = tasks.find((el) => el.id === id);
    return Promise.resolve(task ?? null);
  },
  create(params) {
    return Promise.resolve(task1);
  },
  update(params) {
    return Promise.resolve(task1);
  },
  delete(params) {
    return Promise.resolve();
  },
};

describe("TaskServiceImpl", () => {
  const target = new TaskServiceImpl(mockRepository);

  test("#get", async () => {
    const results = await target.get();
    expect(results.tasks).toEqual(tasks);
  });

  test("#find", async () => {
    const results = await target.find(1);
    expect(results).toEqual(task1);
  });

  test("#create", async () => {
    const results = await target.create({ ...task1 });
    expect(results).toEqual(task1);
  });

  test("#update", async () => {
    const results = await target.update({ ...task1 });
    expect(results).toEqual(task1);
  });

  test("#delete", async () => {
    const results = await target.delete(1);
    expect(results).toEqual(undefined);
  });
});
