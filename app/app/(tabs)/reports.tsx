import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProgressBar } from '@/components/ui/ProgressBar';
import { colors, radii, typography } from '@/constants/theme';
import { useCarveStore } from '@/store/useCarveStore';

const DUMMY_PITCH = [148, 145, 142, 140, 138, 136, 135];

export default function ReportsScreen() {
  const insets = useSafeAreaInsets();
  const streak = useCarveStore((s) => s.streak);
  const currentDay = useCarveStore((s) => s.currentDayNumber);
  const sessionsDone = Math.max(0, currentDay - 1);
  const isNewUser = streak === 0 && sessionsDone === 0;
  const maxPitch = Math.max(...DUMMY_PITCH);
  const minPitch = Math.min(...DUMMY_PITCH);

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 32 }}>
        <Text style={styles.title}>Reports</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="flame" size={22} color={colors.streak} />
            <Text style={styles.cardTitle}>  {streak}-day streak</Text>
          </View>
          <Text style={styles.meta}>
            {sessionsDone === 0
              ? 'No sessions yet · start Day 1'
              : `${sessionsDone} sessions completed · keep going`}
          </Text>
          <View style={styles.calendar}>
            {Array.from({ length: 14 }).map((_, i) => {
              const isToday = i === 13;
              const done = streak > 0 && i >= 13 - streak && i < 13;
              return (
                <View
                  key={i}
                  style={[styles.dayDot, done && styles.dayDotDone, isToday && styles.dayDotToday]}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Progress photos</Text>
          <Text style={styles.meta}>Weekly front-facing photos stay on-device</Text>
          <View style={styles.photoRow}>
            <View style={styles.photoSlot}>
              <Text style={styles.photoLabel}>Week 1</Text>
              <Ionicons name="camera-outline" size={36} color={colors.primary} />
              <Text style={styles.addPhoto}>Add photo</Text>
            </View>
            <View style={styles.photoSlot}>
              <Text style={styles.photoLabel}>Week 2</Text>
              <Ionicons name="lock-closed-outline" size={28} color={colors.textMuted} />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Voice pitch trend</Text>
          <Text style={styles.meta}>
            Avg speaking pitch (Hz) — habitual range only, not larynx size
          </Text>
          {isNewUser ? (
            <Text style={styles.emptyChart}>Complete a voice session to see your pitch trend.</Text>
          ) : (
            <View style={styles.chart}>
              {DUMMY_PITCH.map((hz, i) => {
                const h = ((hz - minPitch + 4) / (maxPitch - minPitch + 8)) * 80;
                return (
                  <View key={i} style={styles.barWrap}>
                    <View style={[styles.bar, { height: h }]} />
                    <Text style={styles.barLabel}>{hz}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Training volume</Text>
          <Text style={styles.statBig}>{(currentDay - 1) * 9} min</Text>
          <Text style={styles.meta}>Total guided minutes</Text>
          <View style={styles.volumeBar}>
            <ProgressBar progress={(currentDay - 1) / 30} height={6} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  title: { ...typography.hero, fontSize: 28, color: colors.black, marginBottom: 16 },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: 18,
    marginBottom: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { ...typography.section, color: colors.black },
  meta: { ...typography.caption, color: colors.textSecondary, marginTop: 6, marginBottom: 0 },
  calendar: { flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', gap: 4, marginTop: 14 },
  dayDot: {
    flex: 1,
    maxWidth: 18,
    aspectRatio: 1,
    height: undefined,
    borderRadius: 9,
    backgroundColor: colors.softBg,
  },
  dayDotDone: { backgroundColor: colors.primarySoft, borderWidth: 2, borderColor: colors.primary },
  dayDotToday: { backgroundColor: colors.primary },
  photoRow: { flexDirection: 'row', gap: 12 },
  photoSlot: {
    flex: 1,
    height: 140,
    borderRadius: radii.lg,
    backgroundColor: colors.softBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoLabel: { position: 'absolute', top: 10, left: 12, ...typography.caption, color: colors.textSecondary },
  addPhoto: { marginTop: 6, color: colors.primary, fontWeight: '700', fontSize: 12 },
  emptyChart: {
    ...typography.caption,
    color: colors.textSecondary,
    backgroundColor: colors.softBg,
    padding: 14,
    borderRadius: radii.lg,
    marginTop: 12,
    textAlign: 'center',
  },
  chart: { flexDirection: 'row', alignItems: 'flex-end', height: 110, gap: 8 },
  barWrap: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  bar: {
    width: '70%',
    backgroundColor: colors.primary,
    borderRadius: 6,
    marginBottom: 6,
  },
  barLabel: { fontSize: 10, color: colors.textSecondary, fontWeight: '600' },
  statBig: { fontSize: 36, fontWeight: '800', color: colors.primary, marginTop: 12, marginBottom: 6, lineHeight: 40 },
  volumeBar: { marginTop: 14 },
});
