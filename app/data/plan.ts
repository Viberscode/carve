import type { BrowseRoutine, Day, Exercise, Plan } from '@/types';
import { gradients } from '@/constants/theme';

export const exercises: Record<string, Exercise> = {
  jaw_release: {
    id: 'jaw_release',
    name: 'JAW RELEASE',
    category: 'face',
    durationSeconds: 20,
    focusAreas: ['Masseter', 'Jawline'],
    animationEmoji: '😮',
    instructions:
      'N-stretch (orofacial PT): tongue stays on the palate while you open the jaw in a straight line. Softens the masseter — you are easing tension, not reshaping bone.',
    howToSteps: [
      'Sit tall. Teeth slightly apart; lips can rest together. Fingertips on the jaw hinges.',
      'Place the tongue tip on the palate just behind the upper front teeth (the “N” sound).',
      'Open the jaw straight down about 2 inches without dropping the tongue. Hold ~6 seconds.',
      'Close slowly and do not let the teeth touch. Repeat; stop if you feel joint pain.',
    ],
    commonMistakes: [
      {
        title: 'Pressing too hard',
        description: 'Firm pressure should feel relieving, never sharp. Ease off if you feel joint pain.',
      },
      {
        title: 'Clenching while massaging',
        description: 'Keep teeth slightly apart so the masseter can actually release.',
      },
    ],
    breathingTips: ['Inhale through the nose for 4 counts.', 'Exhale slowly as you soften the jaw.'],
  },
  chin_tucks: {
    id: 'chin_tucks',
    name: 'CHIN TUCKS',
    category: 'face',
    reps: 12,
    focusAreas: ['Platysma', 'Neck posture'],
    animationEmoji: '🦢',
    instructions:
      'Cervical retraction: glide the head straight back (horizontal “drawer close”), not a nod. Trains deep neck flexors and posture — it does not change jaw bone.',
    howToSteps: [
      'Sit or stand tall. Eyes look straight ahead at the horizon — not down, not up.',
      'Slide the whole head straight back, as if making a gentle double chin.',
      'Keep the jaw unclenched and shoulders heavy. Hold 2–5 seconds.',
      'Return slowly to stacked posture. Repeat 12 times. Stop if you feel throat pain or dizziness.',
    ],
    commonMistakes: [
      {
        title: 'Tucking the chin down',
        description: 'Move straight back, not down. Downward tuck strains the neck.',
      },
      {
        title: 'Shrugging shoulders',
        description: 'Keep shoulders heavy and soft throughout.',
      },
    ],
    breathingTips: ['Exhale on the tuck.', 'Inhale as you return to neutral.'],
  },
  cheek_lift: {
    id: 'cheek_lift',
    name: 'CHEEK LIFT',
    category: 'face',
    reps: 10,
    focusAreas: ['Zygomaticus', 'Mid-face'],
    animationEmoji: '😊',
    instructions:
      'Zygomaticus cheek lift: smile and raise the cheeks toward the eyes while the forehead stays relaxed.',
    howToSteps: [
      'Sit tall. Open the eyes without wrinkling the forehead.',
      'Smile and lift both cheeks equally toward the eyes.',
      'Place fingertips under the cheekbones and cue a 45° lift. Hold 3–10 seconds.',
      'Relax fully, then repeat 10 times. Do not overstretch the mouth corners.',
    ],
    commonMistakes: [
      {
        title: 'Crowding the eyes',
        description: 'Lift cheeks without squinting hard — keep a soft gaze.',
      },
      {
        title: 'Overstretching the mouth',
        description: 'A comfortable wide smile is enough; avoid strain at the corners.',
      },
    ],
    breathingTips: ['Breathe normally; avoid holding your breath on the hold.'],
  },
  eye_brightener: {
    id: 'eye_brightener',
    name: 'EYE BRIGHTENER',
    category: 'face',
    durationSeconds: 30,
    focusAreas: ['Orbicularis oculi', 'Under-eye'],
    animationEmoji: '👁️',
    instructions:
      'Lymph-style under-eye taps plus complete blinks. Feather-light only — never pull delicate skin.',
    howToSteps: [
      'Use the ring fingers (lightest touch) at the inner under-eye.',
      'Tap from inner corner → middle → outer corner. Do not drag.',
      'Then do 10 slow, complete blinks (full close, then open).',
      'Optional: 5 soft squint-and-release reps. Stop if the area feels irritated.',
    ],
    commonMistakes: [
      {
        title: 'Pulling the skin',
        description: 'Taps should be feather-light. Never drag delicate under-eye skin.',
      },
      {
        title: 'Rubbing hard',
        description: 'Skip vigorous rubbing — it can increase puffiness.',
      },
    ],
    breathingTips: ['Slow nasal breathing keeps the face relaxed.'],
  },
  lip_seal: {
    id: 'lip_seal',
    name: 'LIP SEAL HOLD',
    category: 'face',
    durationSeconds: 40,
    focusAreas: ['Orbicularis oris', 'Tongue posture'],
    animationEmoji: '🤐',
    instructions:
      'Orofacial rest posture: lips sealed, tongue on the palate, teeth slightly apart, nasal breathing only.',
    howToSteps: [
      'Seal the lips lightly — do not press or purse hard.',
      'Keep molars 2–3 mm apart (not clenched).',
      'Suction the whole tongue to the palate; tip just behind the upper front teeth, not pushing on them.',
      'Breathe quietly through the nose for 40 seconds. If you need a mouth breath, reset and restart.',
    ],
    commonMistakes: [
      {
        title: 'Clenching the jaw',
        description: 'Lips sealed does not mean teeth clenched.',
      },
      {
        title: 'Mouth breathing mid-hold',
        description: 'If you need air, reset and restart — don’t cheat through the mouth.',
      },
    ],
    breathingTips: ['Quiet nasal inhales and exhales only.', 'Keep shoulders soft.'],
  },
  neck_glide: {
    id: 'neck_glide',
    name: 'NECK GLIDE',
    category: 'face',
    reps: 8,
    eachSide: true,
    focusAreas: ['Platysma', 'Jawline'],
    animationEmoji: '🪞',
    instructions:
      'Upward neck glides with a slight head tilt. Always travel collarbone → jaw — never drag down.',
    howToSteps: [
      'Sit tall. Tilt the head slightly away from the working side — do not crank the neck.',
      'Start fingertips at the collarbone with light pressure.',
      'Glide up the side of the neck to the jaw angle / under the ear.',
      '8 strokes each side. Stop if you feel dizziness, numbness, or sharp pain.',
    ],
    commonMistakes: [
      {
        title: 'Overstretching the neck',
        description: 'A gentle tilt is enough. Forced stretches can strain soft tissue.',
      },
      {
        title: 'Dragging downward',
        description: 'Always glide upward to support drainage and lift.',
      },
    ],
    breathingTips: ['Exhale on each upward glide.'],
  },
  humming_resonance: {
    id: 'humming_resonance',
    name: 'HUMMING RESONANCE',
    category: 'voice',
    durationSeconds: 45,
    focusAreas: ['Vocal folds', 'Facial resonance'],
    animationEmoji: '🎵',
    instructions:
      'Closed-mouth hum (SOVT): lips together, jaw loose, buzz in the face and chest. Trains resonance — not larynx size.',
    howToSteps: [
      'Sit tall. Inhale quietly through the nose (belly/ribs, not shoulders).',
      'Close the lips gently; keep a small space between the back teeth so the jaw is not clenched.',
      'Hum “mmm” on a comfortable mid pitch 5–8 seconds. Feel buzz on lips, nose, cheekbones, and/or chest.',
      'Repeat for 45 seconds. If it feels strained or hoarse, stop and rest.',
    ],
    commonMistakes: [
      {
        title: 'Forcing the voice too low',
        description: 'Stay in a comfortable range. Strain or hoarseness means stop and rest.',
      },
      {
        title: 'Tight throat',
        description: 'Keep the neck soft; resonance should feel easy, not pressed.',
      },
    ],
    breathingTips: [
      'Inhale low into the ribs/diaphragm.',
      'Exhale steadily on the hum without shoulder lift.',
    ],
  },
  diaphragmatic_breath: {
    id: 'diaphragmatic_breath',
    name: 'DIAPHRAGM BREATH',
    category: 'voice',
    durationSeconds: 60,
    focusAreas: ['Diaphragm', 'Breath support'],
    animationEmoji: '🌬️',
    instructions:
      'Speech-therapy belly breathing: the belly expands on inhale, chest stays quiet, then a long easy exhale powers the voice.',
    howToSteps: [
      'Sit tall. One hand on the belly, one on the upper chest.',
      'Inhale through the nose for 4 counts — only the belly hand should rise. Shoulders stay down.',
      'Pause briefly, then exhale 6 counts on a soft “sss” (or easy “ah”) as the belly falls.',
      'Repeat for 1 minute. Never squeeze the last air out or train through persistent hoarseness.',
    ],
    commonMistakes: [
      {
        title: 'Chest-only breathing',
        description: 'If shoulders rise first, reset and lead with the belly/ribs.',
      },
      {
        title: 'Pushing out of air',
        description: 'End the exhale before you squeeze or gasp.',
      },
    ],
    breathingTips: ['Keep jaw and tongue relaxed.', 'Never train through pain or persistent hoarseness — see a voice coach or ENT.'],
  },
};

export const plan: Plan = {
  id: 'jawline_30',
  title: 'Sculpted Jaw in 30 Days',
  subtitle: 'Jawline Focus',
  goalTags: ['Jawline definition', 'Reduce puffiness', 'Deeper voice'],
  totalDays: 30,
  difficulty: 'Beginner',
};

const dayExerciseSets: string[][] = [
  ['jaw_release', 'chin_tucks', 'cheek_lift', 'eye_brightener', 'lip_seal', 'neck_glide', 'humming_resonance', 'diaphragmatic_breath'],
  ['chin_tucks', 'jaw_release', 'neck_glide', 'cheek_lift', 'lip_seal', 'eye_brightener', 'humming_resonance'],
  ['cheek_lift', 'eye_brightener', 'chin_tucks', 'jaw_release', 'neck_glide', 'lip_seal', 'diaphragmatic_breath', 'humming_resonance'],
  ['jaw_release', 'neck_glide', 'chin_tucks', 'cheek_lift', 'eye_brightener', 'humming_resonance'],
  ['lip_seal', 'chin_tucks', 'jaw_release', 'neck_glide', 'cheek_lift', 'diaphragmatic_breath'],
  ['eye_brightener', 'cheek_lift', 'chin_tucks', 'jaw_release', 'lip_seal', 'neck_glide', 'humming_resonance'],
];

function buildDays(): Day[] {
  const days: Day[] = [];
  for (let n = 1; n <= 30; n++) {
    const set = dayExerciseSets[(n - 1) % dayExerciseSets.length] ?? dayExerciseSets[0];

    days.push({
      id: `day_${n}`,
      planId: plan.id,
      dayNumber: n,
      isRestDay: false,
      status: n === 1 ? 'active' : 'locked',
      exerciseIds: set,
    });
  }
  return days;
}

export const days: Day[] = buildDays();

export const browsePushLimits: BrowseRoutine[] = [
  {
    id: 'jawline_focus',
    title: 'Jawline Focus',
    meta: 'Intermediate • 12 Min',
    gradient: gradients.purple,
    emoji: '💎',
  },
  {
    id: 'eye_brightening',
    title: 'Eye Brightening',
    meta: 'Beginner • 8 Min',
    gradient: gradients.green,
    emoji: '✨',
  },
];

export const browseVoice: BrowseRoutine[] = [
  {
    id: 'deep_voice',
    title: 'Deep Voice Drills',
    meta: 'Beginner • 10 Min',
    gradient: gradients.teal,
    emoji: '🎙️',
  },
  {
    id: 'face_reset',
    title: '5-Min Face Reset',
    meta: 'Beginner • 5 Min',
    gradient: gradients.hero,
    emoji: '🧘',
  },
];

export function getExercisesForDay(day: Day): Exercise[] {
  return day.exerciseIds.map((id) => exercises[id]).filter(Boolean);
}

export function formatMetric(exercise: Exercise): string {
  if (exercise.durationSeconds != null) {
    const m = Math.floor(exercise.durationSeconds / 60);
    const s = exercise.durationSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  if (exercise.reps != null) {
    return exercise.eachSide ? `x ${exercise.reps} each` : `x ${exercise.reps}`;
  }
  return '';
}

export function estimateSessionMinutes(dayExercises: Exercise[]): number {
  const seconds = dayExercises.reduce((sum, ex) => {
    if (ex.durationSeconds) return sum + ex.durationSeconds;
    if (ex.reps) return sum + ex.reps * 3;
    return sum;
  }, 0);
  return Math.max(1, Math.round(seconds / 60));
}
