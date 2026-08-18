import type { ImageSourcePropType } from 'react-native';

export interface CoachFrame {
  source: ImageSourcePropType;
  cue: string;
}

export const coachFrames: Record<string, CoachFrame[]> = {
  jaw_release: [
    { source: require('../assets/coach/jaw_release_01.png'), cue: 'Fingers on the jaw hinge. Teeth slightly apart.' },
    { source: require('../assets/coach/jaw_release_02.png'), cue: 'Tongue on the palate — the “N” position.' },
    { source: require('../assets/coach/jaw_release_03.png'), cue: 'Open straight down ~2 in. Keep the tongue up. Hold.' },
    { source: require('../assets/coach/jaw_release_04.png'), cue: 'Close slowly. Do not let the teeth click together.' },
  ],
  chin_tucks: [
    { source: require('../assets/coach/chin_tucks_01.png'), cue: 'Eyes level. Look straight ahead.' },
    { source: require('../assets/coach/chin_tucks_02.png'), cue: 'Slide the head straight back — like a drawer closing.' },
    { source: require('../assets/coach/chin_tucks_03.png'), cue: 'Hold a gentle double chin. Do not nod down.' },
    { source: require('../assets/coach/chin_tucks_04.png'), cue: 'Release to stacked posture. Shoulders stay down.' },
  ],
  cheek_lift: [
    { source: require('../assets/coach/cheek_lift_01.png'), cue: 'Face relaxed. Forehead stays smooth.' },
    { source: require('../assets/coach/cheek_lift_02.png'), cue: 'Smile and lift the cheeks toward the eyes.' },
    { source: require('../assets/coach/cheek_lift_03.png'), cue: 'Hold. Fingertips cue a 45° lift under the cheekbones.' },
    { source: require('../assets/coach/cheek_lift_04.png'), cue: 'Relax the smile. Breathe. Repeat.' },
  ],
  eye_brightener: [
    { source: require('../assets/coach/eye_brightener_01.png'), cue: 'Ring fingers at the inner under-eye. Feather-light.' },
    { source: require('../assets/coach/eye_brightener_02.png'), cue: 'Tap toward the middle. Never drag the skin.' },
    { source: require('../assets/coach/eye_brightener_03.png'), cue: 'Finish at the outer corner.' },
    { source: require('../assets/coach/eye_brightener_04.png'), cue: 'Slow complete blink. Then tap again.' },
  ],
  lip_seal: [
    { source: require('../assets/coach/lip_seal_01.png'), cue: 'Lips lightly sealed. Teeth 2–3 mm apart.' },
    { source: require('../assets/coach/lip_seal_02.png'), cue: 'Whole tongue rests on the palate (gentle suction).' },
    { source: require('../assets/coach/lip_seal_03.png'), cue: 'Breathe only through the nose.' },
    { source: require('../assets/coach/lip_seal_04.png'), cue: 'Hold the seal. Jaw stays unclenched.' },
  ],
  neck_glide: [
    { source: require('../assets/coach/neck_glide_01.png'), cue: 'Tilt slightly away. Fingers start at the collarbone.' },
    { source: require('../assets/coach/neck_glide_02.png'), cue: 'Glide UP the neck with light pressure.' },
    { source: require('../assets/coach/neck_glide_03.png'), cue: 'Finish at the jaw angle / under the ear.' },
    { source: require('../assets/coach/neck_glide_04.png'), cue: 'Switch sides. Never drag downward.' },
  ],
  humming_resonance: [
    { source: require('../assets/coach/humming_resonance_01.png'), cue: 'Lips together, jaw loose. Hand on the chest.' },
    { source: require('../assets/coach/humming_resonance_02.png'), cue: 'Hum “mmm.” Feel buzz in lips, face, and chest.' },
    { source: require('../assets/coach/humming_resonance_03.png'), cue: 'Keep the throat soft. Comfortable pitch only.' },
    { source: require('../assets/coach/humming_resonance_04.png'), cue: 'Quiet nasal inhale. Repeat the hum.' },
  ],
  diaphragmatic_breath: [
    { source: require('../assets/coach/diaphragmatic_breath_01.png'), cue: 'One hand on belly, one on chest.' },
    { source: require('../assets/coach/diaphragmatic_breath_02.png'), cue: 'Inhale 4 — belly expands. Chest stays quiet.' },
    { source: require('../assets/coach/diaphragmatic_breath_03.png'), cue: 'Shoulders stay down. Do not shrug.' },
    { source: require('../assets/coach/diaphragmatic_breath_04.png'), cue: 'Exhale 6 on a soft “sss.” Belly falls.' },
  ],
};

export function getCoachFrames(exerciseId: string): CoachFrame[] {
  if (coachFrames[exerciseId]) return coachFrames[exerciseId];
  const n = (exerciseId || '').toLowerCase();
  if (n.includes('breath') || n.includes('diaphragm')) return coachFrames.diaphragmatic_breath;
  if (n.includes('hum') || n.includes('resonance')) return coachFrames.humming_resonance;
  if (n.includes('chin')) return coachFrames.chin_tucks;
  if (n.includes('eye')) return coachFrames.eye_brightener;
  if (n.includes('neck')) return coachFrames.neck_glide;
  if (n.includes('smile') || n.includes('cheek')) return coachFrames.cheek_lift;
  if (n.includes('lip') || n.includes('tongue')) return coachFrames.lip_seal;
  return coachFrames.jaw_release;
}
