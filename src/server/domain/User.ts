import { Result } from '../shared/Result';

export interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly image?: string;
  readonly accessToken: string;
}

export interface FindParams {
  readonly userId: string;
}

export interface UserRepository {
  find(params: FindParams): Promise<Readonly<Result<Readonly<User>, Error>>>;
}
