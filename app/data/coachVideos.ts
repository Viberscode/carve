import type { AVPlaybackSource } from 'expo-av';

/** Local looping demo clips, keyed by slug. */
export const coachVideos: Record<string, AVPlaybackSource> = {
  big_smile: require('../assets/videos/big_smile.mp4'),
  cheek_puffs: require('../assets/videos/cheek_puffs.mp4'),
  chin_tucks: require('../assets/videos/chin_tucks.mp4'),
  cobra_stretch: require('../assets/videos/cobra_stretch.mp4'),
  eye_de_puff: require('../assets/videos/eye_de_puff.mp4'),
  eyebrow_lift: require('../assets/videos/eyebrow_lift.mp4'),
  facial_gua_sha: require('../assets/videos/facial_gua_sha.mp4'),
  fish_face: require('../assets/videos/fish_face.mp4'),
  generic: require('../assets/videos/generic.mp4'),
  jaw_resistance: require('../assets/videos/jaw_resistance.mp4'),
  jaw_stretch: require('../assets/videos/jaw_stretch.mp4'),
  mewing: require('../assets/videos/mewing.mp4'),
  mewing_alt: require('../assets/videos/mewing_alt.mp4'),
  neck_curl_ups: require('../assets/videos/neck_curl_ups.mp4'),
  neck_rotation: require('../assets/videos/neck_rotation.mp4'),
  straw_pull: require('../assets/videos/straw_pull.mp4'),
  vowel: require('../assets/videos/vowel.mp4'),
};

const RULES: [string, string][] = [
  ['chin tuck', 'chin_tucks'],
  ['cheek puff', 'cheek_puffs'],
  ['cobra', 'cobra_stretch'],
  ['eyebrow', 'eyebrow_lift'],
  ['jaw resist', 'jaw_resistance'],
  ['neck curl', 'neck_curl_ups'],
  ['fish face', 'fish_face'],
  ['vowel', 'vowel'],
  ['neck rotat', 'neck_rotation'],
  ['straw', 'straw_pull'],
  ['mewing', 'mewing'],
  ['tongue posture', 'mewing'],
  ['tongue stretch', 'mewing_alt'],
  ['gua', 'facial_gua_sha'],
  ['eye de', 'eye_de_puff'],
  ['de-puff', 'eye_de_puff'],
  ['depuff', 'eye_de_puff'],
  ['big smile', 'big_smile'],
  ['smile', 'big_smile'],
  ['jaw stretch', 'jaw_stretch'],
  ['jaw circle', 'jaw_stretch'],
  ['silent scream', 'jaw_stretch'],
  ['chew', 'jaw_stretch'],
  ['thumb', 'jaw_resistance'],
  ['bite', 'jaw_resistance'],
  ['pucker', 'straw_pull'],
  ['kiss', 'straw_pull'],
  ['o-e', 'vowel'],
  ['lion', 'fish_face'],
  ['collarbone', 'cobra_stretch'],
  ['platysma', 'neck_curl_ups'],
  ['jaw_release', 'jaw_stretch'],
  ['cheek_lift', 'big_smile'],
  ['eye_brightener', 'eyebrow_lift'],
  ['lip_seal', 'mewing'],
  ['neck_glide', 'neck_rotation'],
  ['humming', 'vowel'],
  ['diaphrag', 'generic'],
  ['breath', 'generic'],
  ['neck', 'neck_rotation'],
  ['eye', 'eyebrow_lift'],
  ['cheek', 'cheek_puffs'],
  ['jaw', 'jaw_stretch'],
  ['lip', 'straw_pull'],
  ['tongue', 'mewing'],
  ['massage', 'facial_gua_sha'],
];

export function videoSlugForName(name: string): string {
  const n = (name || '').toLowerCase().replace(/_/g, ' ');
  for (const [needle, slug] of RULES) {
    if (n.includes(needle.replace(/_/g, ' ')) || name.toLowerCase().includes(needle)) {
      return slug;
    }
  }
  return 'generic';
}

export function getCoachVideo(exerciseIdOrName: string) {
  const slug = videoSlugForName(exerciseIdOrName);
  return coachVideos[slug] ?? coachVideos.generic;
}
