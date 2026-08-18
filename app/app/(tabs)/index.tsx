import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DifficultyBadge, DotPattern } from '@/components/ui/Brand';
import { PillButton } from '@/components/ui/PillButton';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { colors, radii, typography } from '@/constants/theme';
import { browsePushLimits, browseVoice, plan } from '@/data/plan';
import { useCarveStore } from '@/store/useCarveStore';
import type { BrowseRoutine } from '@/types';

function RoutineCard({ routine }: { routine: BrowseRoutine }) {
  return (
    <LinearGradient
      colors={[...routine.gradient]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.routineCard}>
      <Text style={styles.routineEmoji}>{routine.emoji}</Text>
      <Text style={styles.routineTitle}>{routine.title}</Text>
      <Text style={styles.routineMeta}>{routine.meta}</Text>
      <View style={styles.routineCta}>
        <Text style={styles.routineCtaText}>Start</Text>
      </View>
    </LinearGradient>
  );
}

export default function TrainingHome() {
  const insets = useSafeAreaInsets();
  const streak = useCarveStore((s) => s.streak);
  const currentDay = useCarveStore((s) => s.currentDayNumber);
  const progress = (currentDay - 1) / plan.totalDays;

  const dayPercents = useCarveStore((s) => s.dayPercents);
  const todayPercent = dayPercents[`day_${currentDay}`] ?? 0;
  const todayContinue = todayPercent > 0 && todayPercent < 100;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.topBar}>
          <Text style={styles.brand}>CARVE</Text>
          <View style={styles.streak}>
            <Ionicons name="flame" size={16} color={colors.streak} />
            <Text style={styles.streakText}>{streak}</Text>
          </View>
        </View>

        <LinearGradient
          colors={['#2A4DE8', '#0B1F8F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}>
          <Pressable onPress={() => router.push(`/plan/${plan.id}`)} style={{ flex: 1 }}>
            <DotPattern />
            <View style={styles.heroContent}>
              <Text style={styles.heroSub}>{plan.subtitle}</Text>
              <DifficultyBadge level={plan.difficulty} light />
              <Text style={styles.heroDay}>Day {currentDay}</Text>
              <Text style={styles.heroProgress}>
                {currentDay - 1}/{plan.totalDays} Days
              </Text>
              <ProgressBar progress={progress} light height={5} />
            </View>
            <View style={styles.heroArt}>
              <Text style={styles.heroEmoji}>🪞</Text>
            </View>
          </Pressable>
          <PillButton
            title={todayContinue ? 'CONTINUE' : 'START'}
            variant="white"
            onPress={() => router.push(`/day/day_${currentDay}`)}
            style={styles.heroBtn}
          />
        </LinearGradient>

        <Text style={styles.sectionTitle}>Push Your Limits</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
          {browsePushLimits.map((r) => (
            <RoutineCard key={r.id} routine={r} />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Voice & Recovery</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
          {browseVoice.map((r) => (
            <RoutineCard key={r.id} routine={r} />
          ))}
        </ScrollView>

        <Text style={styles.disclaimer}>
          CARVE trains muscles, posture, habits, skin tone, and vocal technique — never bone structure.
          Voice drills change habitual pitch and resonance with practice; consult a coach or ENT for
          strain or persistent hoarseness.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  brand: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.black,
    letterSpacing: 1,
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1EB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
    gap: 4,
  },
  streakText: {
    fontWeight: '800',
    color: colors.streak,
    fontSize: 14,
  },
  hero: {
    borderRadius: radii.card,
    padding: 20,
    minHeight: 220,
    marginBottom: 28,
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '62%',
    zIndex: 1,
  },
  heroSub: {
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    marginBottom: 6,
  },
  heroDay: {
    ...typography.hero,
    color: colors.white,
    marginTop: 10,
    marginBottom: 8,
  },
  heroProgress: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  heroArt: {
    position: 'absolute',
    right: 8,
    top: 24,
  },
  heroEmoji: {
    fontSize: 96,
  },
  heroBtn: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
  sectionTitle: {
    ...typography.section,
    color: colors.black,
    marginBottom: 12,
  },
  hScroll: {
    marginBottom: 28,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  routineCard: {
    width: 200,
    borderRadius: radii.card,
    padding: 16,
    marginRight: 12,
    minHeight: 160,
  },
  routineEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  routineTitle: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 6,
  },
  routineMeta: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 16,
  },
  routineCta: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  routineCtaText: {
    color: colors.primaryDark,
    fontWeight: '800',
    fontSize: 12,
  },
  disclaimer: {
    ...typography.caption,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: 8,
  },
});
