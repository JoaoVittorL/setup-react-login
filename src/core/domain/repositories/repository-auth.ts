import { LoginPost, LoginResponse } from '../entities/auth';

export interface AuthRepository {
  postLogin(data: LoginPost): Promise<LoginResponse>;
}
