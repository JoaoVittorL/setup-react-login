import { LoginPost, LoginResponse } from '@/core/domain/entities/auth';
import { AuthRepository } from '@/core/domain/repositories/repository-auth';

export class postAuthUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(data: LoginPost): Promise<LoginResponse> {
    return this.repository.postLogin(data);
  }
}
