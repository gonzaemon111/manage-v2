import { TYPES } from "@/server/di.types";
import { UserRepository } from "@/server/domain/User";
import { inject, injectable } from "inversify";
import { UserClient } from "../lib";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @inject(TYPES.UserClient)
    private readonly client: UserClient
  ) {}

  public async findOrCreateUser() {
    const session = await getServerSession(authOptions);
    if (
      !session ||
      !session.user ||
      !session.user.email ||
      !session.user.name
    ) {
      throw new Error("");
    }

    const res = await this.client.findOrCreateUser({
      email: session.user.email,
      name: session.user.name,
      picture: session.user.image,
      provider: "github",
    });

    if (!res.isSuccess) {
      throw new Error("エラー");
    }

    return {
      email: session.user.email,
      name: session.user.name,
      picture: session.user.image ?? undefined,
      provider: "github",
      token: res.value.token,
    };
  }
}
