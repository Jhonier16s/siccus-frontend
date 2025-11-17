import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AuthUser {
  id?: number | string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  [key: string]: any;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isUserLoading: boolean;
  setAuth: (payload: { token: string; user: AuthUser }) => void;
  setUser: (user: AuthUser) => void;
  setUserLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isUserLoading: false,
      setAuth: ({ token, user }: { token: string; user: AuthUser }) => set({ token, user }),
      setUser: (user: AuthUser) => set({ user }),
      setUserLoading: (loading: boolean) => set({ isUserLoading: loading }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, user: state.user }),
      
    },
    
  ),
  
);
