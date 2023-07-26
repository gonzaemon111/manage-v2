export interface User {
  readonly name?: string;
  readonly email?: string;
  readonly picture?: string;
  readonly token: string;
}

export interface UserRepository {
  findOrCreateUser(): Promise<Readonly<User>>;
}
