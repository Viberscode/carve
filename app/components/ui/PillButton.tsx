import { LinearGradient } from 'expo-linear-gradient';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { colors, gradients, radii, typography } from '@/constants/theme';

type Variant = 'primary' | 'white' | 'ghost' | 'muted';

interface PillButtonProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
}

export function PillButton({
  title,
  subtitle,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  disabled,
  loading,
}: PillButtonProps) {
  const titleStyle =
    variant === 'primary'
      ? styles.textPrimary
      : variant === 'white'
        ? styles.textOnWhite
        : variant === 'muted'
          ? styles.textMuted
          : styles.textGhost;

  const inner = loading ? (
    <ActivityIndicator color={variant === 'primary' ? colors.white : colors.primary} />
  ) : (
    <>
      <Text style={[titleStyle, textStyle]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, variant !== 'primary' && styles.subtitleOnLight]}>
          {subtitle}
        </Text>
      ) : null}
    </>
  );

  if (variant === 'primary') {
    return (
      <Pressable onPress={onPress} disabled={disabled || loading} style={[styles.shadow, style]}>
        <LinearGradient
          colors={[...gradients.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.base, subtitle && styles.withSubtitle, disabled && styles.disabled]}>
          {inner}
        </LinearGradient>
      </Pressable>
    );
  }

  const bg =
    variant === 'white' ? styles.white : variant === 'muted' ? styles.muted : styles.ghost;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.base, bg, subtitle && styles.withSubtitle, disabled && styles.disabled, style]}>
      {inner}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.pill,
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
  },
  withSubtitle: {
    paddingVertical: 12,
    gap: 2,
  },
  shadow: {
    borderRadius: radii.pill,
  },
  white: {
    backgroundColor: colors.white,
  },
  muted: {
    backgroundColor: colors.softBg,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  textPrimary: {
    ...typography.button,
    color: colors.white,
    textTransform: 'uppercase',
  },
  textOnWhite: {
    ...typography.button,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  textMuted: {
    ...typography.button,
    color: colors.text,
    textTransform: 'none',
    letterSpacing: 0,
    fontWeight: '700',
  },
  textGhost: {
    ...typography.button,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.88)',
    letterSpacing: 0,
    textTransform: 'none',
  },
  subtitleOnLight: {
    color: colors.textSecondary,
  },
});
