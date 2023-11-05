import { injectable } from 'inversify';
import { CreateParams, DomainRepository, FindParams, GetParams, UpdateParams } from '@/server/domain/Domain';
import { InternalServerError, NotFoundError } from '@/server/domain/Errors';
import { logger } from '@/server/shared/Logger';
import { Failure, Success } from '@/server/shared/Result';
import { prisma } from '../../lib/PrismaClient';

@injectable()
export class DomainRepositoryImpl implements DomainRepository {
  private readonly prismaClient;

  constructor() {
    this.prismaClient = prisma;
  }

  async get(params: GetParams) {
    try {
      const domains = await this.prismaClient.domain.findMany({
        where: { userId: { equals: params.userId } }
      });

      return new Success(domains);
    } catch (error) {
      logger.error(error);
      return new Failure(new InternalServerError(`ドメイン取得でエラーが発生しました ${error}`));
    }
  }

  async find({ id }: FindParams) {
    try {
      const domain = await this.prismaClient.domain.findFirst({
        where: { id: { equals: id } }
      });

      if (domain === null) {
        return new Failure(new NotFoundError(`ドメインが存在しません domainId = ${id}`));
      }

      return new Success(domain);
    } catch (error) {
      logger.error(error);
      return new Failure(new InternalServerError(`ドメイン取得でエラーが発生しました ${error}`));
    }
  }

  async create(data: CreateParams) {
    try {
      const domain = await this.prismaClient.domain.create({ data });
      return new Success(domain);
    } catch (error) {
      logger.error(error);
      return new Failure(new InternalServerError(`ドメイン作成でエラーが発生しました ${error}`));
    }
  }

  async update({ id, data }: UpdateParams) {
    try {
      const domain = await this.prismaClient.domain.update({
        where: { id },
        data
      });
      return new Success(domain);
    } catch (error) {
      logger.error(error);
      return new Failure(new InternalServerError(`ドメイン更新でエラーが発生しました ${error}`));
    }
  }

  async destroy(id: number) {
    try {
      const domain = await this.prismaClient.domain.delete({
        where: { id }
      });
      return new Success(domain);
    } catch (error) {
      logger.error(error);
      return new Failure(new InternalServerError(`ドメイン削除でエラーが発生しました ${error}`));
    }
  }
}
