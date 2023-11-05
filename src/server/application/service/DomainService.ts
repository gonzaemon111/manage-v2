import { inject, injectable } from 'inversify';
import { TYPES } from '@/server/di.types';
import { type DomainRepository, FindParams, GetParams } from '@/server/domain/Domain';

@injectable()
export class DomainService {
  constructor(@inject(TYPES.DomainRepository) private readonly repository: DomainRepository) {}

  async get({ userId }: GetParams) {
    return await this.repository.get({ userId });
  }

  async find({ id }: FindParams) {
    return await this.repository.find({ id });
  }
}
