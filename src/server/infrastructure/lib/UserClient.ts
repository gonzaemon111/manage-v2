import axios, { AxiosInstance } from "axios";
import { injectable } from "inversify";
import { Failure, Success } from "@/server/shared/Result";

interface FindOrCreateUserParams {
  readonly email?: string | null;
  readonly name?: string | null;
  readonly picture?: string | null;
  readonly provider: string;
}

interface TokenResponse {
  readonly token: string;
}

@injectable()
export class UserClient {
  private readonly client: AxiosInstance;
  private readonly url = process.env.LAGRING_BASE_URL;

  constructor() {
    this.client = axios.create({
      baseURL: `${this.url}/api/users`,
      headers: { "Content-Type": "application/json" },
      responseType: "json",
    });
  }

  public async findOrCreateUser(params: FindOrCreateUserParams) {
    if (
      typeof params.email !== "string" ||
      typeof params.name !== "string" ||
      typeof params.provider !== "string"
    ) {
      return new Failure(new Error("パラメータが不正です"));
    }

    const response = await this.client.post<TokenResponse>("/", {
      user: {
        email: params.email,
        name: params.name,
        picture: params.picture,
        provider: params.provider,
      },
    });

    return new Success(response.data);
  }
}
