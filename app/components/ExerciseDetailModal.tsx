import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radii, typography } from '@/constants/theme';
import { formatMetric } from '@/data/plan';
import type { Exercise } from '@/types';
import { ExerciseCoachAnimation } from './ExerciseCoachAnimation';
import { PillButton } from './ui/PillButton';
import { SectionLabel } from './ui/Brand';
import { IconButton } from './ui/IconButton';

type Tab = 'Animation' | 'Muscle' | 'How to do';

interface Props {
  visible: boolean;
  exercise: Exercise | null;
  index: number;
  total: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onReplace?: () => void;
}

export function ExerciseDetailModal({
  visible,
  exercise,
  index,
  total,
  onClose,
  onPrev,
  onNext,
  onReplace,
}: Props) {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>('Animation');
  const [reps, setReps] = useState(0);

  useEffect(() => {
    if (exercise) {
      setTab('Animation');
      setReps(exercise.reps ?? Math.round((exercise.durationSeconds ?? 20) / 5));
    }
  }, [exercise?.id]);

  if (!exercise) return null;

  const metricLabel = exercise.reps != null
    ? `REPEATS${exercise.eachSide ? ' (each side)' : ''}`
    : 'DURATION';

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>
              {exercise.name}
            </Text>
            <Pressable onPress={onReplace} style={styles.replace}>
              <Ionicons name="refresh" size={20} color={colors.primary} />
              <Text style={styles.replaceText}>Replace</Text>
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            {tab === 'Animation' && (
              <View style={styles.media}>
                <ExerciseCoachAnimation exerciseId={exercise.id} playing={visible} size="card" />
              </View>
            )}

            {tab === 'Muscle' && (
              <View style={styles.media}>
                <Text style={{ fontSize: 64 }}>
                  {exercise.category === 'voice' ? '🗣️' : '🙂'}
                </Text>
                <Text style={styles.mediaHint}>
                  {exercise.category === 'voice'
                    ? 'Vocal tract focus diagram'
                    : 'Face muscle focus diagram'}
                </Text>
                <View style={styles.diagramRow}>
                  <View style={styles.diagramBox}>
                    <Text style={styles.diagramLabel}>Front</Text>
                    <Text style={{ fontSize: 40 }}>{exercise.category === 'voice' ? '🫁' : '👤'}</Text>
                  </View>
                  <View style={styles.diagramBox}>
                    <Text style={styles.diagramLabel}>
                      {exercise.category === 'voice' ? 'Side' : 'Profile'}
                    </Text>
                    <Text style={{ fontSize: 40 }}>{exercise.category === 'voice' ? '🎤' : '🎭'}</Text>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.tabs}>
              {(['Animation', 'Muscle', 'How to do'] as Tab[]).map((t) => {
                const active = tab === t;
                return (
                  <Pressable
                    key={t}
                    onPress={() => setTab(t)}
                    style={[styles.tab, active && styles.tabActive]}>
                    <Text style={[styles.tabText, active && styles.tabTextActive]}>{t}</Text>
                  </Pressable>
                );
              })}
            </View>

            {(tab === 'Animation' || tab === 'How to do') && (
              <>
                <View style={styles.rowBetween}>
                  <SectionLabel>{metricLabel}</SectionLabel>
                  <View style={styles.stepper}>
                    <Pressable
                      style={styles.stepBtn}
                      onPress={() => setReps((r) => Math.max(1, r - 1))}>
                      <Text style={styles.stepTxt}>−</Text>
                    </Pressable>
                    <Text style={styles.stepValue}>
                      {exercise.reps != null ? `x${reps}` : formatMetric(exercise)}
                    </Text>
                    <Pressable style={styles.stepBtn} onPress={() => setReps((r) => r + 1)}>
                      <Text style={styles.stepTxt}>+</Text>
                    </Pressable>
                  </View>
                </View>

                <SectionLabel>INSTRUCTIONS</SectionLabel>
                <Text style={styles.body}>{exercise.instructions}</Text>
                {exercise.howToSteps.map((step, i) => (
                  <Text key={i} style={[styles.body, { marginTop: 8 }]}>
                    {i + 1}. {step}
                  </Text>
                ))}

                <View style={{ height: 16 }} />
                <SectionLabel>FOCUS AREA</SectionLabel>
                <View style={styles.chips}>
                  {exercise.focusAreas.map((area, i) => (
                    <View key={area} style={styles.chip}>
                      <View
                        style={[
                          styles.chipDot,
                          { backgroundColor: i === 0 ? colors.primaryDark : colors.primaryMid },
                        ]}
                      />
                      <Text style={styles.chipText}>{area}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            {tab === 'Muscle' && (
              <>
                <SectionLabel>FOCUS AREA</SectionLabel>
                <View style={styles.chips}>
                  {exercise.focusAreas.map((area, i) => (
                    <View key={area} style={styles.chip}>
                      <View
                        style={[
                          styles.chipDot,
                          { backgroundColor: i === 0 ? colors.primaryDark : colors.primaryMid },
                        ]}
                      />
                      <Text style={styles.chipText}>{area}</Text>
                    </View>
                  ))}
                </View>
                <Text style={[styles.body, { marginTop: 12 }]}>
                  Highlighted areas show soft tissue and habits you are training — tone, posture, and
                  expression — not bone structure.
                </Text>
              </>
            )}

            <View style={{ height: 20 }} />
            <SectionLabel>COMMON MISTAKES</SectionLabel>
            {exercise.commonMistakes.map((m, i) => (
              <View key={m.title} style={styles.mistake}>
                <View style={styles.num}>
                  <Text style={styles.numText}>{i + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.mistakeTitle}>{m.title}</Text>
                  <Text style={styles.body}>{m.description}</Text>
                </View>
              </View>
            ))}

            <View style={{ height: 12 }} />
            <SectionLabel>BREATHING TIPS</SectionLabel>
            {exercise.breathingTips.map((tip) => (
              <View key={tip} style={styles.tipRow}>
                <View style={styles.bullet} />
                <Text style={[styles.body, { flex: 1 }]}>{tip}</Text>
              </View>
            ))}
            <View style={{ height: 24 }} />
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.pager}>
              <IconButton
                name="chevron-back"
                onPress={onPrev}
                color={colors.primary}
                backgroundColor={colors.primarySoft}
                size={18}
              />
              <Text style={styles.pagerText}>
                {index + 1}/{total}
              </Text>
              <IconButton
                name="chevron-forward"
                onPress={onNext}
                color={colors.primary}
                backgroundColor={colors.primarySoft}
                size={18}
              />
            </View>
            <PillButton title="CLOSE" onPress={onClose} style={{ flex: 1, marginLeft: 16 }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    maxHeight: '92%',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    ...typography.title,
    flex: 1,
    color: colors.black,
    marginRight: 12,
  },
  replace: {
    alignItems: 'center',
    paddingTop: 4,
  },
  replaceText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  scroll: {
    paddingBottom: 8,
  },
  media: {
    backgroundColor: colors.softBg,
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginBottom: 14,
  },
  mediaHint: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 8,
  },
  diagramRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  diagramBox: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    padding: 16,
    alignItems: 'center',
    minWidth: 110,
  },
  diagramLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.softBg,
    borderRadius: radii.pill,
    padding: 4,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radii.pill,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.white,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTxt: {
    fontSize: 20,
    color: colors.text,
    fontWeight: '600',
  },
  stepValue: {
    ...typography.section,
    minWidth: 40,
    textAlign: 'center',
  },
  body: {
    ...typography.body,
    color: colors.text,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.chipBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.pill,
  },
  chipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  mistake: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  num: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  mistakeTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: colors.black,
    marginBottom: 4,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.black,
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  pager: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pagerText: {
    ...typography.section,
    fontSize: 16,
  },
});
