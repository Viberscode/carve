import { ResizeMode, Video } from 'expo-av';
import { StyleSheet, View } from 'react-native';

import { colors, radii } from '@/constants/theme';
import { getCoachVideo } from '@/data/coachVideos';

interface Props {
  exerciseId: string;
  playing?: boolean;
  size?: 'stage' | 'card' | 'thumb';
}

export function ExerciseCoachAnimation({
  exerciseId,
  playing = true,
  size = 'stage',
}: Props) {
  const source = getCoachVideo(exerciseId);

  return (
    <View style={[styles.box, styles[size]]}>
      <Video
        source={source}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay={playing}
        isLooping
        isMuted
        useNativeControls={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.softBg,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  stage: {
    width: '100%',
    aspectRatio: 1,
    maxHeight: 360,
  },
  card: {
    width: '100%',
    aspectRatio: 1,
    maxHeight: 240,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: radii.md,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
