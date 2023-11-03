import { BindingScopeEnum, Container } from "inversify";

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

/**
 * Repository
 */

/**
 * Service
 */

/**
 * Controller
 */

export { container };
