import { Result } from '../shared/Result';
import { type WithUserType } from './Base';

/**
 * サブスクリプション
 */
export interface Subscription extends WithUserType {
  /** サブスクリプションID */
  readonly id: number;
  /** サブスクリプション名 */
  readonly name: string;
  /** メモ */
  readonly memo: string | null;
  /** 月額 */
  readonly price: number;
  /** 契約開始日 */
  readonly startedAt: Date | null;
  /** 契約終了日 */
  readonly finishedAt: Date | null;
  /** 画像URL */
  readonly imageURL: string | null;
}

export interface GetParams {
  readonly userId: string;
}

export interface FindParams {
  readonly id: number;
}

export type CreateParams = Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>;

export interface UpdateParams {
  readonly id: number;
  readonly data: Omit<CreateParams, 'userId'>;
}

export interface SubscriptionRepository {
  get(params: GetParams): Promise<Result<ReadonlyArray<Subscription>, Error>>;
  find(params: FindParams): Promise<Result<Readonly<Subscription>, Error>>;
  create(domain: CreateParams): Promise<Result<Readonly<Subscription>, Error>>;
  update({ id, data }: UpdateParams): Promise<Result<Readonly<Subscription>, Error>>;
  destroy(id: number): Promise<Result<Readonly<Subscription>, Error>>;
}
