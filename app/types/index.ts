export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ExerciseCategory = 'face' | 'voice';
export type DayStatus = 'locked' | 'active' | 'done';

export interface CommonMistake {
  title: string;
  description: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  durationSeconds?: number;
  reps?: number;
  focusAreas: string[];
  animationEmoji: string;
  instructions: string;
  howToSteps: string[];
  commonMistakes: CommonMistake[];
  breathingTips: string[];
  eachSide?: boolean;
}

export interface Day {
  id: string;
  planId: string;
  dayNumber: number;
  isRestDay: boolean;
  status: DayStatus;
  exerciseIds: string[];
  percentComplete?: number;
}

export interface Plan {
  id: string;
  title: string;
  goalTags: string[];
  totalDays: number;
  difficulty: Difficulty;
  subtitle: string;
}

export interface BrowseRoutine {
  id: string;
  title: string;
  meta: string;
  gradient: readonly [string, string];
  emoji: string;
}

export interface UserProgress {
  dayId: string;
  exerciseId: string;
  completedAt: string;
}

export interface AppSettings {
  mirrorMode: boolean;
  coachVoice: boolean;
  backgroundMusic: boolean;
  remindersEnabled: boolean;
}

export interface AppState {
  onboardingComplete: boolean;
  streak: number;
  currentPlanId: string | null;
  currentDayNumber: number;
  completedDayIds: string[];
  completedExerciseIds: Record<string, string[]>;
  settings: AppSettings;
}
