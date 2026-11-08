# Exercise media audit

Every exercise in the Face Form and Voice Grain roadmaps, checked against what its demo video actually shows. Full Presence uses the same exercises.

The mapping lives in `FACE_VIDEO_RULES` and `VOICE_GRAIN_VIDEO_RULES` in `script.js`. An exercise with no matching clip shows a "Demo coming soon · follow the steps" card. It no longer shows a wrong video.

## Clips whose filename doesn't match their content

| File | What it actually shows | Now used for |
|---|---|---|
| `videos/chin_tucks.mp4` | Puckered-lips hold | Unused |
| `videos/facial_gua_sha.mp4` | Kiss-face (pucker) hold | Puckered Lips Hold |
| `videos/big_smile.mp4` | Hands massaging cheeks and jaw | Facial Gua Sha Massage, Thumb Pulling |
| `videos/voice-grain/pitch_glides.mp4` | Pen held in the mouth | Pen-in-Mouth Articulation Drill |
| `videos/voice-grain/pen_in_mouth.mp4` | Speaking, no pen | Unused |
| `videos/voice-grain/gargling.mp4` | Straw in the mouth | Unused |

## Missing demos: clips the team needs to source

The 8 exercises below currently show the "coming soon" card.

| Exercise | Mode | What the clip should show |
|---|---|---|
| Chin Tucks | Face | Side view: head glides straight back, eyes level |
| Collarbone Backup | Face | Side view: head drawn back over the collarbones |
| Tongue Stretch | Face | Tongue out, reaching up toward the nose |
| Big Smile Hold | Face | Wide smile held still |
| Jaw Circles | Face | Jaw sliding side to side in small circles |
| Lion Pose | Face | Mouth wide, tongue out, eyes wide |
| Pitch Glides / Sirens | Voice | Narrated slide from low to high pitch and back |
| Gargling Exercise | Voice | Head tilted back, gargling a small sip of water |

When a clip arrives, add it to the `videos/` folder, or `videos/voice-grain/` for voice. Then set its slug in the matching rules list in place of `null`.

## Approximate matches, worth replacing later

| Exercise | Clip used | Gap |
|---|---|---|
| Chewing Exercise | `jaw_stretch.mp4` | Shows mouth opening, not chewing |
| Silent Scream | `jaw_stretch.mp4` | No wide-eyes part |
| Platysma Stretch | `cobra_stretch.mp4` | Head tilts up, but no lower-lip push |
| Thumb Pulling | `big_smile.mp4` | Hands massage the jaw, but don't glide along it with thumbs |
| Eyebrow Lift Hold | `eyebrow_lift.mp4` | Arrows only; the brow lift is barely visible |

Voice clips were checked at their mid-point. Pitch glides, pen-in-mouth and gargling were checked frame by frame.
