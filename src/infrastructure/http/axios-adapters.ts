import { env } from '@/env';
import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { HttpClient, HttpRequest, HttpResponse } from '@/core/domain/entities/http-client';

export class AxiosAdapter implements HttpClient {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use((config) => {
      const token = Cookies.get('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.config.url === '/session') {
          return Promise.reject(error);
        }

        if (error.response && error.response.status === 401) {
          Cookies.remove('auth_token');
          window.location.href = '/login';

          return Promise.reject({
            data: { message: 'Sessão expirada ou não autenticado' },
            status: 401,
          });
        }
        return Promise.reject(error);
      },
    );
  }

  async request<T>(config: HttpRequest): Promise<HttpResponse<T>> {
    try {
      const response = await this.api.request({
        ...config,
        method: config.method.toLowerCase(),
        ...(config.body !== undefined ? { data: config.body } : {}),
      });
      return {
        data: response.data,
        status: response.status,
        message: response.data.message ?? 'Requisição realizada com sucesso!',
      };
    } catch (error: any) {
      if (error.response) {
        return {
          data: error.response.data,
          status: error.response.status,
          message: error.response.data.message ?? 'Erro na requisição!',
        };
      }
      throw error;
    }
  }
}
