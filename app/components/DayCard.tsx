import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, gradients, radii, typography } from '@/constants/theme';
import type { Day, DayStatus } from '@/types';
import { PillButton } from './ui/PillButton';

interface DayCardProps {
  day: Day;
  status: DayStatus;
  percent?: number;
  exerciseCount: number;
  onPress?: () => void;
  onContinue?: () => void;
}

export function DayCard({ day, status, percent, exerciseCount, onPress, onContinue }: DayCardProps) {
  if (day.isRestDay) {
    return (
      <Pressable onPress={onPress} style={styles.card}>
        <View>
          <Text style={styles.title}>Day {day.dayNumber}</Text>
          <Text style={styles.subtitle}>Rest</Text>
        </View>
        <Ionicons name="cafe-outline" size={22} color={colors.textMuted} />
      </Pressable>
    );
  }

  if (status === 'done') {
    return (
      <Pressable onPress={onPress} style={styles.card}>
        <View>
          <Text style={styles.title}>Day {day.dayNumber}</Text>
          <Text style={styles.subtitle}>Finished</Text>
        </View>
        <View style={styles.check}>
          <Ionicons name="checkmark" size={18} color={colors.primaryDark} />
        </View>
      </Pressable>
    );
  }

  if (status === 'active') {
    return (
      <Pressable onPress={onPress}>
        <LinearGradient
          colors={[...gradients.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.activeCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.activeTitle}>Day {day.dayNumber}</Text>
            <Text style={styles.activeSub}>
              {percent != null && percent > 0 ? `${percent}% Completed` : `${exerciseCount} Exercises`}
            </Text>
          </View>
          <PillButton
            title={percent && percent > 0 ? 'CONTINUE' : 'START'}
            variant="white"
            onPress={onContinue ?? onPress}
            style={styles.cta}
            textStyle={{ fontSize: 13, paddingHorizontal: 0 }}
          />
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <View style={[styles.card, styles.lockedCard]}>
      <View>
        <Text style={styles.title}>Day {day.dayNumber}</Text>
        <Text style={styles.subtitle}>Locked</Text>
      </View>
      <Ionicons name="lock-closed-outline" size={20} color={colors.textMuted} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  lockedCard: {
    opacity: 0.65,
  },
  activeCard: {
    borderRadius: radii.card,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    ...typography.section,
    color: colors.black,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  activeTitle: {
    ...typography.section,
    color: colors.white,
  },
  activeSub: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
  check: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cta: {
    minHeight: 42,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
});
