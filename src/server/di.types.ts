export const TYPES = {
  // Repository
  UserRepository: Symbol('UserRepository'),
  DomainRepository: Symbol('DomainRepository'),
  SubscriptionRepository: Symbol('SubscriptionRepository'),

  // Service
  TaskService: Symbol('TaskService'),
  DomainService: Symbol('DomainService'),
  SubscriptionService: Symbol('SubscriptionService'),

  // Controller
  TaskController: Symbol('TaskController'),
  DomainController: Symbol('DomainController'),
  SubscriptionController: Symbol('SubscriptionController')
};
