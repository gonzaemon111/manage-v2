export interface ErrorResponse {
  readonly status?: number;
  readonly data?: string | any;
  readonly message: string | any;
}
