import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { days as seedDays, plan } from '@/data/plan';
import type { AppSettings, DayStatus } from '@/types';

interface CarveStore {
  onboardingComplete: boolean;
  streak: number;
  currentPlanId: string | null;
  currentDayNumber: number;
  dayStatuses: Record<string, DayStatus>;
  dayPercents: Record<string, number>;
  completedExerciseIds: Record<string, string[]>;
  settings: AppSettings;
  completeOnboarding: () => void;
  markExerciseComplete: (dayId: string, exerciseId: string) => void;
  markDayComplete: (dayId: string, dayNumber: number) => void;
  setDayPercent: (dayId: string, percent: number) => void;
  updateSettings: (partial: Partial<AppSettings>) => void;
  getDayStatus: (dayId: string, fallback: DayStatus) => DayStatus;
}

const defaultSettings: AppSettings = {
  mirrorMode: true,
  coachVoice: true,
  backgroundMusic: false,
  remindersEnabled: true,
};

const initialStatuses: Record<string, DayStatus> = {};
const initialPercents: Record<string, number> = {};
seedDays.forEach((d) => {
  initialStatuses[d.id] = d.status;
  if (d.percentComplete != null) initialPercents[d.id] = d.percentComplete;
});

export const useCarveStore = create<CarveStore>()(
  persist(
    (set, get) => ({
      onboardingComplete: true,
      streak: 0,
      currentPlanId: plan.id,
      currentDayNumber: 1,
      dayStatuses: initialStatuses,
      dayPercents: initialPercents,
      completedExerciseIds: {},
      settings: defaultSettings,

      completeOnboarding: () => set({ onboardingComplete: true, currentPlanId: plan.id }),

      markExerciseComplete: (dayId, exerciseId) => {
        const current = get().completedExerciseIds[dayId] ?? [];
        if (current.includes(exerciseId)) return;
        const next = [...current, exerciseId];
        set({
          completedExerciseIds: { ...get().completedExerciseIds, [dayId]: next },
        });
      },

      markDayComplete: (dayId, dayNumber) => {
        const statuses = { ...get().dayStatuses };
        if (statuses[dayId] === 'done') {
          set({ dayPercents: { ...get().dayPercents, [dayId]: 100 } });
          return;
        }
        statuses[dayId] = 'done';
        const nextDayId = `day_${dayNumber + 1}`;
        if (statuses[nextDayId] === 'locked') {
          statuses[nextDayId] = 'active';
        }
        set({
          dayStatuses: statuses,
          currentDayNumber: Math.min(dayNumber + 1, 30),
          streak: get().streak + 1,
          dayPercents: { ...get().dayPercents, [dayId]: 100 },
        });
      },

      setDayPercent: (dayId, percent) =>
        set({ dayPercents: { ...get().dayPercents, [dayId]: percent } }),

      updateSettings: (partial) =>
        set({ settings: { ...get().settings, ...partial } }),

      getDayStatus: (dayId, fallback) => get().dayStatuses[dayId] ?? fallback,
    }),
    {
      name: 'carve-storage-day1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        onboardingComplete: s.onboardingComplete,
        streak: s.streak,
        currentPlanId: s.currentPlanId,
        currentDayNumber: s.currentDayNumber,
        dayStatuses: s.dayStatuses,
        dayPercents: s.dayPercents,
        completedExerciseIds: s.completedExerciseIds,
        settings: s.settings,
      }),
    }
  )
);
