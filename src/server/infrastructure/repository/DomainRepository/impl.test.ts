import { Domain } from '@/server/domain/Domain';
import { NotFoundError } from '@/server/domain/Errors';
import { InternalServerError } from '@/server/domain/Errors/InternalServerError';
import { Failure, Success } from '@/server/shared/Result';
import { prismaMock } from '../../lib/__mocks__/PrismaClient.mock';
import { DomainRepositoryImpl } from './impl';

describe('DomainRepositoryImpl', () => {
  let domainRepository: DomainRepositoryImpl;

  beforeEach(() => {
    domainRepository = new DomainRepositoryImpl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#get', () => {
    describe('正常系', () => {
      test('should get domains successfully', async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.domain.findMany.mockResolvedValue([
          {
            id: 1,
            userId: 'user1',
            name: 'gonzaemon.dev',
            isCanceled: false,
            memo: 'メモ',
            nextUpdatedAt: '',
            provider: 'google domain',
            accountName: 'engineer'
          }
        ]);

        const result = (await domainRepository.get({ userId: '1' })) as Success<Array<Domain>>;
        expect(result.isSuccess()).toEqual(true);
        expect(result.value).toEqual([
          {
            id: 1,
            userId: 'user1',
            name: 'gonzaemon.dev',
            isCanceled: false,
            memo: 'メモ',
            nextUpdatedAt: '',
            provider: 'google domain',
            accountName: 'engineer'
          }
        ]);
      });
    });

    describe('異常系', () => {
      test('prismaがエラーをThrowした場合はFailureオブジェクトを返す', async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.domain.findMany.mockRejectedValue(new Error('Database Connection Error'));

        const result = (await domainRepository.get({
          userId: '1'
        })) as Failure<Error>;
        expect(result.isSuccess()).toEqual(false);
        expect(result.isFailure()).toEqual(true);
        expect(result.error).toEqual(
          new InternalServerError('ドメイン取得でエラーが発生しました Error: Database Connection Error')
        );
      });
    });
  });

  describe('#find', () => {
    describe('正常系', () => {
      test('IDに紐づくDomainデータが返却される', async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.domain.findFirst.mockResolvedValue({
          id: 1,
          userId: 'user1',
          name: 'gonzaemon.dev',
          isCanceled: false,
          memo: 'メモ',
          nextUpdatedAt: '',
          provider: 'google domain',
          accountName: 'engineer'
        });

        const result = (await domainRepository.find({ id: 1 })) as Success<Domain>;
        expect(result.isSuccess()).toEqual(true);
        expect(result.value).toEqual({
          id: 1,
          userId: 'user1',
          name: 'gonzaemon.dev',
          isCanceled: false,
          memo: 'メモ',
          nextUpdatedAt: '',
          provider: 'google domain',
          accountName: 'engineer'
        });
      });

      test('IDに紐づくDomainデータがない場合は、Failureが返却される', async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.domain.findFirst.mockResolvedValue(null);

        const result = (await domainRepository.find({ id: 1 })) as Failure<Error>;
        expect(result.isSuccess()).toEqual(false);
        expect(result.isFailure()).toEqual(true);
        expect(result.error).toEqual(new NotFoundError('ドメインが存在しません domainId = 1'));
      });
    });

    describe('異常系', () => {
      test('prismaがエラーをThrowした場合はFailureオブジェクトを返す', async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.domain.findFirst.mockRejectedValue(new Error('Database Connection Error'));

        const result = (await domainRepository.find({ id: 1 })) as Failure<Error>;
        expect(result.isSuccess()).toEqual(false);
        expect(result.isFailure()).toEqual(true);
        expect(result.error).toEqual(
          new InternalServerError('ドメイン取得でエラーが発生しました Error: Database Connection Error')
        );
      });
    });
  });

  describe('#create', () => {
    describe('正常系', () => {
      test('パラメータが正しい場合はSuccess<Domain>オブジェクトが返される', async () => {
        const params = {
          userId: 'user1',
          name: 'gonzaemon.dev',
          isCanceled: false,
          memo: 'メモ',
          nextUpdatedAt: '',
          provider: 'google domain',
          accountName: 'engineer'
        };
        const expected = {
          id: 1,
          userId: 'user1',
          name: 'gonzaemon.dev',
          isCanceled: false,
          memo: 'メモ',
          nextUpdatedAt: '',
          provider: 'google domain',
          accountName: 'engineer'
        };

        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.domain.create.mockResolvedValue(expected);

        const result = (await domainRepository.create(params)) as Success<Domain>;
        expect(result.isSuccess()).toEqual(true);
        expect(result.value).toEqual(expected);
      });
    });

    describe('異常系', () => {
      test('prismaがエラーをThrowした場合はFailureオブジェクトを返す', async () => {
        const params = {
          userId: 'user1',
          name: 'gonzaemon.dev',
          isCanceled: false,
          memo: 'メモ',
          nextUpdatedAt: '',
          provider: 'google domain',
          accountName: 'engineer'
        };
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.domain.create.mockRejectedValue(new Error('Database Connection Error'));

        const result = (await domainRepository.create(params)) as Failure<Error>;
        expect(result.isSuccess()).toEqual(false);
        expect(result.isFailure()).toEqual(true);
        expect(result.error).toEqual(
          new InternalServerError('ドメイン作成でエラーが発生しました Error: Database Connection Error')
        );
      });
    });
  });

  describe('#update', () => {
    describe('正常系', () => {
      test('パラメータが正しい場合はSuccess<Domain>オブジェクトが返される', async () => {
        const data = {
          name: 'gonzaemon.dev',
          isCanceled: false,
          memo: 'メモ',
          nextUpdatedAt: '',
          provider: 'google domain',
          accountName: 'engineer'
        };
        const domainID = 1;
        const expected = {
          id: 1,
          userId: 'user1',
          name: 'gonzaemon.dev',
          isCanceled: false,
          memo: 'メモ',
          nextUpdatedAt: '',
          provider: 'google domain',
          accountName: 'engineer'
        };

        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.domain.update.mockResolvedValue(expected);

        const result = (await domainRepository.update({ id: domainID, data })) as Success<Domain>;
        expect(result.isSuccess()).toEqual(true);
        expect(result.value).toEqual(expected);
      });
    });

    describe('異常系', () => {
      test('prismaがエラーをThrowした場合はFailureオブジェクトを返す', async () => {
        const data = {
          name: 'gonzaemon.dev',
          isCanceled: false,
          memo: 'メモ',
          nextUpdatedAt: '',
          provider: 'google domain',
          accountName: 'engineer'
        };
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.domain.update.mockRejectedValue(new Error('Database Connection Error'));

        const result = (await domainRepository.update({ id: 1, data })) as Failure<Error>;
        expect(result.isSuccess()).toEqual(false);
        expect(result.isFailure()).toEqual(true);
        expect(result.error).toEqual(
          new InternalServerError('ドメイン更新でエラーが発生しました Error: Database Connection Error')
        );
      });
    });
  });

  describe('#destroy', () => {
    describe('正常系', () => {
      test('パラメータが正しい場合はSuccess<Domain>オブジェクトが返される', async () => {
        const expected = {
          id: 1,
          userId: 'user1',
          name: 'gonzaemon.dev',
          isCanceled: false,
          memo: 'メモ',
          nextUpdatedAt: '',
          provider: 'google domain',
          accountName: 'engineer'
        };

        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.domain.delete.mockResolvedValue(expected);

        const result = (await domainRepository.destroy(1)) as Success<Domain>;
        expect(result.isSuccess()).toEqual(true);
        expect(result.value).toEqual(expected);
      });
    });

    describe('異常系', () => {
      test('prismaがエラーをThrowした場合はFailureオブジェクトを返す', async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.domain.delete.mockRejectedValue(new Error('Database Connection Error'));

        const result = (await domainRepository.destroy(1)) as Failure<Error>;
        expect(result.isSuccess()).toEqual(false);
        expect(result.isFailure()).toEqual(true);
        expect(result.error).toEqual(
          new InternalServerError('ドメイン削除でエラーが発生しました Error: Database Connection Error')
        );
      });
    });
  });
});
