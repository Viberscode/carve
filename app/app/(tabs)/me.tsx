import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radii, typography } from '@/constants/theme';
import { plan } from '@/data/plan';
import { useCarveStore } from '@/store/useCarveStore';

export default function MeScreen() {
  const insets = useSafeAreaInsets();
  const settings = useCarveStore((s) => s.settings);
  const updateSettings = useCarveStore((s) => s.updateSettings);
  const streak = useCarveStore((s) => s.streak);

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 32 }}>
        <Text style={styles.title}>Me</Text>

        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 32 }}>🪞</Text>
          </View>
          <View>
            <Text style={styles.name}>CARVE Athlete</Text>
            <Text style={styles.meta}>{plan.title}</Text>
            <Text style={styles.meta}>{streak}-day streak</Text>
          </View>
        </View>

        <Text style={styles.section}>Preferences</Text>
        <SettingRow
          icon="camera-reverse-outline"
          label="Front-camera mirror mode"
          value={settings.mirrorMode}
          onChange={(v) => updateSettings({ mirrorMode: v })}
        />
        <SettingRow
          icon="mic-outline"
          label="Coach voice"
          value={settings.coachVoice}
          onChange={(v) => updateSettings({ coachVoice: v })}
        />
        <SettingRow
          icon="musical-notes-outline"
          label="Background music"
          value={settings.backgroundMusic}
          onChange={(v) => updateSettings({ backgroundMusic: v })}
        />
        <SettingRow
          icon="notifications-outline"
          label="Daily reminders"
          value={settings.remindersEnabled}
          onChange={(v) => updateSettings({ remindersEnabled: v })}
        />

        <Text style={styles.section}>Plan</Text>
        <MenuRow icon="refresh-outline" label="Restart plan" />
        <MenuRow icon="flag-outline" label="Switch goal" />
        <MenuRow icon="time-outline" label="Reminder schedule" />

        <Text style={styles.section}>Privacy</Text>
        <View style={styles.privacy}>
          <Ionicons name="lock-closed-outline" size={18} color={colors.primary} />
          <Text style={styles.privacyText}>
            Face photos and voice recordings stay on this device unless you explicitly enable backup.
            CARVE never claims to change bone structure.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function SettingRow({
  icon,
  label,
  value,
  onChange,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.setting}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={20} color={colors.primary} />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ true: colors.primary, false: colors.border }}
      />
    </View>
  );
}

function MenuRow({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <Pressable style={styles.setting}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={20} color={colors.primary} />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  title: { ...typography.hero, fontSize: 28, color: colors.black, marginBottom: 16 },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 28,
    padding: 16,
    borderRadius: radii.card,
    backgroundColor: colors.softBg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { ...typography.section, color: colors.black },
  meta: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  section: {
    ...typography.label,
    color: colors.primary,
    marginBottom: 10,
    marginTop: 8,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  settingLabel: { fontSize: 15, fontWeight: '600', color: colors.text },
  privacy: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: colors.primarySoft,
    padding: 14,
    borderRadius: radii.lg,
    marginTop: 4,
  },
  privacyText: { flex: 1, ...typography.caption, color: colors.primaryDark, lineHeight: 18 },
});
