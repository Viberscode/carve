export const colors = {
  primary: '#1E3FE0',
  primaryDark: '#0B1F8F',
  primarySoft: '#E8EEFF',
  primaryMid: '#4A6CF0',
  white: '#FFFFFF',
  black: '#111111',
  text: '#1A1A1A',
  textSecondary: '#8E8E93',
  textMuted: '#AEAEB2',
  border: '#E5E5EA',
  softBg: '#F5F5F7',
  chipBg: '#EFEFF4',
  overlay: 'rgba(0,0,0,0.45)',
  streak: '#FF6B35',
  success: '#34C759',
  purple: '#7B5CFF',
  green: '#2BB673',
  lavender: '#9B7BFF',
} as const;

export const gradients = {
  primary: [colors.primary, colors.primaryDark] as const,
  hero: ['#2A4DE8', '#0B1F8F'] as const,
  purple: ['#9B7BFF', '#6B4EFF'] as const,
  green: ['#3DD68C', '#1FA35A'] as const,
  teal: ['#5B9CFF', '#2E6BE0'] as const,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  card: 24,
  sheet: 28,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const typography = {
  hero: { fontSize: 32, fontWeight: '800' as const, letterSpacing: -0.5 },
  title: { fontSize: 24, fontWeight: '800' as const, letterSpacing: -0.3 },
  section: { fontSize: 18, fontWeight: '700' as const },
  body: { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
  label: { fontSize: 13, fontWeight: '700' as const, letterSpacing: 0.6 },
  caption: { fontSize: 13, fontWeight: '500' as const },
  button: { fontSize: 16, fontWeight: '800' as const, letterSpacing: 0.8 },
};

export const theme = { colors, gradients, radii, spacing, typography };
