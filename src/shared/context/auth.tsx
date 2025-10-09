import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuthState, LoginPost, LoginResponse, User } from '@/core/domain/entities/auth';
import { Repository } from '@/infrastructure/repositories/repository-auth';
import { postAuthUseCase } from '@/core/application/use-cases/post-auth-use-case';
import { AxiosAdapter } from '@/infrastructure/http/axios-adapters';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
interface AuthContextType extends AuthState {
  login: (values: LoginPost) => Promise<LoginResponse>;
  logout: () => void;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_COOKIE_KEY = 'auth_token';
const COOKIE_OPTIONS = {
  expires: 7,
  secure: true,
  sameSite: 'strict' as const,
  path: '/',
  // httpOnly: true,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const token = Cookies.get(AUTH_COOKIE_KEY);
    if (token) {
      try {
        const user = jwtDecode<User>(token);
        return {
          user,
          isAuthenticated: true,
          isLoading: false,
        };
      } catch {
        Cookies.remove(AUTH_COOKIE_KEY);
      }
    }

    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
    };
  });

  const login = async (values: LoginPost) => {
    setAuthState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const httpClient = new AxiosAdapter();
    const repository = new Repository(httpClient);
    const postData = new postAuthUseCase(repository);

    const response = await postData.execute(values);

    if (response.status === 201 || response.status === 200) {
      const token = response.access_token;
      if (token) {
        Cookies.set(AUTH_COOKIE_KEY, token, COOKIE_OPTIONS);
        const user = jwtDecode<User>(token);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }

    return response;
  };

  const logout = useCallback(() => {
    Cookies.remove(AUTH_COOKIE_KEY, { path: '/' });
    window.location.href = '/';
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        setAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default useAuth;
