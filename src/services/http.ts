import { API_BASE } from './config';
import { useAuthStore } from '../store/authStore';

export function authHeaders(extra?: HeadersInit): HeadersInit {
  const token = useAuthStore.getState().token;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(extra as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function httpGet<T = any>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: authHeaders(),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((json as any)?.message || 'Error en la solicitud');
  }
  return json as T;
}

export async function httpPatch<T = any>(path: string, body: any): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((json as any)?.message || 'Error en la solicitud');
  }
  return json as T;
}

export async function httpPost<T = any>(path: string, body: any): Promise<T> {
  // Note: login/registro pueden no tener token; authHeaders se encarga
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((json as any)?.message || 'Error en la solicitud');
  }
  return json as T;
}
