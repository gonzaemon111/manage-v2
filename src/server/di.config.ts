import { BindingScopeEnum, Container } from 'inversify';
import {
  UserRepository,
  DomainRepository,
  SubscriptionRepository,
  DomainService,
  DomainController,
  SubscriptionService,
  SubscriptionController
} from './di.interface';
import { TYPES } from './di.types';
import { UserRepositoryImpl, DomainRepositoryImpl, SubscriptionRepositoryImpl } from './infrastructure/repository';

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
container.bind<SubscriptionRepository>(TYPES.SubscriptionRepository).to(SubscriptionRepositoryImpl);

/**
 * Service
 */
container.bind<DomainService>(TYPES.DomainService).to(DomainService);
container.bind<SubscriptionService>(TYPES.SubscriptionService).to(SubscriptionService);

/**
 * Controller
 */
container.bind<DomainController>(TYPES.DomainController).to(DomainController);
container.bind<SubscriptionController>(TYPES.SubscriptionController).to(SubscriptionController);

export { container };
