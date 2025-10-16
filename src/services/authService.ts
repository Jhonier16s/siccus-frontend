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
  user?: any;
  message?: string;
  [key: string]: any;
}

const API_BASE = 'http://localhost:3000';

export async function registerUser(data: RegisterUserDto): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error((await res.json()).message || 'Error en el registro');
  }
  return res.json();
}

export async function loginUser(data: LoginUserDto): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error((await res.json()).message || 'Error en el login');
  }
  return res.json();
}
