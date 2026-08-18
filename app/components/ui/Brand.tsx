import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, gradients, typography } from '@/constants/theme';
import type { Difficulty } from '@/types';

interface DifficultyBadgeProps {
  level: Difficulty;
  light?: boolean;
}

export function DifficultyBadge({ level, light }: DifficultyBadgeProps) {
  const bolts = level === 'Beginner' ? 1 : level === 'Intermediate' ? 2 : 3;
  return (
    <View style={styles.row}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Text
          key={i}
          style={{
            color: light
              ? i < bolts
                ? colors.white
                : 'rgba(255,255,255,0.35)'
              : i < bolts
                ? colors.primary
                : colors.border,
            fontSize: 12,
            marginRight: 2,
          }}>
          ⚡
        </Text>
      ))}
      <Text style={[styles.label, light && styles.labelLight]}>{level}</Text>
    </View>
  );
}

interface SectionLabelProps {
  children: string;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return <Text style={styles.section}>{children}</Text>;
}

export function DotPattern() {
  return (
    <View style={styles.dots} pointerEvents="none">
      {Array.from({ length: 6 }).map((_, row) => (
        <View key={row} style={styles.dotRow}>
          {Array.from({ length: 8 }).map((_, col) => (
            <View key={col} style={styles.dot} />
          ))}
        </View>
      ))}
    </View>
  );
}

export function HeroGradient({
  children,
  style,
}: {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <LinearGradient
      colors={[...gradients.hero]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}>
      <DotPattern />
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...typography.caption,
    color: colors.primary,
    marginLeft: 4,
    fontWeight: '700',
  },
  labelLight: {
    color: colors.white,
  },
  section: {
    ...typography.label,
    color: colors.primary,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  dots: {
    position: 'absolute',
    right: 0,
    bottom: 20,
    opacity: 0.2,
  },
  dotRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.white,
    marginRight: 10,
  },
});
