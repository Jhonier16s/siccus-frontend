import { httpGet } from './http';

export interface ProgressSummary {
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
  progressPct: number; // 0..100
}

export function getProgressSummary(userId: number) {
  return httpGet<ProgressSummary>(`/progreso/user/${userId}/summary`);
}
