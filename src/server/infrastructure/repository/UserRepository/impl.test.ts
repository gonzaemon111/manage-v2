import { NotFoundError } from '@/server/domain/Errors';
import { InternalServerError } from '@/server/domain/Errors/InternalServerError';
import { User } from '@/server/domain/User';
import { Failure, Success } from '@/server/shared/Result';
import { prismaMock } from '../../lib/__mocks__/PrismaClient.mock';
import { UserRepositoryImpl } from './impl';

describe('UserRepositoryImpl', () => {
  let userRepository: UserRepositoryImpl;

  beforeEach(() => {
    userRepository = new UserRepositoryImpl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#find', () => {
    describe('正常系', () => {
      test('IDに紐づくUserデータが返却される', async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.user.findFirst.mockResolvedValue({
          id: 'test',
          name: 'test user',
          email: 'test@email.com',
          emailVerified: new Date('2023-11-01'),
          image: null
        });

        const result = (await userRepository.find({ userId: 'test' })) as Success<User>;
        expect(result.isSuccess()).toEqual(true);
        expect(result.value).toEqual({
          id: 'test',
          name: 'test user',
          email: 'test@email.com',
          image: undefined,
          accessToken: '',
          emailVerified: new Date('2023-11-01')
        });
      });

      test('IDに紐づくUserデータがない場合は、Failureが返却される', async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.user.findFirst.mockResolvedValue(null);

        const result = (await userRepository.find({ userId: 'test' })) as Failure<Error>;
        expect(result.isSuccess()).toEqual(false);
        expect(result.isFailure()).toEqual(true);
        expect(result.error).toEqual(new NotFoundError('ユーザーが存在しません userId = test'));
      });
    });

    describe('異常系', () => {
      test('prismaがエラーをThrowした場合はFailureオブジェクトを返す', async () => {
        // PrismaClientのメソッドをモック化して、テストデータを設定
        prismaMock.domain.findFirst.mockRejectedValue(new Error('Database Connection Error'));

        const result = (await userRepository.find({ userId: 'test' })) as Failure<Error>;
        expect(result.isSuccess()).toEqual(false);
        expect(result.isFailure()).toEqual(true);
        expect(result.error).toEqual(
          new InternalServerError(
            `ユーザー取得でエラーが発生しました TypeError: Cannot read properties of undefined (reading 'image')`
          )
        );
      });
    });
  });
});
