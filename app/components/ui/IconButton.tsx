import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '@/constants/theme';

interface IconButtonProps {
  name: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  size?: number;
  color?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  hitSlop?: number;
}

export function IconButton({
  name,
  onPress,
  size = 20,
  color = colors.text,
  backgroundColor = colors.softBg,
  style,
  hitSlop = 8,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={hitSlop}
      style={[styles.btn, { backgroundColor }, style]}>
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
}

export function CircleIcon({
  name,
  size = 18,
  color = colors.primary,
  backgroundColor = colors.primarySoft,
  style,
}: Omit<IconButtonProps, 'onPress'>) {
  return (
    <View style={[styles.btn, { backgroundColor }, style]}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
