import { LoginResponse } from './auth.d';
export interface User {
  baseId: string;
  companyId: string;
  cpf: string;
  email: string;
  exp: number;
  firstLogin: boolean;
  iat: number;
  name: string;
  role: string;
  sub: string;
}
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginResponse {
  access_token: string;
  status: number;
}

export interface LoginPost {
  email: string;
  password: string;
}
