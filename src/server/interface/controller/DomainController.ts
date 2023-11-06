import { injectable, inject } from 'inversify';
import { type DomainService } from '@/server/di.interface';
import { TYPES } from '@/server/di.types';
import { FindParams, GetParams } from '@/server/domain/Domain';

@injectable()
export class DomainController {
  constructor(@inject(TYPES.DomainService) private readonly service: DomainService) {}

  async get({ userId }: GetParams) {
    return await this.service.get({ userId });
  }

  async find({ id }: FindParams) {
    return await this.service.find({ id });
  }
}
