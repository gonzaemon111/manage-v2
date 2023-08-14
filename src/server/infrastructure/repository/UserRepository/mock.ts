import { UserRepository } from "@/server/di.interface";

export const mockUserRepository: UserRepository = {
  findOrCreateUser() {
    return Promise.resolve({
      name: "テストユーザー",
      email: "test@test.com",
      picture: "https://avatars.githubusercontent.com/u/24593125?v=4",
      token: "test-token",
    });
  },
};
