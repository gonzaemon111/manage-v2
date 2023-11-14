import { injectable, inject } from 'inversify';
import { type SubscriptionService } from '@/server/di.interface';
import { TYPES } from '@/server/di.types';
import { FindParams, GetParams } from '@/server/domain/Subscription';

@injectable()
export class SubscriptionController {
  constructor(@inject(TYPES.SubscriptionService) private readonly service: SubscriptionService) {}

  async get({ userId }: GetParams) {
    return await this.service.get({ userId });
  }

  async find({ id }: FindParams) {
    return await this.service.find({ id });
  }
}
