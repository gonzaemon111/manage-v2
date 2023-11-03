import { injectable } from "inversify";
import { DomainRepository, GetParams } from "@/server/domain/Domain";
import { InternalServerError } from "@/server/domain/Errors/InternalServerError";
import { logger } from "@/server/shared/Logger";
import { Failure, Success } from "@/server/shared/Result";
import { prisma } from "../../lib/PrismaClient";

@injectable()
export class DomainRepositoryImpl implements DomainRepository {
  private readonly prismaClient;

  constructor() {
    this.prismaClient = prisma;
  }

  async get(params: GetParams) {
    try {
      const domains = await this.prismaClient.domain.findMany({
        where: { userId: { equals: params.userId } },
      });

      return new Success(domains);
    } catch (error) {
      logger.error(error);
      return new Failure(
        new InternalServerError(`ドメイン取得でエラーが発生しました ${error}`)
      );
    }
  }
}
