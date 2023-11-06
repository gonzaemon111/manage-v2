import { BindingScopeEnum, Container } from 'inversify';
import { UserRepository, DomainRepository, DomainService, DomainController } from './di.interface';
import { TYPES } from './di.types';
import { UserRepositoryImpl, DomainRepositoryImpl } from './infrastructure/repository';

/**
 * DIコンテナを作成
 */
const container = new Container({
  autoBindInjectable: true,
  defaultScope: BindingScopeEnum.Singleton
});

/**
 * Library
 */

/**
 * Repository
 */
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<DomainRepository>(TYPES.DomainRepository).to(DomainRepositoryImpl);

/**
 * Service
 */
container.bind<DomainService>(TYPES.DomainService).to(DomainService);

/**
 * Controller
 */
container.bind<DomainController>(TYPES.DomainController).to(DomainController);

export { container };
