import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface ProgressSummaryState {
  xpTotal: number;
  energiaTotal: number;
  saludTotal: number;
  nivel: number;
  nextLevel: number;
  xpPerLevel: number;
  xpForCurrentLevelStart: number;
  xpForNextLevel: number;
  xpIntoLevel: number;
  xpToNext: number;
  progressPct: number;
}

interface ProgressState {
  summary: ProgressSummaryState;
  setSummary: (s: Partial<ProgressSummaryState>) => void;
  clear: () => void;
}

const initialSummary: ProgressSummaryState = {
  xpTotal: 0,
  energiaTotal: 0,
  saludTotal: 0,
  nivel: 1,
  nextLevel: 2,
  xpPerLevel: 100,
  xpForCurrentLevelStart: 0,
  xpForNextLevel: 100,
  xpIntoLevel: 0,
  xpToNext: 100,
  progressPct: 0,
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      summary: initialSummary,
      setSummary: (s) => set((state) => ({ summary: { ...state.summary, ...s } })),
      clear: () => set({ summary: initialSummary }),
    }),
    {
      name: 'progress-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
