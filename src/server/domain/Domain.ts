import { Result } from '../shared/Result';

export interface Domain {
  /** ドメインID */
  readonly id: number;
  /** ドメインに紐づくユーザーID */
  readonly userId: string;
  /** ドメイン名 */
  readonly name: string;
  /** 解約したかどうか */
  readonly isCanceled: boolean;
  /** メモ */
  readonly memo: string | null;
  /** 次の更新日時 */
  readonly nextUpdatedAt: string | null;
  /** プロバイダ（ex. Google Domain） */
  readonly provider: string;
  /** アカウント名（自分がどのアカウントで買ったか） */
  readonly accountName: string;
}

export interface GetParams {
  readonly userId: string;
}

export interface FindParams {
  readonly id: number;
}

export type CreateParams = Omit<Domain, 'id'>;

export interface UpdateParams {
  readonly id: number;
  readonly data: Omit<CreateParams, 'userId'>;
}

export interface DomainRepository {
  get(params: GetParams): Promise<Result<ReadonlyArray<Domain>, Error>>;
  find(params: FindParams): Promise<Result<Readonly<Domain>, Error>>;
  create(domain: CreateParams): Promise<Result<Readonly<Domain>, Error>>;
  update({ id, data }: UpdateParams): Promise<Result<Readonly<Domain>, Error>>;
  destroy(id: number): Promise<Result<Readonly<Domain>, Error>>;
}
