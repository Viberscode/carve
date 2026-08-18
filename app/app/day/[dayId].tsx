import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExerciseDetailModal } from '@/components/ExerciseDetailModal';
import { ExerciseRow } from '@/components/ExerciseRow';
import { DifficultyBadge, HeroGradient } from '@/components/ui/Brand';
import { IconButton } from '@/components/ui/IconButton';
import { PillButton } from '@/components/ui/PillButton';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { colors, radii, typography } from '@/constants/theme';
import {
  days,
  estimateSessionMinutes,
  getExercisesForDay,
  plan,
} from '@/data/plan';
import { useCarveStore } from '@/store/useCarveStore';
import type { Exercise } from '@/types';

export default function DayDetailScreen() {
  const insets = useSafeAreaInsets();
  const { dayId } = useLocalSearchParams<{ dayId: string }>();
  const day = days.find((d) => d.id === dayId) ?? days[0];
  const status = useCarveStore((s) => s.getDayStatus(day.id, day.status));
  const completedIds = useCarveStore((s) => s.completedExerciseIds[day.id] ?? []);

  useEffect(() => {
    if (status === 'locked') {
      router.replace(`/plan/${day.planId}`);
    }
  }, [day.planId, status]);

  const exercises = getExercisesForDay(day);
  const minutes = estimateSessionMinutes(exercises);
  const doneCount = status === 'done' ? exercises.length : completedIds.length;
  const remaining = Math.max(0, exercises.length - doneCount);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected: Exercise | null =
    selectedIndex != null ? exercises[selectedIndex] ?? null : null;

  const cta = useMemo(() => {
    if (status === 'done') {
      return { title: 'PRACTICE AGAIN', subtitle: 'Same sequence · stay gentle' };
    }
    if (doneCount > 0) {
      return {
        title: 'CONTINUE',
        subtitle: remaining === 1 ? '1 exercise left' : `${remaining} exercises left`,
      };
    }
    return { title: 'START', subtitle: 'Easy pace · a few minutes' };
  }, [status, doneCount, remaining]);

  return (
    <View style={styles.root}>
      <HeroGradient style={[styles.hero, { paddingTop: insets.top + 8 }]}>
        <View style={styles.heroTop}>
          <IconButton
            name="chevron-back"
            onPress={() => router.back()}
            color={colors.white}
            backgroundColor="rgba(255,255,255,0.2)"
          />
          <IconButton
            name="ellipsis-vertical"
            color={colors.white}
            backgroundColor="transparent"
          />
        </View>
        <Text style={styles.dayTitle}>Day {day.dayNumber}</Text>
        <DifficultyBadge level={plan.difficulty} light />
        <Text style={styles.heroLead}>Small wins stack</Text>
        <Text style={styles.heroArt}>🧘</Text>
      </HeroGradient>

      <View style={styles.sheet}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <Text style={styles.kicker}>Keep it gentle — tone, posture, and habit.</Text>
          <View style={styles.stats}>
            <Stat label="Exercises" value={`${exercises.length}`} />
            <View style={styles.statDivider} />
            <Stat label="Time" value={`${minutes} min`} />
            <View style={styles.statDivider} />
            <Stat label="Focus" value="Face + Voice" />
          </View>
          <View style={styles.progressWrap}>
            <ProgressBar progress={exercises.length ? doneCount / exercises.length : 0} height={5} />
          </View>

          <Pressable style={styles.settingsRow}>
            <View>
              <Text style={styles.settingsTitle}>Practice settings</Text>
              <Text style={styles.settingsSub}>Music, coach cues, and timer</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>

          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseTitle}>Today’s sequence</Text>
            <Text style={styles.exerciseCount}>
              {doneCount}/{exercises.length}
            </Text>
          </View>

          {exercises.map((ex, i) => (
            <ExerciseRow
              key={ex.id}
              exercise={ex}
              complete={i < doneCount || completedIds.includes(ex.id)}
              onPress={() => setSelectedIndex(i)}
            />
          ))}
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <Pressable style={styles.adjust}>
            <Ionicons name="clipboard-outline" size={16} color={colors.white} />
            <Text style={styles.adjustText}>Adjust</Text>
          </Pressable>
          <PillButton
            title={cta.title}
            subtitle={cta.subtitle}
            onPress={() => router.push(`/player/${day.id}`)}
            style={{ flex: 1 }}
          />
        </View>
      </View>

      <ExerciseDetailModal
        visible={selectedIndex != null}
        exercise={selected}
        index={selectedIndex ?? 0}
        total={exercises.length}
        onClose={() => setSelectedIndex(null)}
        onPrev={() =>
          setSelectedIndex((i) => (i == null ? 0 : Math.max(0, i - 1)))
        }
        onNext={() =>
          setSelectedIndex((i) =>
            i == null ? 0 : Math.min(exercises.length - 1, i + 1)
          )
        }
      />
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primaryDark },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    minHeight: 200,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayTitle: {
    ...typography.hero,
    color: colors.white,
    marginTop: 16,
    marginBottom: 8,
  },
  heroLead: {
    marginTop: 8,
    color: 'rgba(255,255,255,0.82)',
    fontSize: 13,
    fontWeight: '500',
  },
  heroArt: {
    position: 'absolute',
    right: 12,
    bottom: 24,
    fontSize: 88,
  },
  sheet: {
    flex: 1,
    marginTop: -24,
    backgroundColor: '#FBFBFD',
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    overflow: 'hidden',
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  kicker: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 16,
    maxWidth: 280,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stat: { alignItems: 'center', flex: 1 },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    height: 28,
    backgroundColor: colors.border,
  },
  statValue: { fontWeight: '800', fontSize: 16, color: colors.black },
  statLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 4 },
  progressWrap: { marginBottom: 16 },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    marginBottom: 16,
  },
  settingsTitle: { fontWeight: '700', fontSize: 15, color: '#2A2A2E' },
  settingsSub: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  exerciseTitle: { fontSize: 16, fontWeight: '700', color: '#2A2A2E' },
  exerciseCount: { ...typography.caption, color: colors.textSecondary },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#EEEEF2',
  },
  adjust: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#3A3A3C',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: radii.pill,
  },
  adjustText: { color: colors.white, fontWeight: '700', fontSize: 13 },
});
