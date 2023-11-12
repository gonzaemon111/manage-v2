import { NotFoundError } from '@/server/domain/Errors';
import { InternalServerError } from '@/server/domain/Errors/InternalServerError';
import { Subscription } from '@/server/domain/Subscription';
import { Failure, Success } from '@/server/shared/Result';
import { prismaMock } from '../../lib/__mocks__/PrismaClient.mock';
import { SubscriptionRepositoryImpl } from './impl';

describe('SubscriptionRepositoryImpl', () => {
  let subscriptionRepository: SubscriptionRepositoryImpl;

  beforeEach(() => {
    subscriptionRepository = new SubscriptionRepositoryImpl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#get', () => {
    describe('正常系', () => {
      test('should get subscriptions successfully', async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.subscription.findMany.mockResolvedValue([
          {
            id: 1,
            userId: 'user1',
            name: 'Netflix',
            price: 10,
            memo: 'メモ',
            startedAt: new Date('2112-09-03'),
            finishedAt: new Date('2112-09-03'),
            imageURL:
              'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456',
            createdAt: new Date('2112-09-03'),
            updatedAt: new Date('2112-09-03')
          }
        ]);

        const result = (await subscriptionRepository.get({ userId: 'user1' })) as Success<Array<Subscription>>;
        expect(result.isSuccess()).toEqual(true);
        expect(result.value).toEqual([
          {
            id: 1,
            userId: 'user1',
            name: 'Netflix',
            price: 10,
            memo: 'メモ',
            startedAt: new Date('2112-09-03'),
            finishedAt: new Date('2112-09-03'),
            imageURL:
              'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456',
            createdAt: new Date('2112-09-03'),
            updatedAt: new Date('2112-09-03')
          }
        ]);
      });
    });

    describe('異常系', () => {
      test('prismaがエラーをThrowした場合はFailureオブジェクトを返す', async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.subscription.findMany.mockRejectedValue(new Error('Database Connection Error'));

        const result = (await subscriptionRepository.get({
          userId: '1'
        })) as Failure<Error>;
        expect(result.isSuccess()).toEqual(false);
        expect(result.isFailure()).toEqual(true);
        expect(result.error).toEqual(
          new InternalServerError('サブスクリプション取得でエラーが発生しました Error: Database Connection Error')
        );
      });
    });
  });

  describe('#find', () => {
    describe('正常系', () => {
      test('IDに紐づくSubscriptionデータが返却される', async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.subscription.findFirst.mockResolvedValue({
          id: 1,
          userId: 'user1',
          name: 'Netflix',
          price: 10,
          memo: 'メモ',
          startedAt: new Date('2112-09-03'),
          finishedAt: new Date('2112-09-03'),
          imageURL:
            'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456',
          createdAt: new Date('2112-09-03'),
          updatedAt: new Date('2112-09-03')
        });

        const result = (await subscriptionRepository.find({ id: 1 })) as Success<Subscription>;
        expect(result.isSuccess()).toEqual(true);
        expect(result.value).toEqual({
          id: 1,
          userId: 'user1',
          name: 'Netflix',
          price: 10,
          memo: 'メモ',
          startedAt: new Date('2112-09-03'),
          finishedAt: new Date('2112-09-03'),
          imageURL:
            'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456',
          createdAt: new Date('2112-09-03'),
          updatedAt: new Date('2112-09-03')
        });
      });

      test('IDに紐づくSubscriptionデータがない場合は、Failureが返却される', async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.subscription.findFirst.mockResolvedValue(null);

        const result = (await subscriptionRepository.find({ id: 1 })) as Failure<Error>;
        expect(result.isSuccess()).toEqual(false);
        expect(result.isFailure()).toEqual(true);
        expect(result.error).toEqual(new NotFoundError('サブスクリプションが存在しません subscriptionId = 1'));
      });
    });

    describe('異常系', () => {
      test('prismaがエラーをThrowした場合はFailureオブジェクトを返す', async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.subscription.findFirst.mockRejectedValue(new Error('Database Connection Error'));

        const result = (await subscriptionRepository.find({ id: 1 })) as Failure<Error>;
        expect(result.isSuccess()).toEqual(false);
        expect(result.isFailure()).toEqual(true);
        expect(result.error).toEqual(
          new InternalServerError('サブスクリプション取得でエラーが発生しました Error: Database Connection Error')
        );
      });
    });
  });

  describe('#create', () => {
    describe('正常系', () => {
      test('パラメータが正しい場合はSuccess<Subscription>オブジェクトが返される', async () => {
        const params = {
          userId: 'user1',
          name: 'Netflix',
          price: 10,
          memo: 'メモ',
          startedAt: new Date('2112-09-03'),
          finishedAt: new Date('2112-09-03'),
          imageURL:
            'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456'
        };
        const expected = {
          id: 1,
          userId: 'user1',
          name: 'Netflix',
          price: 10,
          memo: 'メモ',
          startedAt: new Date('2112-09-03'),
          finishedAt: new Date('2112-09-03'),
          imageURL:
            'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456',
          createdAt: new Date('2112-09-03'),
          updatedAt: new Date('2112-09-03')
        };

        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.subscription.create.mockResolvedValue(expected);

        const result = (await subscriptionRepository.create(params)) as Success<Subscription>;
        expect(result.isSuccess()).toEqual(true);
        expect(result.value).toEqual(expected);
      });
    });

    describe('異常系', () => {
      test('prismaがエラーをThrowした場合はFailureオブジェクトを返す', async () => {
        const params = {
          userId: 'user1',
          name: 'Netflix',
          price: 10,
          memo: 'メモ',
          startedAt: new Date('2112-09-03'),
          finishedAt: new Date('2112-09-03'),
          imageURL:
            'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456'
        };
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.subscription.create.mockRejectedValue(new Error('Database Connection Error'));

        const result = (await subscriptionRepository.create(params)) as Failure<Error>;
        expect(result.isSuccess()).toEqual(false);
        expect(result.isFailure()).toEqual(true);
        expect(result.error).toEqual(
          new InternalServerError('サブスクリプション作成でエラーが発生しました Error: Database Connection Error')
        );
      });
    });
  });

  describe('#update', () => {
    describe('正常系', () => {
      test('パラメータが正しい場合はSuccess<Subscription>オブジェクトが返される', async () => {
        const data = {
          name: 'Netflix',
          price: 10,
          memo: 'メモ',
          startedAt: new Date('2112-09-03'),
          finishedAt: new Date('2112-09-03'),
          imageURL:
            'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456'
        };
        const subscriptionID = 1;
        const expected = {
          id: 1,
          userId: 'user1',
          name: 'Netflix',
          price: 10,
          memo: 'メモ',
          startedAt: new Date('2112-09-03'),
          finishedAt: new Date('2112-09-03'),
          imageURL:
            'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456',
          createdAt: new Date('2112-09-03'),
          updatedAt: new Date('2112-09-03')
        };

        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.subscription.update.mockResolvedValue(expected);

        const result = (await subscriptionRepository.update({ id: subscriptionID, data })) as Success<Subscription>;
        expect(result.isSuccess()).toEqual(true);
        expect(result.value).toEqual(expected);
      });
    });

    describe('異常系', () => {
      test('prismaがエラーをThrowした場合はFailureオブジェクトを返す', async () => {
        const data = {
          name: 'Netflix',
          price: 10,
          memo: 'メモ',
          startedAt: new Date('2112-09-03'),
          finishedAt: new Date('2112-09-03'),
          imageURL:
            'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456'
        };
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.subscription.update.mockRejectedValue(new Error('Database Connection Error'));

        const result = (await subscriptionRepository.update({ id: 1, data })) as Failure<Error>;
        expect(result.isSuccess()).toEqual(false);
        expect(result.isFailure()).toEqual(true);
        expect(result.error).toEqual(
          new InternalServerError('サブスクリプション更新でエラーが発生しました Error: Database Connection Error')
        );
      });
    });
  });

  describe('#destroy', () => {
    describe('正常系', () => {
      test('パラメータが正しい場合はSuccess<Subscription>オブジェクトが返される', async () => {
        const expected = {
          id: 1,
          userId: 'user1',
          name: 'Netflix',
          price: 10,
          memo: 'メモ',
          startedAt: new Date('2112-09-03'),
          finishedAt: new Date('2112-09-03'),
          imageURL:
            'https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456',
          createdAt: new Date('2112-09-03'),
          updatedAt: new Date('2112-09-03')
        };

        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.subscription.delete.mockResolvedValue(expected);

        const result = (await subscriptionRepository.destroy(1)) as Success<Subscription>;
        expect(result.isSuccess()).toEqual(true);
        expect(result.value).toEqual(expected);
      });
    });

    describe('異常系', () => {
      test('prismaがエラーをThrowした場合はFailureオブジェクトを返す', async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.subscription.delete.mockRejectedValue(new Error('Database Connection Error'));

        const result = (await subscriptionRepository.destroy(1)) as Failure<Error>;
        expect(result.isSuccess()).toEqual(false);
        expect(result.isFailure()).toEqual(true);
        expect(result.error).toEqual(
          new InternalServerError('サブスクリプション削除でエラーが発生しました Error: Database Connection Error')
        );
      });
    });
  });
});
