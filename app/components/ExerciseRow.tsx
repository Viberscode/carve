import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ExerciseCoachAnimation } from '@/components/ExerciseCoachAnimation';
import { colors, typography } from '@/constants/theme';
import { formatMetric } from '@/data/plan';
import type { Exercise } from '@/types';

interface ExerciseRowProps {
  exercise: Exercise;
  onPress?: () => void;
  complete?: boolean;
}

export function ExerciseRow({ exercise, onPress, complete }: ExerciseRowProps) {
  return (
    <Pressable onPress={onPress} style={[styles.row, complete && styles.rowDone]}>
      <View style={styles.thumb}>
        <ExerciseCoachAnimation exerciseId={exercise.id} playing size="thumb" />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.metric}>{formatMetric(exercise)}</Text>
        <View style={styles.divider} />
      </View>
      {complete ? (
        <View style={styles.check}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 2,
  },
  rowDone: {
    opacity: 0.72,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 18,
    overflow: 'hidden',
    marginRight: 14,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    ...typography.section,
    fontSize: 15,
    fontWeight: '700',
    color: '#2A2A2E',
    letterSpacing: 0.2,
  },
  metric: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginTop: 14,
  },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  checkMark: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 14,
  },
});
