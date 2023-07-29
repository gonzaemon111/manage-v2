import { BindingScopeEnum, Container } from "inversify";
import {
  TaskClient,
  UserClient,
  UserRepository,
  TaskRepository,
  TaskService,
} from "./di.interface";
import { TYPES } from "./di.types";
import { UserRepositoryImpl } from "./infrastructure/repository/UserRepositoryImpl";
import { TaskRepositoryImpl } from "./infrastructure/repository/TaskRepositoryImpl";
import { TaskController } from "./interface/controller";

/**
 * DIコンテナを作成
 */
const container = new Container({
  autoBindInjectable: true,
  defaultScope: BindingScopeEnum.Singleton,
});

/**
 * Library
 */
container.bind<UserClient>(TYPES.UserClient).toConstantValue(new UserClient());
container.bind<TaskClient>(TYPES.TaskClient).toConstantValue(new TaskClient());

/**
 * Repository
 */
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<TaskRepository>(TYPES.TaskRepository).to(TaskRepositoryImpl);

/**
 * Service
 */
container.bind<TaskService>(TYPES.TaskService).to(TaskService);

/**
 * Controller
 */
container.bind<TaskController>(TYPES.TaskController).to(TaskController);

export { container };
