import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse, User } from '../types';

const STORAGE_KEY = 'auth';

const isTokenValid = (token: string | null | undefined): boolean => {
  if (!token) return false;
  try {
    const { exp } = jwtDecode<{ exp?: number }>(token);
    return !exp || exp * 1000 > Date.now();
  } catch {
    return true; // không phải JWT -> không kiểm tra hạn được
  }
};

interface AuthState {
  token: string | null;
  user: User | null;
  isHydrated: boolean;
  setAuth: (data: AuthResponse) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isHydrated: false,

  setAuth: async ({ token, user }) => {
    set({ token, user });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
  },

  logout: async () => {
    set({ token: null, user: null });
    await AsyncStorage.removeItem(STORAGE_KEY);
  },

  hydrate: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as AuthResponse;
        if (isTokenValid(saved.token)) {
          set({ token: saved.token, user: saved.user });
        } else {
          await AsyncStorage.removeItem(STORAGE_KEY); // hết hạn -> dọn
        }
      }
    } catch {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } finally {
      set({ isHydrated: true });
    }
  },
}));