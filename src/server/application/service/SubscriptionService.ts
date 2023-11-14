import { inject, injectable } from 'inversify';
import { TYPES } from '@/server/di.types';
import { type SubscriptionRepository, FindParams, GetParams } from '@/server/domain/Subscription';

@injectable()
export class SubscriptionService {
  constructor(@inject(TYPES.SubscriptionRepository) private readonly repository: SubscriptionRepository) {}

  async get({ userId }: GetParams) {
    return await this.repository.get({ userId });
  }

  async find({ id }: FindParams) {
    return await this.repository.find({ id });
  }
}
