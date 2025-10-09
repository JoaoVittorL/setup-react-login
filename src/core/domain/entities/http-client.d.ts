export interface HttpRequest {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  body?: any;
  data?: any;
  headers?: Record<string, string>;
  params?: object; // Add a params property to the HttpRequest type
}

export interface HttpResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface HttpClient {
  request<T>(params: HttpRequest): Promise<HttpResponse<T>>;
}
