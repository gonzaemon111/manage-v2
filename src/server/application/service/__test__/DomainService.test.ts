import { DomainRepositoryImpl } from '@/server/infrastructure/repository';
import { Failure, Success } from '@/server/shared/Result';
import { DomainService } from '../DomainService';

jest.mock('../../../infrastructure/repository/DomainRepository/impl');
const MockedDomainRepository = DomainRepositoryImpl as jest.Mock;

describe('DomainService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#get', () => {
    describe('正常系', () => {
      test('userIdが指定された場合,Domainの配列が返る', async () => {
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

        const mockDomainGet = jest.fn().mockResolvedValue(new Success(expected));
        MockedDomainRepository.mockImplementation(() => {
          return {
            get: mockDomainGet
          };
        });

        const target = new DomainService(new MockedDomainRepository());
        const actual = await target.get({ userId: expected.userId });

        expect(actual).toEqual(new Success(expected));

        expect(MockedDomainRepository).toBeCalledTimes(1);
        expect(mockDomainGet).toBeCalledTimes(1);
        expect(mockDomainGet).toBeCalledWith({ userId: expected.userId });
      });
    });

    describe('異常系', () => {
      test('PostRepositoryからFailureインスタンスが帰った場合,Failureが返る', async () => {
        const expected = new Error('エラーが発生しました。');
        const mockDomainGet = jest.fn().mockResolvedValue(new Failure(expected));
        MockedDomainRepository.mockImplementation(() => {
          return {
            get: mockDomainGet
          };
        });

        const target = new DomainService(new MockedDomainRepository());
        const actual = await target.get({ userId: '1' });

        expect(actual).toEqual(new Failure(expected));

        expect(MockedDomainRepository).toBeCalledTimes(1);
        expect(mockDomainGet).toBeCalledTimes(1);
        expect(mockDomainGet).toBeCalledWith({ userId: '1' });
      });
    });
  });

  describe('#find', () => {
    describe('正常系', () => {
      test('userIdが指定された場合,Domainが返る', async () => {
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

        const mockDomainFind = jest.fn().mockResolvedValue(new Success(expected));
        MockedDomainRepository.mockImplementation(() => {
          return {
            find: mockDomainFind
          };
        });

        const target = new DomainService(new MockedDomainRepository());
        const actual = await target.find({ id: 1 });

        expect(actual).toEqual(new Success(expected));

        expect(MockedDomainRepository).toBeCalledTimes(1);
        expect(mockDomainFind).toBeCalledTimes(1);
        expect(mockDomainFind).toBeCalledWith({ id: 1 });
      });
    });

    describe('異常系', () => {
      test('PostRepositoryからFailureインスタンスが帰った場合,Failureが返る', async () => {
        const expected = new Error('エラーが発生しました。');
        const mockDomainFind = jest.fn().mockResolvedValue(new Failure(expected));
        MockedDomainRepository.mockImplementation(() => {
          return {
            find: mockDomainFind
          };
        });

        const target = new DomainService(new MockedDomainRepository());
        const actual = await target.find({ id: 1 });

        expect(actual).toEqual(new Failure(expected));

        expect(MockedDomainRepository).toBeCalledTimes(1);
        expect(mockDomainFind).toBeCalledTimes(1);
        expect(mockDomainFind).toBeCalledWith({ id: 1 });
      });
    });
  });
});
