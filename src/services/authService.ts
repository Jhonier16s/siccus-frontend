// src/services/authService.ts
// Servicio de autenticación para registro y login de usuarios

export interface RegisterUserDto {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token?: string;
  token?: string;
  user?: any;
  success?: boolean;
  message?: string;
  [key: string]: any;
}
import { httpPost } from './http';

export async function registerUser(data: RegisterUserDto): Promise<AuthResponse> {
  return httpPost<AuthResponse>('/users/register', data);
}

export async function loginUser(data: LoginUserDto): Promise<AuthResponse> {
  return httpPost<AuthResponse>('/auth/login', data);
}
