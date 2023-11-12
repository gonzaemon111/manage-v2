import { injectable } from 'inversify';
import { InternalServerError, NotFoundError } from '@/server/domain/Errors';
import {
  CreateParams,
  SubscriptionRepository,
  FindParams,
  GetParams,
  UpdateParams
} from '@/server/domain/Subscription';
import { logger } from '@/server/shared/Logger';
import { Failure, Success } from '@/server/shared/Result';
import { prisma } from '../../lib/PrismaClient';

@injectable()
export class SubscriptionRepositoryImpl implements SubscriptionRepository {
  private readonly prismaClient;

  constructor() {
    this.prismaClient = prisma;
  }

  async get(params: GetParams) {
    try {
      const domains = await this.prismaClient.subscription.findMany({
        where: { userId: { equals: params.userId } }
      });

      return new Success(domains);
    } catch (error) {
      logger.error(error);
      return new Failure(new InternalServerError(`サブスクリプション取得でエラーが発生しました ${error}`));
    }
  }

  async find({ id }: FindParams) {
    try {
      const domain = await this.prismaClient.subscription.findFirst({
        where: { id: { equals: id } }
      });

      if (domain === null) {
        return new Failure(new NotFoundError(`サブスクリプションが存在しません subscriptionId = ${id}`));
      }

      return new Success(domain);
    } catch (error) {
      logger.error(error);
      return new Failure(new InternalServerError(`サブスクリプション取得でエラーが発生しました ${error}`));
    }
  }

  async create(data: CreateParams) {
    try {
      const domain = await this.prismaClient.subscription.create({ data });
      return new Success(domain);
    } catch (error) {
      logger.error(error);
      return new Failure(new InternalServerError(`サブスクリプション作成でエラーが発生しました ${error}`));
    }
  }

  async update({ id, data }: UpdateParams) {
    try {
      const domain = await this.prismaClient.subscription.update({
        where: { id },
        data
      });
      return new Success(domain);
    } catch (error) {
      logger.error(error);
      return new Failure(new InternalServerError(`サブスクリプション更新でエラーが発生しました ${error}`));
    }
  }

  async destroy(id: number) {
    try {
      const domain = await this.prismaClient.subscription.delete({
        where: { id }
      });
      return new Success(domain);
    } catch (error) {
      logger.error(error);
      return new Failure(new InternalServerError(`サブスクリプション削除でエラーが発生しました ${error}`));
    }
  }
}
