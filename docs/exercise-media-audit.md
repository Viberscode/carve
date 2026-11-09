# Exercise demo clips

Every exercise plays the demo clip from the team's original mapping. That mapping is `FACE_VIDEO_RULES` and `VOICE_GRAIN_VIDEO_RULES` in `script.js`, the same as `app/data/coachVideos.ts`. Rules are matched in order against the exercise name, and the first match wins.

All clips are 16:9 (1280×720), and the voice clips are narrated. Judge a clip from its full frame with sound. A square crop hides parts of the demonstration.

## Face Form

| Exercise | Clip (`videos/`) |
|---|---|
| Mewing | `mewing.mp4` |
| Chin Tucks | `chin_tucks.mp4` |
| Vowel Exercise, O-E Hold | `vowel.mp4` |
| Fish Face, Lion Pose | `fish_face.mp4` |
| Neck Curl-Ups, Platysma Stretch | `neck_curl_ups.mp4` |
| Jaw Resistance Push, Thumb Pulling | `jaw_resistance.mp4` |
| Cheek Puffs | `cheek_puffs.mp4` |
| Jaw Stretch & Hold, Jaw Circles, Silent Scream, Chewing Exercise | `jaw_stretch.mp4` |
| Cobra Stretch, Collarbone Backup | `cobra_stretch.mp4` |
| Tongue Stretch | `mewing_alt.mp4` |
| Big Smile Hold | `big_smile.mp4` |
| Straw Pull, Puckered Lips Hold | `straw_pull.mp4` |
| Neck Rotation Stretch | `neck_rotation.mp4` |
| Eyebrow Lift Hold | `eyebrow_lift.mp4` |
| Eye De-Puff Massage | `eye_de_puff.mp4` |
| Facial Gua Sha Massage | `facial_gua_sha.mp4` |

`generic.mp4` is the fallback for an unmatched name, or for a clip that fails to load.

## Voice Grain

Each of the 25 voice exercises has its own narrated clip in `videos/voice-grain/`, named after the exercise. Examples are `lip_trills.mp4`, `pitch_glides.mp4`, `gargling.mp4` and `pen_in_mouth.mp4`.

## Full Presence

Full Presence mixes both lists. Each face exercise plays its face clip and each voice exercise plays its narrated voice clip, the same as in its own mode.

## Exercises sharing a clip

Some exercises reuse a related clip, such as Lion Pose with `fish_face.mp4`. A dedicated clip can be added later. Put the file in `videos/`, then add a rule for that exercise above the shared rule in `FACE_VIDEO_RULES`.
