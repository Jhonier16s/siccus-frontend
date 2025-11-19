import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface HealthProfile {
  cluster?: number;
  perfilModelo?: any;
  [key: string]: any;
}

export interface AuthUser {
  id?: number | string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  healthProfile?: HealthProfile;
  perfilSalud?: HealthProfile; // Alias para compatibilidad con backend
  [key: string]: any;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isUserLoading: boolean;
  setAuth: (payload: { token: string; user: AuthUser }) => void;
  setUser: (user: AuthUser) => void;
  setUserLoading: (loading: boolean) => void;
  setHealthProfile: (healthProfile: HealthProfile) => void;
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
      setHealthProfile: (healthProfile: HealthProfile) => set((state) => ({
        user: state.user ? { ...state.user, healthProfile, perfilSalud: healthProfile } : null,
      })),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
);
