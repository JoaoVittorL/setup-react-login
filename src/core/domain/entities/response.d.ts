export interface Pagination {
  lastPage: number;
  page: number;
  perPage: number;
}

export interface ApiResponse<T> {
  data: T[];
  status: number;
  message: string;
  pagination?: Pagination;
}

export interface HttpResponse {
  status: number;
  message: string;
}
