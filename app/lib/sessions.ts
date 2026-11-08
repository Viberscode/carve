import AsyncStorage from '@react-native-async-storage/async-storage';

export type Session = {
  date: string; // YYYY-MM-DD
  duration: number;
};

const STORAGE_KEY = 'carve_sessions';

let cache: Session[] | null = null;

function toDateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseSessions(raw: string | null): Session[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (s): s is Session =>
        s != null &&
        typeof s === 'object' &&
        typeof s.date === 'string' &&
        typeof s.duration === 'number' &&
        Number.isFinite(s.duration)
    );
  } catch {
    return [];
  }
}

function readLocalStorage(): Session[] | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    return parseSessions(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function writeLocalStorage(sessions: Session[]) {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    // ignore quota / private mode
  }
}

function persist(sessions: Session[]) {
  cache = sessions;
  writeLocalStorage(sessions);
  void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

/** Hydrate cache from localStorage (web) or AsyncStorage (native). */
export async function hydrateSessions(): Promise<void> {
  const fromLocal = readLocalStorage();
  if (fromLocal) {
    cache = fromLocal;
    return;
  }
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    cache = parseSessions(raw);
    writeLocalStorage(cache);
  } catch {
    cache = [];
  }
}

export function getSessions(): Session[] {
  if (cache) return cache;
  const fromLocal = readLocalStorage();
  cache = fromLocal ?? [];
  return cache;
}

export function saveSession(duration: number): Session {
  const minutes = Number(duration);
  const session: Session = {
    date: toDateKey(),
    duration: Number.isFinite(minutes) ? minutes : 0,
  };
  const next = [...getSessions(), session];
  persist(next);
  return session;
}

export function getTotalMinutes(): number {
  return getSessions().reduce((sum, s) => sum + s.duration, 0);
}

/** Consecutive calendar days with ≥1 session. Same day counts once. */
export function getStreak(): number {
  const daysWithSession = new Set(getSessions().map((s) => s.date));
  if (daysWithSession.size === 0) return 0;

  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);

  if (!daysWithSession.has(toDateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!daysWithSession.has(toDateKey(cursor))) return 0;
  }

  let streak = 0;
  while (daysWithSession.has(toDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export type DayActivity = {
  date: string;
  active: boolean;
};

/** Last `n` calendar days ending today (oldest → newest). */
export function getLastNDays(n: number): DayActivity[] {
  const daysWithSession = new Set(getSessions().map((s) => s.date));
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const result: DayActivity[] = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const date = toDateKey(d);
    result.push({ date, active: daysWithSession.has(date) });
  }
  return result;
}
