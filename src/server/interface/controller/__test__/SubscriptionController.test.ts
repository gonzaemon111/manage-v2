import { SubscriptionService } from '@/server/application/service';
import { Failure, Success } from '@/server/shared/Result';
import { SubscriptionController } from '../SubscriptionController';

jest.mock('../../../application/service/SubscriptionService');
const MockedSubscriptionService = SubscriptionService as jest.Mock;

describe('SubscriptionController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#get', () => {
    describe('正常系', () => {
      test('userIdが指定された場合,Domainの配列が返る', async () => {
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

        const mockSubscriptionGet = jest.fn().mockResolvedValue(new Success(expected));
        MockedSubscriptionService.mockImplementation(() => {
          return {
            get: mockSubscriptionGet
          };
        });

        const target = new SubscriptionController(new MockedSubscriptionService());
        const actual = await target.get({ userId: expected.userId });

        expect(actual).toEqual(new Success(expected));

        expect(MockedSubscriptionService).toBeCalledTimes(1);
        expect(mockSubscriptionGet).toBeCalledTimes(1);
        expect(mockSubscriptionGet).toBeCalledWith({ userId: expected.userId });
      });
    });

    describe('異常系', () => {
      test('PostServiceからFailureインスタンスが帰った場合,Failureが返る', async () => {
        const expected = new Error('エラーが発生しました。');
        const mockSubscriptionGet = jest.fn().mockResolvedValue(new Failure(expected));
        MockedSubscriptionService.mockImplementation(() => {
          return {
            get: mockSubscriptionGet
          };
        });

        const target = new SubscriptionController(new MockedSubscriptionService());
        const actual = await target.get({ userId: '1' });

        expect(actual).toEqual(new Failure(expected));

        expect(MockedSubscriptionService).toBeCalledTimes(1);
        expect(mockSubscriptionGet).toBeCalledTimes(1);
        expect(mockSubscriptionGet).toBeCalledWith({ userId: '1' });
      });
    });
  });

  describe('#find', () => {
    describe('正常系', () => {
      test('userIdが指定された場合,Domainが返る', async () => {
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

        const mockSubscriptionFind = jest.fn().mockResolvedValue(new Success(expected));
        MockedSubscriptionService.mockImplementation(() => {
          return {
            find: mockSubscriptionFind
          };
        });

        const target = new SubscriptionController(new MockedSubscriptionService());
        const actual = await target.find({ id: 1 });

        expect(actual).toEqual(new Success(expected));

        expect(MockedSubscriptionService).toBeCalledTimes(1);
        expect(mockSubscriptionFind).toBeCalledTimes(1);
        expect(mockSubscriptionFind).toBeCalledWith({ id: 1 });
      });
    });

    describe('異常系', () => {
      test('PostServiceからFailureインスタンスが帰った場合,Failureが返る', async () => {
        const expected = new Error('エラーが発生しました。');
        const mockSubscriptionFind = jest.fn().mockResolvedValue(new Failure(expected));
        MockedSubscriptionService.mockImplementation(() => {
          return {
            find: mockSubscriptionFind
          };
        });

        const target = new SubscriptionController(new MockedSubscriptionService());
        const actual = await target.find({ id: 1 });

        expect(actual).toEqual(new Failure(expected));

        expect(MockedSubscriptionService).toBeCalledTimes(1);
        expect(mockSubscriptionFind).toBeCalledTimes(1);
        expect(mockSubscriptionFind).toBeCalledWith({ id: 1 });
      });
    });
  });
});
