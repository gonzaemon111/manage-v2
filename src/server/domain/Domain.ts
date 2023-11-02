export interface Domain {
  readonly id: number;
  readonly userId: number;
  readonly name: string;
  readonly isCanceled: boolean;
  readonly memo: string;
  readonly nextUpdatedAt: string;
  readonly provider: string;
  readonly accountName: string;
}

export interface GetParams {
  readonly userId: string;
}

export interface DomainRepository {
  get(params: GetParams): ReadonlyArray<Readonly<Domain>>;
}
