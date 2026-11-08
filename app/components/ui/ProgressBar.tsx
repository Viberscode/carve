import { StyleSheet, View } from 'react-native';

import { colors, radii } from '@/constants/theme';

interface ProgressBarProps {
  progress: number;
  height?: number;
  trackColor?: string;
  fillColor?: string;
  light?: boolean;
}

export function ProgressBar({
  progress,
  height = 4,
  trackColor,
  fillColor,
  light,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  return (
    <View
      style={[
        styles.track,
        {
          height,
          backgroundColor: trackColor ?? (light ? 'rgba(255,255,255,0.35)' : colors.border),
        },
      ]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clamped * 100}%`,
            backgroundColor: fillColor ?? (light ? colors.white : colors.primary),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radii.pill,
  },
});
