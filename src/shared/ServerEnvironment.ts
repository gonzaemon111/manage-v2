import { z } from 'zod';
import { logger } from '@/server/shared/Logger';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_GITHUB_CLIENT_ID: z.string(),
  NEXTAUTH_GITHUB_CLIENT_SECRET: z.string()
});

const { NODE_ENV, NEXTAUTH_SECRET, NEXTAUTH_GITHUB_CLIENT_ID, NEXTAUTH_GITHUB_CLIENT_SECRET } = process.env;

class ServerEnvironment {
  private readonly data;

  constructor() {
    this.valid();

    this.data = this.parse();
  }

  public get() {
    return {
      NODE_ENV: this.data.NODE_ENV,
      NEXTAUTH_SECRET: this.data.NEXTAUTH_SECRET,
      NEXTAUTH_GITHUB_CLIENT_ID: this.data.NEXTAUTH_GITHUB_CLIENT_ID,
      NEXTAUTH_GITHUB_CLIENT_SECRET: this.data.NEXTAUTH_GITHUB_CLIENT_SECRET
    };
  }

  private valid() {
    const validationResult = envSchema.safeParse({
      NODE_ENV,
      NEXTAUTH_SECRET,
      NEXTAUTH_GITHUB_CLIENT_ID,
      NEXTAUTH_GITHUB_CLIENT_SECRET
    });

    if (!validationResult.success) {
      logger.error(JSON.stringify(validationResult.error));
      throw new Error('環境変数が正しく設定されていません');
    }
  }

  private parse() {
    return envSchema.parse({
      NODE_ENV,
      NEXTAUTH_SECRET,
      NEXTAUTH_GITHUB_CLIENT_ID,
      NEXTAUTH_GITHUB_CLIENT_SECRET
    });
  }
}

export const serverEnvironment = new ServerEnvironment();
