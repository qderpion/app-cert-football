export interface ApiResponse<T = unknown> {
  get: string;
  parameters: { [key: string]: string };
  errors: unknown[];
  results: number;
  paging: Paging;
  response: T[];
}

export interface Paging {
  current: number;
  total: number;
}
