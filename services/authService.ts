import axios from 'axios';
import { AuthResponse } from '../types';

const USE_MOCK = true;

const api = axios.create({ baseURL: 'https://your-api.com/api' });

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    if (USE_MOCK) {
      await delay(600);
      return {
        token: 'mock-token-123',
        user: { id: 1, name: email.split('@')[0], email },
      };
    }
    const res = await api.post<AuthResponse>('/auth/login', { email, password });
    return res.data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    if (USE_MOCK) {
      await delay(600);
      return {
        token: 'mock-token-123',
        user: { id: 2, name: payload.name, email: payload.email },
      };
    }
    const res = await api.post<AuthResponse>('/auth/register', payload);
    return res.data;
  },
};

// Lấy thông báo lỗi từ server (nếu có)
export const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    return (err.response?.data as { message?: string } | undefined)?.message
      ?? 'Vui lòng thử lại';
  } else if (err instanceof Error) {
    return err.message;
  }
  return 'Vui lòng thử lại';
};