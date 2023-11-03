import { Domain } from "@/server/domain/Domain";
import { InternalServerError } from "@/server/domain/Errors/InternalServerError";
import { Failure, Success } from "@/server/shared/Result";
import { prismaMock } from "../../lib/__mocks__/PrismaClient.mock";
import { DomainRepositoryImpl } from "./impl";

describe("DomainRepositoryImpl", () => {
  let domainRepository: DomainRepositoryImpl;

  beforeEach(() => {
    domainRepository = new DomainRepositoryImpl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("#get", () => {
    describe("正常系", () => {
      test("should get domains successfully", async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.domain.findMany.mockResolvedValue([
          {
            id: 1,
            userId: "user1",
            name: "gonzaemon.dev",
            isCanceled: false,
            memo: "メモ",
            nextUpdatedAt: "",
            provider: "google domain",
            accountName: "engineer",
          },
        ]);

        const result = (await domainRepository.get({ userId: "1" })) as Success<
          Array<Domain>
        >;
        expect(result.isSuccess()).toEqual(true);
        expect(result.value).toEqual([
          {
            id: 1,
            userId: "user1",
            name: "gonzaemon.dev",
            isCanceled: false,
            memo: "メモ",
            nextUpdatedAt: "",
            provider: "google domain",
            accountName: "engineer",
          },
        ]);
      });
    });

    describe("異常系", () => {
      test("prismaがエラーをThrowした場合はFailureオブジェクトを返す", async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.domain.findMany.mockRejectedValue(
          new Error("Database Connection Error")
        );

        const result = (await domainRepository.get({
          userId: "1",
        })) as Failure<Error>;
        expect(result.isSuccess()).toEqual(false);
        expect(result.isFailure()).toEqual(true);
        expect(result.error).toEqual(
          new InternalServerError(
            "ドメイン取得でエラーが発生しました Error: Database Connection Error"
          )
        );
      });
    });
  });
});
