import { httpGet, httpPatch } from './http';

export interface UserUpdateDto {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  avatarUrl?: string;
}

export interface UserResponse {
  success?: boolean;
  message?: string;
  user?: any;
  [key: string]: any;
}

export async function updateUser(userId: number, data: UserUpdateDto): Promise<UserResponse> {
  return httpPatch<UserResponse>(`/users/${userId}`, data);
}

export async function getUser(userId: number): Promise<UserResponse> {
  return httpGet<UserResponse>(`/users/${userId}`);
}
