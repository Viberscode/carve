import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExerciseCoachAnimation } from '@/components/ExerciseCoachAnimation';
import { ExerciseDetailModal } from '@/components/ExerciseDetailModal';
import { IconButton } from '@/components/ui/IconButton';
import { PillButton } from '@/components/ui/PillButton';
import { colors, radii, typography } from '@/constants/theme';
import { days, formatMetric, getExercisesForDay } from '@/data/plan';
import { useCarveStore } from '@/store/useCarveStore';

type Phase = 'countdown' | 'active' | 'rest';

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function ExercisePlayerScreen() {
  const insets = useSafeAreaInsets();
  const { dayId } = useLocalSearchParams<{ dayId: string }>();
  const day = days.find((d) => d.id === dayId) ?? days[0];
  const exercises = useMemo(() => getExercisesForDay(day), [day]);
  const status = useCarveStore((s) => s.getDayStatus(day.id, day.status));
  const completedIds = useCarveStore((s) => s.completedExerciseIds[day.id] ?? []);
  const markExerciseComplete = useCarveStore((s) => s.markExerciseComplete);
  const markDayComplete = useCarveStore((s) => s.markDayComplete);
  const setDayPercent = useCarveStore((s) => s.setDayPercent);

  useEffect(() => {
    if (status === 'locked') {
      router.replace(`/plan/${day.planId}`);
    }
  }, [day.planId, status]);

  const firstIncomplete = exercises.findIndex((ex) => !completedIds.includes(ex.id));
  const [index, setIndex] = useState(() =>
    status === 'done' || firstIncomplete < 0 ? 0 : firstIncomplete
  );
  const [countdown, setCountdown] = useState(3);
  const [remaining, setRemaining] = useState(0);
  const [paused, setPaused] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const scale = useSharedValue(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const didResume = useRef(false);

  useEffect(() => {
    if (didResume.current || status === 'done') return;
    const next = exercises.findIndex((ex) => !completedIds.includes(ex.id));
    if (next > 0) {
      setIndex(next);
      didResume.current = true;
    }
  }, [completedIds, exercises, status]);

  const exercise = exercises[index];
  const totalDuration = exercise?.durationSeconds ?? (exercise?.reps ?? 10) * 3;

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const goNext = useCallback(() => {
    if (!exercise) return;
    markExerciseComplete(day.id, exercise.id);
    const percent = Math.round(((index + 1) / exercises.length) * 100);
    setDayPercent(day.id, percent);

    if (index >= exercises.length - 1) {
      markDayComplete(day.id, day.dayNumber);
      router.replace(`/plan/${day.planId}`);
      return;
    }
    setIndex((i) => i + 1);
    setPhase('countdown');
    setCountdown(3);
    setPaused(false);
  }, [day, exercise, exercises.length, index, markDayComplete, markExerciseComplete, setDayPercent]);

  const goPrev = () => {
    if (index <= 0) return;
    setIndex((i) => i - 1);
    setPhase('countdown');
    setCountdown(3);
    setPaused(false);
  };

  useEffect(() => {
    if (!exercise) return;
    setRemaining(exercise.durationSeconds ?? (exercise.reps ?? 10) * 3);
  }, [exercise?.id]);

  useEffect(() => {
    clearTimer();
    if (paused) return;

    if (phase === 'countdown') {
      timerRef.current = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            setPhase('active');
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            return 3;
          }
          scale.value = withSequence(withSpring(1.2), withSpring(1));
          return c - 1;
        });
      }, 1000);
    } else if (phase === 'active') {
      timerRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            goNext();
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }

    return clearTimer;
  }, [phase, paused, index, goNext]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!exercise) {
    return (
      <View style={styles.root}>
        <Text>No exercises</Text>
      </View>
    );
  }

  const progressSegments = exercises.map((_, i) => i <= index);

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 12 }]}>
      <View style={styles.progressRow}>
        {progressSegments.map((filled, i) => (
          <View key={i} style={[styles.seg, filled && styles.segFilled]} />
        ))}
      </View>

      <View style={styles.topControls}>
        <IconButton name="chevron-back" onPress={() => router.back()} />
        <View style={styles.sideStack}>
          <IconButton name="settings-outline" size={18} />
          <IconButton name="camera-outline" size={18} />
          <IconButton name="musical-notes-outline" size={18} />
          <IconButton name="videocam-outline" size={18} />
        </View>
      </View>

      <View style={styles.stage}>
        <ExerciseCoachAnimation
          exerciseId={exercise.id}
          playing={!paused}
          size="stage"
        />
        {phase === 'countdown' && (
          <Animated.Text style={[styles.countdown, animatedStyle]}>{countdown}</Animated.Text>
        )}
      </View>

      {phase === 'countdown' ? (
        <>
          <Text style={styles.ready}>READY TO GO</Text>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{exercise.name}</Text>
            <Pressable onPress={() => setDetailOpen(true)} style={styles.help}>
              <Ionicons name="help" size={14} color={colors.textSecondary} />
            </Pressable>
          </View>
          <PillButton title="Skip" variant="muted" onPress={() => setPhase('active')} style={styles.skip} />
        </>
      ) : (
        <>
          <View style={styles.activeInfo}>
            <View>
              <Text style={styles.timer}>{formatTime(remaining)}</Text>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{exercise.name}</Text>
                <Pressable onPress={() => setDetailOpen(true)} style={styles.help}>
                  <Ionicons name="help" size={14} color={colors.textSecondary} />
                </Pressable>
              </View>
              <Text style={styles.metric}>{formatMetric(exercise)}</Text>
            </View>
            <View style={styles.feedback}>
              <IconButton name="thumbs-down-outline" size={18} />
              <IconButton name="thumbs-up-outline" size={18} />
            </View>
          </View>

          <View style={styles.controls}>
            <IconButton name="play-skip-back" onPress={goPrev} backgroundColor={colors.white} style={styles.navBtn} />
            <Pressable
              style={styles.pausePill}
              onPress={() => setPaused((p) => !p)}>
              <View style={[styles.pauseProgress, { width: `${((totalDuration - remaining) / totalDuration) * 100}%` }]} />
              <Ionicons
                name={paused ? 'play' : 'pause'}
                size={28}
                color={colors.text}
              />
            </Pressable>
            <IconButton name="play-skip-forward" onPress={goNext} backgroundColor={colors.white} style={styles.navBtn} />
          </View>
        </>
      )}

      <ExerciseDetailModal
        visible={detailOpen}
        exercise={exercise}
        index={index}
        total={exercises.length}
        onClose={() => setDetailOpen(false)}
        onPrev={goPrev}
        onNext={goNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 12,
  },
  seg: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  segFilled: {
    backgroundColor: colors.textSecondary,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sideStack: {
    gap: 10,
  },
  stage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 260,
    width: '100%',
  },
  countdown: {
    position: 'absolute',
    fontSize: 120,
    fontWeight: '900',
    color: colors.primary,
  },
  ready: {
    ...typography.label,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  name: {
    ...typography.title,
    fontSize: 22,
    color: colors.black,
    textAlign: 'center',
  },
  help: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.softBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skip: {
    marginTop: 28,
    marginBottom: 8,
  },
  activeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  timer: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.black,
  },
  metric: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  feedback: {
    gap: 10,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  navBtn: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  pausePill: {
    flex: 1,
    height: 64,
    borderRadius: radii.pill,
    backgroundColor: colors.softBg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pauseProgress: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.primarySoft,
  },
});
