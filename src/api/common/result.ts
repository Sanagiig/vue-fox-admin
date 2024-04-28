export interface DataResult<T> {
  code: number;
  msg: string;
  errMsg: string;
  result: T;
}

export interface PageResult<T> {
  page: number;
  pageSize: number;
  total: number;
  records: T[];
}

export interface PaginationResult<T> {
  code: number;
  msg: string;
  errMsg: string;
  result: PageResult<T>;
}
