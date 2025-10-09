import { HttpClient } from '@/core/domain/entities/http-client';
import { AuthRepository } from '../../core/domain/repositories/repository-auth';
import { LoginPost, LoginResponse } from '@/core/domain/entities/auth';

export class Repository implements AuthRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async postLogin(data: LoginPost): Promise<LoginResponse> {
    const response = await this.httpClient.request<LoginResponse>({
      url: '/sessions',
      method: 'post',
      data,
    });
    console.log(response);
    return {
      access_token: response.data.access_token,
      status: response.status,
    };
  }
}
