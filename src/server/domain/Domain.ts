import { Result } from "../shared/Result";

export interface Domain {
  readonly id: number;
  readonly userId: string;
  readonly name: string;
  readonly isCanceled: boolean;
  readonly memo: string | null;
  readonly nextUpdatedAt: string | null;
  readonly provider: string;
  readonly accountName: string;
}

export interface GetParams {
  readonly userId: string;
}

export interface DomainRepository {
  get(params: GetParams): Promise<Result<ReadonlyArray<Domain>, Error>>;
}
