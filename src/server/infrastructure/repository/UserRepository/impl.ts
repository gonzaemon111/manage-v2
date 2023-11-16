import 'reflect-metadata';
import { injectable } from 'inversify';
import { InternalServerError } from '@/server/domain/Errors/InternalServerError';
import { NotFoundError } from '@/server/domain/Errors/NotFoundError';
import { FindParams, UserRepository } from '@/server/domain/User';
import { logger } from '@/server/shared/Logger';
import { Failure, Success } from '@/server/shared/Result';
import { prisma } from '../../lib/PrismaClient';

@injectable()
export class UserRepositoryImpl implements UserRepository {
  private readonly prismaClient;

  constructor() {
    this.prismaClient = prisma;
  }

  async find({ userId }: FindParams) {
    try {
      const user = await this.prismaClient.user.findFirst({
        where: { id: { equals: userId } }
      });

      if (user === null) {
        return new Failure(new NotFoundError(`ユーザーが存在しません userId = ${userId}`));
      }

      return new Success({
        ...user,
        image: user.image ?? undefined,
        accessToken: ''
      });
    } catch (error) {
      logger.error(error);
      return new Failure(new InternalServerError(`ユーザー取得でエラーが発生しました ${error}`));
    }
  }
}
