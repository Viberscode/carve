import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DayCard } from '@/components/DayCard';
import { DifficultyBadge, HeroGradient } from '@/components/ui/Brand';
import { IconButton } from '@/components/ui/IconButton';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { colors, radii, typography } from '@/constants/theme';
import { days, plan } from '@/data/plan';
import { useCarveStore } from '@/store/useCarveStore';

export default function PlanDetailScreen() {
  const insets = useSafeAreaInsets();
  const dayStatuses = useCarveStore((s) => s.dayStatuses);
  const dayPercents = useCarveStore((s) => s.dayPercents);
  const currentDay = useCarveStore((s) => s.currentDayNumber);
  const daysLeft = plan.totalDays - (currentDay - 1);
  const progress = (currentDay - 1) / plan.totalDays;

  return (
    <View style={styles.root}>
      <HeroGradient style={[styles.hero, { paddingTop: insets.top + 8 }]}>
        <IconButton
          name="chevron-back"
          onPress={() => router.back()}
          color={colors.white}
          backgroundColor="rgba(255,255,255,0.2)"
        />
        <View style={styles.heroBody}>
          <DifficultyBadge level={plan.difficulty} light />
          <Text style={styles.heroTitle}>{plan.title}</Text>
          <Text style={styles.heroTags}>{plan.goalTags.join(' · ')}</Text>
        </View>
        <Text style={styles.heroArt}>🪞</Text>
      </HeroGradient>

      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <Text style={styles.daysLeft}>{daysLeft} days left</Text>
        <ProgressBar progress={progress} height={5} />
        <ScrollView
          style={{ marginTop: 20 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}>
          {days.map((day) => {
            const status = dayStatuses[day.id] ?? day.status;
            return (
              <DayCard
                key={day.id}
                day={day}
                status={status}
                percent={dayPercents[day.id]}
                exerciseCount={day.exerciseIds.length}
                onPress={() => {
                  if (status === 'locked') return;
                  router.push(`/day/${day.id}`);
                }}
                onContinue={() => router.push(`/day/${day.id}`)}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primaryDark },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 48,
    minHeight: 220,
  },
  heroBody: {
    marginTop: 20,
    maxWidth: '70%',
    zIndex: 1,
  },
  heroTitle: {
    ...typography.hero,
    fontSize: 28,
    color: colors.white,
    marginTop: 10,
  },
  heroTags: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
    fontSize: 13,
  },
  heroArt: {
    position: 'absolute',
    right: 16,
    bottom: 40,
    fontSize: 88,
  },
  sheet: {
    flex: 1,
    marginTop: -28,
    backgroundColor: colors.white,
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  daysLeft: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 10,
  },
});
