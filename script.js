/* CARVE — mobile web app */
const exercises = {
  jaw_release: {
    id: "jaw_release",
    name: "JAW RELEASE",
    emoji: "😮",
    duration: 20,
    focus: ["Masseter", "Jawline"],
    instructions:
      "Gently open your mouth and massage along the jaw hinge. Soften the masseter — toning soft tissue and easing tension, not reshaping bone.",
    steps: [
      "Sit tall with shoulders relaxed and tongue on the palate.",
      "Place fingertips on the jaw hinge and make small circles.",
      "Open slightly wider on the exhale; never force the joint.",
    ],
    mistakes: [
      { title: "Pressing too hard", description: "Pressure should feel relieving, never sharp." },
      { title: "Clenching while massaging", description: "Keep teeth slightly apart so the masseter can release." },
    ],
    breathing: ["Inhale through the nose for 4 counts.", "Exhale slowly as you soften the jaw."],
  },
  chin_tucks: {
    id: "chin_tucks",
    name: "CHIN TUCKS",
    emoji: "🦢",
    reps: 12,
    focus: ["Platysma", "Neck posture"],
    instructions:
      "Draw the chin straight back to stack the head over the spine. Trains posture and the look of the neckline — not the jaw bone.",
    steps: [
      "Look straight ahead; imagine a string lifting the crown.",
      "Slide the chin back without tilting down.",
      "Hold 2 seconds, release. Repeat.",
    ],
    mistakes: [
      { title: "Tucking the chin down", description: "Move straight back, not down." },
      { title: "Shrugging shoulders", description: "Keep shoulders heavy and soft." },
    ],
    breathing: ["Exhale on the tuck.", "Inhale as you return to neutral."],
  },
  cheek_lift: {
    id: "cheek_lift",
    name: "CHEEK LIFT",
    emoji: "😊",
    reps: 10,
    focus: ["Zygomaticus", "Mid-face"],
    instructions: "Smile wide and lift the cheeks toward the eyes to tone mid-face muscles.",
    steps: [
      "Smile as if saying “cheese,” lifting cheeks high.",
      "Place fingertips lightly under the cheekbones.",
      "Hold 3 seconds, relax. Repeat.",
    ],
    mistakes: [
      { title: "Crowding the eyes", description: "Lift cheeks without hard squinting." },
      { title: "Overstretching the mouth", description: "A comfortable wide smile is enough." },
    ],
    breathing: ["Breathe normally; avoid holding your breath."],
  },
  eye_brightener: {
    id: "eye_brightener",
    name: "EYE BRIGHTENER",
    emoji: "👁️",
    duration: 30,
    focus: ["Orbicularis oculi", "Under-eye"],
    instructions: "Gentle under-eye taps and soft blinks to reduce puffiness.",
    steps: [
      "Tap lightly from inner to outer under-eye.",
      "Follow with 10 slow, complete blinks.",
      "Soft squint-and-release for 5 reps.",
    ],
    mistakes: [
      { title: "Pulling the skin", description: "Taps should be feather-light." },
      { title: "Rubbing hard", description: "Skip vigorous rubbing — it can increase puffiness." },
    ],
    breathing: ["Slow nasal breathing keeps the face relaxed."],
  },
  lip_seal: {
    id: "lip_seal",
    name: "LIP SEAL HOLD",
    emoji: "🤐",
    duration: 40,
    focus: ["Orbicularis oris", "Tongue posture"],
    instructions: "Seal the lips and rest the tongue on the palate to train nasal breathing habits.",
    steps: [
      "Close lips gently; teeth lightly apart.",
      "Rest the whole tongue on the palate.",
      "Breathe through the nose for the hold.",
    ],
    mistakes: [
      { title: "Clenching the jaw", description: "Lips sealed does not mean teeth clenched." },
      { title: "Mouth breathing mid-hold", description: "If you need air, reset — don’t cheat through the mouth." },
    ],
    breathing: ["Quiet nasal inhales and exhales only."],
  },
  neck_glide: {
    id: "neck_glide",
    name: "NECK GLIDE",
    emoji: "🪞",
    reps: 8,
    eachSide: true,
    focus: ["Platysma", "Jawline"],
    instructions: "Sweep fingertips from collarbone to jawline to stimulate lymph flow and tone the look of the neck.",
    steps: [
      "Tilt head slightly away from the working side.",
      "Glide from collarbone up toward the ear/jaw angle.",
      "Repeat each side with light pressure.",
    ],
    mistakes: [
      { title: "Overstretching the neck", description: "A gentle tilt is enough." },
      { title: "Dragging downward", description: "Always glide upward." },
    ],
    breathing: ["Exhale on each upward glide."],
  },
  humming_resonance: {
    id: "humming_resonance",
    name: "HUMMING RESONANCE",
    emoji: "🎵",
    duration: 45,
    focus: ["Vocal folds", "Facial resonance"],
    voice: true,
    instructions:
      "Hum on a comfortable pitch and feel vibration in the lips and face. Trains resonance and breath support — not larynx size.",
    steps: [
      "Inhale quietly through the nose.",
      "Hum “mmm” on an easy mid pitch.",
      "Feel buzz on the lips; keep repeating.",
    ],
    mistakes: [
      { title: "Forcing the voice too low", description: "Stay comfortable. Stop if strained or hoarse." },
      { title: "Tight throat", description: "Keep the neck soft; resonance should feel easy." },
    ],
    breathing: ["Inhale low into the ribs.", "Exhale steadily on the hum."],
  },
  diaphragmatic_breath: {
    id: "diaphragmatic_breath",
    name: "DIAPHRAGM BREATH",
    emoji: "🌬️",
    duration: 60,
    focus: ["Diaphragm", "Breath support"],
    voice: true,
    instructions:
      "Train steady breath support for a fuller speaking voice. Habitual pitch can improve — permanent large pitch drops are not a safe DIY goal.",
    steps: [
      "One hand on belly, one on chest.",
      "Inhale 4 counts — belly expands.",
      "Exhale 6 counts on a soft “sss.”",
    ],
    mistakes: [
      { title: "Chest-only breathing", description: "Lead with the belly/ribs, not the shoulders." },
      { title: "Pushing out of air", description: "End the exhale before you squeeze or gasp." },
    ],
    breathing: ["Keep jaw and tongue relaxed.", "See a coach or ENT for persistent hoarseness."],
  },
};

const FACE_POOL = () => Object.keys(exercises).filter((id) => !exercises[id].voice);
const VOICE_POOL = () => Object.keys(exercises).filter((id) => exercises[id].voice);

/** Program config — daily sessions are built from poolSplit, not per-mode logic. */
const PROGRAMS = {
  face: {
    id: "face",
    pools: ["face"],
    dailyCount: 4,
    poolSplit: { face: 4, voice: 0 },
    useRoadmap: true,
  },
  voice: {
    id: "voice",
    pools: ["voice"],
    dailyCount: 3,
    poolSplit: { face: 0, voice: 3 },
    useRoadmap: true,
  },
  both: {
    id: "both",
    pools: ["face", "voice"],
    dailyCount: 5,
    poolSplit: { face: 3, voice: 2 },
    useRoadmap: false,
  },
};

function pickExercisesFromPool(poolIds, count, dayNum, offset = 0) {
  if (!count || !poolIds.length) return [];
  const picked = [];
  const used = new Set();
  for (let i = 0; i < count; i++) {
    for (let attempt = 0; attempt < poolIds.length; attempt++) {
      const idx = (dayNum * count + i + offset + attempt) % poolIds.length;
      const id = poolIds[idx];
      if (!used.has(id)) {
        used.add(id);
        picked.push(id);
        break;
      }
    }
  }
  return picked;
}

function buildProgramDayIds(programId, dayNum) {
  const cfg = PROGRAMS[programId] || PROGRAMS.face;
  const faceIds = pickExercisesFromPool(FACE_POOL(), cfg.poolSplit.face || 0, dayNum, 0);
  const voiceIds = pickExercisesFromPool(VOICE_POOL(), cfg.poolSplit.voice || 0, dayNum, 11);
  return [...faceIds, ...voiceIds];
}

const TRACKS = {
  face: {
    label: "Face Form",
    planTitle: "Sculpted Look in 30 Days",
    subtitle: "Facial Tone",
    tags: "Jawline · Eyes · Posture",
    art: "🪞",
    disclaimer:
      "Face Form trains soft tissue, posture, habits, and skin tone — never bone structure.",
    browse: [
      {
        title: "Sharpen Your Edges",
        items: [
          { emoji: "💎", name: "Jawline Focus", meta: "Intermediate · 12 Min", tone: "purple" },
          { emoji: "✨", name: "Eye Brightening", meta: "Beginner · 8 Min", tone: "green" },
        ],
      },
      {
        title: "Quick Resets",
        items: [
          { emoji: "🧘", name: "5-Min Face Reset", meta: "Beginner · 5 Min", tone: "blue" },
          { emoji: "🦢", name: "Neckline Posture", meta: "Beginner · 7 Min", tone: "teal" },
        ],
      },
    ],
  },
  voice: {
    label: "Voice Grain",
    planTitle: "Vocal Presence in 30 Days",
    subtitle: "Resonance Lab",
    tags: "Breath · Resonance · Clarity",
    art: "🎙️",
    disclaimer:
      "Voice Grain trains breath support, resonance, and habitual pitch — not the physical size of the larynx. See a coach or ENT for strain or persistent hoarseness.",
    browse: [
      {
        title: "Build Presence",
        items: [
          { emoji: "🎙️", name: "Deep Voice Drills", meta: "Beginner · 10 Min", tone: "teal" },
          { emoji: "🎵", name: "Resonance Hum", meta: "Beginner · 8 Min", tone: "purple" },
        ],
      },
      {
        title: "Breath Foundation",
        items: [
          { emoji: "🌬️", name: "Diaphragm Steady", meta: "Beginner · 6 Min", tone: "blue" },
          { emoji: "🗣️", name: "Confident Speaking", meta: "Intermediate · 12 Min", tone: "green" },
        ],
      },
    ],
  },
  both: {
    label: "Full Presence",
    planTitle: "Face & Voice in 30 Days",
    subtitle: "Complete Practice",
    tags: "Look · Sound · Breath",
    art: "✨",
    disclaimer:
      "Full Presence mixes face tone and vocal habits — soft tissue, posture, resonance, and breath. Never bone structure or larynx size.",
    browse: [
      {
        title: "Sharpen Your Edges",
        items: [
          { emoji: "💎", name: "Jawline Focus", meta: "Intermediate · 12 Min", tone: "purple" },
          { emoji: "✨", name: "Eye Brightening", meta: "Beginner · 8 Min", tone: "green" },
        ],
      },
      {
        title: "Sound & Reset",
        items: [
          { emoji: "🎙️", name: "Deep Voice Drills", meta: "Beginner · 10 Min", tone: "teal" },
          { emoji: "🧘", name: "5-Min Face Reset", meta: "Beginner · 5 Min", tone: "blue" },
        ],
      },
    ],
  },
};

function buildDays(track = "face") {
  const program = PROGRAMS[track] || PROGRAMS.face;
  if (program.useRoadmap && track === "face" && typeof ROADMAP !== "undefined") {
    return buildDaysFromRoadmap(ROADMAP, "face");
  }
  if (program.useRoadmap && track === "voice" && typeof VOICE_ROADMAP !== "undefined") {
    return buildDaysFromRoadmap(VOICE_ROADMAP, "voice");
  }
  const days = [];
  for (let n = 1; n <= 30; n++) {
    days.push({
      n,
      rest: false,
      status: n === 1 ? "active" : "locked",
      ids: buildProgramDayIds(track, n),
      roadmap: null,
      percent: 0,
      doneCount: 0,
    });
  }
  return days;
}

function buildDaysFromRoadmap(roadmap, foundation = "face") {
  const diversified = diversifyConsecutiveDays(roadmap, foundation);
  return diversified.map((d) => ({
    n: d.day,
    week: d.week,
    rest: false,
    status: d.day === 1 ? "active" : "locked",
    percent: 0,
    doneCount: 0,
    roadmap: d.exercises,
    ids: [],
  }));
}

/**
 * Keep foundation exercise first (mewing / diaphragmatic breathing).
 * Ensure consecutive days aren't clones, and the first 3 post-warm-up
 * exercises don't match the previous two days (trust / variety).
 */
function diversifyConsecutiveDays(roadmap, foundation = "face") {
  const out = roadmap.map((d) => ({
    day: d.day,
    week: d.week,
    exercises: [...d.exercises],
  }));

  const nameOf = (str) => parseRoadmapExercise(str).name.toLowerCase();
  const isFoundation = (str) => {
    const n = nameOf(str);
    if (foundation === "voice") {
      return n.includes("diaphragmatic") || n.includes("belly breathing");
    }
    return n.includes("mewing");
  };
  const restOf = (list) => list.filter((e) => !isFoundation(e));
  const restSig = (list) => restOf(list).map(nameOf).join("|");
  const first3Sig = (list) =>
    restOf(list)
      .slice(0, 3)
      .map(nameOf)
      .join("|");

  const rotate = (arr, n) => {
    if (!arr.length) return arr;
    const k = ((n % arr.length) + arr.length) % arr.length;
    return arr.slice(k).concat(arr.slice(0, k));
  };

  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor((i * 17 + 3) % (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /** Avoid same exercise in the same slot as either of the previous two days. */
  const avoidSameSlots = (rest, prevRestA, prevRestB) => {
    let list = [...rest];
    const max = Math.min(list.length, 8);
    for (let slot = 0; slot < max; slot++) {
      const name = nameOf(list[slot]);
      const hitA = prevRestA && prevRestA[slot] && nameOf(prevRestA[slot]) === name;
      const hitB = prevRestB && prevRestB[slot] && nameOf(prevRestB[slot]) === name;
      if (!hitA && !hitB) continue;
      for (let j = slot + 1; j < list.length; j++) {
        const n2 = nameOf(list[j]);
        const clashA = prevRestA && prevRestA[slot] && nameOf(prevRestA[slot]) === n2;
        const clashB = prevRestB && prevRestB[slot] && nameOf(prevRestB[slot]) === n2;
        if (!clashA && !clashB) {
          [list[slot], list[j]] = [list[j], list[slot]];
          break;
        }
      }
    }
    return list;
  };

  /** Stronger pass: first 3 slots must differ from prior days' first 3. */
  const diversifyFirst3 = (rest, prevRestA, prevRestB) => {
    let list = [...rest];
    for (let slot = 0; slot < Math.min(3, list.length); slot++) {
      const name = nameOf(list[slot]);
      const hitA = prevRestA && prevRestA[slot] && nameOf(prevRestA[slot]) === name;
      const hitB = prevRestB && prevRestB[slot] && nameOf(prevRestB[slot]) === name;
      if (!hitA && !hitB) continue;
      for (let j = 3; j < list.length; j++) {
        const n2 = nameOf(list[j]);
        const clashA = prevRestA && prevRestA[slot] && nameOf(prevRestA[slot]) === n2;
        const clashB = prevRestB && prevRestB[slot] && nameOf(prevRestB[slot]) === n2;
        const inFront =
          (prevRestA && prevRestA.slice(0, 3).some((e) => nameOf(e) === n2)) ||
          (prevRestB && prevRestB.slice(0, 3).some((e) => nameOf(e) === n2));
        if (!clashA && !clashB && !inFront) {
          [list[slot], list[j]] = [list[j], list[slot]];
          break;
        }
      }
    }
    return list;
  };

  const prevRests = [];

  for (let i = 0; i < out.length; i++) {
    const foundationItems = out[i].exercises.filter(isFoundation);
    let rest = out[i].exercises.filter((e) => !isFoundation(e));
    let sig = restSig([...foundationItems, ...rest]);
    let head = first3Sig([...foundationItems, ...rest]);
    let tries = 0;

    while (
      tries < 32 &&
      ((i > 0 &&
        (sig === restSig(out[i - 1].exercises) || head === first3Sig(out[i - 1].exercises))) ||
        (i > 1 &&
          (sig === restSig(out[i - 2].exercises) || head === first3Sig(out[i - 2].exercises))))
    ) {
      rest = tries < 10 ? rotate(rest, tries + 1) : shuffle(rest);
      out[i].exercises = [...foundationItems, ...rest];
      sig = restSig(out[i].exercises);
      head = first3Sig(out[i].exercises);
      tries++;
    }

    rest = diversifyFirst3(rest, prevRests[i - 1], prevRests[i - 2]);
    rest = avoidSameSlots(rest, prevRests[i - 1], prevRests[i - 2]);
    out[i].exercises = [...foundationItems, ...rest];
    prevRests[i] = rest;
  }

  return out;
}

function animClassForName(name) {
  return coachSetForName(name);
}

function coachSetForName(name) {
  const n = (name || "").toLowerCase();
  if (n.includes("diaphrag") || n.includes("breath") || n.includes("posture reset")) return "diaphragmatic_breath";
  if (
    n.includes("hum") ||
    n.includes("resonance") ||
    n.includes("om") ||
    n.includes("fry") ||
    n.includes("pitch") ||
    n.includes("siren") ||
    n.includes("projection") ||
    n.includes("inflection") ||
    n.includes("vowel")
  ) {
    return "humming_resonance";
  }
  if (
    n.includes("lip seal") ||
    n.includes("mewing") ||
    n.includes("tongue posture") ||
    n.includes("straw") ||
    n.includes("pucker") ||
    n.includes("kiss") ||
    n.includes("o-e")
  ) {
    return "lip_seal";
  }
  if (n.includes("chin tuck") || n.includes("chin")) return "chin_tucks";
  if (n.includes("eye") || n.includes("eyebrow") || n.includes("gua")) return "eye_brightener";
  if (
    n.includes("neck") ||
    n.includes("cobra") ||
    n.includes("collarbone") ||
    n.includes("platysma") ||
    n.includes("massage")
  ) {
    return "neck_glide";
  }
  if (n.includes("smile") || n.includes("fish") || n.includes("cheek") || n.includes("lion")) return "cheek_lift";
  if (
    n.includes("jaw") ||
    n.includes("chew") ||
    n.includes("resistance") ||
    n.includes("thumb") ||
    n.includes("bite") ||
    n.includes("scream")
  ) {
    return "jaw_release";
  }
  if (n.includes("tongue") || n.includes("lip")) return "lip_seal";
  return "jaw_release";
}

function coachSetForExercise(ex) {
  const known = [
    "jaw_release",
    "chin_tucks",
    "cheek_lift",
    "eye_brightener",
    "lip_seal",
    "neck_glide",
    "humming_resonance",
    "diaphragmatic_breath",
  ];
  if (ex && known.includes(ex.id)) return ex.id;
  return coachSetForName(ex?.displayName || ex?.name || ex?.id || "");
}

const VIDEO_VER = "7";
const VOICE_VIDEO_VER = "1";

const VOICE_GRAIN_VIDEO_RULES = [
  ["diaphragmatic belly", "diaphragmatic_breathing"],
  ["chewing method", "chewing_method"],
  ["humming chin", "humming_chin_to_sky"],
  ["chin drop hum", "humming_chin_to_sky"],
  ["lip trill", "lip_trills"],
  ["motorboat", "lip_trills"],
  // pitch_glides.mp4 actually shows the pen-in-mouth drill.
  ["pen-in-mouth", "pitch_glides"],
  ["tongue twister speed", "tongue_twister_speed_ladder"],
  ["tongue twister", "tongue_twisters"],
  ["yawn-sigh", "yawn_sigh"],
  ["straw phonation", "straw_phonation"],
  ["vocal fry", "vocal_fry"],
  // No clip shows pitch glides; gargling.mp4 shows a straw, not gargling.
  ["pitch glide", null],
  ["siren", null],
  ["ng slide", null],
  ["gargling", null],
  ["vowel stretch", "vowel_stretching"],
  ["neck & jaw", "neck_jaw_massage"],
  ["neck and jaw", "neck_jaw_massage"],
  ["posture reset", "posture_reset"],
  ["chest resonance", "chest_resonance_hum"],
  ["downward inflection", "downward_inflection"],
  ["thumb-knuckle", "thumb_knuckle_bite"],
  ["slow reading", "slow_reading"],
  ["mirror practice", "mirror_practice"],
  ["ma-me-mi", "ma_me_mi_mo_mu"],
  ["consonant-vowel", "ma_me_mi_mo_mu"],
  ["recording & playback", "recording_playback"],
  ["breath control counting", "breath_control_counting"],
  ["resonant om", "resonant_om_chant"],
  ["voice projection", "voice_projection"],
];

function voiceGrainSlugForExercise(ex) {
  const name = (ex?.displayName || ex?.name || ex?.id || "").toLowerCase();
  for (const [needle, slug] of VOICE_GRAIN_VIDEO_RULES) {
    if (name.includes(needle)) return slug;
  }
  return null;
}

function isVoiceExerciseName(name) {
  const n = String(name || "").toLowerCase();
  return VOICE_GRAIN_VIDEO_RULES.some(([needle]) => n.includes(needle));
}

/* Voice items get narrated voice clips; matters in Full Presence, which mixes face and voice. */
function isVoiceItem(ex) {
  if (isVoiceGrainSession()) return true;
  if (!ex) return false;
  if (typeof ex === "string") return isVoiceExerciseName(ex);
  if (ex.voice) return true;
  return isVoiceExerciseName(ex.displayName || ex.name || ex.id);
}

function voiceGrainVideoUrl(slug) {
  return `videos/voice-grain/${slug}.mp4?v=${VOICE_VIDEO_VER}`;
}

/*
 * Face clips, matched to what each video actually shows (checked frame by frame).
 * null = no clip matches; the player shows a static card instead of a wrong demo.
 * Some filenames don't match their content:
 *   chin_tucks.mp4      shows a puckered-lips hold, not a chin tuck (unused)
 *   facial_gua_sha.mp4  shows a kiss-face hold
 *   big_smile.mp4       shows hands massaging the cheeks and jaw
 */
const FACE_VIDEO_RULES = [
  ["mewing", "mewing"],
  ["tongue posture", "mewing"],
  ["tongue stretch", null],
  ["chin tuck", null],
  ["collarbone", null],
  ["big smile", null],
  ["jaw circle", null],
  ["lion", null],
  ["platysma", "cobra_stretch"],
  ["cobra", "cobra_stretch"],
  ["cheek puff", "cheek_puffs"],
  ["eyebrow", "eyebrow_lift"],
  ["jaw resist", "jaw_resistance"],
  ["neck curl", "neck_curl_ups"],
  ["fish face", "fish_face"],
  ["o-e", "vowel"],
  ["vowel", "vowel"],
  ["neck rotat", "neck_rotation"],
  ["straw", "straw_pull"],
  ["pucker", "facial_gua_sha"],
  ["kiss", "facial_gua_sha"],
  ["gua", "big_smile"],
  ["thumb pulling", "big_smile"],
  ["de-puff", "eye_de_puff"],
  ["eye de", "eye_de_puff"],
  ["jaw stretch", "jaw_stretch"],
  ["silent scream", "jaw_stretch"],
  ["chew", "jaw_stretch"],
  // Older built-in library names.
  ["jaw release", "jaw_stretch"],
  ["eye brightener", "eye_de_puff"],
  ["neck glide", "neck_rotation"],
  ["lip seal", "mewing"],
];

function videoSlugForName(name) {
  const n = String(name || "").toLowerCase().replace(/_/g, " ");
  for (const [needle, slug] of FACE_VIDEO_RULES) {
    if (n.includes(needle)) return slug;
  }
  return null;
}

function videoSlugForExercise(ex) {
  if (!ex) return null;
  if (typeof ex === "string") return videoSlugForName(ex);
  return videoSlugForName(ex.displayName || ex.name || ex.id || "");
}

function videoUrl(slug) {
  return `videos/${slug}.mp4?v=${VIDEO_VER}`;
}

function stopCoachPlayer(el) {
  if (!el) return;
  if (el._coachTimer) {
    clearInterval(el._coachTimer);
    el._coachTimer = null;
  }
  el.querySelectorAll("video").forEach((v) => {
    v.pause();
    v.removeAttribute("src");
    v.load();
  });
}

function stopCoachPlayers(root = document) {
  root.querySelectorAll(".coach-player, .coach-static").forEach(stopCoachPlayer);
}

function renderVoiceCoachStatic(el, ex) {
  if (!el) return;
  stopCoachPlayer(el);
  el.classList.add("coach-static");
  el.classList.remove("coach-player");
  const emoji = ex?.emoji || emojiForName(ex?.displayName || ex?.name || ex?.id || "");
  const note = el.classList.contains("thumb")
    ? ""
    : `<span class="coach-static-note">Demo coming soon · follow the steps</span>`;
  el.innerHTML = `<span class="coach-static-emoji" aria-hidden="true">${emoji}</span>${note}`;
  el.dataset.coachSet = "static";
}

function startVoiceGrainPlayer(el, ex) {
  if (!el) return;
  stopCoachPlayer(el);
  const slug = voiceGrainSlugForExercise(ex);
  if (!slug) {
    renderVoiceCoachStatic(el, ex);
    return;
  }
  el.classList.remove("coach-static");
  if (!el.classList.contains("coach-player")) el.classList.add("coach-player");
  el.dataset.coachSet = slug;
  el.innerHTML = "";
  const isThumb = el.classList.contains("thumb");
  const v = document.createElement("video");
  v.className = "coach-video";
  v.muted = isThumb || !state.settings.coachVoice;
  v.defaultMuted = v.muted;
  v.loop = true;
  v.autoplay = true;
  v.playsInline = true;
  v.setAttribute("playsinline", "");
  v.setAttribute("webkit-playsinline", "");
  if (isThumb) v.setAttribute("muted", "");
  else if (v.muted) v.setAttribute("muted", "");
  v.preload = isThumb ? "none" : "auto";
  v.src = voiceGrainVideoUrl(slug);
  v.onerror = () => {
    v.onerror = null;
    renderVoiceCoachStatic(el, ex);
  };
  el.appendChild(v);
  const play = () => v.play().catch(() => {});
  v.addEventListener("canplay", play);
  play();
}

function startCoachPlayer(el, ex) {
  if (!el) return;
  if (isVoiceItem(ex)) {
    startVoiceGrainPlayer(el, ex);
    return;
  }
  const slug = videoSlugForExercise(ex);
  if (!slug) {
    renderVoiceCoachStatic(el, ex);
    return;
  }
  el.classList.remove("coach-static");
  if (!el.classList.contains("coach-player")) el.classList.add("coach-player");
  stopCoachPlayer(el);
  el.dataset.coachSet = slug;
  el.innerHTML = "";
  const v = document.createElement("video");
  v.className = "coach-video";
  v.muted = true;
  v.defaultMuted = true;
  v.loop = true;
  v.autoplay = true;
  v.playsInline = true;
  v.setAttribute("playsinline", "");
  v.setAttribute("webkit-playsinline", "");
  v.setAttribute("muted", "");
  v.preload = el.classList.contains("thumb") ? "none" : "auto";
  v.src = videoUrl(slug);
  v.onerror = () => {
    v.onerror = null;
    renderVoiceCoachStatic(el, ex);
  };
  el.appendChild(v);
  const play = () => v.play().catch(() => {});
  v.addEventListener("canplay", play);
  play();
}

function preloadCoachFrames() {
  [
    "chin_tucks",
    "cheek_puffs",
    "mewing",
    "fish_face",
    "vowel",
    "jaw_stretch",
    "neck_rotation",
    "generic",
  ].forEach((slug) => {
    const v = document.createElement("video");
    v.preload = "auto";
    v.muted = true;
    v.src = videoUrl(slug);
  });
}

function emojiForName(name) {
  const n = name.toLowerCase();
  if (n.includes("diaphragmatic") || n.includes("breath")) return "🌬️";
  if (n.includes("hum") || n.includes("resonance") || n.includes("om")) return "🎵";
  if (n.includes("fry") || n.includes("pitch") || n.includes("siren") || n.includes("projection") || n.includes("inflection")) return "🎙️";
  if (n.includes("lip") || n.includes("trill")) return "👄";
  if (n.includes("straw") || n.includes("gargl") || n.includes("yawn")) return "🫧";
  if (n.includes("twister") || n.includes("reading") || n.includes("ma-me") || n.includes("articulation") || n.includes("pen-in") || n.includes("vowel")) return "🗣️";
  if (n.includes("recording") || n.includes("mirror")) return "🪞";
  if (n.includes("posture")) return "🧍";
  if (n.includes("mewing") || n.includes("tongue")) return "👅";
  if (n.includes("chin")) return "🦢";
  if (n.includes("eye") || n.includes("eyebrow")) return "👁️";
  if (n.includes("smile")) return "😊";
  if (n.includes("neck") || n.includes("cobra") || n.includes("platysma") || n.includes("collarbone") || n.includes("massage")) return "🦒";
  if (n.includes("jaw") || n.includes("chew") || n.includes("thumb") || n.includes("bite")) return "😮";
  if (n.includes("fish") || n.includes("cheek") || n.includes("pucker")) return "😗";
  if (n.includes("lion") || n.includes("scream")) return "🦁";
  if (n.includes("gua")) return "✨";
  return state.track === "voice" ? "🎙️" : "🪞";
}

function clipArtBoy(exOrKey) {
  if (isVoiceItem(exOrKey)) {
    const ex = typeof exOrKey === "string" ? { name: exOrKey } : exOrKey;
    const slug = voiceGrainSlugForExercise(ex);
    return `<span class="coach-player thumb voice-grain-thumb" data-coach-set="${slug}"></span>`;
  }
  const set =
    typeof exOrKey === "string" ? coachSetForName(exOrKey) : coachSetForExercise(exOrKey);
  return `<span class="coach-player thumb" data-coach-set="${set}"></span>`;
}

/* How-to guides for Face Form roadmap exercises, matched by keyword on the name. */
const FACE_GUIDES = [
  [["mewing"], "Rest the whole tongue on the roof of your mouth as your default posture.",
    ["Close your lips and let your teeth touch lightly.", "Press the whole tongue, including the back, gently onto the palate.", "Breathe through your nose and return to this posture through the day."],
    [["Only the tip touching", "The middle and back of the tongue should rest on the palate too."], ["Clenching", "Teeth touch lightly; the jaw muscles stay soft."]]],
  [["chin tuck"], "Glide the head straight back to stack it over the spine. Trains neck posture.",
    ["Sit or stand tall, eyes looking straight ahead.", "Slide your chin straight back, making a gentle double chin.", "Hold for the set time, then release slowly."],
    [["Tipping the head down", "Move straight back, not down. Eyes stay level."], ["Shrugging", "Keep the shoulders low and relaxed."]]],
  [["vowel exercise"], "Shape the vowels with big, slow mouth movements to work the muscles around the lips and cheeks.",
    ["Say A, E, I, O, U slowly.", "Make each shape as big as is comfortable: wide for E, round for O.", "Pause briefly in each shape before moving on."],
    [["Rushing", "Slow, full shapes work the muscles; speed doesn't."], ["Tensing the neck", "Only the face moves. Neck and shoulders stay soft."]]],
  [["fish face"], "Suck the cheeks in and hold, like a fish face. Works the cheek muscles.",
    ["Close your lips and gently suck your cheeks inward.", "Hold the shape for the set time.", "Release and relax your face between sets."],
    [["Biting the cheeks", "Suck inward, but keep your teeth off the cheeks."], ["Holding your breath", "Breathe through your nose during the hold."]]],
  [["neck curl"], "Lie on your back and lift your head slightly to work the front of the neck.",
    ["Lie on your back with your tongue on the palate.", "Tuck your chin slightly and lift your head a few centimetres.", "Lower slowly. Repeat for the set reps."],
    [["Lifting too high", "A small lift is enough. Your shoulders stay on the floor."], ["Straining the neck", "Stop if you feel pain or pressure in the neck."]]],
  [["jaw resist"], "Open your mouth against gentle resistance from your fist to work the jaw muscles.",
    ["Place a loose fist under your chin.", "Open your mouth slowly while your fist pushes back gently.", "Hold, then close slowly."],
    [["Pushing too hard", "Use about half effort. The jaw must never click or hurt."], ["Fast reps", "Slow and controlled works better and is safer."]]],
  [["cheek puff"], "Fill your cheeks with air and move it side to side to work the cheeks and lips.",
    ["Take a breath and puff both cheeks with air.", "Move the air from one cheek to the other.", "Release the air slowly through your lips."],
    [["Puffing too hard", "Gentle pressure is enough. Ears should not feel pressure."], ["Tensing the forehead", "Keep the forehead and eyes relaxed."]]],
  [["chewing exercise"], "Steady chewing with sugar-free gum or a jaw trainer to work the chewing muscles.",
    ["Chew slowly with even strength on both sides.", "Keep your lips closed and your tongue on the palate.", "Rest if your jaw feels tired."],
    [["Chewing one side only", "Alternate sides so both work equally."], ["Overdoing it", "Stop at any jaw pain or clicking. Rest days matter."]]],
  [["jaw stretch"], "Open your mouth wide, hold the stretch, and close slowly. Eases tension in the jaw.",
    ["Open your mouth slowly as wide as is comfortable.", "Hold the stretch for the set time.", "Close slowly and relax."],
    [["Forcing it wide", "Stop before it hurts or clicks."], ["Jerky movements", "Open and close smoothly."]]],
  [["collarbone"], "Draw the head straight back while lengthening the back of the neck. A posture stretch for the neck.",
    ["Sit tall with shoulders down.", "Pull your head straight back over your collarbones.", "Hold, feeling a gentle stretch at the back of the neck."],
    [["Looking down", "Keep your eyes level throughout."], ["Rounding the shoulders", "Keep the chest open and shoulders back."]]],
  [["tongue stretch"], "Stick your tongue out and reach up toward your nose to stretch the tongue and under-chin area.",
    ["Open your mouth slightly and stick out your tongue.", "Reach the tip up toward your nose.", "Hold, then relax the tongue back in."],
    [["Straining", "The stretch should feel mild, never sharp."], ["Tensing the neck", "Only the tongue reaches. Neck stays relaxed."]]],
  [["thumb pulling"], "Glide your thumbs along the underside of your jaw from chin to ear. A massage for the jawline.",
    ["Place both thumbs under your chin.", "Glide them slowly along the jawline toward your ears.", "Hold briefly at the end, then repeat."],
    [["Pressing too hard", "Firm but comfortable pressure only."], ["Dragging dry skin", "Use clean hands, and a little moisturiser if needed."]]],
  [["platysma"], "Tilt your head back and push your lower lip forward to stretch the front of the neck.",
    ["Sit tall and tilt your head back slowly.", "Push your lower lip up and forward.", "Hold, feeling the stretch along the front of the neck."],
    [["Tilting too far", "Stop where it feels comfortable. Don't crank the neck back."], ["Holding your breath", "Breathe slowly throughout."]]],
  [["big smile"], "Smile as wide as you can and hold it to work the cheek muscles.",
    ["Smile as widely as is comfortable, lips closed or open.", "Hold the smile for the set time.", "Relax your face completely between reps."],
    [["Squinting hard", "Let the cheeks lift. Don't scrunch the eyes."], ["Tensing the jaw", "Keep your teeth apart and your jaw relaxed."]]],
  [["jaw circles"], "Move the jaw slowly side to side and in small circles to loosen it.",
    ["Open your mouth slightly.", "Slide your jaw slowly left, then right, in a smooth circle.", "Keep the movement small and controlled."],
    [["Big, fast circles", "Small and slow is safer for the joint."], ["Moving through pain", "Stop at any clicking or pain."]]],
  [["lion"], "Open your eyes and mouth wide and stick out your tongue, like a lion. Stretches the whole face.",
    ["Take a breath in through your nose.", "Open your mouth wide, stick out your tongue, and widen your eyes.", "Hold, then breathe out and relax your face."],
    [["Straining the neck", "Keep your neck soft. The stretch is in the face."], ["Holding too long", "Short holds are enough."]]],
  [["straw pull"], "Purse your lips as if sucking through a straw, pulling the cheeks in. Works the lips and cheeks.",
    ["Purse your lips forward.", "Suck air in gently, drawing your cheeks in.", "Hold, then release."],
    [["Biting the cheeks", "Draw the cheeks in without your teeth touching them."], ["Tensing the forehead", "Only the lips and cheeks work."]]],
  [["puckered"], "Push your lips forward into a kiss shape and hold. Works the muscles around the mouth.",
    ["Press your lips together and push them forward.", "Hold the pucker for the set time or reps.", "Relax your lips completely between reps."],
    [["Clenching the jaw", "Keep the jaw loose. Only the lips push."], ["Scrunching the face", "Eyes and forehead stay relaxed."]]],
  [["o-e"], "Switch between an exaggerated O shape and a wide E shape with your mouth.",
    ["Make a big, round O with your lips and hold.", "Switch to a wide E, stretching the lips sideways, and hold.", "Alternate slowly."],
    [["Rushing the switch", "Hold each shape before you change."], ["Using the neck", "Only the face moves."]]],
  [["neck rotation"], "Turn your head slowly side to side to loosen the neck.",
    ["Sit tall with shoulders relaxed.", "Turn your head slowly to one side and hold.", "Return to centre and repeat on the other side."],
    [["Spinning fast", "Move slowly and only as far as is comfortable."], ["Lifting the shoulders", "Keep the shoulders down."]]],
  [["cobra"], "Lie face down and lift your chest and chin to open the front of the neck and chest.",
    ["Lie face down with your hands under your shoulders.", "Press up gently, lifting your chest and chin.", "Hold, then lower slowly."],
    [["Crunching the lower back", "Lift only as high as feels comfortable."], ["Throwing the head back", "Lift the chin gently; don't crank the neck."]]],
  [["silent scream"], "Open your mouth and eyes wide in a silent scream, then relax. Stretches the face.",
    ["Open your mouth wide and widen your eyes, with no sound.", "Hold for the set time.", "Close slowly and relax your face."],
    [["Forcing the jaw open", "Stop before any pain or clicking."], ["Tensing the neck", "Keep the neck soft."]]],
  [["eyebrow"], "Raise your eyebrows high and hold to work the forehead muscles.",
    ["Look straight ahead.", "Raise your eyebrows as high as you can and hold.", "Lower them slowly and relax."],
    [["Scrunching the eyes", "Keep your eyes open and soft."], ["Holding your breath", "Breathe normally during the hold."]]],
  [["de-puff"], "Gently tap and stroke around the eyes, from the inner corners outward, to ease puffiness.",
    ["Use your ring fingers with clean hands.", "Tap lightly under the eyes from the inner corners outward.", "Finish with soft strokes toward your temples."],
    [["Pressing too hard", "The skin around the eyes is thin. Use a feather-light touch."], ["Pulling the skin", "Tap and glide; never drag."]]],
  [["gua sha"], "Stroke upward and outward across the face with a gua sha tool or your fingertips, easing tension.",
    ["Apply a little face oil or moisturiser.", "Glide the tool or fingertips from the chin along the jaw to the ears.", "Repeat across the cheeks and forehead, always outward."],
    [["Too much pressure", "Light to medium pressure only. It should never bruise."], ["Dry skin", "Use oil or moisturiser so the tool glides."]]],
];

function findGuide(name, guides) {
  const n = String(name || "").toLowerCase();
  return guides.find(([keys]) => keys.some((k) => n.includes(k))) || null;
}

function voiceLibraryEntry(name) {
  const key = String(name || "").toLowerCase();
  return VOICE_COACH_LIBRARY.find((entry) => entry.match.test(key)) || null;
}

function roadmapToSessionItem(str) {
  const { name, dosage } = parseRoadmapExercise(str);
  const seconds = estimateSecondsFromDosage(dosage);
  const isVoice = state.track === "voice" || isVoiceExerciseName(name);
  const faceGuide = isVoice ? null : findGuide(name, FACE_GUIDES);
  const voiceGuide = isVoice ? voiceLibraryEntry(name) : null;
  const dosageStep = dosage ? `Dosage today: ${dosage}.` : null;
  return {
    id: name,
    name: name.toUpperCase(),
    displayName: name,
    dosage,
    duration: seconds,
    voice: isVoice,
    emoji: emojiForName(name),
    anim: animClassForName(name),
    instructions: isVoice
      ? `${voiceGuide ? voiceGuide.intro : name + "."} Easy air, easy pitch: you're training breath, resonance and habit, not larynx size.`
      : `${faceGuide ? faceGuide[1] : name + "."} You're training soft tissue, posture and habits, not bone structure.`,
    steps: isVoice
      ? [...(voiceGuide ? voiceGuide.steps : [`Set up upright for ${name}.`]), dosageStep, "Keep the throat soft; stop if anything feels pressed or hoarse."].filter(Boolean)
      : [...(faceGuide ? faceGuide[2] : [`Set up comfortably for ${name}.`]), dosageStep].filter(Boolean),
    focus: isVoice ? ["Voice Grain", "Breath & resonance"] : ["Face Form", "Soft tissue"],
    mistakes: isVoice
      ? [
          { title: "Pushing the sound", description: "If it feels strained or hoarse, ease volume and pitch." },
          { title: "Shallow breath", description: "Let the belly move first. Shoulders stay quiet." },
        ]
      : faceGuide
        ? faceGuide[3].map(([title, description]) => ({ title, description }))
        : [
            { title: "Forcing the movement", description: "Ease into range. Tension should feel productive, never painful." },
            { title: "Holding the breath", description: "Breathe steadily through the nose when you can." },
          ],
    breathing: isVoice
      ? ["Inhale quietly through the nose.", "Exhale on sound without squeezing the throat."]
      : ["Inhale calmly before the hold or set.", "Exhale as you soften or release."],
    roadmap: true,
  };
}

/*
 * Day curation. The raw roadmaps list 9-13 exercises a day in no set order.
 * Each day is trimmed to a size that grows by week, and ordered:
 * foundation, warm-up, main work, cool-down.
 */
const SESSION_PHASES = {
  face: [
    [0, ["mewing"]],
    [1, ["neck rotation", "chin tuck", "jaw circle", "eyebrow", "vowel exercise"]],
    [2, ["jaw resist", "chewing exercise", "thumb pulling", "neck curl", "tongue stretch"]],
    [3, ["fish face", "cheek puff", "straw pull", "pucker", "o-e", "big smile", "lion", "silent scream", "jaw stretch"]],
    [4, ["cobra", "collarbone", "platysma", "gua sha", "de-puff"]],
  ],
  voice: [
    [0, ["diaphragmatic"]],
    [1, ["posture reset", "neck & jaw", "yawn-sigh", "lip trill", "humming", "straw phonation", "chewing method"]],
    [2, ["chest resonance", "om chant", "pitch glide", "vowel stretching", "projection", "inflection", "vocal fry", "breath control"]],
    [3, ["pen-in-mouth", "twister", "ma-me", "mirror", "slow reading", "thumb-knuckle"]],
    [4, ["recording", "gargling"]],
  ],
};

function sessionPhase(name, domain) {
  const n = String(name || "").toLowerCase();
  for (const [phase, keys] of SESSION_PHASES[domain]) {
    if (keys.some((k) => n.includes(k))) return phase;
  }
  return 3;
}

/** Trim a day's raw roadmap to `cap` items, round-robin across phases so each part is covered. */
function curateRoadmapDay(list, cap, dayN, domain) {
  const entries = (list || []).map((str, i) => ({ str, i, phase: sessionPhase(parseRoadmapExercise(str).name, domain) }));
  const foundation = entries.filter((e) => e.phase === 0);
  const byPhase = [1, 2, 3, 4].map((p) => {
    const group = entries.filter((e) => e.phase === p);
    const k = group.length ? dayN % group.length : 0;
    return group.slice(k).concat(group.slice(0, k));
  });
  const picks = [];
  const room = Math.max(0, cap - foundation.length);
  while (picks.length < room && byPhase.some((g) => g.length)) {
    for (const group of byPhase) {
      if (picks.length >= room) break;
      if (group.length) picks.push(group.shift());
    }
  }
  picks.sort((a, b) => a.phase - b.phase || a.i - b.i);
  return [...foundation, ...picks];
}

function weekOfDay(dayN) {
  return Math.min(4, Math.ceil((dayN || 1) / 7));
}

function singleModeCap(dayN) {
  return [6, 7, 8, 8][weekOfDay(dayN) - 1];
}

let fullPresenceSource = null;

/** Full Presence: the same day of both roadmaps, a smaller share of each, merged by phase. */
function fullPresenceRoadmap(dayN) {
  if (!fullPresenceSource) {
    fullPresenceSource = {
      face: diversifyConsecutiveDays(ROADMAP, "face"),
      voice: diversifyConsecutiveDays(VOICE_ROADMAP, "voice"),
    };
  }
  const idx = Math.max(0, Math.min(29, (dayN || 1) - 1));
  const faceCap = weekOfDay(dayN) === 1 ? 4 : 5;
  const face = curateRoadmapDay(fullPresenceSource.face[idx]?.exercises, faceCap, dayN, "face");
  const voice = curateRoadmapDay(fullPresenceSource.voice[idx]?.exercises, 3, dayN, "voice");
  const foundations = [...voice.filter((e) => e.phase === 0), ...face.filter((e) => e.phase === 0)];
  const rest = [...face, ...voice].filter((e) => e.phase !== 0).sort((a, b) => a.phase - b.phase);
  return [...foundations, ...rest].map((e) => e.str);
}

/** The curated list of roadmap strings for a day, or null for days built from the legacy id pool. */
function dayRoadmap(day) {
  if (!day) return null;
  if (state.track === "both") return fullPresenceRoadmap(day.n);
  if (!day.roadmap?.length) return null;
  const domain = state.track === "voice" ? "voice" : "face";
  return curateRoadmapDay(day.roadmap, singleModeCap(day.n), day.n, domain).map((e) => e.str);
}

/** Session items for a day: curated roadmap items, or the legacy exercise library. */
function daySessionItems(day) {
  const roadmap = dayRoadmap(day);
  if (roadmap) return roadmap.map(roadmapToSessionItem);
  return (day?.ids || []).map((id) => exercises[id]).filter(Boolean);
}

const STORAGE_KEY = "carve-web-v1";
const AUTH_STORAGE_KEY = "carve-web-auth-v1";

const defaultSettings = {
  mirror: true,
  coachVoice: true,
  music: true,
  sfx: true,
  audioV1: true,
  reminders: true,
  reminderTime: "19:30",
};

const state = {
  track: null,
  days: buildDays("face"),
  currentDay: 1,
  streak: 0,
  sessionDates: {},
  exerciseSecondsByDate: {},
  unlockedBadges: {},
  habitChecks: {},
  profileName: "Priya",
  memberSince: "Jul 2026",
  startedAt: null,
  sessionIds: [],
  sessionItems: [],
  sessionIndex: 0,
  phase: "countdown",
  remaining: 0,
  total: 0,
  paused: false,
  timer: null,
  modalIndex: 0,
  modalTab: "animation",
  stack: ["landing"],
  settings: { ...defaultSettings },
  carvePlus: false,
  plusRenewsAt: null,
  plusStatus: "none",
  dodoMode: "test",
  dodoConfigured: false,
  dodoReady: false,
  dodoReachedPayment: false,
  apiOrigin: "",
  plusPriceLabel: "₹1500",
  plusPriceInterval: "/mo",
  freeFaceScanUsed: false,
  freeVoiceScanUsed: false,
  toastTimer: null,
  voiceCoachPlan: null,
  user: null,
  googleTokenClient: null,
  pendingTrack: null,
};

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

function trackMeta() {
  return TRACKS[state.track || "face"];
}

function focusLabelForTrack() {
  if (state.track === "voice") return "Voice";
  if (state.track === "both") return "Both";
  return "Face";
}

function difficultyHtml() {
  return `<span>⚡</span> Beginner`;
}

function saveState() {
  if (!state.track) return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        track: state.track,
        days: state.days,
        currentDay: state.currentDay,
        streak: state.streak,
        sessionDates: state.sessionDates,
        exerciseSecondsByDate: state.exerciseSecondsByDate,
        unlockedBadges: state.unlockedBadges,
        habitChecks: state.habitChecks,
        profileName: state.profileName,
        memberSince: state.memberSince,
        startedAt: state.startedAt,
        settings: state.settings,
        carvePlus: state.carvePlus,
        plusRenewsAt: state.plusRenewsAt,
        plusStatus: state.plusStatus,
        freeFaceScanUsed: state.freeFaceScanUsed,
        freeVoiceScanUsed: state.freeVoiceScanUsed,
      })
    );
  } catch (_) {
    /* storage full or blocked */
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (!data.track) return false;
    state.track = data.track;
    state.days = data.days || buildDays(data.track);
    state.currentDay = data.currentDay || 1;
    state.streak = data.streak || 0;
    state.sessionDates =
      data.sessionDates && typeof data.sessionDates === "object" ? data.sessionDates : {};
    state.exerciseSecondsByDate =
      data.exerciseSecondsByDate && typeof data.exerciseSecondsByDate === "object"
        ? data.exerciseSecondsByDate
        : {};
    state.unlockedBadges =
      data.unlockedBadges && typeof data.unlockedBadges === "object" ? data.unlockedBadges : {};
    state.habitChecks = data.habitChecks && typeof data.habitChecks === "object" ? data.habitChecks : {};
    state.profileName = data.profileName || "Priya";
    state.memberSince = data.memberSince || "Jul 2026";
    state.startedAt = data.startedAt || null;
    state.settings = { ...defaultSettings, ...(data.settings || {}) };
    // Music used to be an unused flag saved as false; turn the new audio on once.
    if (!data.settings?.audioV1) {
      state.settings.music = true;
      state.settings.sfx = true;
      state.settings.audioV1 = true;
    }
    state.carvePlus = Boolean(data.carvePlus);
    state.plusRenewsAt = data.plusRenewsAt || null;
    state.plusStatus = data.plusStatus || (state.carvePlus ? "active" : "none");
    state.freeFaceScanUsed = Boolean(data.freeFaceScanUsed);
    state.freeVoiceScanUsed = Boolean(data.freeVoiceScanUsed);
    if (!state.carvePlus) {
      if (!state.freeFaceScanUsed && window.CarveFaceAnalysis?.loadFaceReport()) {
        state.freeFaceScanUsed = true;
      }
      if (!state.freeVoiceScanUsed && window.CarveVoiceAnalysis?.loadVoiceReport()) {
        state.freeVoiceScanUsed = true;
      }
    }
    ensureStartedAt();
    return true;
  } catch (_) {
    return false;
  }
}

function googleClientId() {
  return String(window.CARVE_GOOGLE_CLIENT_ID || "").trim();
}

function isSignedIn() {
  return Boolean(state.user?.id && state.user.provider === "google");
}

function saveAuth() {
  try {
    if (!state.user || state.user.provider !== "google") {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return;
    }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state.user));
  } catch (_) {
    /* storage full or blocked */
  }
}

function loadAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (!data?.id || data.provider === "guest") {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return false;
    }
    state.user = data;
    return true;
  } catch (_) {
    return false;
  }
}

/* The server verifies the Google token and sets an HttpOnly session cookie. */
async function exchangeGoogleToken(body) {
  const res = await apiFetch("/api/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.user?.id) {
    throw new Error(data.error || "Could not finish Google sign-in. Try again.");
  }
  if (IS_NATIVE_APP) setAppSessionToken(data.session_token || "");
  const { given_name: givenName, ...user } = data.user;
  applySignedInUser(user, { toast: `Signed in as ${givenName || user.name || "Google"}` });
}

function handleSessionExpired() {
  if (!state.user) return;
  if (IS_NATIVE_APP) setAppSessionToken("");
  state.user = null;
  setPlusEntitlement({ active: false, status: "none", next_billing_date: null }, { persist: false });
  saveAuth();
  renderMe();
  const message = "Your session expired. Sign in again.";
  showToast(message);
  if ($("#view-home")?.classList.contains("view-active") && state.track) {
    state.pendingTrack = state.track;
    lockTrainingAuth();
    setAuthStatus(message);
    return;
  }
  state.stack = ["landing"];
  showView("landing");
}

function applySignedInUser(user, { toast } = {}) {
  state.user = user;
  if (user.name) state.profileName = String(user.name).trim().slice(0, 24) || state.profileName;
  saveAuth();
  renderMe();
  if (toast) showToast(toast);
  const track = state.pendingTrack;
  state.pendingTrack = null;
  unlockTrainingAuth();
  applyCachedPlusForUser(user.id);
  syncCarvePlusFromServer();
  if (track && $("#view-home")?.classList.contains("view-active")) {
    refreshHome();
    return;
  }
  if (track) {
    selectTrack(track);
    return;
  }
  state.stack = ["landing"];
  showView("landing");
}

function openAuthModal(track) {
  if (track) state.pendingTrack = track;
  setAuthStatus("", false);
  const modal = $("#auth-modal");
  if (modal) modal.hidden = false;
}

function closeAuthModal() {
  const modal = $("#auth-modal");
  if (modal) modal.hidden = true;
  $("#btn-google-signin")?.removeAttribute("disabled");
}

function lockTrainingAuth() {
  $("#app")?.classList.add("auth-locked");
  openAuthModal();
}

function unlockTrainingAuth() {
  $("#app")?.classList.remove("auth-locked");
  closeAuthModal();
}

function cancelPendingAuth() {
  state.pendingTrack = null;
  unlockTrainingAuth();
  state.stack = ["landing"];
  showView("landing");
}

function signOutAccount() {
  const email = state.user?.email;
  try {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
      if (email) window.google.accounts.id.revoke(email, () => {});
    }
  } catch (_) {
    /* GIS optional */
  }
  apiFetch("/api/auth/logout", { method: "POST", keepalive: true }).catch(() => {});
  if (IS_NATIVE_APP) {
    nativeGoogleSignOut();
    setAppSessionToken("");
  }
  state.user = null;
  state.pendingTrack = null;
  setPlusEntitlement({ active: false, status: "none", next_billing_date: null }, { persist: false });
  saveAuth();
  unlockTrainingAuth();
  state.stack = ["landing"];
  showView("landing");
  renderMe();
  showToast("Signed out");
}

function setAuthStatus(message, show = true) {
  const el = $("#auth-status");
  if (!el) return;
  if (!show || !message) {
    el.hidden = true;
    el.textContent = "";
    return;
  }
  el.hidden = false;
  el.textContent = message;
}

async function onGoogleCredential(response) {
  try {
    await exchangeGoogleToken({ credential: response.credential });
  } catch (err) {
    setAuthStatus(err?.message || "Could not finish Google sign-in. Try again.");
    showToast("Google sign-in failed");
  }
}

async function onGoogleAccessToken(tokenResponse) {
  if (tokenResponse?.error) {
    setAuthStatus(tokenResponse.error_description || "Google sign-in was cancelled.");
    $("#btn-google-signin")?.removeAttribute("disabled");
    return;
  }
  try {
    await exchangeGoogleToken({ access_token: tokenResponse.access_token });
  } catch (err) {
    setAuthStatus(err?.message || "Could not finish Google sign-in. Try again.");
    showToast("Google sign-in failed");
  } finally {
    $("#btn-google-signin")?.removeAttribute("disabled");
  }
}

function initGoogleAuth() {
  const clientId = googleClientId();
  const btn = $("#btn-google-signin");
  if (!clientId) {
    setAuthStatus("Add your Google Client ID in auth-config.js to enable Google sign-in.");
    return;
  }
  setAuthStatus("", false);
  if (!window.google?.accounts) return;

  window.google.accounts.id.initialize({
    client_id: clientId,
    callback: onGoogleCredential,
    auto_select: false,
    cancel_on_tap_outside: true,
    use_fedcm_for_prompt: true,
  });

  if (window.google.accounts.oauth2?.initTokenClient) {
    state.googleTokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: onGoogleAccessToken,
    });
  }

  if (!isSignedIn() && btn) btn.removeAttribute("disabled");
}

function startGoogleSignIn() {
  if (IS_NATIVE_APP) {
    const btn = $("#btn-google-signin");
    if (btn) btn.disabled = true;
    setAuthStatus("", false);
    nativeGoogleIdToken()
      .then((idToken) => exchangeGoogleToken({ credential: idToken }))
      .catch((err) => {
        setAuthStatus(err?.message || "Could not finish Google sign-in. Try again.");
      })
      .finally(() => btn?.removeAttribute("disabled"));
    return;
  }
  const clientId = googleClientId();
  if (!clientId) {
    setAuthStatus("Add your Google Client ID in auth-config.js, then refresh.");
    showToast("Google Client ID is missing");
    return;
  }
  if (!window.google?.accounts) {
    setAuthStatus("Google sign-in is still loading. Try again in a moment.");
    return;
  }
  const btn = $("#btn-google-signin");
  if (btn) btn.disabled = true;
  setAuthStatus("", false);
  if (state.googleTokenClient) {
    state.googleTokenClient.requestAccessToken();
    window.setTimeout(() => btn?.removeAttribute("disabled"), 4000);
    return;
  }
  window.google.accounts.id.prompt((notification) => {
    btn?.removeAttribute("disabled");
    if (notification?.isNotDisplayed?.() || notification?.isSkippedMoment?.()) {
      setAuthStatus("Popup was blocked or this origin is not allowed in Google Cloud. Add http://127.0.0.1:8080 as an authorized JavaScript origin.");
    }
  });
}

function whenGoogleReady(cb) {
  if (window.google?.accounts) {
    cb();
    return;
  }
  let tries = 0;
  const t = window.setInterval(() => {
    tries += 1;
    if (window.google?.accounts) {
      window.clearInterval(t);
      cb();
    } else if (tries > 80) {
      window.clearInterval(t);
      if (!googleClientId()) return;
      setAuthStatus("Could not load Google sign-in. Check your connection and refresh.");
    }
  }, 100);
}

function showToast(message, ms = 2600) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
  requestAnimationFrame(() => el.classList.add("show"));
  if (state.toastTimer) clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => {
      el.hidden = true;
    }, 250);
  }, ms);
}

function normalizeReminderTime(value) {
  const match = String(value || "").match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return defaultSettings.reminderTime;
  const h = Math.min(23, Math.max(0, parseInt(match[1], 10)));
  const m = Math.min(59, Math.max(0, parseInt(match[2], 10)));
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function formatReminderTime(value) {
  const normalized = normalizeReminderTime(value);
  const [hStr, mStr] = normalized.split(":");
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${mStr} ${ampm}`;
}

function applyMirrorMode() {
  document.body.classList.toggle("mirror-mode-on", Boolean(state.settings.mirror));
}

const VOICE_COACH_LIBRARY = [
  {
    match: /diaphragmatic|belly breath/i,
    intro: "Diaphragmatic breathing. One hand on your belly.",
    steps: [
      "Inhale slowly through your nose.",
      "Let your belly expand, not your chest.",
      "Exhale gently on a soft hiss.",
      "Keep your shoulders quiet and relaxed.",
    ],
  },
  {
    match: /chewing method|froschel/i,
    intro: "Chewing method. Soft jaw, easy rhythm.",
    steps: [
      "Sit tall with lips gently closed.",
      "Make small chewing motions with the jaw.",
      "Keep the tongue relaxed on the palate.",
      "Stay light — no clenching.",
    ],
  },
  {
    match: /humming|chin-to-sky|chin drop/i,
    intro: "Humming with a gentle chin drop.",
    steps: [
      "Inhale quietly through your nose.",
      "Hum on a comfortable mid pitch.",
      "Feel vibration in your lips and face.",
      "Keep the throat soft and open.",
    ],
  },
  {
    match: /lip trill|motorboat/i,
    intro: "Lip trills. Loose lips, easy air.",
    steps: [
      "Take a comfortable breath in.",
      "Blow air through relaxed lips.",
      "Keep the sound light and buzzy.",
      "Do not push or strain.",
    ],
  },
  {
    match: /pen-in-mouth|articulation drill/i,
    intro: "Pen-in-mouth articulation. Clear and gentle.",
    steps: [
      "Hold the pen lightly between your teeth.",
      "Speak slowly with exaggerated mouth shapes.",
      "Keep consonants crisp but easy.",
      "Remove the pen and notice the clarity.",
    ],
  },
  {
    match: /tongue twister/i,
    intro: "Tongue twisters. Start slow, then build speed.",
    steps: [
      "Say each phrase slowly and clearly.",
      "Keep the jaw loose on every syllable.",
      "Speed up only when it stays clean.",
      "Stop if your tongue or throat tenses.",
    ],
  },
  {
    match: /yawn-sigh|yawn sigh/i,
    intro: "Yawn-sigh. Open the throat gently.",
    steps: [
      "Take a silent yawn feeling in the back of the throat.",
      "Let the breath flow out on a soft sigh.",
      "Keep the sound easy and unforced.",
      "Repeat with a relaxed neck.",
    ],
  },
  {
    match: /straw phonation|straw/i,
    intro: "Straw phonation. Light resistance, easy tone.",
    steps: [
      "Hum or sing gently through a straw.",
      "Keep the pitch comfortable.",
      "Feel steady airflow without pushing.",
      "Stop if anything feels tight.",
    ],
  },
  {
    match: /vocal fry/i,
    intro: "Vocal fry. Lowest comfortable creak, very light.",
    steps: [
      "Use only a tiny amount of air.",
      "Let the sound crackle softly in your throat.",
      "Never squeeze or grind the voice.",
      "Stop immediately if you feel hoarse.",
    ],
  },
  {
    match: /pitch glide|siren|ng slide/i,
    intro: "Pitch glides. Smooth sirens on an easy pitch.",
    steps: [
      "Start on a comfortable hum or NG sound.",
      "Glide slowly up, then slowly down.",
      "Keep the throat relaxed through the slide.",
      "Stay in a range that feels easy.",
    ],
  },
  {
    match: /gargl/i,
    intro: "Gargling exercise. Easy water, relaxed throat.",
    steps: [
      "Use lukewarm water if you are gargling.",
      "Gargle gently without forcing air.",
      "Keep the neck and jaw soft.",
      "Spit out and breathe through your nose.",
    ],
  },
  {
    match: /vowel stretch/i,
    intro: "Vowel stretching. Long, open vowel shapes.",
    steps: [
      "Pick a comfortable pitch.",
      "Sustain each vowel with steady breath.",
      "Open the mouth without tension.",
      "Move smoothly from vowel to vowel.",
    ],
  },
  {
    match: /neck|jaw relaxation|massage/i,
    intro: "Neck and jaw release. Small, gentle circles.",
    steps: [
      "Massage along the jaw hinge lightly.",
      "Roll the shoulders down and back.",
      "Let the tongue rest on the palate.",
      "Take a slow nasal breath between sets.",
    ],
  },
  {
    match: /posture reset|open airway/i,
    intro: "Posture reset. Tall spine, open airway.",
    steps: [
      "Stack your head over your shoulders.",
      "Open the chest without arching the back.",
      "Let the chin stay level, not tucked down.",
      "Breathe in and feel more space.",
    ],
  },
  {
    match: /chest resonance/i,
    intro: "Chest resonance hum. Feel vibration in the chest.",
    steps: [
      "Hum on a low comfortable pitch.",
      "Place a hand on your sternum.",
      "Keep the sound warm, not pushed.",
      "Let the buzz spread through the torso.",
    ],
  },
  {
    match: /downward inflection/i,
    intro: "Downward inflection. End phrases with calm authority.",
    steps: [
      "Speak a short phrase on one breath.",
      "Let the pitch glide slightly down at the end.",
      "Keep the volume steady, not louder.",
      "Stay relaxed in the throat.",
    ],
  },
  {
    match: /thumb-knuckle|bite resistance/i,
    intro: "Thumb-knuckle bite drill. Gentle resistance only.",
    steps: [
      "Place knuckles lightly between the teeth.",
      "Hum or speak without biting down hard.",
      "Keep the jaw loose while you work.",
      "Stop if anything feels sore.",
    ],
  },
  {
    match: /reading aloud/i,
    intro: "Slow reading aloud. Clear words, easy pace.",
    steps: [
      "Read one sentence at a time.",
      "Pause at punctuation to breathe.",
      "Keep consonants light and precise.",
      "Maintain steady volume throughout.",
    ],
  },
  {
    match: /mirror practice/i,
    intro: "Mirror practice. Watch your mouth shapes.",
    steps: [
      "Exaggerate lip and jaw movement slightly.",
      "Keep the face relaxed while you move.",
      "Match the coach on screen.",
      "Breathe between each repetition.",
    ],
  },
  {
    match: /ma-me-mi|consonant-vowel/i,
    intro: "Ma-me-mi-mo-mu drill. Clean consonants and vowels.",
    steps: [
      "Say each syllable with equal length.",
      "Keep the tongue active but not tight.",
      "Open the mouth on the vowel sounds.",
      "Repeat in a steady rhythm.",
    ],
  },
  {
    match: /recording|playback|self-review/i,
    intro: "Recording and playback. Listen with kind ears.",
    steps: [
      "Record one short phrase.",
      "Play it back at a comfortable volume.",
      "Notice clarity, pace, and breath.",
      "Adjust gently on the next take.",
    ],
  },
  {
    match: /breath control counting/i,
    intro: "Breath control counting. Steady exhale.",
    steps: [
      "Inhale deeply into the belly.",
      "Count aloud on one continuous exhale.",
      "Keep the numbers even and relaxed.",
      "Note how far you get without strain.",
    ],
  },
  {
    match: /om chant|resonant om/i,
    intro: "Resonant OM chant. Long, open sound.",
    steps: [
      "Inhale through the nose.",
      "Chant OM on one comfortable pitch.",
      "Feel resonance in the chest and face.",
      "Let the sound fade without pushing.",
    ],
  },
  {
    match: /voice projection|projection practice/i,
    intro: "Voice projection. Support from the breath, not the throat.",
    steps: [
      "Stand tall with ribs wide.",
      "Speak toward a point across the room.",
      "Increase volume from the belly, not the neck.",
      "Keep the tone warm and steady.",
    ],
  },
];

function isVoiceGrainSession() {
  return state.track === "voice";
}

function getVoiceCoachScript(ex) {
  const label = (ex.displayName || ex.name || "").trim();
  const key = label.toLowerCase();
  for (const entry of VOICE_COACH_LIBRARY) {
    if (entry.match.test(key)) {
      return { intro: entry.intro, steps: [...entry.steps] };
    }
  }
  const steps = (ex.steps || []).map((step) => String(step).replace(/^\d+\.\s*/, "").trim()).filter(Boolean);
  return {
    intro: `${label}. Follow the coach on screen.`,
    steps: steps.length
      ? steps
      : [
          "Set up tall with an open chest.",
          "Match the on-screen movement slowly.",
          "Keep your throat soft throughout.",
        ],
  };
}

function buildVoiceCoachMarks(stepCount, totalSec) {
  if (stepCount <= 1 || !totalSec) return [];
  const marks = [];
  for (let i = 1; i < stepCount; i += 1) {
    marks.push(Math.max(1, Math.floor(totalSec * (1 - i / stepCount))));
  }
  return marks;
}

function clearVoiceCoach() {
  state.voiceCoachPlan = null;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function speakCoachCue(text, opts = {}) {
  if (!state.settings.coachVoice || !text) return;
  if (isVoiceGrainSession() && !opts.forceVoiceGrain) return;
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = opts.rate ?? (isVoiceGrainSession() ? 0.92 : 0.95);
  utter.volume = 0.9;
  window.speechSynthesis.speak(utter);
}

function startVoiceExerciseCoach(ex) {
  if (!isVoiceGrainSession()) return;
  /* Voice Grain uses narrated exercise videos instead of TTS. */
}

function beginVoiceExerciseCoach(ex) {
  state.voiceCoachPlan = null;
  // Voice clips are narrated, so only speak the name when no narrated clip plays.
  const narrated = isVoiceItem(ex) && voiceGrainSlugForExercise(ex);
  if (!narrated) speakCoachCue(ex.displayName || ex.name, { forceVoiceGrain: true });
}

function tickVoiceExerciseCoach() {
  const plan = state.voiceCoachPlan;
  if (!plan || !isVoiceGrainSession() || state.paused || state.phase !== "active") return;
  const idx = plan.stepIndex;
  if (idx >= plan.steps.length) return;
  const mark = plan.marks[idx - 1];
  if (mark == null || state.remaining > mark) return;
  speakCoachCue(plan.steps[idx]);
  plan.stepIndex += 1;
}

function applySettingsUi() {
  const s = state.settings;
  const coachVoice = $("#set-coach-voice");
  const reminders = $("#set-reminders");
  const reminderInput = $("#reminder-time-input");
  const reminderLabel = $("#reminder-time-label");
  if (coachVoice) coachVoice.checked = s.coachVoice;
  const music = $("#set-music");
  const sfx = $("#set-sfx");
  if (music) music.checked = s.music !== false;
  if (sfx) sfx.checked = s.sfx !== false;
  if (reminders) reminders.checked = s.reminders;
  s.reminderTime = normalizeReminderTime(s.reminderTime);
  if (reminderInput) reminderInput.value = s.reminderTime;
  if (reminderLabel) reminderLabel.textContent = formatReminderTime(s.reminderTime);
  applyMirrorMode();
}

function parseReminderDraft(value) {
  const normalized = normalizeReminderTime(value);
  const [hStr, mStr] = normalized.split(":");
  let h24 = parseInt(hStr, 10);
  const minute = parseInt(mStr, 10);
  const ampm = h24 >= 12 ? "PM" : "AM";
  const hour12 = h24 % 12 || 12;
  return { hour12, minute, ampm, mode: "hour" };
}

function draftToReminderTime(draft) {
  let h24 = draft.hour12 % 12;
  if (draft.ampm === "PM") h24 += 12;
  if (draft.hour12 === 12 && draft.ampm === "AM") h24 = 0;
  return normalizeReminderTime(`${h24}:${draft.minute}`);
}

const reminderClockDraft = { hour12: 7, minute: 30, ampm: "PM", mode: "hour" };

function updateReminderClockHands() {
  const hourHand = $("#clock-hand-hour");
  const minuteHand = $("#clock-hand-minute");
  const face = $("#clock-face");
  if (!hourHand || !minuteHand) return;
  const hourDeg = (reminderClockDraft.hour12 % 12) * 30 + reminderClockDraft.minute * 0.5;
  const minuteDeg = reminderClockDraft.minute * 6;
  hourHand.style.transform = `rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
  if (face) {
    face.classList.toggle("mode-hour", reminderClockDraft.mode === "hour");
    face.classList.toggle("mode-minute", reminderClockDraft.mode === "minute");
  }
}

function renderReminderClockNumbers() {
  const root = $("#clock-numbers");
  if (!root) return;
  const isHour = reminderClockDraft.mode === "hour";
  const values = isHour
    ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  root.innerHTML = values
    .map((val, i) => {
      const rot = i * 30;
      const snappedMinute = (Math.round(reminderClockDraft.minute / 5) * 5) % 60;
      const active = isHour ? val === reminderClockDraft.hour12 : val === snappedMinute;
      const label = isHour ? val : String(val).padStart(2, "0");
      return `<button type="button" class="clock-num${active ? " active" : ""}" data-clock-value="${val}" style="--rot:${rot}deg">${label}</button>`;
    })
    .join("");
  root.querySelectorAll(".clock-num").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      setReminderClockValue(Number(btn.dataset.clockValue));
    });
  });
}

function setReminderClockValue(value) {
  if (reminderClockDraft.mode === "hour") {
    reminderClockDraft.hour12 = value || 12;
  } else {
    reminderClockDraft.minute = value;
  }
  renderReminderClockUi();
  if (reminderClockDraft.mode === "hour") {
    reminderClockDraft.mode = "minute";
    renderReminderClockUi();
  }
}

function angleFromClockEvent(face, e) {
  const rect = face.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const point = e.touches?.[0] || e.changedTouches?.[0] || e;
  const dx = point.clientX - cx;
  const dy = point.clientY - cy;
  let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  if (deg < 0) deg += 360;
  return deg;
}

function valueFromClockAngle(deg) {
  if (reminderClockDraft.mode === "hour") {
    const hour = Math.round(deg / 30) % 12;
    return hour || 12;
  }
  return Math.round(deg / 6) % 60;
}

function renderReminderClockUi() {
  const display = $("#reminder-clock-display");
  if (display) {
    display.textContent = formatReminderTime(
      draftToReminderTime(reminderClockDraft)
    );
  }
  $$(".clock-mode-tab").forEach((tab) => {
    const active = tab.dataset.clockMode === reminderClockDraft.mode;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
  });
  $$(".clock-ampm-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.ampm === reminderClockDraft.ampm);
  });
  renderReminderClockNumbers();
  updateReminderClockHands();
}

function openReminderClockModal() {
  Object.assign(reminderClockDraft, parseReminderDraft(state.settings.reminderTime));
  reminderClockDraft.mode = "hour";
  renderReminderClockUi();
  const modal = $("#reminder-clock-modal");
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeReminderClockModal() {
  const modal = $("#reminder-clock-modal");
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
}

function saveReminderClockTime() {
  state.settings.reminderTime = draftToReminderTime(reminderClockDraft);
  applySettingsUi();
  saveState();
  closeReminderClockModal();
  syncNativeReminder();
  showToast(`Reminder time · ${formatReminderTime(state.settings.reminderTime)}`);
}

function bindReminderClock() {
  const face = $("#clock-face");
  if (face) {
    let touchHandled = false;
    const pickFromPointer = (e) => {
      e.preventDefault();
      const val = valueFromClockAngle(angleFromClockEvent(face, e));
      setReminderClockValue(val);
    };
    face.addEventListener(
      "touchend",
      (e) => {
        touchHandled = true;
        pickFromPointer(e);
        window.setTimeout(() => {
          touchHandled = false;
        }, 400);
      },
      { passive: false }
    );
    face.addEventListener("click", (e) => {
      if (touchHandled) return;
      pickFromPointer(e);
    });
  }

  $$(".clock-mode-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      reminderClockDraft.mode = tab.dataset.clockMode;
      renderReminderClockUi();
    });
  });

  $$(".clock-ampm-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      reminderClockDraft.ampm = btn.dataset.ampm;
      renderReminderClockUi();
    });
  });

  $("#btn-reminder-clock-save")?.addEventListener("click", saveReminderClockTime);
  $$("[data-close-reminder-clock]").forEach((el) => {
    el.addEventListener("click", closeReminderClockModal);
  });
}

function openReminderTimePicker() {
  openReminderClockModal();
}

function openSettingsTab() {
  applySettingsUi();
  state.stack = ["me"];
  showView("me");
  renderMe();
}


function formatMetric(ex) {
  if (ex.duration != null) {
    const m = Math.floor(ex.duration / 60);
    const s = ex.duration % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return ex.eachSide ? `x ${ex.reps} each` : `x ${ex.reps}`;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function showView(id) {
  if (id !== "player") stopMusic();
  if (tourState.el) endTour();
  const allowLockedHome = id === "home" && Boolean(state.pendingTrack) && !isSignedIn();
  if (id !== "landing" && !isSignedIn() && !allowLockedHome) {
    id = "landing";
    state.stack = ["landing"];
  }
  if (id !== "reports" && id !== "my-progress") {
    stopFaceCamera();
    stopProgressMedia();
  }
  $$(".view").forEach((v) => {
    v.hidden = true;
    v.classList.remove("view-active");
  });
  const view = $(`#view-${id}`);
  view.hidden = false;
  view.classList.add("view-active");
  const tabsVisible = ["home", "reports", "me"].includes(id);
  $(".app").classList.toggle("tabs-hidden", !tabsVisible);
  if (tabsVisible) {
    $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === (id === "home" ? "training" : id)));
  }
  if (id === "landing") {
    const landing = $("#view-landing");
    landing?.classList.remove("view-leaving");
    landing?.querySelector(".landing-inner")?.scrollTo(0, 0);
    setTimeout(maybeStartLandingTour, 700);
  }
  if (id === "home") setTimeout(() => maybeStartHomeTour(), 700);
  if (id === "reports") {
    renderReports();
    $("#view-reports .scroll")?.scrollTo(0, 0);
  }
  if (id === "my-progress") {
    renderMyProgress();
    $("#view-my-progress .my-progress-scroll")?.scrollTo(0, 0);
  }
}

function navigate(id) {
  state.stack.push(id);
  showView(id);
}

function goBack() {
  const leaving = state.stack[state.stack.length - 1];
  if (leaving === "player") saveSessionProgress();
  clearPlayerTimer();
  stopCoachPlayer($("#player-coach"));
  if (state.stack.length > 1) state.stack.pop();
  const id = state.stack[state.stack.length - 1] || "landing";
  if (id === "day" && state.openDayN) {
    renderDayView(state.openDayN, { push: false });
    return;
  }
  showView(id);
}

function selectTrack(track) {
  if (state.transitioning) return;
  state.transitioning = true;
  const needsAuth = !isSignedIn();
  state.pendingTrack = needsAuth ? track : null;

  const landing = $("#view-landing");
  landing.classList.add("view-leaving");
  const resumeSameTrack = Boolean(state.track === track && state.days?.length);

  window.setTimeout(() => {
    if (!resumeSameTrack) {
      state.track = track;
      resetPresenceAnalysisPanels();
      state.days = buildDays(track);
      state.currentDay = 1;
      state.streak = 0;
      state.sessionDates = {};
      state.exerciseSecondsByDate = {};
      state.unlockedBadges = {};
      state.habitChecks = {};
      state.startedAt = dateKey();
      saveState();
    }
    refreshHome();
    renderDayList();
    state.stack = ["home"];
    showView("home");

    const home = $("#view-home");
    home.classList.remove("view-entering");
    void home.offsetWidth;
    home.classList.add("view-entering");

    landing.classList.remove("view-leaving");
    state.transitioning = false;

    if (needsAuth) lockTrainingAuth();
    else unlockTrainingAuth();

    window.setTimeout(() => home.classList.remove("view-entering"), 520);
  }, 400);
}

function dateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function habitCatalog(track) {
  if (track === "voice") {
    return [
      { id: "hydrate", icon: "💧", title: "Hydrate", sub: "Warm sips for easy voice", metric: "2 L", tint: "aqua" },
      { id: "posture", icon: "🌿", title: "Tall posture", sub: "Open chest, soft neck", metric: "3 x", tint: "mint" },
      { id: "hum", icon: "🎵", title: "Easy hums", sub: "Feel buzz on lips & face", metric: "5 min", tint: "lilac" },
      { id: "soft", icon: "🗣️", title: "Soft onsets", sub: "No hard glottal attacks", metric: "all day", tint: "sky" },
      { id: "rest", icon: "🌙", title: "Voice rest window", sub: "Quiet hour before sleep", metric: "1 h", tint: "sand" },
    ];
  }
  if (track === "both") {
    return [
      { id: "tongue", icon: "🧘", title: "Tongue on palate", sub: "Gentle mewing through the day", metric: "4 h", tint: "mint" },
      { id: "hydrate", icon: "💧", title: "Hydrate", sub: "Soft tissue + easy voice", metric: "2.5 L", tint: "aqua" },
      { id: "posture", icon: "🌿", title: "Posture resets", sub: "Chin tucks every few hours", metric: "3 x", tint: "sky" },
      { id: "hum", icon: "🎵", title: "Resonance check", sub: "One easy hum after speaking", metric: "2 x", tint: "lilac" },
    ];
  }
  return [
    { id: "tongue", icon: "🧘", title: "Tongue on palate", sub: "Gentle mewing through the day", metric: "4 h", tint: "mint" },
    { id: "posture", icon: "🌿", title: "Posture resets", sub: "Chin tucks every few hours", metric: "3 x", tint: "sky" },
    { id: "hydrate", icon: "💧", title: "Hydrate", sub: "Less bloat, sharper lines", metric: "2.5 L", tint: "aqua" },
    { id: "sleep", icon: "😴", title: "Back sleeping", sub: "No face-down compression", metric: "7 h", tint: "lilac" },
  ];
}

function todayHabitMap() {
  const key = dateKey();
  if (!state.habitChecks[key] || typeof state.habitChecks[key] !== "object") {
    state.habitChecks[key] = {};
  }
  return state.habitChecks[key];
}

function isHabitDone(habitId) {
  return Boolean(todayHabitMap()[habitId]);
}

function dayHasHabitActivity(key) {
  const map = state.habitChecks[key];
  return Boolean(map && Object.values(map).some(Boolean));
}

function hasSessionOnDate(key) {
  return Boolean(state.sessionDates && state.sessionDates[key]);
}

function markSessionDoneForToday() {
  if (!state.sessionDates || typeof state.sessionDates !== "object") {
    state.sessionDates = {};
  }
  state.sessionDates[dateKey()] = true;
}

function ensureStartedAt() {
  if (state.startedAt) return state.startedAt;
  const keys = Object.keys(state.sessionDates || {})
    .filter((key) => state.sessionDates[key])
    .sort();
  state.startedAt = keys[0] || dateKey();
  return state.startedAt;
}

function getJourneyCalendarDays(planDays = 30) {
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  const todayKey = dateKey(now);
  const startKey = ensureStartedAt();
  const start = new Date(`${startKey}T12:00:00`);
  const days = [];

  for (let dayNum = 1; dayNum <= planDays; dayNum += 1) {
    const cursor = new Date(start);
    cursor.setDate(start.getDate() + (dayNum - 1));
    const key = dateKey(cursor);
    const isFuture = cursor.getTime() > now.getTime();
    const isToday = key === todayKey;

    days.push({
      key,
      dayNum,
      isToday,
      isFuture,
      done: !isFuture && hasSessionOnDate(key),
    });
  }

  return days;
}

function getStreakCalendarDays(count = 14) {
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  const todayKey = dateKey(now);

  return Array.from({ length: count }, (_, i) => {
    const offset = i - (count - 1);
    const d = new Date(now);
    d.setDate(now.getDate() + offset);
    const key = dateKey(d);
    return {
      key,
      isToday: key === todayKey,
      isFuture: d > now,
      done: hasSessionOnDate(key),
    };
  });
}

function computeCurrentStreak() {
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  let streak = 0;
  const cursor = new Date(now);

  if (!hasSessionOnDate(dateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (hasSessionOnDate(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function computeBestStreak() {
  const keys = Object.keys(state.sessionDates || {})
    .filter((key) => state.sessionDates[key])
    .sort();
  if (!keys.length) return 0;

  let best = 1;
  let current = 1;
  for (let i = 1; i < keys.length; i++) {
    const prev = new Date(`${keys[i - 1]}T12:00:00`);
    const next = new Date(`${keys[i]}T12:00:00`);
    const gap = Math.round((next - prev) / 86400000);
    if (gap === 1) {
      current += 1;
      best = Math.max(best, current);
    } else if (gap > 1) {
      current = 1;
    }
  }
  return best;
}

const BADGE_CATALOG = [
  {
    id: "day1",
    emoji: "🎯",
    title: "First Rep",
    sub: "Finish Day 1",
    tier: "bronze",
    streak: 0,
    test: (ctx) => ctx.sessionsDone >= 1,
  },
  {
    id: "streak3",
    emoji: "🔥",
    title: "3-Day Spark",
    sub: "3 days in a row",
    tier: "bronze",
    streak: 3,
    test: (ctx) => ctx.bestStreak >= 3,
  },
  {
    id: "streak7",
    emoji: "⚡",
    title: "Week Warrior",
    sub: "7-day streak",
    tier: "silver",
    streak: 7,
    test: (ctx) => ctx.bestStreak >= 7,
  },
  {
    id: "streak14",
    emoji: "💪",
    title: "Fortnight",
    sub: "14-day streak",
    tier: "gold",
    streak: 14,
    test: (ctx) => ctx.bestStreak >= 14,
  },
  {
    id: "streak21",
    emoji: "🧬",
    title: "Habit Locked",
    sub: "21-day streak",
    tier: "gold",
    streak: 21,
    test: (ctx) => ctx.bestStreak >= 21,
  },
  {
    id: "streak30",
    emoji: "👑",
    title: "CARVE Master",
    sub: "30-day streak",
    tier: "legend",
    streak: 30,
    test: (ctx) => ctx.bestStreak >= 30,
  },
  {
    id: "photo",
    emoji: "📷",
    title: "Mirror Shot",
    sub: "First progress photo",
    voiceEmoji: "🎙️",
    voiceTitle: "Voice Log",
    voiceSub: "First progress recording",
    tier: "bronze",
    streak: 0,
    test: (ctx) => ctx.photoCount >= 1,
  },
  {
    id: "hour",
    emoji: "⏱",
    title: "Hour Power",
    sub: "60 guided minutes",
    tier: "silver",
    streak: 0,
    test: (ctx) => ctx.totalMinutes >= 60,
  },
];

function badgeContext(sessionsDone, photoCount, totalMinutes) {
  const currentStreak = computeCurrentStreak();
  const bestStreak = Math.max(computeBestStreak(), currentStreak);
  return { sessionsDone, photoCount, totalMinutes, currentStreak, bestStreak };
}

function syncUnlockedBadges(ctx) {
  if (!state.unlockedBadges || typeof state.unlockedBadges !== "object") {
    state.unlockedBadges = {};
  }

  const newlyUnlocked = [];
  BADGE_CATALOG.forEach((badge) => {
    if (state.unlockedBadges[badge.id] || !badge.test(ctx)) return;
    state.unlockedBadges[badge.id] = { unlockedAt: new Date().toISOString() };
    newlyUnlocked.push(badge);
  });

  if (newlyUnlocked.length) saveState();
  return newlyUnlocked;
}

function nextStreakBadge(ctx) {
  return BADGE_CATALOG.find((badge) => badge.streak > 0 && !state.unlockedBadges[badge.id]);
}

function computeConsistencyScore(days = 14) {
  const cal = getStreakCalendarDays(days);
  const relevant = cal.filter((d) => !d.isFuture);
  if (!relevant.length) return 0;
  const completed = relevant.filter((d) => d.done).length;
  return Math.round((completed / relevant.length) * 100);
}

function getWeekTrainingDays() {
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  const dow = now.getDay();
  const mondayOffset = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  const labels = ["M", "T", "W", "T", "F", "S", "S"];
  const todayKey = dateKey(now);

  return labels.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const key = dateKey(d);
    const isToday = key === todayKey;
    const isFuture = d > now;
    const sessionDone = hasSessionOnDate(key);
    return { label, key, isToday, isFuture, sessionDone };
  });
}

function getWeekDays() {
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  const dow = now.getDay();
  const mondayOffset = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  const labels = ["M", "T", "W", "T", "F", "S", "S"];
  const todayKey = dateKey(now);
  const startKey = ensureStartedAt();

  return labels.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const key = dateKey(d);
    const isToday = key === todayKey;
    const isFuture = d > now;
    const done = !isFuture && hasSessionOnDate(key);
    // Only days since the user started count as missed; earlier days stay plain.
    const missed = !isFuture && !isToday && !done && key >= startKey;
    return { label, dayNum: d.getDate(), key, isToday, isFuture, done, missed };
  });
}

/* Form cues for "Today's focus". Matched by keyword against today's exercise names. */
const FOCUS_CUES = [
  [["mewing"], "Whole tongue flat on the roof of your mouth, lips closed, teeth lightly touching. Breathe through your nose."],
  [["chin tuck"], "Glide your head straight back, like making a double chin. Keep your eyes level, don't tip down."],
  [["neck curl"], "Keep your tongue on the palate and lift your head only a little. Stop if your neck strains."],
  [["resistance", "thumb pulling", "knuckle bite"], "Push at about half effort. Your jaw should never click or hurt."],
  [["cheek puff", "fish face", "straw pull", "puckered", "kiss face"], "Keep your forehead and eyes relaxed. Only the cheeks and lips should work."],
  [["jaw stretch", "silent scream", "jaw circles", "chewing exercise"], "Open slowly and only as far as feels comfortable. Stop at any click or pain."],
  [["neck rotation", "collarbone", "platysma", "cobra"], "Move slowly and keep your shoulders down, away from your ears."],
  [["tongue stretch"], "Reach without straining. The stretch should feel mild, never sharp."],
  [["big smile", "eyebrow", "o-e hold", "vowel exercise", "lion pose"], "Make the shape big, then hold still. Keep breathing normally through the hold."],
  [["de-puff", "gua sha", "massage"], "Use light pressure with clean hands, stroking outward and upward. Never drag the skin."],
  [["diaphragmatic", "belly breathing"], "Your belly rises as you breathe in. Chest and shoulders stay still."],
  [["hum", "resonance", "om chant"], "Hum softly and feel the buzz on your lips and face. Don't push for volume."],
  [["lip trill", "straw phonation"], "Keep the airflow steady and easy. If your lips stop, add a little air, not force."],
  [["vocal fry"], "Keep it very quiet and short. Stop if your throat feels scratchy."],
  [["pitch glide", "siren"], "Slide smoothly and stay inside your comfortable range. Don't reach for extremes."],
  [["yawn-sigh"], "Let the sigh fall from a comfortable high note to low, with your throat open and relaxed."],
  [["chewing method"], "Chew loosely while you hum or speak. Keep your jaw floppy."],
  [["gargling"], "Take a small sip, tilt your head back gently, and keep it short."],
  [["posture reset"], "Stand tall: ears over shoulders, chest open, jaw loose."],
  [["projection", "downward inflection"], "Speak from your breath, not your throat. Louder should never feel strained."],
  [["breath control"], "Breathe out steadily and evenly. Stop counting before you feel tight."],
  [["recording"], "Listen back for one thing only: pace, clarity or pitch."],
  [["twister", "pen-in-mouth", "ma-me", "mirror practice", "reading aloud", "vowel stretching"], "Clarity before speed. Shape each sound fully before you go faster."],
];

const FOUNDATION_EXERCISES = ["mewing", "diaphragmatic"];

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function todayExerciseNames() {
  const day = state.days?.find((d) => d.n === state.currentDay) || state.days?.[0];
  if (!day) return [];
  return daySessionItems(day).map((ex) => ex.displayName || ex.name);
}

function todaysFocus() {
  const names = todayExerciseNames();
  const lower = (s) => String(s || "").toLowerCase();
  const withCue = names
    .map((name) => {
      const hit = FOCUS_CUES.find(([keys]) => keys.some((k) => lower(name).includes(k)));
      return hit ? { name, cue: hit[1] } : null;
    })
    .filter(Boolean);
  // Prefer a non-foundation move so the cue changes day to day.
  const varied = withCue.filter((f) => !FOUNDATION_EXERCISES.some((k) => lower(f.name).includes(k)));
  const pool = varied.length ? varied : withCue;
  if (!pool.length) {
    return { name: "Every exercise", cue: "Move gently and stop if anything hurts. Steady beats intense." };
  }
  return pool[(state.currentDay || 1) % pool.length];
}

function streakRewardsSummary() {
  const current = computeCurrentStreak();
  const best = Math.max(computeBestStreak(), current);
  const milestones = BADGE_CATALOG.filter((b) => b.streak > 0).map((b) => ({
    ...b,
    earned: Boolean(state.unlockedBadges?.[b.id]) || best >= b.streak,
  }));
  const next = milestones.find((m) => !m.earned) || null;
  return { current, best, milestones, next };
}

function habitsLead(track) {
  if (track === "voice") return "Tap to check off today’s voice cues.";
  if (track === "both") return "Tap to check off face + voice cues.";
  return "Tap to check off today’s cues.";
}

function badgeDisplayMeta(badge) {
  if (state.track === "voice" && badge.voiceTitle) {
    return { emoji: badge.voiceEmoji || badge.emoji, title: badge.voiceTitle, sub: badge.voiceSub || badge.sub };
  }
  return { emoji: badge.emoji, title: badge.title, sub: badge.sub };
}

function nextBadgeToUnlock(ctx) {
  return BADGE_CATALOG.find((badge) => !state.unlockedBadges?.[badge.id]);
}

function badgeProgressToward(badge, ctx) {
  if (badge.streak > 0) {
    const current = ctx.bestStreak;
    const target = badge.streak;
    return {
      label: `${Math.min(current, target)} / ${target} day streak`,
      pct: Math.min(100, Math.round((current / target) * 100)),
      remaining: Math.max(0, target - current),
    };
  }
  if (badge.id === "day1") {
    const current = ctx.sessionsDone;
    return {
      label: `${current} / 1 session`,
      pct: current >= 1 ? 100 : 0,
      remaining: current >= 1 ? 0 : 1,
    };
  }
  if (badge.id === "photo") {
    const current = ctx.photoCount;
    return {
      label: current >= 1 ? "Logged on device" : "Not logged yet",
      pct: current >= 1 ? 100 : 0,
      remaining: current >= 1 ? 0 : 1,
    };
  }
  if (badge.id === "hour") {
    const current = ctx.totalMinutes;
    return {
      label: `${current} / 60 guided min`,
      pct: Math.min(100, Math.round((current / 60) * 100)),
      remaining: Math.max(0, 60 - current),
    };
  }
  return { label: "", pct: 0, remaining: 0 };
}

function formatExerciseDuration(seconds) {
  const secs = Math.max(0, Math.round(seconds || 0));
  if (!secs) return "0 min";
  const mins = Math.floor(secs / 60);
  const rest = secs % 60;
  if (!mins) return `${rest}s`;
  if (!rest) return `${mins} min`;
  return `${mins}m ${rest}s`;
}

function addExerciseSeconds(seconds, key = dateKey()) {
  const secs = Math.max(0, Math.round(seconds || 0));
  if (!secs) return;
  if (!state.exerciseSecondsByDate || typeof state.exerciseSecondsByDate !== "object") {
    state.exerciseSecondsByDate = {};
  }
  state.exerciseSecondsByDate[key] = (state.exerciseSecondsByDate[key] || 0) + secs;
}

function recordCompletedExerciseTime() {
  addExerciseSeconds(state.total || 0);
}

function estimateDayExerciseSeconds(day) {
  if (!day) return 0;
  const items = daySessionItems(day);
  const done = dayDoneCount(day);
  let total = 0;
  for (let i = 0; i < done; i += 1) {
    const ex = items[i];
    if (!ex) continue;
    total += ex.duration || (ex.reps || 10) * 3;
  }
  return total;
}

function getDayExerciseSeconds(key, isToday = false) {
  const stored = state.exerciseSecondsByDate?.[key] || 0;
  if (stored > 0) return stored;
  if (hasSessionOnDate(key)) return 9 * 60;
  if (isToday) {
    const day = state.days?.find((d) => d.n === (state.openDayN || state.currentDay));
    return estimateDayExerciseSeconds(day);
  }
  return 0;
}

function dayHabitProgress(key, track) {
  const habits = habitCatalog(track);
  if (!habits.length) return 0;
  const map = state.habitChecks?.[key];
  if (!map || typeof map !== "object") return 0;
  const done = habits.filter((h) => map[h.id]).length;
  return Math.round((done / habits.length) * 100);
}

const PERF_TIERS = {
  low: { color: "#f87171", label: "Low", ring: "#fecaca" },
  mid: { color: "#60a5fa", label: "Building", ring: "#bfdbfe" },
  high: { color: "#4ade80", label: "Strong", ring: "#bbf7d0" },
};

function performanceTier(score) {
  if (score >= 70) return "high";
  if (score >= 35) return "mid";
  return "low";
}

function dayPerformanceScore(key, track, isToday = false) {
  let sessionPct = 0;
  if (hasSessionOnDate(key)) {
    sessionPct = 100;
  } else if (isToday) {
    const day = state.days?.find((d) => d.n === state.currentDay);
    sessionPct = day?.percent || 0;
  }
  const habitPct = dayHabitProgress(key, track);
  return Math.min(100, Math.round(sessionPct * 0.55 + habitPct * 0.45));
}

const DEMO_PERF_SCORES = [18, 42, 35, 68, 55, 88, 52];
const DEMO_EXERCISE_SECONDS = [2, 5, 4, 9, 7, 12, 6].map((m) => m * 60);

function hasPerformanceData(series) {
  return series.some((d) => !d.isFuture && (d.score ?? 0) > 0);
}

function getDemoPerformanceSeries(days = 7, track = state.track || "face") {
  const base = getPerformanceSeries(days, track);
  return base.map((d, i) => ({
    ...d,
    score: d.isFuture ? null : DEMO_PERF_SCORES[i] ?? 40,
    exerciseSeconds: d.isFuture ? 0 : DEMO_EXERCISE_SECONDS[i] ?? 0,
  }));
}

function resolvePerformanceDisplay(track = state.track || "face") {
  const real = getPerformanceSeries(7, track);
  const isDemo = !hasPerformanceData(real);
  const series = isDemo ? getDemoPerformanceSeries(7, track) : real;
  const today = series.find((d) => d.isToday);
  const todayScore = today?.score ?? 0;
  return { series, isDemo, todayScore, todayTier: performanceTier(todayScore) };
}

function getPerformanceSeries(days = 7, track = state.track || "face") {
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  const todayKey = dateKey(now);

  return Array.from({ length: days }, (_, i) => {
    const offset = i - (days - 1);
    const d = new Date(now);
    d.setDate(now.getDate() + offset);
    const key = dateKey(d);
    const isToday = key === todayKey;
    const isFuture = d > now;
    const score = isFuture ? null : dayPerformanceScore(key, track, isToday);
    const exerciseSeconds = isFuture ? 0 : getDayExerciseSeconds(key, isToday);
    const shortLabel = d.toLocaleDateString(undefined, { weekday: "narrow" });
    return { key, shortLabel, isToday, isFuture, score, exerciseSeconds };
  });
}

function buildPerformanceGraphSvg(series) {
  const W = 300;
  const H = 96;
  const padX = 14;
  const padY = 12;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;
  const n = series.length;

  const coords = series.map((d, i) => {
    const x = padX + (i / Math.max(1, n - 1)) * innerW;
    if (d.isFuture || d.score == null) return { x, y: null, d };
    const y = padY + innerH - (d.score / 100) * innerH;
    return { x, y, d };
  });

  const valid = coords.filter((c) => c.y != null);
  const linePath = valid
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(" ");
  const areaPath = valid.length
    ? `${linePath} L ${valid[valid.length - 1].x.toFixed(1)} ${(padY + innerH).toFixed(1)} L ${valid[0].x.toFixed(1)} ${(padY + innerH).toFixed(1)} Z`
    : "";

  const dots = valid
    .map((c) => {
      const tier = performanceTier(c.d.score);
      const col = PERF_TIERS[tier].color;
      const r = c.d.isToday ? 5.5 : 4;
      const stroke = c.d.isToday ? "#1a1428" : "#fff";
      const sw = c.d.isToday ? 2 : 1.5;
      const secs = c.d.exerciseSeconds || 0;
      const timeLabel = formatExerciseDuration(secs);
      return `<g class="perf-dot-group" data-perf-secs="${secs}" data-perf-label="${c.d.shortLabel}" aria-label="${c.d.shortLabel}: ${timeLabel} exercised">
        <circle class="perf-dot-hit" cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="14" fill="transparent"/>
        <circle class="perf-dot" cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${r}" fill="${col}" stroke="${stroke}" stroke-width="${sw}"/>
      </g>`;
    })
    .join("");

  const labels = series
    .map((d, i) => {
      const x = padX + (i / Math.max(1, n - 1)) * innerW;
      const cls = d.isToday ? "perf-svg-label today" : "perf-svg-label";
      return `<text x="${x.toFixed(1)}" y="${H - 2}" text-anchor="middle" class="${cls}">${d.shortLabel}</text>`;
    })
    .join("");

  const grid = [0.25, 0.5, 0.75]
    .map((pct) => {
      const y = padY + innerH * (1 - pct);
      return `<line x1="${padX}" y1="${y.toFixed(1)}" x2="${W - padX}" y2="${y.toFixed(1)}" class="perf-grid-line"/>`;
    })
    .join("");

  return `<svg viewBox="0 0 ${W} ${H}" class="perf-svg" preserveAspectRatio="none">
    <defs>
      <linearGradient id="perfLineGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#f87171"/>
        <stop offset="45%" stop-color="#60a5fa"/>
        <stop offset="100%" stop-color="#4ade80"/>
      </linearGradient>
      <linearGradient id="perfAreaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#60a5fa28"/>
        <stop offset="100%" stop-color="#60a5fa00"/>
      </linearGradient>
    </defs>
    ${grid}
    ${areaPath ? `<path d="${areaPath}" fill="url(#perfAreaGrad)"/>` : ""}
    ${linePath ? `<path d="${linePath}" fill="none" stroke="url(#perfLineGrad)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` : ""}
    ${dots}
    ${labels}
  </svg>`;
}

function renderPerformanceGraph(track, display) {
  const { series, isDemo } = display || resolvePerformanceDisplay(track);
  const svg = buildPerformanceGraphSvg(series);

  return `
    <div class="perf-graph${isDemo ? " is-demo" : ""}">
      <div class="perf-graph-head">
        <strong>Performance</strong>
        <span class="perf-graph-sub">${isDemo ? "Sample preview" : "Last 7 days"}</span>
      </div>
      <div class="perf-graph-canvas">
        ${svg}
        <div class="perf-graph-tip" hidden role="status"></div>
      </div>
      <div class="perf-graph-legend" aria-hidden="true">
        <span><i style="background:#f87171"></i>Low</span>
        <span><i style="background:#60a5fa"></i>Building</span>
        <span><i style="background:#4ade80"></i>Strong</span>
      </div>
    </div>`;
}

function hidePerfGraphTips(root = $("#track-extras")) {
  if (!root) return;
  root.querySelectorAll(".perf-graph-tip").forEach((tip) => {
    tip.hidden = true;
  });
  root.querySelectorAll(".perf-dot-group.is-active").forEach((group) => {
    group.classList.remove("is-active");
  });
}

function showPerfGraphTip(group) {
  const canvas = group.closest(".perf-graph-canvas");
  if (!canvas) return;
  const tip = canvas.querySelector(".perf-graph-tip");
  if (!tip) return;
  const secs = Number(group.dataset.perfSecs || 0);
  const label = group.dataset.perfLabel || "";
  canvas.querySelectorAll(".perf-dot-group.is-active").forEach((node) => {
    node.classList.remove("is-active");
  });
  group.classList.add("is-active");
  tip.hidden = false;
  tip.innerHTML = `<strong>${label}</strong><span>${formatExerciseDuration(secs)}</span>`;
  const dot = group.querySelector(".perf-dot");
  if (!dot) return;
  const canvasRect = canvas.getBoundingClientRect();
  const dotRect = dot.getBoundingClientRect();
  tip.style.left = `${dotRect.left - canvasRect.left + dotRect.width / 2}px`;
  tip.style.top = `${dotRect.top - canvasRect.top}px`;
}

function momentumCopy(track) {
  if (track === "voice") return "Small daily reps compound into a clearer, calmer voice.";
  if (track === "both") return "Face and voice habits stack — consistency beats intensity.";
  return "Daily reps reshape tone and posture — stay gentle, stay regular.";
}

function renderHomeWeek() {
  const root = $("#home-week");
  if (!root) return;
  const week = getWeekDays();
  const weekDone = week.filter((d) => d.done).length;

  root.innerHTML = `
    <section class="home-panel week-panel week-panel-top" aria-label="This week">
      <div class="panel-head">
        <h2 class="panel-title">This week</h2>
        <span class="panel-meta">${weekDone} of 7 done</span>
      </div>
      <div class="week-strip" role="list">
        ${week
          .map((d) => {
            let cls = "week-day";
            if (d.done) cls += " done";
            if (d.isToday) cls += " today";
            if (d.isFuture) cls += " future";
            if (d.missed) cls += " missed";
            const inner = d.done
              ? `<span class="week-check" aria-hidden="true">✓</span>`
              : d.missed
                ? `<span class="week-cross" aria-hidden="true">✕</span>`
                : `<span class="week-num">${d.dayNum}</span>`;
            const status = d.done ? "done" : d.missed ? "missed" : d.isToday ? "today" : "upcoming";
            return `<div class="${cls}" role="listitem" title="${d.label}" aria-label="${d.label} ${d.dayNum}: ${status}">
              <span class="week-label">${d.label}</span>
              <div class="week-circle">${inner}</div>
            </div>`;
          })
          .join("")}
      </div>
    </section>`;
}

function renderTrackExtras() {
  const root = $("#track-extras");
  if (!root) return;
  const focus = todaysFocus();
  const rewards = streakRewardsSummary();
  const next = rewards.next;
  const prevMilestone = next
    ? rewards.milestones.filter((m) => m.streak < next.streak && m.streak <= rewards.current).pop()?.streak || 0
    : 0;
  const toNext = next ? Math.max(0, next.streak - rewards.current) : 0;
  const nextPct = next
    ? Math.min(100, Math.max(0, ((rewards.current - prevMilestone) / (next.streak - prevMilestone)) * 100))
    : 100;
  const rewardsLead = next
    ? rewards.current > 0
      ? `${toNext} more day${toNext === 1 ? "" : "s"} in a row to unlock ${next.emoji} ${next.title}.`
      : `Train ${next.streak} days in a row to unlock ${next.emoji} ${next.title}.`
    : "Every streak reward unlocked. Keep the flame alive.";

  renderHomeWeek();

  root.innerHTML = `
    <div class="extras-block">
      <section class="home-panel photo-panel" id="photo-panel" aria-label="7-day photo" hidden></section>

      <section class="home-panel focus-panel" aria-label="Today's focus">
        <div class="momentum-shell focus-shell">
          <p class="momentum-kicker">Day ${state.currentDay || 1} · form tip</p>
          <h2 class="panel-title">Today’s focus</h2>
          <p class="focus-exercise">${escapeHtml(focus.name)}</p>
          <p class="momentum-lead focus-cue">${escapeHtml(focus.cue)}</p>
        </div>
      </section>

      <section class="home-panel rewards-panel" aria-label="Streak rewards">
        <div class="momentum-shell">
          <div class="momentum-head">
            <div>
              <p class="momentum-kicker">Streak · best ${rewards.best} day${rewards.best === 1 ? "" : "s"}</p>
              <h2 class="panel-title">Streak rewards</h2>
              <p class="momentum-lead">${rewardsLead}</p>
            </div>
            <div class="rewards-flame" aria-label="Current streak ${rewards.current} days">
              <span aria-hidden="true">🔥</span>
              <strong>${rewards.current}</strong>
            </div>
          </div>
          <div class="rewards-progress" aria-hidden="true">
            <div class="rewards-progress-fill" style="width:${nextPct}%"></div>
          </div>
          <ol class="rewards-track">
            ${rewards.milestones
              .map(
                (m) => `<li class="reward-step${m.earned ? " earned" : ""}${next && m.id === next.id ? " next" : ""}">
                  <span class="reward-emoji" aria-hidden="true">${m.earned ? m.emoji : "🔒"}</span>
                  <span class="reward-days">${m.streak}d</span>
                  <span class="visually-hidden">${m.title}: ${m.earned ? "unlocked" : "locked"}</span>
                </li>`
              )
              .join("")}
          </ol>
          <p class="rewards-plus-line">${escapeHtml(streakRewardsPlusLine())}</p>
          <button type="button" class="momentum-cta rewards-share" data-share-streak>
            <span>Share streak card${hasCarvePlus() ? "" : " · Plus"}</span>
            <span aria-hidden="true">›</span>
          </button>
          <button type="button" class="momentum-cta" data-open-achievements>
            <span>View achievements</span>
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </section>
    </div>`;

  bindTrackExtras();
  bindDailyPhotoPanel();
  renderDailyPhotoPanel();
}

function bindTrackExtras() {
  const root = $("#track-extras");
  if (!root || root.dataset.bound === "1") return;
  root.dataset.bound = "1";
  root.addEventListener("pointerover", (e) => {
    const perfDot = e.target.closest(".perf-dot-group");
    if (perfDot) showPerfGraphTip(perfDot);
  });
  root.addEventListener("pointerout", (e) => {
    const perfDot = e.target.closest(".perf-dot-group");
    if (perfDot) {
      if (e.relatedTarget && perfDot.contains(e.relatedTarget)) return;
      if (e.relatedTarget?.closest?.(".perf-dot-group")) return;
      hidePerfGraphTips(root);
      return;
    }
    const canvas = e.target.closest(".perf-graph-canvas");
    if (canvas && (!e.relatedTarget || !canvas.contains(e.relatedTarget))) {
      hidePerfGraphTips(root);
    }
  });
  root.addEventListener("click", (e) => {
    if (e.target.closest("[data-share-streak]")) {
      openShareSheet("streak");
      return;
    }
    if (e.target.closest("[data-open-achievements]")) {
      state.stack = ["reports"];
      renderReports();
      showView("reports");
      $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === "reports"));
      window.requestAnimationFrame(() => {
        $("#reports-badges-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  });
}

function renderProgressBox() {
  /* Home uses hero card only — day rail lives on plan screen */
}

function isVoiceProgressMode() {
  return state.track === "voice";
}

function isFullPresenceMode() {
  return state.track === "both";
}

function showsFaceReports() {
  return state.track === "face" || isFullPresenceMode();
}

function showsVoiceReports() {
  return state.track === "voice" || isFullPresenceMode();
}

function applyReportsProgressCopy() {
  const kicker = $("#reports-photos-kicker");
  const title = $("#reports-photos-card .card-title");
  const lead = $("#reports-photos-card .reports-photos-lead");
  const photoCta = $("#btn-reports-add-photo");
  const voiceCta = $("#btn-reports-add-voice");
  const faceCard = $("#reports-face-analysis-card");
  const voiceCard = $("#reports-voice-analysis-card");

  if (isVoiceProgressMode()) {
    if (kicker) kicker.textContent = "Vocal progress";
    if (title) title.textContent = "Progress recordings";
    if (lead) {
      lead.textContent =
        "Record the same phrase each week in a quiet room. Clips stay on this device — never uploaded.";
    }
    if (photoCta) {
      photoCta.textContent = "Record this week’s voice";
      photoCta.hidden = false;
    }
    if (voiceCta) voiceCta.hidden = true;
    if (faceCard) faceCard.hidden = true;
    if (voiceCard) voiceCard.hidden = false;
  } else if (isFullPresenceMode()) {
    if (kicker) kicker.textContent = "Face & voice progress";
    if (title) title.textContent = "Weekly check-ins";
    if (lead) {
      lead.textContent =
        "Capture a front-facing photo and record the same phrase each week. Everything stays on this device — never uploaded.";
    }
    if (photoCta) {
      photoCta.textContent = "Capture this week’s photo";
      photoCta.hidden = false;
    }
    if (voiceCta) {
      voiceCta.textContent = "Record this week’s voice";
      voiceCta.hidden = false;
    }
    if (faceCard) faceCard.hidden = true;
    if (voiceCard) voiceCard.hidden = true;
    syncPresenceAnalysisCards();
  } else {
    if (kicker) kicker.textContent = "Visual progress";
    if (title) title.textContent = "Progress photos";
    if (lead) {
      lead.textContent =
        "Capture the same angle and light each week. Photos stay on this device — never uploaded.";
    }
    if (photoCta) {
      photoCta.textContent = "Capture this week’s photo";
      photoCta.hidden = false;
    }
    if (voiceCta) voiceCta.hidden = true;
    if (faceCard) faceCard.hidden = false;
    if (voiceCard) voiceCard.hidden = true;
  }
}

function loadReportProgressCount() {
  if (hasDailyProgressAccess()) {
    const store = loadDailyProgress();
    return Object.keys(store).filter((k) => store[k]?.photo || store[k]?.voice).length;
  }
  const photoCount = Object.keys(loadReportPhotos()).filter((k) => loadReportPhotos()[k]).length;
  const voiceCount = Object.keys(loadReportVoice()).filter((k) => loadReportVoice()[k]).length;
  if (isFullPresenceMode()) return photoCount + voiceCount;
  if (isVoiceProgressMode()) return voiceCount;
  return photoCount;
}

const PHOTO_STORAGE_KEY = "carve-report-photos-v1";
const VOICE_STORAGE_KEY = "carve-report-voice-v1";
const DAILY_PROGRESS_KEY = "carve-my-progress-daily-v1";
const VOICE_RECORD_MAX_MS = 60000;
const PROFILE_PHOTO_KEY = "carve-profile-photo-v1";
const PROFILE_PHOTO_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
const DEFAULT_HERO_PHOTO = "assets/hero-jawline.png";

function loadProfilePhoto() {
  try {
    const raw = localStorage.getItem(PROFILE_PHOTO_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.dataUrl || !parsed?.updatedAt) return null;
    return parsed;
  } catch (_) {
    return null;
  }
}

function saveProfilePhoto(dataUrl) {
  localStorage.setItem(
    PROFILE_PHOTO_KEY,
    JSON.stringify({
      dataUrl,
      updatedAt: new Date().toISOString(),
    })
  );
}

function profilePhotoUpdateStatus() {
  const photo = loadProfilePhoto();
  if (!photo) return { allowed: true, daysLeft: 0, hasPhoto: false };
  const elapsed = Date.now() - new Date(photo.updatedAt).getTime();
  if (elapsed >= PROFILE_PHOTO_COOLDOWN_MS) {
    return { allowed: true, daysLeft: 0, hasPhoto: true };
  }
  const daysLeft = Math.ceil((PROFILE_PHOTO_COOLDOWN_MS - elapsed) / (24 * 60 * 60 * 1000));
  return { allowed: false, daysLeft, hasPhoto: true };
}

function compressProfilePhoto(dataUrl, maxSize = 512) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => reject(new Error("Image load failure"));
    img.src = dataUrl;
  });
}

function renderHeroPhoto() {
  const img = $("#hero-photo");
  const badge = $("#hero-photo-badge");
  const btn = $("#btn-hero-photo");
  if (!img) return;

  const photo = loadProfilePhoto();
  const status = profilePhotoUpdateStatus();
  img.src = photo?.dataUrl || DEFAULT_HERO_PHOTO;
  img.classList.toggle("is-user", Boolean(photo?.dataUrl));

  if (badge) badge.hidden = status.hasPhoto;
  if (btn) {
    btn.classList.toggle("is-locked", status.hasPhoto && !status.allowed);
    const label = status.hasPhoto
      ? status.allowed
        ? "Update your photo"
        : `Photo locked · update in ${status.daysLeft} day${status.daysLeft === 1 ? "" : "s"}`
      : "Add your photo";
    btn.title = label;
    btn.setAttribute("aria-label", label);
  }
}

function openHeroPhotoPicker() {
  const status = profilePhotoUpdateStatus();
  if (!status.allowed) {
    showToast(`You can update your photo in ${status.daysLeft} day${status.daysLeft === 1 ? "" : "s"}`);
    return;
  }
  $("#hero-photo-input")?.click();
}

async function handleHeroPhotoSelected(file) {
  if (!file) return;
  const status = profilePhotoUpdateStatus();
  if (!status.allowed) {
    showToast(`You can update your photo in ${status.daysLeft} day${status.daysLeft === 1 ? "" : "s"}`);
    return;
  }

  try {
    if (!String(file.type || "").startsWith("image/")) {
      showToast("Please choose an image file");
      return;
    }
    const raw = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Read failed"));
      reader.readAsDataURL(file);
    });
    const dataUrl = await compressProfilePhoto(raw);
    saveProfilePhoto(dataUrl);
    renderHeroPhoto();
    showToast(status.hasPhoto ? "Photo updated · next change in 7 days" : "Photo added · next change in 7 days");
  } catch (_) {
    showToast("Could not load that image");
  }
}

function refreshHome() {
  const meta = trackMeta();
  const sessionsDone = Math.max(0, state.currentDay - 1);
  // Streak = consecutive training days, so a missed day resets it.
  state.streak = computeCurrentStreak();
  $("#hero-day").textContent = `Day ${state.currentDay}`;
  $("#days-done").textContent = String(sessionsDone);
  $("#streak-count").textContent = state.streak;
  $("#reports-streak").textContent = state.streak;
  const sessionsEl = $("#reports-sessions");
  if (sessionsEl) {
    sessionsEl.textContent =
      sessionsDone === 0
        ? "No sessions yet · start Day 1"
        : `${sessionsDone} sessions completed · keep going`;
  }
  const pct = (sessionsDone / 30) * 100;
  $("#hero-bar").style.width = `${pct}%`;
  const heroRing = $("#hero-ring");
  if (heroRing) heroRing.style.setProperty("--pct", String(Math.round(pct)));
  const heroRingLabel = $("#hero-ring-label");
  if (heroRingLabel) heroRingLabel.textContent = `${Math.round(pct)}%`;
  $("#plan-bar").style.width = `${pct}%`;
  $("#days-left").textContent = String(30 - sessionsDone);
  const heroSub = $("#hero-sub");
  if (heroSub) heroSub.textContent = meta.subtitle;
  const heroDiff = $("#hero-diff");
  if (heroDiff) heroDiff.innerHTML = difficultyHtml();
  $("#plan-title").textContent = meta.planTitle;
  $("#plan-tags").textContent = meta.tags;
  $("#plan-art").textContent = meta.art;
  const planDiff = $("#plan-diff");
  if (planDiff) planDiff.innerHTML = difficultyHtml();
  $("#home-disclaimer").textContent = meta.disclaimer;
  const today = state.days.find((d) => d.n === state.currentDay);
  const heroStart = $("#hero-start-label");
  if (heroStart && today) {
    heroStart.textContent =
      today.status !== "done" && (today.doneCount || today.percent) > 0 ? "Continue session" : "Start session";
  }
  const profileName = $("#profile-name");
  if (profileName) profileName.textContent = state.profileName || "Priya";
  renderHeroPhoto();
  renderMe();
  renderTrackExtras();
}

function profileInitials(name) {
  const parts = String(name || "You")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return "Y";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function meStreakDisplayCount() {
  return Math.max(1, state.streak || 0);
}

function renderMe() {
  const meta = trackMeta();
  const avatar = $("#profile-avatar");
  if (avatar) {
    const photo = state.user?.picture;
    if (photo) {
      avatar.classList.add("has-photo");
      avatar.innerHTML = `<img src="${photo}" alt="" referrerpolicy="no-referrer">`;
    } else {
      avatar.classList.remove("has-photo");
      avatar.textContent = profileInitials(state.user?.name || state.profileName);
    }
  }

  const emailEl = $("#profile-email");
  if (emailEl) {
    const email = state.user?.email || "";
    emailEl.hidden = !email;
    emailEl.textContent = email;
  }

  const programLine = $("#me-program-line");
  if (programLine) {
    programLine.textContent = `${meta.label || "Face Form"} · Day ${state.currentDay} of 30`;
  }

  const streak = state.streak || 0;
  const displayStreak = meStreakDisplayCount();
  const streakNum = $("#me-streak-num");
  if (streakNum) {
    streakNum.textContent = String(displayStreak);
    streakNum.classList.toggle("is-wide", displayStreak >= 10);
  }
  const streakBadge = $("#me-streak-badge");
  if (streakBadge) {
    streakBadge.classList.toggle("is-active", streak > 0);
    streakBadge.setAttribute("aria-label", `${displayStreak} day streak`);
  }

  const plusChip = $("#me-plus-chip");
  const plusDetail = $("#me-plus-detail");
  const plusPrice = $("#me-plus-price-line");
  const plusCard = $("#btn-carve-plus");
  if (plusChip) plusChip.textContent = hasCarvePlus() ? "Active" : "Upgrade";
  if (plusDetail) {
    plusDetail.textContent = hasCarvePlus()
      ? "Unlimited face & voice scans"
      : "Unlock unlimited face & voice scans";
  }
  if (plusPrice) {
    const price = plusPriceLabel();
    const interval = plusPriceInterval();
    if (hasCarvePlus()) {
      const renews = formatPlusRenews(state.plusRenewsAt);
      plusPrice.className = "me-plus-price-block is-subscribed";
      plusPrice.innerHTML =
        (renews
          ? `<span class="me-plus-renewal">Renews <strong>${renews}</strong></span>`
          : `<span class="me-plus-renewal">Subscription active</span>`) +
        `<span class="me-plus-price-amount"><strong>${price}</strong><span>${interval}</span></span>`;
    } else {
      plusPrice.className = "me-plus-price-line";
      plusPrice.innerHTML = `<em>${price}</em>${interval}`;
    }
  }
  if (plusCard) plusCard.classList.toggle("is-subscribed", hasCarvePlus());

  applySettingsUi();
}

function openCarvePlusPlan() {
  if (IS_NATIVE_APP) {
    openNativePlusInfo();
    return;
  }
  const modal = $("#carve-plus-modal");
  if (!modal) return;
  setCarvePlusPayStatus("");
  const subscribeBtn = $("#btn-carve-plus-subscribe");
  const priceEl = $("#carve-plus-price");
  const unitEl = $("#carve-plus-price-unit");
  if (priceEl) priceEl.textContent = plusPriceLabel();
  if (unitEl) unitEl.textContent = plusPriceInterval() === "/mo" ? "/ month" : plusPriceInterval();
  if (subscribeBtn) {
    subscribeBtn.disabled = false;
    subscribeBtn.textContent = hasCarvePlus()
      ? `Renew / manage — ${plusPriceLabel()}${plusPriceInterval()}`
      : `Subscribe — ${plusPriceLabel()}${plusPriceInterval()}`;
  }
  modal.hidden = false;
  loadDodoConfig();
}

function closeCarvePlusPlan() {
  const modal = $("#carve-plus-modal");
  if (modal) modal.hidden = true;
}

function openDeleteDataModal() {
  const modal = $("#delete-data-modal");
  if (!modal) return;
  const isPlus = hasCarvePlus();
  const msgPremium = $("#delete-data-message-premium");
  const msgFree = $("#delete-data-message-free");
  const footPremium = $("#delete-data-foot-premium");
  const footFree = $("#delete-data-foot-free");
  if (msgPremium) msgPremium.hidden = !isPlus;
  if (msgFree) msgFree.hidden = isPlus;
  if (footPremium) footPremium.hidden = !isPlus;
  if (footFree) footFree.hidden = isPlus;
  modal.hidden = false;
}

function closeDeleteDataModal() {
  const modal = $("#delete-data-modal");
  if (modal) modal.hidden = true;
}

function markFreeScanUsed(kind) {
  if (hasCarvePlus()) return;
  if (kind === "face") state.freeFaceScanUsed = true;
  else if (kind === "voice") state.freeVoiceScanUsed = true;
  saveState();
}

function clearAllUserAnalysisData() {
  if (!hasCarvePlus()) {
    if (window.CarveFaceAnalysis?.loadFaceReport()) state.freeFaceScanUsed = true;
    if (window.CarveVoiceAnalysis?.loadVoiceReport()) state.freeVoiceScanUsed = true;
    saveState();
  }

  window.CarveFaceAnalysis?.clearFaceReport();
  window.CarveVoiceAnalysis?.clearVoiceReport();
  localStorage.removeItem("faceReportHistory");
  localStorage.removeItem("voiceReportHistory");
  localStorage.removeItem(DAILY_PROGRESS_KEY);
  localStorage.removeItem(PHOTO_STORAGE_KEY);
  localStorage.removeItem(VOICE_STORAGE_KEY);

  resetPresenceAnalysisPanels();
  renderFaceAnalysis();
  renderVoiceAnalysis();
  renderDailyProgressCard();
  renderReportPhotos();
  renderReports();
  refreshMyProgressIfVisible();
  syncAnalysisPaywallUi();
}

function confirmDeleteUserData() {
  clearAllUserAnalysisData();
  closeDeleteDataModal();
  showToast("Your analysis data has been cleared from this device");
}

const FEEDBACK_STORAGE_KEY = "carve-feedback-v1";

function openHelpFaqModal() {
  const modal = $("#help-faq-modal");
  if (modal) modal.hidden = false;
}

function closeHelpFaqModal() {
  const modal = $("#help-faq-modal");
  if (modal) modal.hidden = true;
}

function openFeedbackModal() {
  const modal = $("#feedback-modal");
  if (!modal) return;
  const form = $("#feedback-form");
  if (form) form.reset();
  modal.hidden = false;
  window.requestAnimationFrame(() => {
    $("#feedback-message")?.focus();
  });
}

function closeFeedbackModal() {
  const modal = $("#feedback-modal");
  if (modal) modal.hidden = true;
}

function openEvidencePolicyModal() {
  const modal = $("#evidence-policy-modal");
  if (modal) modal.hidden = false;
}

function closeEvidencePolicyModal() {
  const modal = $("#evidence-policy-modal");
  if (modal) modal.hidden = true;
}

function submitFeedback(event) {
  event.preventDefault();
  const topic = $("#feedback-topic")?.value || "general";
  const message = ($("#feedback-message")?.value || "").trim();
  if (!message) {
    showToast("Please write a message before sending");
    return;
  }
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(list)) throw new Error("invalid");
    list.push({
      topic,
      message,
      at: new Date().toISOString(),
      track: state.track || null,
    });
    while (list.length > 50) list.shift();
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(list));
  } catch (_) {
    showToast("Could not save feedback on this device");
    return;
  }
  closeFeedbackModal();
  showToast("Thanks — your feedback was saved on this device");
}

function apiUrl(path) {
  return IS_NATIVE_APP ? API_ORIGIN + path : path;
}

function plusPriceLabel() {
  return String(state.plusPriceLabel || window.CARVE_PLUS_PRICE_LABEL || "₹1500");
}

function plusPriceInterval() {
  return String(state.plusPriceInterval || window.CARVE_PLUS_PRICE_INTERVAL || "/mo");
}

function formatPlusRenews(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function plusCacheStore() {
  try {
    const raw = localStorage.getItem("carve-plus-by-user-v1");
    const data = raw ? JSON.parse(raw) : {};
    return data && typeof data === "object" ? data : {};
  } catch (_) {
    return {};
  }
}

function writePlusCache(userId, record) {
  if (!userId) return;
  try {
    const all = plusCacheStore();
    all[userId] = {
      active: Boolean(record?.active),
      status: record?.status || (record?.active ? "active" : "none"),
      next_billing_date: record?.next_billing_date || null,
    };
    localStorage.setItem("carve-plus-by-user-v1", JSON.stringify(all));
  } catch (_) {
    /* ignore */
  }
}

function applyCachedPlusForUser(userId) {
  const rec = plusCacheStore()[userId];
  if (!rec) {
    setPlusEntitlement({ active: false, status: "none", next_billing_date: null }, { persist: true });
    return;
  }
  setPlusEntitlement(rec, { persist: true });
}

function setPlusEntitlement(record, { persist = true, toast } = {}) {
  const active = Boolean(record?.active);
  const changed = state.carvePlus !== active || state.plusRenewsAt !== (record?.next_billing_date || null);
  state.carvePlus = active;
  state.plusStatus = record?.status || (active ? "active" : "none");
  state.plusRenewsAt = record?.next_billing_date || null;
  if (state.user?.id) writePlusCache(state.user.id, record);
  if (persist && changed) saveState();
  renderMe();
  syncAnalysisPaywallUi();
  renderDailyProgressCard();
  if (toast) showToast(toast);
}

function setCarvePlusPayStatus(message, ok = false) {
  const el = $("#carve-plus-pay-status");
  if (!el) return;
  if (!message) {
    el.hidden = true;
    el.textContent = "";
    el.classList.remove("is-ok");
    return;
  }
  el.hidden = false;
  el.textContent = message;
  el.classList.toggle("is-ok", Boolean(ok));
}

function dodoCheckoutSdk() {
  return window.DodoPaymentsCheckout?.DodoPayments || window.DodoPayments || null;
}

async function loadDodoConfig() {
  try {
    const res = await apiFetch("/api/dodo/config", { cache: "no-store" });
    if (!res.ok) {
      state.dodoConfigured = false;
      return null;
    }
    const data = await res.json();
    if (typeof data.configured !== "boolean") {
      state.dodoConfigured = false;
      return null;
    }
    state.dodoConfigured = Boolean(data.configured);
    state.dodoMode = data.mode === "live" ? "live" : "test";
    if (data.price_label) state.plusPriceLabel = data.price_label;
    if (data.price_interval) state.plusPriceInterval = data.price_interval;
    const priceEl = $("#carve-plus-price");
    const unitEl = $("#carve-plus-price-unit");
    const subscribeBtn = $("#btn-carve-plus-subscribe");
    if (priceEl) priceEl.textContent = plusPriceLabel();
    if (unitEl) unitEl.textContent = plusPriceInterval() === "/mo" ? "/ month" : plusPriceInterval();
    if (subscribeBtn && !hasCarvePlus() && !subscribeBtn.disabled) {
      subscribeBtn.textContent = `Subscribe — ${plusPriceLabel()}${plusPriceInterval()}`;
    }
    renderMe();
    return data;
  } catch (_) {
    state.dodoConfigured = false;
    return null;
  }
}

function initDodoCheckout() {
  const sdk = dodoCheckoutSdk();
  if (!sdk?.Initialize || state.dodoReady) return;
  try {
    sdk.Initialize({
      mode: state.dodoMode === "live" ? "live" : "test",
      displayType: "overlay",
      onEvent: onDodoCheckoutEvent,
    });
    state.dodoReady = true;
  } catch (_) {
    state.dodoReady = false;
  }
}

function onDodoCheckoutEvent(event) {
  const type = event?.event_type;
  if (type === "checkout.opened") state.dodoReachedPayment = false;
  if (type === "checkout.payment_page_opened" || type === "checkout.customer_details_submitted") {
    state.dodoReachedPayment = true;
  }
  if (type === "checkout.error") {
    setCarvePlusPayStatus(event?.data?.message || "Checkout failed. Try again.");
    resetSubscribeButton();
    return;
  }
  if (type === "checkout.link_expired") {
    setCarvePlusPayStatus("Checkout expired. Tap Subscribe to start again.");
    resetSubscribeButton();
    return;
  }
  if (type === "checkout.redirect" || type === "checkout.closed") {
    pollCarvePlusAfterCheckout({
      expectPayment: type === "checkout.redirect" || state.dodoReachedPayment,
    });
  }
}

function resetSubscribeButton() {
  const btn = $("#btn-carve-plus-subscribe");
  if (!btn || hasCarvePlus()) return;
  btn.disabled = false;
  btn.textContent = `Subscribe — ${plusPriceLabel()}${plusPriceInterval()}`;
}

async function syncCarvePlusFromServer({ toastOnActivate = false, sessionId = "" } = {}) {
  if (!isSignedIn()) return null;
  try {
    const params = new URLSearchParams();
    if (sessionId) params.set("session_id", sessionId);
    const res = await apiFetch(`/api/dodo/status?${params}`, { cache: "no-store" });
    if (res.status === 401) {
      handleSessionExpired();
      return null;
    }
    if (!res.ok) return null;
    const data = await res.json();
    const wasActive = hasCarvePlus();
    setPlusEntitlement(data, { persist: true });
    if (data.active && toastOnActivate && !wasActive) {
      closeCarvePlusPlan();
      showToast("CARVE Plus is active");
    }
    return data;
  } catch (_) {
    return null;
  }
}

async function pollCarvePlusAfterCheckout({ expectPayment = false, sessionId = "" } = {}) {
  const btn = $("#btn-carve-plus-subscribe");
  const attempts = expectPayment ? 12 : 4;
  if (expectPayment && btn && !hasCarvePlus()) {
    btn.disabled = true;
    btn.textContent = "Confirming payment…";
    setCarvePlusPayStatus("Confirming your subscription…", true);
  }
  for (let i = 0; i < attempts; i += 1) {
    const data = await syncCarvePlusFromServer({ toastOnActivate: true, sessionId });
    if (data?.active) {
      setCarvePlusPayStatus("CARVE Plus is active.", true);
      return data;
    }
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }
  if (!hasCarvePlus()) {
    if (expectPayment) {
      setCarvePlusPayStatus(
        "Payment is still confirming. Plus unlocks as soon as Dodo reports it active."
      );
    }
    resetSubscribeButton();
  }
  return null;
}

async function handleDodoReturn() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id") || "";
  const checkoutReturn = params.get("dodo_checkout") || sessionId;
  const status = String(params.get("status") || "").toLowerCase();
  if (!checkoutReturn && !status) return;
  try {
    if (sessionId) sessionStorage.setItem("carve-dodo-session", sessionId);
  } catch (_) {
    /* ignore */
  }
  window.history.replaceState({}, document.title, window.location.pathname);
  if (status === "failed") {
    setCarvePlusPayStatus("Payment failed. You can try again.");
    showToast("Payment failed");
    return;
  }
  const paid = await pollCarvePlusAfterCheckout({
    expectPayment: status === "success" || Boolean(checkoutReturn),
    sessionId,
  });
  if (paid?.active) {
    openCarvePlusPlan();
    showToast("CARVE Plus is active");
  }
}

async function subscribeCarvePlus() {
  if (!isSignedIn() || !state.user?.email) {
    setCarvePlusPayStatus("Sign in with Google before subscribing.");
    showToast("Sign in to subscribe");
    return;
  }
  if (!state.dodoConfigured) {
    await loadDodoConfig();
  }
  if (!state.dodoConfigured) {
    const onVercel = /vercel\.app$/i.test(window.location.hostname);
    setCarvePlusPayStatus(
      onVercel
        ? "Add Dodo env vars in Vercel and redeploy, then try Subscribe again."
        : "Start the app with python serve.py, then try Subscribe again."
    );
    showToast("Payment server is not running");
    return;
  }
  const btn = $("#btn-carve-plus-subscribe");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Opening checkout…";
  }
  setCarvePlusPayStatus("Opening Dodo Payments…", true);
  try {
    const res = await apiFetch("/api/dodo/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        return_url: `${window.location.origin}/?dodo_checkout=1`,
      }),
    });
    if (res.status === 401) {
      handleSessionExpired();
      setCarvePlusPayStatus("Sign in again before subscribing.");
      resetSubscribeButton();
      return;
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.checkout_url) {
      throw new Error(data.error || "Could not start checkout");
    }
    try {
      if (data.session_id) sessionStorage.setItem("carve-dodo-session", data.session_id);
    } catch (_) {
      /* ignore */
    }
    window.location.href = data.checkout_url;
  } catch (err) {
    setCarvePlusPayStatus(err?.message || "Could not start checkout.");
    showToast(err?.message || "Checkout failed");
    resetSubscribeButton();
  }
}

function renderReports() {
  state.streak = computeCurrentStreak();
  const sessionsDone = Math.max(0, state.currentDay - 1);
  const totalMinutes = sessionsDone * 9;
  const photoCount = loadReportProgressCount();

  applyReportsProgressCopy();

  const setText = (id, value) => {
    const el = $("#" + id);
    if (el) el.textContent = value;
  };

  setText("reports-stat-sessions", String(sessionsDone));
  setText("reports-stat-minutes", String(totalMinutes));
  setText("reports-streak", String(state.streak));
  setText(
    "reports-sessions",
    sessionsDone === 0
      ? "Start Day 1 — your streak begins with one session."
      : state.streak >= 7
        ? `${state.streak}-day fire — you're building real momentum.`
        : state.streak >= 3
          ? `${state.streak} days strong — keep the chain alive.`
          : `${sessionsDone} session${sessionsDone === 1 ? "" : "s"} done · show up again tomorrow.`
  );

  const cal = $("#streak-cal");
  const calLabel = $("#reports-streak-cal-label");
  const journey = getJourneyCalendarDays();
  const currentDay = journey.find((d) => d.isToday)?.dayNum || journey.filter((d) => !d.isFuture).length;
  if (calLabel) {
    calLabel.textContent =
      currentDay <= 1
        ? "Day 1 · your journey starts here"
        : `Day 1 → Day 30 · you're on Day ${currentDay}`;
  }
  if (cal) {
    cal.innerHTML = "";
    journey.forEach((d) => {
      const s = document.createElement("span");
      if (d.isFuture) s.classList.add("future");
      else if (d.done) s.classList.add("done");
      else if (d.isToday) s.classList.add("today");
      else s.classList.add("missed");
      s.title = d.isFuture
        ? `Day ${d.dayNum} · Upcoming`
        : d.isToday
          ? `Day ${d.dayNum} · Today`
          : d.done
            ? `Day ${d.dayNum} · Session done`
            : `Day ${d.dayNum} · Missed`;
      cal.appendChild(s);
    });
  }

  renderReportPhotos();
  const badgeCtx = badgeContext(sessionsDone, photoCount, totalMinutes);
  syncUnlockedBadges(badgeCtx);
  renderReportBadges(badgeCtx);
  renderDailyProgressCard();
  renderFaceAnalysis();
  renderVoiceAnalysis();
  syncAnalysisPaywallUi();
}

function loadReportPhotos() {
  try {
    const raw = localStorage.getItem(PHOTO_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_) {
    return {};
  }
}

function saveReportPhotos(map) {
  try {
    localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(map));
  } catch (_) {
    showToast("Could not save photo on this device");
  }
}

function loadReportVoice() {
  try {
    const raw = localStorage.getItem(VOICE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_) {
    return {};
  }
}

function saveReportVoice(map) {
  try {
    localStorage.setItem(VOICE_STORAGE_KEY, JSON.stringify(map));
  } catch (_) {
    showToast("Could not save recording on this device");
  }
}

function formatVoiceDuration(ms) {
  const sec = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function renderReportPhotos() {
  const root = $("#reports-photos");
  if (!root) return;
  const slots = ["Week 1", "Week 2", "Week 3", "Week 4"];

  if (isFullPresenceMode()) {
    const photos = loadReportPhotos();
    const clips = loadReportVoice();
    const tiles = [];
    slots.forEach((label, i) => {
      const key = `week${i + 1}`;
      const src = photos[key];
      if (src) {
        tiles.push(`<button type="button" class="reports-photo has-image" data-photo-slot="${key}" aria-label="${label} photo">
          <img src="${src}" alt="${label} photo" />
          <span>${label} · photo</span>
        </button>`);
      } else {
        tiles.push(`<button type="button" class="reports-photo" data-photo-slot="${key}" aria-label="Capture ${label} photo">
          <span class="reports-photo-plus" aria-hidden="true">＋</span>
          <strong>${label} · photo</strong>
          <span class="reports-photo-hint">Tap to capture</span>
        </button>`);
      }

      const clip = clips[key];
      if (clip?.dataUrl) {
        const dur = clip.durationMs ? formatVoiceDuration(clip.durationMs) : "0:00";
        tiles.push(`<button type="button" class="reports-photo has-voice" data-voice-slot="${key}" aria-label="${label} recording">
          <span class="reports-voice-play" aria-hidden="true">▶</span>
          <strong>${label} · voice</strong>
          <span class="reports-photo-hint">${dur} · tap ▶ to listen</span>
          <audio preload="metadata" src="${clip.dataUrl}"></audio>
        </button>`);
      } else {
        tiles.push(`<button type="button" class="reports-photo reports-photo-voice" data-voice-slot="${key}" aria-label="Record ${label} voice">
          <span class="reports-photo-mic" aria-hidden="true">🎙️</span>
          <strong>${label} · voice</strong>
          <span class="reports-photo-hint">Tap to record</span>
        </button>`);
      }
    });
    root.innerHTML = tiles.join("");
    return;
  }

  if (isVoiceProgressMode()) {
    const clips = loadReportVoice();
    root.innerHTML = slots
      .map((label, i) => {
        const key = `week${i + 1}`;
        const clip = clips[key];
        if (clip?.dataUrl) {
          const dur = clip.durationMs ? formatVoiceDuration(clip.durationMs) : "0:00";
          return `<button type="button" class="reports-photo has-voice" data-voice-slot="${key}" aria-label="${label} recording">
            <span class="reports-voice-play" aria-hidden="true">▶</span>
            <strong>${label}</strong>
            <span class="reports-photo-hint">${dur} · tap ▶ to listen</span>
            <audio preload="metadata" src="${clip.dataUrl}"></audio>
          </button>`;
        }
        return `<button type="button" class="reports-photo reports-photo-voice" data-voice-slot="${key}" aria-label="Record ${label}">
          <span class="reports-photo-mic" aria-hidden="true">🎙️</span>
          <strong>${label}</strong>
          <span class="reports-photo-hint">Tap to record</span>
        </button>`;
      })
      .join("");
    return;
  }

  const photos = loadReportPhotos();
  root.innerHTML = slots
    .map((label, i) => {
      const key = `week${i + 1}`;
      const src = photos[key];
      if (src) {
        return `<button type="button" class="reports-photo has-image" data-photo-slot="${key}" aria-label="${label} photo">
          <img src="${src}" alt="${label}" />
          <span>${label}</span>
        </button>`;
      }
      return `<button type="button" class="reports-photo" data-photo-slot="${key}" aria-label="Capture ${label} photo">
        <span class="reports-photo-plus" aria-hidden="true">＋</span>
        <strong>${label}</strong>
        <span class="reports-photo-hint">Tap to capture</span>
      </button>`;
    })
    .join("");
}

function loadDailyProgress() {
  try {
    const raw = localStorage.getItem(DAILY_PROGRESS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const normalized = {};
    Object.keys(parsed).forEach((key) => {
      normalized[key] = normalizeDailyProgressEntry(parsed[key]);
    });
    return normalized;
  } catch (_) {
    return {};
  }
}

function normalizeDailyProgressEntry(entry) {
  if (!entry || typeof entry !== "object") return {};
  const next = { ...entry };
  if (entry.photo && !entry.face) {
    next.face = {
      photo: entry.photo,
      jawlineScore: entry.photoScore ?? null,
      symmetry: entry.symmetry != null ? Math.round(Number(entry.symmetry) * (Number(entry.symmetry) <= 1 ? 100 : 1)) : null,
      at: entry.at || null,
    };
    delete next.photo;
  }
  return next;
}

function saveDailyProgress(map) {
  try {
    localStorage.setItem(DAILY_PROGRESS_KEY, JSON.stringify(map));
  } catch (_) {
    showToast("Could not save progress on this device");
  }
}

function progressDayFromReport(report) {
  if (!report?.analyzedAt) return dateKey();
  return dateKey(new Date(report.analyzedAt));
}

function dailyEntryHasFace(entry) {
  return Boolean(entry?.face?.photo);
}

function dailyEntryHasVoice(entry) {
  return Boolean(entry?.voice && typeof entry.voice.voiceScore === "number");
}

function dailyEntryComplete(entry, modes) {
  return (!modes.photo || dailyEntryHasFace(entry)) && (!modes.voice || dailyEntryHasVoice(entry));
}

function syncDailyProgressFromFaceReport(report, dayKeyOverride) {
  if (!hasCarvePlus() || !report?.photoDataUrl) return;
  const key = dayKeyOverride || progressDayFromReport(report);
  const map = loadDailyProgress();
  if (!map[key]) map[key] = {};
  map[key].face = {
    photo: report.photoDataUrl,
    jawlineScore: report.jawlineScore,
    symmetry: Math.round(Number(report.symmetry) * 100),
    jawRatio: Number(report.jawRatio),
    at: report.analyzedAt || new Date().toISOString(),
  };
  saveDailyProgress(map);
}

function syncDailyProgressFromVoiceReport(report, dayKeyOverride) {
  if (!hasCarvePlus() || typeof report?.voiceScore !== "number") return;
  const key = dayKeyOverride || progressDayFromReport(report);
  const map = loadDailyProgress();
  if (!map[key]) map[key] = {};
  map[key].voice = {
    voiceScore: report.voiceScore,
    resonanceScore: report.resonanceScore,
    clarityScore: report.clarityScore,
    pitchScore: report.pitchScore,
    waveform: report.waveform || [],
    at: report.analyzedAt || new Date().toISOString(),
  };
  saveDailyProgress(map);
}

function progressExportProgramName() {
  if (isVoiceProgressMode()) return "Voice Grain";
  if (isFullPresenceMode()) return "Full Presence";
  return "Face Form";
}

function formatExportDateLong(key) {
  const today = dateKey();
  if (key === today) return "Today";
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (key === dateKey(tomorrow)) return "Tomorrow";
  const d = new Date(key + "T12:00:00");
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}

function pdfImageFormat(dataUrl) {
  return dataUrl?.startsWith("data:image/png") ? "PNG" : "JPEG";
}

function collectProgressExportData() {
  if (hasCarvePlus()) ensureTodaySyncedFromAnalysis();
  const modes = dailyProgressModes();
  const dayKeys = upcomingProgressDayKeys(14);
  const store = loadDailyProgress();
  const days = dayKeys.map((key, i) => {
    const entry = store[key] || {};
    return {
      key,
      index: i + 1,
      label: formatExportDateLong(key),
      shortDate: new Date(key + "T12:00:00").toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      entry,
      complete: dailyEntryComplete(entry, modes),
      hasFace: dailyEntryHasFace(entry),
      hasVoice: dailyEntryHasVoice(entry),
      isToday: key === dateKey(),
      isFuture: progressDayOffset(key) > 0,
    };
  });
  const logged = days.filter((d) => d.hasFace || d.hasVoice).length;
  return { modes, days, logged, total: days.length, program: progressExportProgramName() };
}

function getJsPDFConstructor() {
  if (window.jspdf?.jsPDF) return window.jspdf.jsPDF;
  if (typeof window.jsPDF === "function") return window.jsPDF;
  return null;
}

function exportProgressPdf() {
  const JsPDF = getJsPDFConstructor();
  if (!JsPDF) {
    showToast("PDF export unavailable — refresh and try again");
    return;
  }
  if (!hasCarvePlus()) {
    showToast("Export daily progress with CARVE Plus");
    openCarvePlusPlan();
    return;
  }

  const data = collectProgressExportData();
  const { modes, days, logged, total, program } = data;
  if (!logged) {
    showToast("No daily progress yet — complete a scan first");
    return;
  }

  const doc = new JsPDF({ unit: "mm", format: "a4" });
  const pageW = 210;
  const margin = 14;
  const contentW = pageW - margin * 2;
  const pageBottom = 282;
  let y = 0;

  const setColor = (r, g, b) => doc.setTextColor(r, g, b);
  const fill = (r, g, b) => doc.setFillColor(r, g, b);
  const stroke = (r, g, b) => doc.setDrawColor(r, g, b);

  function newPageIfNeeded(height) {
    if (y + height > pageBottom) {
      doc.addPage();
      drawContinuationHeader();
      y = 28;
    }
  }

  function drawContinuationHeader() {
    fill(37, 99, 235);
    doc.rect(0, 0, pageW, 18, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    setColor(255, 255, 255);
    doc.text("CARVE · Daily Progress", margin, 11);
    setColor(15, 23, 42);
  }

  // Cover header
  fill(15, 23, 42);
  doc.rect(0, 0, pageW, 52, "F");
  fill(37, 99, 235);
  doc.rect(0, 50, pageW, 2.5, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  setColor(255, 255, 255);
  doc.text("CARVE", margin, 22);
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  setColor(191, 219, 254);
  doc.text("Daily Progress Report", margin, 30);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  setColor(248, 250, 252);
  doc.text(program, margin, 40);

  const rangeLabel = `${days[0].shortDate} — ${days[days.length - 1].shortDate}`;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  setColor(148, 163, 184);
  doc.text(rangeLabel, margin, 46);

  const generated = new Date().toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  doc.text(`Generated ${generated}`, pageW - margin, 46, { align: "right" });

  y = 62;

  // Summary card
  fill(239, 246, 255);
  stroke(191, 219, 254);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentW, 22, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  setColor(29, 78, 216);
  doc.text(`${logged} of ${total} days logged`, margin + 6, y + 9);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  setColor(71, 85, 105);
  const summaryNote = modes.photo && modes.voice
    ? "Face photos, face scores, and voice scores from your private daily log."
    : modes.voice
      ? "Voice scores from your private daily log."
      : "Face photos and scores from your private daily log.";
  doc.text(summaryNote, margin + 6, y + 16);

  y += 30;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  setColor(15, 23, 42);
  doc.text("Day-by-day journey", margin, y);
  y += 8;

  const isDualMode = modes.photo && modes.voice;
  const dayInnerRight = margin + contentW - 5;

  const PDF_METRIC_TINTS = {
    blue: { fill: [239, 246, 255], stroke: [147, 197, 253], value: [29, 78, 216] },
    red: { fill: [255, 241, 242], stroke: [254, 205, 211], value: [220, 38, 38] },
    green: { fill: [236, 253, 245], stroke: [134, 239, 172], value: [5, 150, 105] },
  };

  function drawPdfMetricCard(x, cardY, cardW, label, value, tintKey) {
    const tint = PDF_METRIC_TINTS[tintKey] || PDF_METRIC_TINTS.blue;
    const cardH = 22;
    fill(tint.fill[0], tint.fill[1], tint.fill[2]);
    stroke(tint.stroke[0], tint.stroke[1], tint.stroke[2]);
    doc.setLineWidth(0.35);
    doc.roundedRect(x, cardY, cardW, cardH, 3, 3, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    setColor(122, 134, 153);
    doc.text(label.toUpperCase(), x + cardW / 2, cardY + 7, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    setColor(tint.value[0], tint.value[1], tint.value[2]);
    doc.text(String(value), x + cardW / 2, cardY + 17, { align: "center" });
    return cardH;
  }

  function drawPdfMetricRow(startX, rowY, metrics) {
    const gap = 3;
    const count = metrics.length;
    const rowW = Math.max(24, dayInnerRight - startX);
    const cardW = (rowW - gap * (count - 1)) / count;
    metrics.forEach((metric, i) => {
      drawPdfMetricCard(startX + i * (cardW + gap), rowY, cardW, metric.label, metric.value, metric.tint);
    });
    return 22;
  }

  function drawPdfSectionLabel(text, x, labelY, rgb) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    setColor(rgb[0], rgb[1], rgb[2]);
    doc.text(text, x, labelY);
  }

  function faceMetricsForEntry(face, hasFace) {
    return [
      { label: "Overall", value: hasFace ? face.jawlineScore : "—", tint: "blue" },
      { label: "Balance", value: hasFace ? `${face.symmetry}%` : "—", tint: "green" },
      { label: "Outline", value: hasFace ? Number(face.jawRatio).toFixed(2) : "—", tint: "red" },
    ];
  }

  function voiceMetricsForEntry(voice, hasVoice) {
    return [
      { label: "Overall", value: hasVoice ? voice.voiceScore : "—", tint: "blue" },
      { label: "Resonance", value: hasVoice ? `${voice.resonanceScore}%` : "—", tint: "red" },
      { label: "Clarity", value: hasVoice ? `${voice.clarityScore}%` : "—", tint: "green" },
    ];
  }

  days.forEach((day) => {
    const hasData = day.hasFace || day.hasVoice;
    const cardH = isDualMode ? 88 : modes.photo ? 58 : 40;
    newPageIfNeeded(cardH + 6);

    const complete = day.complete;
    fill(complete ? 240 : hasData ? 255 : 248, complete ? 253 : hasData ? 251 : 250, complete ? 244 : hasData ? 235 : 252);
    stroke(complete ? 134 : hasData ? 147 : 226, complete ? 239 : hasData ? 197 : 232, complete ? 172 : hasData ? 253 : 240);
    doc.setLineWidth(0.35);
    doc.roundedRect(margin, y, contentW, cardH, 4, 4, "FD");

    fill(complete ? 34 : hasData ? 37 : 148, complete ? 197 : hasData ? 99 : 163, complete ? 94 : hasData ? 235 : 184);
    doc.circle(margin + 10, y + 12, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    setColor(255, 255, 255);
    const badgeText = complete ? "OK" : String(day.index);
    doc.text(badgeText, margin + 10, y + 14.2, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    setColor(15, 23, 42);
    doc.text(`Day ${day.index} · ${day.label}`, margin + 22, y + 11);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    setColor(100, 116, 139);
    doc.text(day.shortDate, margin + 22, y + 16.5);

    const contentX = margin + 22;
    const contentY = y + 22;

    if (!hasData && !isDualMode) {
      setColor(148, 163, 184);
      doc.setFontSize(9);
      const emptyMsg = day.isFuture ? "Coming up — not yet due" : "No check-in recorded";
      doc.text(emptyMsg, contentX, contentY + 6);
      y += cardH + 6;
      return;
    }

    if (isDualMode) {
      const photoSize = 30;
      const photoX = margin + 20;
      const photoY = y + 24;
      const metricsX = margin + 54;

      if (day.hasFace) {
        try {
          doc.addImage(day.entry.face.photo, pdfImageFormat(day.entry.face.photo), photoX, photoY, photoSize, photoSize);
          stroke(191, 219, 254);
          doc.setLineWidth(0.4);
          doc.roundedRect(photoX, photoY, photoSize, photoSize, 2, 2, "S");
        } catch (_) {
          fill(241, 245, 249);
          doc.roundedRect(photoX, photoY, photoSize, photoSize, 2, 2, "F");
        }
      } else {
        fill(241, 245, 249);
        stroke(203, 213, 225);
        doc.roundedRect(photoX, photoY, photoSize, photoSize, 2, 2, "FD");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        setColor(148, 163, 184);
        doc.text("No photo", photoX + photoSize / 2, photoY + photoSize / 2 + 1, { align: "center" });
      }

      drawPdfSectionLabel("Face Form", metricsX, contentY, [29, 78, 216]);
      drawPdfMetricRow(metricsX, contentY + 3, faceMetricsForEntry(day.entry.face, day.hasFace));

      drawPdfSectionLabel("Voice Grain", metricsX, contentY + 30, [190, 18, 60]);
      drawPdfMetricRow(metricsX, contentY + 33, voiceMetricsForEntry(day.entry.voice, day.hasVoice));

      if (!hasData) {
        setColor(148, 163, 184);
        doc.setFontSize(8);
        doc.text(day.isFuture ? "Coming up" : "Awaiting check-ins", metricsX, contentY + 62);
      }

      y += cardH + 6;
      return;
    }

    if (!hasData) {
      setColor(148, 163, 184);
      doc.setFontSize(9);
      const emptyMsg = day.isFuture ? "Coming up — not yet due" : "No check-in recorded";
      doc.text(emptyMsg, contentX, contentY + 6);
      y += cardH + 6;
      return;
    }

    if (modes.photo && day.hasFace) {
      const face = day.entry.face;
      const photoSize = 30;
      const metricsX = margin + 56;
      try {
        doc.addImage(face.photo, pdfImageFormat(face.photo), margin + 20, y + 22, photoSize, photoSize);
        stroke(191, 219, 254);
        doc.setLineWidth(0.4);
        doc.roundedRect(margin + 20, y + 22, photoSize, photoSize, 2, 2, "S");
      } catch (_) {
        /* photo optional */
      }

      drawPdfSectionLabel("Face Form", metricsX, contentY, [29, 78, 216]);
      drawPdfMetricRow(metricsX, contentY + 3, faceMetricsForEntry(face, true));
    }

    if (modes.voice && day.hasVoice) {
      const voice = day.entry.voice;
      drawPdfSectionLabel("Voice Grain", contentX, contentY, [190, 18, 60]);
      drawPdfMetricRow(contentX, contentY + 3, voiceMetricsForEntry(voice, true));
    }

    y += cardH + 6;
  });

  // Footer on last page
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  setColor(148, 163, 184);
  doc.text("Private · on-device only · CARVE does not upload your photos or recordings.", margin, pageBottom - 4);

  const slug = program.toLowerCase().replace(/\s+/g, "-");
  const fileName = `carve-progress-${slug}-${dateKey()}.pdf`;
  doc.save(fileName);
  showToast("Your progress PDF was downloaded");
}

function ensureTodaySyncedFromAnalysis() {
  if (!hasCarvePlus()) return;
  const faceReport = window.CarveFaceAnalysis?.loadFaceReport();
  if (faceReport?.photoDataUrl) syncDailyProgressFromFaceReport(faceReport);
  const voiceReport = window.CarveVoiceAnalysis?.loadVoiceReport();
  if (voiceReport) syncDailyProgressFromVoiceReport(voiceReport);
}

function renderMiniWaveform(peaks) {
  if (!peaks?.length) return '<span class="my-progress-voice-icon" aria-hidden="true">🎙️</span>';
  const max = Math.max(...peaks, 0.001);
  return `<span class="my-progress-mini-wave" aria-hidden="true">${peaks
    .slice(0, 12)
    .map((p) => {
      const h = Math.max(14, Math.round((p / max) * 100));
      return `<i style="height:${h}%"></i>`;
    })
    .join("")}</span>`;
}

function renderProgressScorePill(value, tone, label) {
  if (value == null || Number.isNaN(Number(value))) return "";
  const suffix = label === "sym" ? "%" : "";
  return `<span class="my-progress-score-pill ${tone}" title="${label}"><em>${Math.round(Number(value))}${suffix}</em></span>`;
}

function renderMyProgressTimelineDay(key, entry, modes, today, dayIndex, totalDays) {
  const complete = dailyEntryComplete(entry, modes);
  const isToday = key === today;
  const isFuture = progressDayOffset(key) > 0;
  const hasFace = dailyEntryHasFace(entry);
  const hasVoice = dailyEntryHasVoice(entry);
  const label = formatProgressDayLabel(key);

  let thumbHtml = "";
  let meta = "";
  let trailing = "";

  if (modes.photo && modes.voice) {
    if (hasFace) {
      thumbHtml = `<div class="my-progress-day-thumb has-photo">
        <img src="${entry.face.photo}" alt="" />
        ${hasVoice ? '<span class="my-progress-thumb-badge voice" aria-hidden="true">🎙️</span>' : ""}
      </div>`;
    } else if (hasVoice) {
      thumbHtml = `<div class="my-progress-day-thumb has-voice">${renderMiniWaveform(entry.voice.waveform)}</div>`;
    } else {
      thumbHtml = `<div class="my-progress-day-thumb is-empty${isFuture ? " is-future" : ""}"><span aria-hidden="true">${isFuture ? "·" : "+"}</span></div>`;
    }
    if (complete) {
      meta = `Face ${entry.face.jawlineScore} · Voice ${entry.voice.voiceScore}`;
      trailing = `<span class="my-progress-day-score dual">${entry.face.jawlineScore}</span>`;
    } else if (isToday) {
      const missing = [];
      if (!hasFace) missing.push("face");
      if (!hasVoice) missing.push("voice");
      meta = `Needs ${missing.join(" & ")} scan`;
      trailing = '<span class="my-progress-day-cta-pill">Scan now</span>';
    } else if (isFuture) {
      meta = `Day ${dayIndex} of ${totalDays} · Coming up`;
      trailing = '<span class="my-progress-day-soon">Soon</span>';
    } else {
      meta = "No entry yet";
      trailing = '<span class="my-progress-day-arrow" aria-hidden="true">›</span>';
    }
  } else if (modes.photo) {
    thumbHtml = hasFace
      ? `<div class="my-progress-day-thumb has-photo"><img src="${entry.face.photo}" alt="" /></div>`
      : `<div class="my-progress-day-thumb is-empty${isFuture ? " is-future" : ""}"><span aria-hidden="true">${isFuture ? "·" : "+"}</span></div>`;
    if (hasFace) {
      meta = `Balance ${entry.face.symmetry}% · Score ${entry.face.jawlineScore}`;
      trailing = `<span class="my-progress-day-score blue">${entry.face.jawlineScore}</span>`;
    } else if (isToday) {
      meta = "Your turn — add today's scan";
      trailing = '<span class="my-progress-day-cta-pill">Add scan</span>';
    } else if (isFuture) {
      meta = `Day ${dayIndex} of ${totalDays} · Coming up`;
      trailing = '<span class="my-progress-day-soon">Soon</span>';
    } else {
      meta = "Missed — catch up when you can";
      trailing = '<span class="my-progress-day-arrow" aria-hidden="true">›</span>';
    }
  } else {
    thumbHtml = hasVoice
      ? `<div class="my-progress-day-thumb has-voice">${renderMiniWaveform(entry.voice.waveform)}</div>`
      : `<div class="my-progress-day-thumb is-empty voice${isFuture ? " is-future" : ""}"><span aria-hidden="true">${isFuture ? "·" : "+"}</span></div>`;
    if (hasVoice) {
      meta = `Res ${entry.voice.resonanceScore}% · Clr ${entry.voice.clarityScore}%`;
      trailing = `<span class="my-progress-day-score red">${entry.voice.voiceScore}</span>`;
    } else if (isToday) {
      meta = "Your turn — record today";
      trailing = '<span class="my-progress-day-cta-pill">Record</span>';
    } else if (isFuture) {
      meta = `Day ${dayIndex} of ${totalDays} · Coming up`;
      trailing = '<span class="my-progress-day-soon">Soon</span>';
    } else {
      meta = "Missed — catch up when you can";
      trailing = '<span class="my-progress-day-arrow" aria-hidden="true">›</span>';
    }
  }

  const stepLabel = complete ? "✓" : String(dayIndex);

  return `<button type="button" class="my-progress-day-row ${complete ? "is-complete" : "is-empty"}${isToday ? " is-today" : ""}${isFuture ? " is-future" : ""}" data-progress-day="${key}"${isFuture ? " disabled" : ""}>
    <span class="my-progress-day-step" aria-hidden="true">
      <span class="my-progress-day-num">${stepLabel}</span>
      <span class="my-progress-day-rail"></span>
    </span>
    ${thumbHtml}
    <span class="my-progress-day-info">
      <strong>${label}</strong>
      <em>${meta}</em>
    </span>
    ${trailing}
  </button>`;
}

function dailyProgressModes() {
  if (isVoiceProgressMode()) return { photo: false, voice: true };
  if (isFullPresenceMode()) return { photo: true, voice: true };
  return { photo: true, voice: false };
}

function hasDailyProgressAccess() {
  return hasCarvePlus();
}

function needsAnalysisForDailyProgress() {
  const modes = dailyProgressModes();
  const hasFace = Boolean(window.CarveFaceAnalysis?.loadFaceReport());
  const hasVoice = Boolean(window.CarveVoiceAnalysis?.loadVoiceReport());
  if (modes.photo && modes.voice) return !hasFace || !hasVoice;
  if (modes.voice) return !hasVoice;
  return !hasFace;
}

function dailyProgressBoxIconMarkup(kind = "face") {
  const svgOpen =
    '<svg class="daily-progress-box-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
  if (kind === "voice") {
    return `${svgOpen}<rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M6 11a6 6 0 0012 0M12 17v3M9 20h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
  }
  if (kind === "both") {
    return `${svgOpen}<path d="M8 4h8v9a4 4 0 01-8 0V4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 7h4M10 10h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M5 18c1.2-2 2.8-3 7-3s5.8 1 7 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M17 6l2-1.5M19 9.5l2 .5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
  }
  return `${svgOpen}<path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="11" r="3.25" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 15.75c.85-1.35 2-2 3.5-2s2.65.65 3.5 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
}

function dailyProgressCopy() {
  if (isVoiceProgressMode()) {
    return {
      title: "Daily voice log",
      lead: "Record your voice every day and build a private timeline.",
      boxTitle: "Daily voice recordings",
      boxSub: "One clip per day · on-device only",
      iconKind: "voice",
      hero: "Daily voice log",
      heroLead: "Every voice analysis scan saves to this private timeline automatically.",
      todayLead: "Run voice analysis — today's scores appear here when you're done.",
    };
  }
  if (isFullPresenceMode()) {
    return {
      title: "Daily presence log",
      lead: "Capture face and voice every day — your full private timeline.",
      boxTitle: "Daily face + voice",
      boxSub: "Photo & recording each day · on-device only",
      iconKind: "both",
      hero: "Daily presence log",
      heroLead: "Face and voice analysis scans save here automatically — on-device only.",
      todayLead: "Run face or voice analysis in Reports to fill today's slots.",
    };
  }
  return {
    title: "Daily photo log",
    lead: "Capture your face every day and track visual progress privately.",
    boxTitle: "Daily progress photos",
    boxSub: "One photo per day · on-device only",
    iconKind: "face",
    hero: "Daily photo log",
    heroLead: "Every face analysis scan saves to this private timeline automatically.",
    todayLead: "Run face analysis — today's photo and scores appear here when you're done.",
  };
}

function renderDailyProgressCard() {
  const copy = dailyProgressCopy();
  const unlocked = hasDailyProgressAccess();
  const box = $("#btn-daily-progress");
  const lockWrap = $("#daily-progress-lock-wrap");
  const meta = $("#daily-progress-meta");
  const lead = $("#daily-progress-lead");
  const title = $("#daily-progress-title");
  const boxTitle = $("#daily-progress-box-title");
  const boxSub = $("#daily-progress-box-sub");
  const icon = $("#daily-progress-box-icon");
  const kicker = $("#daily-progress-kicker");

  if (title) title.textContent = copy.title;
  if (lead) {
    lead.textContent = unlocked
      ? copy.lead
      : `${copy.lead} Unlock with CARVE Plus.`;
  }
  if (boxTitle) boxTitle.textContent = copy.boxTitle;
  if (boxSub) boxSub.textContent = copy.boxSub;
  if (icon) icon.innerHTML = dailyProgressBoxIconMarkup(copy.iconKind);
  if (kicker) {
    kicker.textContent = unlocked ? "Unlocked" : "Premium";
    kicker.classList.toggle("is-unlocked", unlocked);
  }
  if (meta) {
    meta.textContent = unlocked ? "My Progress" : "CARVE Plus";
    meta.classList.toggle("is-unlocked", unlocked);
  }
  const card = $("#reports-daily-progress-card");
  if (card) card.classList.toggle("is-unlocked", unlocked);
  if (box) box.classList.toggle("is-unlocked", unlocked);
  if (lockWrap) lockWrap.hidden = unlocked;

  const photosCard = $("#reports-photos-card");
  if (photosCard) photosCard.hidden = true;
}

function openDailyProgressEntry() {
  if (!hasDailyProgressAccess()) {
    openCarvePlusPlan();
    return;
  }
  navigate("my-progress");
}

function formatProgressDayLabel(key) {
  const today = dateKey();
  if (key === today) return "Today";
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (key === dateKey(tomorrow)) return "Tomorrow";
  const d = new Date(key + "T12:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function progressDayOffset(key) {
  const today = dateKey();
  const target = new Date(key + "T12:00:00");
  const base = new Date(today + "T12:00:00");
  return Math.round((target - base) / 86400000);
}

function upcomingProgressDayKeys(futureCount = 14) {
  const keys = [];
  const base = new Date();
  for (let i = 0; i <= futureCount; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    keys.push(dateKey(d));
  }
  return keys;
}

function renderMyProgressTodayPreview(entry, modes) {
  const slots = [];
  if (modes.photo) {
    const hasFace = dailyEntryHasFace(entry);
    slots.push(`<div class="my-progress-today-slot face ${hasFace ? "has-data" : "is-empty"}">
      <span class="my-progress-today-slot-label">Face scan</span>
      <div class="my-progress-today-slot-media">
        ${hasFace ? `<img src="${entry.face.photo}" alt="" />` : '<span class="my-progress-slot-icon">🪞</span>'}
      </div>
      ${
        hasFace
          ? `<div class="my-progress-today-scores">
              ${renderProgressScorePill(entry.face.jawlineScore, "blue", "jaw")}
              <span class="my-progress-today-score-meta">Balance ${entry.face.symmetry}%</span>
            </div>`
          : '<p class="my-progress-today-empty">Not scanned yet</p>'
      }
    </div>`);
  }
  if (modes.voice) {
    const hasVoice = dailyEntryHasVoice(entry);
    slots.push(`<div class="my-progress-today-slot voice ${hasVoice ? "has-data" : "is-empty"}">
      <span class="my-progress-today-slot-label">Voice scan</span>
      <div class="my-progress-today-slot-media voice">
        ${hasVoice ? renderMiniWaveform(entry.voice.waveform) : '<span class="my-progress-slot-icon">🎙️</span>'}
      </div>
      ${
        hasVoice
          ? `<div class="my-progress-today-scores">
              ${renderProgressScorePill(entry.voice.voiceScore, "red", "voice")}
              <span class="my-progress-today-score-meta">Res ${entry.voice.resonanceScore}% · Clr ${entry.voice.clarityScore}%</span>
            </div>`
          : '<p class="my-progress-today-empty">Not recorded yet</p>'
      }
    </div>`);
  }
  const dual = modes.photo && modes.voice;
  return `<div class="my-progress-today-preview-grid${dual ? " is-dual" : ""}">${slots.join("")}</div>`;
}

function renderMyProgress() {
  if (renderMyProgress._busy) return;
  renderMyProgress._busy = true;
  try {
    const copy = dailyProgressCopy();
    const modes = dailyProgressModes();

    $("#my-progress-title") && ($("#my-progress-title").textContent = copy.hero);
    $("#my-progress-hero-lead") && ($("#my-progress-hero-lead").textContent = copy.heroLead);
    $("#my-progress-today-lead") && ($("#my-progress-today-lead").textContent = copy.todayLead);

    const gate = $("#my-progress-analysis-gate");
    const main = $("#my-progress-main");
    const gateLead = $("#my-progress-gate-lead");
    const needsAnalysis = needsAnalysisForDailyProgress();

    if (needsAnalysis) {
      if (gate) gate.hidden = false;
      if (main) main.hidden = true;
      if (gateLead) {
        gateLead.textContent = modes.photo && modes.voice
          ? "Complete your face and voice analysis scans in Reports before starting daily check-ins."
          : modes.voice
            ? "Complete your voice analysis scan in Reports before starting daily recordings."
            : "Complete your face analysis scan in Reports before starting daily photos.";
      }
      setMyProgressError("");
      return;
    }

    if (gate) gate.hidden = true;
    if (main) main.hidden = false;

    ensureTodaySyncedFromAnalysis();
    const store = loadDailyProgress();
    const today = dateKey();
    const todayEntry = store[today] || {};

    const todayComplete = dailyEntryComplete(todayEntry, modes);
    const todayMeta = $("#my-progress-today-meta");
    if (todayMeta) {
      if (todayComplete) {
        todayMeta.textContent = "Complete";
        todayMeta.classList.add("is-complete");
      } else {
        const missing = [];
        if (modes.photo && !dailyEntryHasFace(todayEntry)) missing.push("Face");
        if (modes.voice && !dailyEntryHasVoice(todayEntry)) missing.push("Voice");
        todayMeta.textContent = missing.length ? `Needs ${missing.join(" + ")}` : "In progress";
        todayMeta.classList.remove("is-complete");
      }
    }

    const preview = $("#my-progress-today-preview");
    if (preview) preview.innerHTML = renderMyProgressTodayPreview(todayEntry, modes);

    const actions = $("#my-progress-today-actions");
    if (actions) {
      const btns = [];
      if (modes.photo) {
        const hasFace = dailyEntryHasFace(todayEntry);
        btns.push(
          `<button type="button" class="my-progress-action-btn face" data-my-progress-analyze="face">
            <span class="my-progress-action-icon" aria-hidden="true">🪞</span>
            <span class="my-progress-action-copy">
              <strong>${hasFace ? "Re-scan face" : "Run face analysis"}</strong>
              <em>Opens Reports · saves to today</em>
            </span>
          </button>`
        );
      }
      if (modes.voice) {
        const hasVoice = dailyEntryHasVoice(todayEntry);
        btns.push(
          `<button type="button" class="my-progress-action-btn voice" data-my-progress-analyze="voice">
            <span class="my-progress-action-icon" aria-hidden="true">🎙️</span>
            <span class="my-progress-action-copy">
              <strong>${hasVoice ? "Re-record voice" : "Run voice analysis"}</strong>
              <em>Opens Reports · saves to today</em>
            </span>
          </button>`
        );
      }
      actions.innerHTML = btns.join("");
    }

    const dayKeys = upcomingProgressDayKeys(14);
    const loggedCount = dayKeys.filter((k) => dailyEntryComplete(store[k] || {}, modes)).length;
    const timelineMeta = $("#my-progress-timeline-meta");
    if (timelineMeta) {
      timelineMeta.textContent = `${loggedCount} of ${dayKeys.length} days`;
    }

    const grid = $("#my-progress-grid");
    if (grid) {
      grid.innerHTML = dayKeys
        .map((key, i) => renderMyProgressTimelineDay(key, store[key] || {}, modes, today, i + 1, dayKeys.length))
        .join("");
    }
    setMyProgressError("");
  } finally {
    renderMyProgress._busy = false;
  }
}

function refreshMyProgressIfVisible() {
  if (!$("#view-my-progress")?.hidden) renderMyProgress();
}

function openAnalysisForDailyProgress(kind = "auto") {
  if (!hasDailyProgressAccess()) {
    openCarvePlusPlan();
    return;
  }
  state.stack = ["reports"];
  showView("reports");
  window.setTimeout(async () => {
    const modes = dailyProgressModes();
    const todayEntry = loadDailyProgress()[dateKey()] || {};
    const wantFace =
      kind === "face" || (kind === "auto" && modes.photo && !dailyEntryHasFace(todayEntry));
    const wantVoice =
      kind === "voice" || (kind === "auto" && modes.voice && !dailyEntryHasVoice(todayEntry));

    if (wantFace) {
      if (isFullPresenceMode()) {
        presenceAnalysisOpen.face = true;
        syncPresenceAnalysisCards();
      }
      scrollAnalysisCardIntoView("#reports-face-analysis-card");
      await startFaceCamera();
      window.setTimeout(() => scrollAnalysisCardIntoView("#reports-face-analysis-card"), 180);
      return;
    }
    if (wantVoice) {
      if (isFullPresenceMode()) {
        presenceAnalysisOpen.voice = true;
        syncPresenceAnalysisCards();
      }
      scrollAnalysisCardIntoView("#reports-voice-analysis-card");
      await startVoiceAnalysisRecorder();
      window.setTimeout(() => scrollAnalysisCardIntoView("#reports-voice-analysis-card"), 180);
    }
  }, 120);
}

function goToAnalysisFromMyProgress() {
  state.stack = ["reports"];
  showView("reports");
  window.setTimeout(async () => {
    if (isFullPresenceMode()) {
      presenceAnalysisOpen.face = true;
      syncPresenceAnalysisCards();
      scrollAnalysisCardIntoView("#reports-face-analysis-card");
      showToast("Complete face and voice analysis to unlock daily check-ins");
      return;
    }
    if (isVoiceProgressMode()) {
      scrollAnalysisCardIntoView("#reports-voice-analysis-card");
      await startVoiceAnalysisRecorder();
      window.setTimeout(() => scrollAnalysisCardIntoView("#reports-voice-analysis-card"), 180);
      return;
    }
    scrollAnalysisCardIntoView("#reports-face-analysis-card");
    await startFaceCamera();
    window.setTimeout(() => scrollAnalysisCardIntoView("#reports-face-analysis-card"), 180);
  }, 120);
}

function setMyProgressError(msg) {
  const err = $("#my-progress-error");
  if (!err) return;
  if (msg) {
    err.hidden = false;
    err.textContent = msg;
  } else {
    err.hidden = true;
    err.textContent = "";
  }
}

function setText(id, value) {
  const el = $("#" + id);
  if (el) el.textContent = value;
}

function renderReportBadges(ctx) {
  const root = $("#reports-badges");
  if (!root) return;

  const earned = BADGE_CATALOG.filter((badge) => state.unlockedBadges[badge.id]).length;
  const meta = $("#reports-badges-meta");
  if (meta) meta.textContent = `${earned} / ${BADGE_CATALOG.length} earned`;

  const next = nextStreakBadge(ctx);
  const hint = $("#reports-badges-next");
  if (hint) {
    if (!next) {
      hint.textContent = "All streak badges unlocked — keep the momentum going.";
    } else {
      const daysLeft = Math.max(0, next.streak - ctx.currentStreak);
      hint.textContent =
        daysLeft === 0
          ? `You're on a roll — finish today to earn ${next.title}.`
          : `${daysLeft} more day${daysLeft === 1 ? "" : "s"} to unlock ${next.title} (${next.emoji}).`;
    }
  }

  root.innerHTML = BADGE_CATALOG.map((badge) => {
    const unlocked = Boolean(state.unlockedBadges[badge.id]);
    const progress =
      badge.streak > 0
        ? Math.min(100, Math.round((ctx.currentStreak / badge.streak) * 100))
        : unlocked
          ? 100
          : 0;
    const voice = isVoiceProgressMode() && badge.voiceTitle;
    const emoji = voice ? badge.voiceEmoji || badge.emoji : badge.emoji;
    const title = voice ? badge.voiceTitle : badge.title;
    const sub = voice ? badge.voiceSub || badge.sub : badge.sub;
    return `<div class="badge-item${unlocked ? " earned" : ""}" data-tier="${badge.tier}" title="${sub}">
      <div class="badge-medal" style="--badge-pct:${progress}%">
        <span class="badge-emoji" aria-hidden="true">${emoji}</span>
        ${unlocked ? '<span class="badge-check" aria-hidden="true">✓</span>' : '<span class="badge-lock" aria-hidden="true">🔒</span>'}
      </div>
      <strong class="badge-title">${title}</strong>
      <span class="badge-sub">${sub}</span>
    </div>`;
  }).join("");
}

function setFaceAnalysisView(mode, errorMsg) {
  const idle = $("#face-analysis-idle");
  const camera = $("#face-analysis-camera");
  const loading = $("#face-analysis-loading");
  const results = $("#face-analysis-results");
  const error = $("#face-analysis-error");
  if (idle) idle.hidden = mode !== "idle";
  if (camera) camera.hidden = mode !== "camera";
  if (loading) loading.hidden = mode !== "loading";
  const loadingWrap = $("#face-analysis-loading-wrap");
  if (loadingWrap) loadingWrap.hidden = mode !== "loading";
  if (results) results.hidden = mode !== "results";
  if (error) {
    if (mode === "error" && errorMsg) {
      error.hidden = false;
      error.textContent = errorMsg;
    } else if (errorMsg && (mode === "idle" || mode === "camera" || mode === "results")) {
      error.hidden = false;
      error.textContent = errorMsg;
    } else {
      error.hidden = true;
      error.textContent = "";
    }
  }
}

let faceCamStream = null;

function stopFaceCamera() {
  if (faceCamStream) {
    faceCamStream.getTracks().forEach((t) => t.stop());
    faceCamStream = null;
  }
  const video = $("#face-analysis-video");
  if (video) {
    video.srcObject = null;
  }
}

function renderFaceAnalysisOverlay(report) {
  const svg = $("#face-analysis-overlay");
  if (!svg) return;

  const overlay = report?.overlay;
  if (!overlay?.jaw?.length) {
    svg.innerHTML = "";
    svg.hidden = true;
    return;
  }

  const jawPath = overlay.jaw.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const cheekY = (overlay.leftCheek.y + overlay.rightCheek.y) / 2;
  const jawY = (overlay.leftJaw.y + overlay.rightJaw.y) / 2;
  const symTop = Math.max(0.02, overlay.noseTip.y - 0.22);
  const symBottom = Math.min(0.98, overlay.chin.y + 0.04);

  const keyPoints = [
    overlay.leftJaw,
    overlay.rightJaw,
    overlay.leftCheek,
    overlay.rightCheek,
    overlay.chin,
    overlay.noseTip,
  ];

  svg.hidden = false;
  svg.innerHTML = `
    <line class="fa-guide fa-guide-sym" x1="${overlay.noseTip.x}" y1="${symTop}" x2="${overlay.noseTip.x}" y2="${symBottom}" />
    <line class="fa-guide fa-guide-cheek" x1="${overlay.leftCheek.x}" y1="${cheekY}" x2="${overlay.rightCheek.x}" y2="${cheekY}" />
    <line class="fa-guide fa-guide-jaw" x1="${overlay.leftJaw.x}" y1="${jawY}" x2="${overlay.rightJaw.x}" y2="${jawY}" />
    <path class="fa-jaw-path" d="${jawPath}" />
    ${keyPoints
      .map(
        (p, i) =>
          `<circle class="fa-dot" cx="${p.x}" cy="${p.y}" r="0.009" style="animation-delay:${(i * 0.12).toFixed(2)}s" />`
      )
      .join("")}
  `;
}

function renderAnalysisTips(el, tips) {
  if (!el) return;
  const list = Array.isArray(tips) ? tips.filter(Boolean) : tips ? [String(tips)] : [];
  if (!list.length) {
    el.innerHTML = "";
    return;
  }
  el.innerHTML = `<ul class="analysis-tips">${list.map((t) => `<li>${t}</li>`).join("")}</ul>`;
}

const analysisTipsCache = new WeakMap();
let analysisFitResizeTimer = null;

function normalizeAnalysisTips(tips) {
  if (Array.isArray(tips)) return tips.filter(Boolean);
  if (tips) return [String(tips)];
  return [];
}

function analysisCardMaxHeight(cardEl) {
  const scrollRoot = cardEl?.closest(".scroll") || $("#view-reports .scroll");
  if (scrollRoot) return scrollRoot.clientHeight - 20;
  return Math.round(window.innerHeight * 0.82);
}

function fitAnalysisCardTips(cardEl, summaryEl, tips, minTips = 1) {
  if (!cardEl || !summaryEl) return;
  const allTips = normalizeAnalysisTips(tips);
  analysisTipsCache.set(cardEl, allTips);
  if (!allTips.length) {
    renderAnalysisTips(summaryEl, []);
    return;
  }

  const maxHeight = analysisCardMaxHeight(cardEl);
  const floor = Math.max(1, Math.min(minTips, allTips.length));
  let fitCount = allTips.length;

  while (fitCount >= floor) {
    renderAnalysisTips(summaryEl, allTips.slice(0, fitCount));
    if (cardEl.offsetHeight <= maxHeight) return;
    fitCount -= 1;
  }

  renderAnalysisTips(summaryEl, allTips.slice(0, floor));
}

function refitVisibleAnalysisCards() {
  const faceCard = $("#reports-face-analysis-card");
  const faceResults = $("#face-analysis-results");
  if (faceCard && faceResults && !faceResults.hidden) {
    const tips = analysisTipsCache.get(faceCard);
    if (tips) fitAnalysisCardTips(faceCard, $("#face-analysis-summary"), tips);
  }

  const voiceCard = $("#reports-voice-analysis-card");
  const voiceResults = $("#voice-analysis-results");
  if (voiceCard && voiceResults && !voiceResults.hidden && !voiceCard.hidden) {
    const tips = analysisTipsCache.get(voiceCard);
    if (tips) fitAnalysisCardTips(voiceCard, $("#voice-analysis-summary"), tips);
  }
}

function scheduleAnalysisCardRefit() {
  if (analysisFitResizeTimer) clearTimeout(analysisFitResizeTimer);
  analysisFitResizeTimer = window.setTimeout(refitVisibleAnalysisCards, 120);
}

let analysisScoreAnimGen = 0;
let presenceAnalysisOpen = { face: false, voice: false };

function resetPresenceAnalysisPanels() {
  presenceAnalysisOpen.face = false;
  presenceAnalysisOpen.voice = false;
}

function syncPresenceAnalysisCards() {
  const faceCard = $("#reports-face-analysis-card");
  const voiceCard = $("#reports-voice-analysis-card");
  const faceBox = $("#presence-status-face");
  const voiceBox = $("#presence-status-voice");

  if (isFullPresenceMode()) {
    if (faceCard) {
      faceCard.hidden = !presenceAnalysisOpen.face;
      faceCard.classList.toggle("is-presence-panel", presenceAnalysisOpen.face);
    }
    if (voiceCard) {
      voiceCard.hidden = !presenceAnalysisOpen.voice;
      voiceCard.classList.toggle("is-presence-panel", presenceAnalysisOpen.voice);
    }
    if (faceBox) {
      faceBox.classList.toggle("is-open", presenceAnalysisOpen.face);
      faceBox.setAttribute("aria-expanded", presenceAnalysisOpen.face ? "true" : "false");
    }
    if (voiceBox) {
      voiceBox.classList.toggle("is-open", presenceAnalysisOpen.voice);
      voiceBox.setAttribute("aria-expanded", presenceAnalysisOpen.voice ? "true" : "false");
    }
    return;
  }

  resetPresenceAnalysisPanels();
  if (faceCard) faceCard.classList.remove("is-presence-panel");
  if (voiceCard) voiceCard.classList.remove("is-presence-panel");
}

function togglePresenceAnalysisPanel(kind) {
  if (!isFullPresenceMode()) return;
  presenceAnalysisOpen[kind] = !presenceAnalysisOpen[kind];
  syncPresenceAnalysisCards();
  if (kind === "face" && presenceAnalysisOpen.face) {
    renderFaceAnalysis();
    scrollAnalysisCardIntoView("#reports-face-analysis-card");
  } else if (kind === "voice" && presenceAnalysisOpen.voice) {
    renderVoiceAnalysis();
    scrollAnalysisCardIntoView("#reports-voice-analysis-card");
  }
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animateAnalysisScore(el, card, target, opts = {}) {
  const { suffix = "", decimals = 0, delay = 0, duration = 1100 } = opts;
  const endVal = Number(target);
  if (!el || Number.isNaN(endVal)) return;

  window.setTimeout(() => {
    if (card) {
      card.classList.remove("is-revealed");
      card.classList.add("is-calculating");
    }

    let flickerTimer = null;
    const startTime = performance.now();

    flickerTimer = window.setInterval(() => {
      if (!card?.classList.contains("is-calculating")) return;
      let shown;
      if (decimals) {
        shown = (Math.random() * Math.max(endVal, 0.1)).toFixed(decimals);
      } else {
        shown = String(Math.floor(Math.random() * Math.max(endVal * 0.65, 9)));
      }
      el.textContent = `${shown}${suffix}`;
    }, 65);

    function frame(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = easeOutCubic(t);
      const current = endVal * eased;
      const shown = decimals ? current.toFixed(decimals) : String(Math.round(current));
      el.textContent = `${shown}${suffix}`;

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        if (flickerTimer) clearInterval(flickerTimer);
        el.textContent = `${decimals ? endVal.toFixed(decimals) : String(Math.round(endVal))}${suffix}`;
        if (card) {
          card.classList.remove("is-calculating");
          card.classList.add("is-revealed");
        }
      }
    }

    requestAnimationFrame(frame);
  }, delay);
}

function revealAnalysisScores(entries) {
  analysisScoreAnimGen += 1;
  entries.forEach((entry, i) => {
    if (!entry?.el) return;
    entry.el.textContent = "…";
    if (entry.card) {
      entry.card.classList.remove("is-revealed");
      entry.card.classList.add("is-calculating");
    }
    animateAnalysisScore(entry.el, entry.card, entry.value, {
      suffix: entry.suffix || "",
      decimals: entry.decimals ?? 0,
      delay: 120 + i * 200,
    });
  });
}

function revealAnalysisTrends(entries) {
  analysisScoreAnimGen += 1;
  entries.forEach((entry, i) => {
    if (!entry?.el) return;
    entry.el.textContent = "…";
    if (entry.card) {
      entry.card.classList.remove("is-revealed");
      entry.card.classList.add("is-calculating");
    }
    window.setTimeout(() => {
      entry.el.textContent = entry.text || "—";
      if (entry.card) {
        entry.card.classList.remove("is-calculating");
        entry.card.classList.add("is-revealed");
      }
    }, 120 + i * 200);
  });
}

function scrollAnalysisCardIntoView(selector) {
  const target = typeof selector === "string" ? $(selector) : selector;
  if (!target) return;

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        const scrollRoot = target.closest(".scroll") || $("#view-reports .scroll");
        if (!scrollRoot) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }

        const pad = 12;
        const rootRect = scrollRoot.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const available = rootRect.height - pad * 2;
        const cardHeight = targetRect.height;

        let delta;
        if (cardHeight <= available) {
          const viewCenter = rootRect.top + rootRect.height / 2;
          const cardCenter = targetRect.top + cardHeight / 2;
          delta = cardCenter - viewCenter;
        } else {
          delta = targetRect.top - (rootRect.top + pad);
        }

        if (Math.abs(delta) < 6) return;

        const maxScroll = scrollRoot.scrollHeight - scrollRoot.clientHeight;
        const nextTop = Math.max(0, Math.min(maxScroll, scrollRoot.scrollTop + delta));
        scrollRoot.scrollTo({ top: nextTop, behavior: "smooth" });
      }, 60);
    });
  });
}

function fillFaceAnalysisResults(report) {
  const api = window.CarveFaceAnalysis;
  const photoWrap = $("#face-analysis-photo-wrap");
  const photo = $("#face-analysis-photo");
  const headline = $("#face-analysis-headline");
  const summaryEl = $("#face-analysis-summary");
  const score = $("#face-analysis-score");
  const ratio = $("#face-analysis-ratio");
  const symmetry = $("#face-analysis-symmetry");

  const history = api?.loadFaceHistory?.() || [];
  const previous = api?.previousSnapshotFor?.(report, history) || null;
  const writeup = api?.buildFaceAnalysis
    ? api.buildFaceAnalysis(report, previous)
    : { headline: report.analysisHeadline || "Your check-in", paragraphs: report.analysisParagraphs || [] };

  if (photoWrap && photo) {
    if (report.photoDataUrl) {
      photo.src = report.photoDataUrl;
      photoWrap.hidden = false;
      renderFaceAnalysisOverlay(report);
    } else {
      photoWrap.hidden = true;
      renderFaceAnalysisOverlay(null);
    }
  }

  if (headline) headline.textContent = writeup.headline;
  const card = $("#reports-face-analysis-card");
  const allTips = api?.buildFaceAnalysisSummary
    ? api.buildFaceAnalysisSummary(report, previous)
    : report.analysisSummary;
  if (summaryEl) fitAnalysisCardTips(card, summaryEl, allTips);

  if (photo && report.photoDataUrl) {
    photo.onload = () => {
      if (summaryEl && card) fitAnalysisCardTips(card, summaryEl, analysisTipsCache.get(card) || allTips);
    };
  }

  revealAnalysisScores([
    { el: score, card: $("#face-metric-score"), value: report.jawlineScore },
    { el: ratio, card: $("#face-metric-ratio"), value: report.jawRatio, decimals: 2 },
    {
      el: symmetry,
      card: $("#face-metric-symmetry"),
      value: Math.round(Number(report.symmetry) * 100),
      suffix: "%",
    },
  ]);
}

function renderFaceAnalysis(opts = {}) {
  const api = window.CarveFaceAnalysis;
  if (!api) return;
  stopFaceCamera();
  const report = api.loadFaceReport();
  const meta = $("#face-analysis-meta");

  if (!report) {
    if (meta) meta.textContent = "On-device";
    const photoWrap = $("#face-analysis-photo-wrap");
    const photo = $("#face-analysis-photo");
    if (photo) photo.removeAttribute("src");
    if (photoWrap) photoWrap.hidden = true;
    renderFaceAnalysisOverlay(null);
    setFaceAnalysisView("idle");
    return;
  }

  if (meta) meta.textContent = "Saved";
  setFaceAnalysisView("results");
  fillFaceAnalysisResults(report);
  if (opts.scrollToScores) scrollAnalysisCardIntoView("#reports-face-analysis-card");
}

function hasCarvePlus() {
  return Boolean(state.carvePlus);
}

function canRunFaceAnalysisScan() {
  if (hasCarvePlus()) return true;
  return !state.freeFaceScanUsed;
}

function canRunVoiceAnalysisScan() {
  if (hasCarvePlus()) return true;
  return !state.freeVoiceScanUsed;
}

function redirectToCarvePlusHighlight() {
  state.stack = ["me"];
  renderMe();
  showView("me");
  window.requestAnimationFrame(() => {
    window.setTimeout(() => {
      const scroll = $(".me-scroll");
      const plus = $("#btn-carve-plus");
      if (plus && scroll) {
        const scrollRect = scroll.getBoundingClientRect();
        const plusRect = plus.getBoundingClientRect();
        const top = scroll.scrollTop + (plusRect.top - scrollRect.top) - 20;
        scroll.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }
      openCarvePlusPlan();
    }, 80);
  });
}

function requireAnalysisScanAccess(kind) {
  const allowed = kind === "face" ? canRunFaceAnalysisScan() : canRunVoiceAnalysisScan();
  if (allowed) return true;
  redirectToCarvePlusHighlight();
  return false;
}

function syncAnalysisPaywallUi() {
  const faceAllowed = canRunFaceAnalysisScan();
  const voiceAllowed = canRunVoiceAnalysisScan();
  const hasFace = Boolean(window.CarveFaceAnalysis?.loadFaceReport());
  const hasVoice = Boolean(window.CarveVoiceAnalysis?.loadVoiceReport());

  const setBtn = (el, defaultLabel, paywallLabel, allowed) => {
    if (!el) return;
    if (!allowed && !hasCarvePlus()) {
      el.textContent = paywallLabel;
      el.classList.add("is-paywall-cta");
    } else {
      el.textContent = defaultLabel;
      el.classList.remove("is-paywall-cta");
    }
  };

  setBtn($("#btn-face-analysis-reanalyze"), "Capture new photo", "Upgrade for more face scans", faceAllowed);
  setBtn($("#btn-voice-analysis-reanalyze"), "Record again", "Upgrade for more voice scans", voiceAllowed);

  const faceStart = $("#btn-face-analysis-start");
  const voiceStart = $("#btn-voice-analysis-start");
  if (faceStart) faceStart.disabled = !faceAllowed && !hasCarvePlus();
  if (voiceStart) voiceStart.disabled = !voiceAllowed && !hasCarvePlus();

  const faceNote = $("#face-analysis-free-note");
  const voiceNote = $("#voice-analysis-free-note");
  if (faceNote) {
    faceNote.textContent = hasCarvePlus()
      ? "Unlimited scans with CARVE Plus."
      : hasFace || state.freeFaceScanUsed
        ? "Free scan used — upgrade for more face scans."
        : "Includes 1 free on-device scan.";
  }
  if (voiceNote) {
    voiceNote.textContent = hasCarvePlus()
      ? "Unlimited scans with CARVE Plus."
      : hasVoice || state.freeVoiceScanUsed
        ? "Free scan used — upgrade for more voice scans."
        : "Includes 1 free on-device scan.";
  }

  const presenceSection = $("#reports-presence-analysis-section");
  if (presenceSection) presenceSection.hidden = !isFullPresenceMode();

  if (isFullPresenceMode()) {
    updatePresenceAnalysisHub(hasFace, hasVoice, faceAllowed, voiceAllowed);
  }
}

function updatePresenceAnalysisHub(hasFace, hasVoice, faceAllowed, voiceAllowed) {
  const meta = $("#presence-analysis-meta");
  const lead = $("#presence-analysis-lead");
  const freeNote = $("#presence-analysis-free-note");
  const faceStatus = $("#presence-status-face");
  const voiceStatus = $("#presence-status-voice");
  const faceCheck = $("#presence-status-face-check");
  const voiceCheck = $("#presence-status-voice-check");

  if (faceStatus) {
    faceStatus.classList.toggle("is-done", hasFace);
  }
  if (voiceStatus) {
    voiceStatus.classList.toggle("is-done", hasVoice);
  }
  if (faceCheck) faceCheck.hidden = !hasFace;
  if (voiceCheck) voiceCheck.hidden = !hasVoice;

  const doneCount = (hasFace ? 1 : 0) + (hasVoice ? 1 : 0);
  if (meta) {
    meta.textContent =
      doneCount === 2 ? "Complete" : doneCount === 1 ? "1 / 2 done" : "On-device";
  }
  if (lead) {
    if (doneCount === 2 && !presenceAnalysisOpen.face && !presenceAnalysisOpen.voice) {
      lead.textContent = "Both baselines saved — tap a box to review your results.";
    } else if (!presenceAnalysisOpen.face && !presenceAnalysisOpen.voice) {
      lead.textContent = "Tap the blue or red box to open face or voice analysis.";
    }
  }

  if (freeNote) {
    if (hasCarvePlus()) {
      freeNote.textContent = "Unlimited face and voice scans with CARVE Plus.";
    } else if (state.freeFaceScanUsed && state.freeVoiceScanUsed) {
      freeNote.textContent = "Free scans used — upgrade for more face and voice scans.";
    } else if (state.freeFaceScanUsed || state.freeVoiceScanUsed) {
      freeNote.textContent = "Free scan used for one type — upgrade for unlimited scans.";
    } else {
      freeNote.textContent = "One free face scan and one free voice scan on this device.";
    }
  }

  syncPresenceAnalysisCards();
}

async function startFaceCamera() {
  if (!requireAnalysisScanAccess("face")) return;
  const meta = $("#face-analysis-meta");
  stopProgressCamera();
  stopFaceCamera();

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setFaceAnalysisView("idle", "Camera not supported in this browser.");
    return;
  }

  try {
    faceCamStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });
  } catch (_) {
    const hasReport = Boolean(window.CarveFaceAnalysis?.loadFaceReport());
    setFaceAnalysisView(hasReport ? "results" : "idle", "Could not access camera. Allow permission and try again.");
    if (hasReport) {
      fillFaceAnalysisResults(window.CarveFaceAnalysis.loadFaceReport());
      if (meta) meta.textContent = "Saved";
    }
    return;
  }

  const video = $("#face-analysis-video");
  if (!video) {
    stopFaceCamera();
    return;
  }
  video.srcObject = faceCamStream;
  try {
    await video.play();
  } catch (_) {
    /* autoplay may already be running */
  }
  if (meta) meta.textContent = "Live";
  setFaceAnalysisView("camera");
}

function captureFaceFrame() {
  const video = $("#face-analysis-video");
  const canvas = $("#face-analysis-canvas");
  if (!video || !canvas) throw new Error("Image load failure");
  const w = video.videoWidth;
  const h = video.videoHeight;
  if (!w || !h) throw new Error("Image load failure");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  // Mirror to match selfie preview
  ctx.save();
  ctx.translate(w, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, w, h);
  ctx.restore();
  return canvas;
}

async function captureAndAnalyzeFace() {
  const api = window.CarveFaceAnalysis;
  if (!api) return;
  if (!canRunFaceAnalysisScan()) {
    redirectToCarvePlusHighlight();
    return;
  }
  const meta = $("#face-analysis-meta");

  let canvas;
  try {
    canvas = captureFaceFrame();
  } catch (_) {
    setFaceAnalysisView("camera", "Image load failure. Wait for the camera to ready, then try again.");
    return;
  }

  stopFaceCamera();

  const photoDataUrl = canvas.toDataURL("image/jpeg", 0.82);
  const loadingPhoto = $("#face-analysis-loading-photo");
  if (loadingPhoto) loadingPhoto.src = photoDataUrl;
  if (meta) meta.textContent = "Analyzing…";
  setFaceAnalysisView("loading");

  try {
    const previous = api.loadFaceReport();
    const report = await api.analyzeFaceFromImage(canvas, previous);
    report.photoDataUrl = photoDataUrl;
    api.saveFaceReport(report);
    markFreeScanUsed("face");
    syncDailyProgressFromFaceReport(report);
    refreshMyProgressIfVisible();
    renderFaceAnalysis({ scrollToScores: true });
    syncAnalysisPaywallUi();
  } catch (err) {
    const msg = String(err && err.message ? err.message : err);
    let friendly = "Face analysis failed. Try another capture.";
    if (/no face/i.test(msg)) friendly = "No face detected. Face the camera and try again.";
    else if (/image load/i.test(msg)) friendly = "Image load failure. Try capturing again.";

    const existing = api.loadFaceReport();
    if (existing) {
      fillFaceAnalysisResults(existing);
      setFaceAnalysisView("results", friendly);
      if (meta) meta.textContent = "Saved";
    } else {
      setFaceAnalysisView("idle", friendly);
      if (meta) meta.textContent = "On-device";
    }
  }
}

function cancelFaceCamera() {
  stopFaceCamera();
  const api = window.CarveFaceAnalysis;
  const existing = api?.loadFaceReport();
  const meta = $("#face-analysis-meta");
  if (existing) {
    fillFaceAnalysisResults(existing);
    setFaceAnalysisView("results");
    if (meta) meta.textContent = "Saved";
  } else {
    setFaceAnalysisView("idle");
    if (meta) meta.textContent = "On-device";
  }
}

function setVoiceAnalysisView(mode, errorMsg) {
  const idle = $("#voice-analysis-idle");
  const recorder = $("#voice-analysis-recorder");
  const loading = $("#voice-analysis-loading");
  const results = $("#voice-analysis-results");
  const error = $("#voice-analysis-error");
  if (idle) idle.hidden = mode !== "idle";
  if (recorder) recorder.hidden = mode !== "recorder";
  if (loading) loading.hidden = mode !== "loading";
  if (results) results.hidden = mode !== "results";
  if (error) {
    if (mode === "error" && errorMsg) {
      error.hidden = false;
      error.textContent = errorMsg;
    } else if (errorMsg && (mode === "idle" || mode === "recorder" || mode === "results")) {
      error.hidden = false;
      error.textContent = errorMsg;
    } else {
      error.hidden = true;
      error.textContent = "";
    }
  }
}

let voiceAnalysisRecorder = null;
let voiceAnalysisChunks = [];
let voiceAnalysisTimer = null;
let voiceAnalysisStartedAt = 0;
let voiceAnalysisActive = false;
let voiceAnalysisDiscard = false;
let voiceAnalysisAudioMonitor = null;
const VOICE_ANALYSIS_MAX_MS = 30000;
const VOICE_ANALYSIS_MIN_MS = 3000;

function setVoiceAnalysisUi(recording) {
  const ring = $("#voice-analysis-ring");
  const meter = $("#voice-analysis-meter");
  const btn = $("#btn-voice-analysis-record");
  const status = $("#voice-analysis-status");
  if (ring) ring.classList.toggle("is-recording", recording);
  if (meter) meter.classList.toggle("is-live", recording);
  if (btn) btn.textContent = recording ? "Stop & analyze" : "Start recording";
  if (status) {
    status.textContent = recording
      ? "Recording… speak at your natural pace"
      : "Find a quiet spot · say a steady phrase for 5–8 seconds";
  }
}

function startVoiceAnalysisLiveAudio() {
  const api = window.CarveVoiceAnalysis;
  if (!api?.startLiveAudioMonitor || !sharedMicStream) return;
  try {
    voiceAnalysisAudioMonitor = api.startLiveAudioMonitor(sharedMicStream, () => {});
  } catch (_) {
    voiceAnalysisAudioMonitor = null;
  }
}

async function stopVoiceAnalysisLiveAudio() {
  const monitor = voiceAnalysisAudioMonitor;
  voiceAnalysisAudioMonitor = null;
  if (monitor?.stop) {
    try {
      await monitor.stop();
    } catch (_) {
      /* ignore */
    }
  }
}

function updateVoiceAnalysisTimer() {
  const el = $("#voice-analysis-timer");
  if (!el || !voiceAnalysisActive) return;
  const ms = Date.now() - voiceAnalysisStartedAt;
  el.textContent = formatVoiceDuration(ms);
  if (ms >= VOICE_ANALYSIS_MAX_MS) {
    finishVoiceAnalysisRecording();
  }
}

function renderVoiceAnalysisWaveform(container, peaks) {
  if (!container || !peaks?.length) return;
  const max = Math.max(...peaks, 0.001);
  container.innerHTML = peaks
    .map((p) => {
      const h = Math.max(12, Math.round((p / max) * 100));
      return `<span style="height:${h}%"></span>`;
    })
    .join("");
}

function fillVoiceAnalysisResults(report) {
  const api = window.CarveVoiceAnalysis;
  const waveWrap = $("#voice-analysis-wave-wrap");
  const wave = $("#voice-analysis-wave");
  const headline = $("#voice-analysis-headline");
  const summaryEl = $("#voice-analysis-summary");
  const score = $("#voice-analysis-score");
  const resonance = $("#voice-analysis-resonance");
  const clarity = $("#voice-analysis-clarity");
  const pitchLine = $("#voice-analysis-pitch-line");

  const history = api?.loadVoiceHistory?.() || [];
  const previous = api?.previousSnapshotFor?.(report, history) || null;
  const writeup = api?.buildVoiceAnalysis
    ? api.buildVoiceAnalysis(report, previous)
    : { headline: report.analysisHeadline || "Your recording" };

  if (waveWrap && wave) {
    if (report.waveform?.length) {
      renderVoiceAnalysisWaveform(wave, report.waveform);
      waveWrap.hidden = false;
    } else {
      wave.innerHTML = "";
      waveWrap.hidden = true;
    }
  }

  if (headline) headline.textContent = writeup.headline;
  const card = $("#reports-voice-analysis-card");
  const allTips = api?.buildVoiceAnalysisSummary
    ? api.buildVoiceAnalysisSummary(report, previous)
    : report.analysisSummary;
  if (summaryEl) fitAnalysisCardTips(card, summaryEl, allTips);

  revealAnalysisScores([
    { el: score, card: $("#voice-metric-score"), value: report.voiceScore },
    { el: resonance, card: $("#voice-metric-resonance"), value: report.resonanceScore, suffix: "%" },
    { el: clarity, card: $("#voice-metric-clarity"), value: report.clarityScore, suffix: "%" },
  ]);
  if (pitchLine) {
    pitchLine.textContent = report.pitchHz
      ? `Pitch ${Math.round(report.pitchHz)} Hz · score ${report.pitchScore}/100`
      : "Pitch not detected in this clip";
  }
}

function renderVoiceAnalysis(opts = {}) {
  const api = window.CarveVoiceAnalysis;
  if (!api || !showsVoiceReports()) return;
  stopVoiceAnalysisMic();
  const report = api.loadVoiceReport();
  const meta = $("#voice-analysis-meta");

  if (!report) {
    if (meta) meta.textContent = "On-device";
    setVoiceAnalysisView("idle");
    return;
  }

  if (meta) meta.textContent = "Saved";
  setVoiceAnalysisView("results");
  fillVoiceAnalysisResults(report);
  if (opts.scrollToScores) scrollAnalysisCardIntoView("#reports-voice-analysis-card");
}

async function startVoiceAnalysisRecorder() {
  if (!requireAnalysisScanAccess("voice")) return;
  const meta = $("#voice-analysis-meta");
  stopFaceCamera();
  stopProgressCamera();
  stopVoiceRecorder(false);
  stopVoiceAnalysisMic(false);

  if (typeof MediaRecorder === "undefined") {
    setVoiceAnalysisView("idle", "Voice recording not supported in this browser.");
    return;
  }

  try {
    await ensureMicStream();
  } catch (err) {
    const existing = window.CarveVoiceAnalysis?.loadVoiceReport();
    const msg =
      err?.message === "Microphone not supported in this browser."
        ? err.message
        : "Could not access microphone. Allow permission and try again.";
    setVoiceAnalysisView(existing ? "results" : "idle", msg);
    if (existing) {
      fillVoiceAnalysisResults(existing);
      if (meta) meta.textContent = "Saved";
    }
    return;
  }

  voiceAnalysisChunks = [];
  voiceAnalysisDiscard = false;
  setVoiceAnalysisUi(false);
  const timer = $("#voice-analysis-timer");
  if (timer) timer.textContent = "0:00";
  if (meta) meta.textContent = "Ready";
  setVoiceAnalysisView("recorder");
  startVoiceAnalysisLiveAudio();
}

function beginVoiceAnalysisRecording() {
  if (!sharedMicStream) return;
  voiceAnalysisDiscard = false;
  voiceAnalysisChunks = [];
  const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
    ? "audio/webm;codecs=opus"
    : MediaRecorder.isTypeSupported("audio/webm")
      ? "audio/webm"
      : "";

  try {
    voiceAnalysisRecorder = mimeType
      ? new MediaRecorder(sharedMicStream, { mimeType })
      : new MediaRecorder(sharedMicStream);
  } catch (_) {
    setVoiceAnalysisView("recorder", "Could not start recorder on this device.");
    return;
  }

  voiceAnalysisRecorder.ondataavailable = (e) => {
    if (e.data?.size) voiceAnalysisChunks.push(e.data);
  };
  voiceAnalysisRecorder.onstop = () => {
    processVoiceAnalysisRecording();
  };

  voiceAnalysisStartedAt = Date.now();
  voiceAnalysisActive = true;
  voiceAnalysisRecorder.start(250);
  setVoiceAnalysisUi(true);
  if (voiceAnalysisTimer) clearInterval(voiceAnalysisTimer);
  voiceAnalysisTimer = window.setInterval(updateVoiceAnalysisTimer, 200);
  const meta = $("#voice-analysis-meta");
  if (meta) meta.textContent = "Recording";
}

function finishVoiceAnalysisRecording() {
  if (!voiceAnalysisActive || !voiceAnalysisRecorder) return;
  const elapsed = Date.now() - voiceAnalysisStartedAt;
  if (elapsed < VOICE_ANALYSIS_MIN_MS) {
    setVoiceAnalysisView("recorder", "Keep going — speak for at least 3 seconds.");
    return;
  }
  voiceAnalysisDiscard = false;
  voiceAnalysisActive = false;
  if (voiceAnalysisTimer) {
    clearInterval(voiceAnalysisTimer);
    voiceAnalysisTimer = null;
  }
  setVoiceAnalysisUi(false);

  if (voiceAnalysisRecorder.state !== "inactive") {
    voiceAnalysisRecorder.stop();
  } else {
    processVoiceAnalysisRecording();
  }
}

async function processVoiceAnalysisRecording() {
  const api = window.CarveVoiceAnalysis;
  const meta = $("#voice-analysis-meta");

  if (voiceAnalysisDiscard) {
    voiceAnalysisDiscard = false;
    voiceAnalysisChunks = [];
    stopVoiceAnalysisMic(true);
    return;
  }

  const chunks = voiceAnalysisChunks.slice();
  voiceAnalysisChunks = [];
  if (!chunks.length) {
    setVoiceAnalysisView("recorder", "Nothing recorded — try again.");
    stopVoiceAnalysisMic(true);
    return;
  }

  const blob = new Blob(chunks, { type: chunks[0]?.type || "audio/webm" });
  stopVoiceAnalysisMic(false);
  if (!canRunVoiceAnalysisScan()) {
    redirectToCarvePlusHighlight();
    const existing = api.loadVoiceReport();
    if (existing) {
      fillVoiceAnalysisResults(existing);
      setVoiceAnalysisView("results");
      if (meta) meta.textContent = "Saved";
    } else {
      setVoiceAnalysisView("idle");
      if (meta) meta.textContent = "On-device";
    }
    return;
  }
  if (meta) meta.textContent = "Analyzing…";
  setVoiceAnalysisView("loading");

  try {
    const previous = api.loadVoiceReport();
    const report = await api.analyzeVoiceFromBlob(blob, previous);
    api.saveVoiceReport(report);
    markFreeScanUsed("voice");
    syncDailyProgressFromVoiceReport(report);
    refreshMyProgressIfVisible();
    renderVoiceAnalysis({ scrollToScores: true });
    syncAnalysisPaywallUi();
  } catch (err) {
    const msg = String(err && err.message ? err.message : err);
    let friendly = "Voice analysis failed. Try another recording.";
    if (/too short/i.test(msg)) friendly = "Recording too short — speak for at least 3 seconds.";
    else if (/no audio/i.test(msg)) friendly = "No audio detected. Check your mic and try again.";

    const existing = api.loadVoiceReport();
    if (existing) {
      fillVoiceAnalysisResults(existing);
      setVoiceAnalysisView("results", friendly);
      if (meta) meta.textContent = "Saved";
    } else {
      setVoiceAnalysisView("idle", friendly);
      if (meta) meta.textContent = "On-device";
    }
  }
}

function stopVoiceAnalysisMic(keepRecorderOpen) {
  if (voiceAnalysisActive) voiceAnalysisDiscard = true;
  voiceAnalysisActive = false;
  if (voiceAnalysisTimer) {
    clearInterval(voiceAnalysisTimer);
    voiceAnalysisTimer = null;
  }

  const recorder = voiceAnalysisRecorder;
  voiceAnalysisRecorder = null;
  if (recorder && recorder.state !== "inactive") {
    if (voiceAnalysisDiscard) recorder.onstop = null;
    try {
      recorder.stop();
    } catch (_) {
      /* ignore */
    }
  }

  setVoiceAnalysisUi(false);
  if (keepRecorderOpen) return;

  stopVoiceAnalysisLiveAudio();

  const meta = $("#voice-analysis-meta");
  if (meta && (meta.textContent === "Recording" || meta.textContent === "Ready")) {
    meta.textContent = "On-device";
  }
}

function cancelVoiceAnalysisRecorder() {
  voiceAnalysisDiscard = true;
  stopVoiceAnalysisMic(false);
  const api = window.CarveVoiceAnalysis;
  const existing = api?.loadVoiceReport();
  const meta = $("#voice-analysis-meta");
  if (existing) {
    fillVoiceAnalysisResults(existing);
    setVoiceAnalysisView("results");
    if (meta) meta.textContent = "Saved";
  } else {
    setVoiceAnalysisView("idle");
    if (meta) meta.textContent = "On-device";
  }
}

function toggleVoiceAnalysisRecording() {
  if (voiceAnalysisActive) {
    finishVoiceAnalysisRecording();
  } else {
    beginVoiceAnalysisRecording();
  }
}

function openReportsPhotoPicker(slot) {
  startProgressCamera(slot);
}

let progressCamStream = null;
let progressPhotoSlot = null;

let sharedMicStream = null;
const VOICE_RECORD_AUTO_START_MS = 500;
let voiceRecordAutoStartTimer = null;

async function ensureMicStream() {
  if (sharedMicStream) {
    const live = sharedMicStream.getTracks().some((t) => t.readyState === "live");
    if (live) return sharedMicStream;
    sharedMicStream = null;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("Microphone not supported in this browser.");
  }
  sharedMicStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  return sharedMicStream;
}

function clearVoiceRecordAutoStart() {
  if (voiceRecordAutoStartTimer) {
    clearTimeout(voiceRecordAutoStartTimer);
    voiceRecordAutoStartTimer = null;
  }
}

function scheduleVoiceRecordAutoStart() {
  clearVoiceRecordAutoStart();
  const status = $("#reports-voice-status");
  if (status) status.textContent = "Starting in 0.5s…";
  voiceRecordAutoStartTimer = window.setTimeout(() => {
    voiceRecordAutoStartTimer = null;
    beginVoiceRecording();
  }, VOICE_RECORD_AUTO_START_MS);
}

function stopProgressCamera() {
  if (progressCamStream) {
    progressCamStream.getTracks().forEach((t) => t.stop());
    progressCamStream = null;
  }
  const video = $("#reports-photo-video");
  if (video) video.srcObject = null;
  progressPhotoSlot = null;
  const grid = $("#reports-photos-grid-wrap");
  const cam = $("#reports-photos-camera");
  const voice = $("#reports-voice-recorder");
  const err = $("#reports-photos-error");
  const meta = $("#reports-photos-meta");
  if (grid) grid.hidden = false;
  if (cam) cam.hidden = true;
  if (voice) voice.hidden = true;
  if (err) {
    err.hidden = true;
    err.textContent = "";
  }
  if (meta) meta.textContent = "On-device only";
}

function stopProgressMedia() {
  stopProgressCamera();
  stopVoiceRecorder(false);
  stopVoiceAnalysisMic(false);
}

function setProgressPhotoError(msg) {
  const err = $("#reports-photos-error");
  if (!err) return;
  if (msg) {
    err.hidden = false;
    err.textContent = msg;
  } else {
    err.hidden = true;
    err.textContent = "";
  }
}

function preferredProgressPhotoSlot() {
  const photos = loadReportPhotos();
  const weekNum = Math.min(4, Math.max(1, Math.ceil((state.currentDay || 1) / 7)));
  const preferred = `week${weekNum}`;
  return photos[preferred]
    ? ["week1", "week2", "week3", "week4"].find((k) => !photos[k]) || preferred
    : preferred;
}

function preferredProgressVoiceSlot() {
  const clips = loadReportVoice();
  const weekNum = Math.min(4, Math.max(1, Math.ceil((state.currentDay || 1) / 7)));
  const preferred = `week${weekNum}`;
  return clips[preferred]
    ? ["week1", "week2", "week3", "week4"].find((k) => !clips[k]) || preferred
    : preferred;
}

function preferredProgressSlot() {
  return isVoiceProgressMode() ? preferredProgressVoiceSlot() : preferredProgressPhotoSlot();
}

async function startProgressCamera(slot) {
  stopFaceCamera();
  stopProgressMedia();

  const key = slot || preferredProgressPhotoSlot();
  progressPhotoSlot = key;
  const labelMap = { week1: "Week 1", week2: "Week 2", week3: "Week 3", week4: "Week 4" };
  const slotLabel = $("#reports-photos-slot-label");
  if (slotLabel) slotLabel.textContent = labelMap[key] || "Progress photo";

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setProgressPhotoError("Camera not supported in this browser.");
    return;
  }

  try {
    progressCamStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });
  } catch (_) {
    setProgressPhotoError("Could not access camera. Allow permission and try again.");
    return;
  }

  const video = $("#reports-photo-video");
  const grid = $("#reports-photos-grid-wrap");
  const cam = $("#reports-photos-camera");
  const voice = $("#reports-voice-recorder");
  const meta = $("#reports-photos-meta");
  if (!video || !cam) {
    stopProgressCamera();
    return;
  }
  video.srcObject = progressCamStream;
  try {
    await video.play();
  } catch (_) {
    /* autoplay may already be running */
  }
  if (grid) grid.hidden = true;
  cam.hidden = false;
  if (voice) voice.hidden = true;
  setProgressPhotoError("");
  if (meta) meta.textContent = "Live";
}

function captureProgressFrameDataUrl() {
  const video = $("#reports-photo-video");
  const canvas = $("#reports-photo-canvas");
  if (!video || !canvas) throw new Error("Image load failure");
  const w = video.videoWidth;
  const h = video.videoHeight;
  if (!w || !h) throw new Error("Image load failure");

  const maxW = 720;
  const scale = w > maxW ? maxW / w : 1;
  const cw = Math.round(w * scale);
  const ch = Math.round(h * scale);
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.translate(cw, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, cw, ch);
  ctx.restore();

  let quality = 0.82;
  let dataUrl = canvas.toDataURL("image/jpeg", quality);
  while (dataUrl.length > 900000 && quality > 0.45) {
    quality -= 0.1;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  }
  if (dataUrl.length > 900000) throw new Error("Photo too large");
  return dataUrl;
}

function captureProgressPhoto() {
  if (!progressPhotoSlot) {
    setProgressPhotoError("Pick a week slot, then capture.");
    return;
  }
  let dataUrl;
  try {
    dataUrl = captureProgressFrameDataUrl();
  } catch (err) {
    const msg = String(err && err.message ? err.message : err);
    if (/too large/i.test(msg)) setProgressPhotoError("Photo too large — try again with steadier framing.");
    else setProgressPhotoError("Camera not ready yet. Wait a moment, then capture.");
    return;
  }

  const slot = progressPhotoSlot;
  const photos = loadReportPhotos();
  photos[slot] = dataUrl;
  saveReportPhotos(photos);
  stopProgressCamera();
  renderReportPhotos();
  renderReports();
  showToast("Progress photo saved on this device");
}

function cancelProgressCamera() {
  stopProgressCamera();
}

let voiceMediaRecorder = null;
let voiceRecordChunks = [];
let voiceRecordSlot = null;
let voiceRecordTimer = null;
let voiceRecordStartedAt = 0;
let voiceRecordingActive = false;
let voiceRecordDiscard = false;

function setVoiceRecorderUi(recording) {
  const ring = $("#reports-voice-ring");
  const meter = $("#reports-voice-meter");
  const btn = $("#reports-voice-record");
  const status = $("#reports-voice-status");
  if (ring) ring.classList.toggle("is-recording", recording);
  if (meter) meter.classList.toggle("is-live", recording);
  if (btn) btn.textContent = recording ? "STOP RECORDING" : "Start recording";
  if (status) {
    status.textContent = recording
      ? "Recording… speak at your natural pace"
      : "Find a quiet spot · speak naturally";
  }
}

function updateVoiceRecordTimer() {
  const el = $("#reports-voice-timer");
  if (!el || !voiceRecordingActive) return;
  const ms = Date.now() - voiceRecordStartedAt;
  el.textContent = formatVoiceDuration(ms);
  if (ms >= VOICE_RECORD_MAX_MS) {
    finishVoiceRecording();
  }
}

function setProgressMediaError(msg) {
  setProgressPhotoError(msg);
}

async function startVoiceRecorder(slot) {
  stopFaceCamera();
  stopProgressCamera();
  stopVoiceRecorder(false);
  stopVoiceAnalysisMic(false);
  clearVoiceRecordAutoStart();

  const key = slot || preferredProgressVoiceSlot();
  voiceRecordSlot = key;
  const labelMap = { week1: "Week 1", week2: "Week 2", week3: "Week 3", week4: "Week 4" };
  const slotLabel = $("#reports-voice-slot-label");
  if (slotLabel) slotLabel.textContent = labelMap[key] || "Week 1";

  if (typeof MediaRecorder === "undefined") {
    setProgressMediaError("Voice recording not supported in this browser.");
    return;
  }

  try {
    await ensureMicStream();
  } catch (err) {
    const msg =
      err?.message === "Microphone not supported in this browser."
        ? err.message
        : "Could not access microphone. Allow permission and try again.";
    setProgressMediaError(msg);
    return;
  }

  const grid = $("#reports-photos-grid-wrap");
  const panel = $("#reports-voice-recorder");
  const cam = $("#reports-photos-camera");
  const meta = $("#reports-photos-meta");
  if (grid) grid.hidden = true;
  if (panel) panel.hidden = false;
  if (cam) cam.hidden = true;
  setProgressMediaError("");
  setVoiceRecorderUi(false);
  const timer = $("#reports-voice-timer");
  if (timer) timer.textContent = "0:00";
  if (meta) meta.textContent = "Ready";
  scheduleVoiceRecordAutoStart();
}

function beginVoiceRecording() {
  clearVoiceRecordAutoStart();
  if (!sharedMicStream || !voiceRecordSlot || voiceRecordingActive) return;
  voiceRecordChunks = [];
  const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
    ? "audio/webm;codecs=opus"
    : MediaRecorder.isTypeSupported("audio/webm")
      ? "audio/webm"
      : "";

  try {
    voiceMediaRecorder = mimeType
      ? new MediaRecorder(sharedMicStream, { mimeType })
      : new MediaRecorder(sharedMicStream);
  } catch (_) {
    setProgressMediaError("Could not start recorder on this device.");
    return;
  }

  voiceMediaRecorder.ondataavailable = (e) => {
    if (e.data?.size) voiceRecordChunks.push(e.data);
  };
  voiceMediaRecorder.onstop = () => {
    saveVoiceRecordingFromChunks();
  };

  voiceRecordStartedAt = Date.now();
  voiceRecordingActive = true;
  voiceMediaRecorder.start(250);
  setVoiceRecorderUi(true);
  if (voiceRecordTimer) clearInterval(voiceRecordTimer);
  voiceRecordTimer = window.setInterval(updateVoiceRecordTimer, 200);
  const meta = $("#reports-photos-meta");
  if (meta) meta.textContent = "Recording";
}

function finishVoiceRecording() {
  if (!voiceRecordingActive || !voiceMediaRecorder) return;
  voiceRecordingActive = false;
  if (voiceRecordTimer) {
    clearInterval(voiceRecordTimer);
    voiceRecordTimer = null;
  }
  setVoiceRecorderUi(false);
  if (voiceMediaRecorder.state !== "inactive") {
    voiceMediaRecorder.stop();
  } else {
    saveVoiceRecordingFromChunks();
  }
}

function saveVoiceRecordingFromChunks() {
  if (voiceRecordDiscard) {
    voiceRecordDiscard = false;
    voiceRecordChunks = [];
    stopVoiceRecorder(false);
    return;
  }

  const slot = voiceRecordSlot;
  const durationMs = voiceRecordStartedAt ? Date.now() - voiceRecordStartedAt : 0;
  const chunks = voiceRecordChunks.slice();
  voiceRecordChunks = [];
  if (!slot || !chunks.length) {
    setProgressMediaError("Nothing recorded — try again.");
    stopVoiceRecorder(false);
    return;
  }

  const blob = new Blob(chunks, { type: chunks[0]?.type || "audio/webm" });
  if (blob.size > 4_500_000) {
    setProgressMediaError("Recording too large — keep it under a minute.");
    stopVoiceRecorder(false);
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const clips = loadReportVoice();
    clips[slot] = { dataUrl: reader.result, durationMs, savedAt: Date.now() };
    saveReportVoice(clips);
    stopVoiceRecorder(false);
    renderReportPhotos();
    renderReports();
    showToast("Voice clip saved on this device");
  };
  reader.onerror = () => {
    setProgressMediaError("Could not save recording.");
    stopVoiceRecorder(false);
  };
  reader.readAsDataURL(blob);
}

function stopVoiceRecorder(keepPanelOpen) {
  clearVoiceRecordAutoStart();
  voiceRecordingActive = false;
  if (voiceRecordTimer) {
    clearInterval(voiceRecordTimer);
    voiceRecordTimer = null;
  }

  const recorder = voiceMediaRecorder;
  voiceMediaRecorder = null;
  if (recorder && recorder.state !== "inactive") {
    try {
      recorder.stop();
    } catch (_) {
      /* ignore */
    }
  } else if (voiceRecordDiscard) {
    voiceRecordDiscard = false;
    voiceRecordChunks = [];
  }

  if (!keepPanelOpen) voiceRecordSlot = null;
  setVoiceRecorderUi(false);

  const grid = $("#reports-photos-grid-wrap");
  const panel = $("#reports-voice-recorder");
  const meta = $("#reports-photos-meta");
  if (!keepPanelOpen) {
    if (grid) grid.hidden = false;
    if (panel) panel.hidden = true;
    if (meta) meta.textContent = "On-device only";
  }
}

function cancelVoiceRecorder() {
  voiceRecordDiscard = true;
  clearVoiceRecordAutoStart();
  stopVoiceRecorder(false);
}

function toggleVoiceRecording() {
  if (voiceRecordingActive) {
    finishVoiceRecording();
  } else {
    beginVoiceRecording();
  }
}

function playVoiceClip(btn) {
  const audio = btn.querySelector("audio");
  if (!audio) return;
  rootPauseOtherVoiceClips(btn);
  if (audio.paused) {
    audio.play().catch(() => showToast("Could not play recording"));
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
}

function rootPauseOtherVoiceClips(activeBtn) {
  $$(".reports-photo.has-voice audio").forEach((audio) => {
    const parent = audio.closest(".reports-photo");
    if (parent !== activeBtn) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}

function openReportsProgressPicker(slot, kind) {
  if (kind === "voice") {
    startVoiceRecorder(slot || preferredProgressVoiceSlot());
    return;
  }
  startProgressCamera(slot || preferredProgressPhotoSlot());
}

const PLAN_PREVIEW_STORAGE_KEY = "carve-plan-preview-until-v1";
const PLAN_PREVIEW_MAX_DAY = 8;
const PLAN_PREVIEW_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

function planPreviewOpen() {
  try {
    let until = localStorage.getItem(PLAN_PREVIEW_STORAGE_KEY);
    if (!until) {
      until = String(Date.now() + PLAN_PREVIEW_DURATION_MS);
      localStorage.setItem(PLAN_PREVIEW_STORAGE_KEY, until);
    }
    return Date.now() < Number(until);
  } catch (_) {
    return true;
  }
}

function isDayAccessible(day) {
  if (!day) return false;
  if (day.status !== "locked") return true;
  return planPreviewOpen() && day.n <= PLAN_PREVIEW_MAX_DAY;
}

function dayListStatus(day) {
  if (day.status === "done") return "done";
  if (isDayAccessible(day)) return "active";
  return "locked";
}

function renderDayList() {
  const list = $("#day-list");
  list.innerHTML = "";
  const kicker = $("#view-plan .day-kicker");
  if (kicker) {
    kicker.textContent = planPreviewOpen()
      ? `Preview open — Days 1–${PLAN_PREVIEW_MAX_DAY} available for now.`
      : "One day at a time — progress unlocks the next.";
  }
  state.days.forEach((d) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "day-card";
    const status = dayListStatus(d);
    if (status === "locked") btn.classList.add("locked");
    if (status === "active" && d.n === state.currentDay) btn.classList.add("active");

    const count = dayItemCount(d);
    let sub = `${count} Exercises`;
    if (d.status === "done") sub = "Finished";
    else if (status === "locked") sub = "Locked";
    else if (d.status === "locked" && planPreviewOpen()) sub = "Open preview";
    else if (d.percent) sub = `${d.percent}% Completed`;
    const right =
      d.status === "done"
        ? `<span class="check">✓</span>`
        : status === "locked"
          ? `<span class="lock" aria-hidden="true">🔒</span>`
          : `<span class="cta">${d.percent ? "CONTINUE" : "START"}</span>`;

    btn.innerHTML = `<span><strong>Day ${d.n}</strong><small>${sub}</small></span>${right}`;
    if (isDayAccessible(d)) {
      btn.addEventListener("click", () => {
        openDay(d.n);
      });
    } else {
      btn.disabled = true;
    }
    list.appendChild(btn);
  });
}

function dayItemCount(day) {
  const roadmap = dayRoadmap(day);
  if (roadmap) return roadmap.length;
  return day?.ids?.length || 0;
}

function dayDoneCount(day) {
  const len = dayItemCount(day);
  if (!day || !len) return 0;
  if (day.status === "done") return len;
  return Math.min(Math.max(0, day.doneCount || 0), len);
}

function dayResumeIndex(day) {
  const len = dayItemCount(day);
  if (!len) return 0;
  if (day.status === "done") return 0;
  return Math.min(dayDoneCount(day), len - 1);
}

function saveSessionProgress() {
  const day = state.days.find((d) => d.n === state.openDayN);
  if (!day || day.status === "done") return;
  const len = state.sessionItems.length || state.sessionIds.length || dayItemCount(day);
  if (!len) return;
  day.doneCount = Math.max(day.doneCount || 0, state.sessionIndex);
  day.percent = Math.round((day.doneCount / len) * 100);
  saveState();
}

function updateStartCta(day) {
  const startLabel = $("#start-label");
  const startSub = $("#start-sub");
  const btn = $("#btn-start-session");
  const heroLabel = $("#hero-start-label");
  const len = dayItemCount(day);
  const done = dayDoneCount(day);
  const remaining = Math.max(0, len - done);

  if (startLabel && btn) {
    btn.classList.toggle("pill-continue", day.status !== "done" && done > 0);
    if (day.status === "done") {
      startLabel.textContent = "PRACTICE AGAIN";
      if (startSub) startSub.textContent = "Same sequence · stay gentle";
    } else if (done > 0) {
      startLabel.textContent = "CONTINUE";
      if (startSub) {
        startSub.textContent =
          remaining === 1 ? "1 exercise left" : `${remaining} exercises left`;
      }
    } else {
      startLabel.textContent = "START";
      if (startSub) startSub.textContent = "Easy pace · a few minutes";
    }
  }

  if (heroLabel && day.n === state.currentDay) {
    heroLabel.textContent =
      day.status !== "done" && done > 0 ? "Continue session" : "Start session";
  }
}

function openDay(n) {
  renderDayView(n, { push: true });
}

function renderDayView(n, { push } = { push: true }) {
  const day = state.days.find((d) => d.n === n);
  if (!day || !isDayAccessible(day)) return;
  state.openDayN = n;

  const items = daySessionItems(day);
  state.sessionItems = items;
  state.sessionIds = dayRoadmap(day) ? items.map((_, i) => `rm-${i}`) : [...day.ids];

  $("#day-title").textContent = `Day ${n}`;
  const meta = trackMeta();
  const dayDiff = $("#day-diff");
  if (dayDiff) dayDiff.innerHTML = difficultyHtml();
  const dayArt = $("#day-art");
  if (dayArt) dayArt.textContent = meta.art;
  $("#stat-ex").textContent = String(items.length);
  const secs = items.reduce((sum, ex) => sum + (ex.duration || (ex.reps || 0) * 3 || 30), 0);
  const mins = Math.max(1, Math.round(secs / 60));
  $("#stat-time").textContent = `${mins} min`;
  const focusVal = $("#stat-focus-val");
  if (focusVal) focusVal.textContent = focusLabelForTrack();

  const done = dayDoneCount(day);
  const progressEl = $("#ex-progress");
  if (progressEl) progressEl.textContent = `${done}/${items.length}`;
  const bar = $("#day-bar");
  if (bar) bar.style.width = `${items.length ? Math.round((done / items.length) * 100) : 0}%`;
  updateStartCta(day);

  const list = $("#exercise-list");
  stopCoachPlayers(list);
  list.innerHTML = "";
  items.forEach((ex, idx) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "ex-row";
    const dosage = ex.dosage || formatMetric(ex);
    const complete = idx < done;
    if (complete) row.classList.add("is-done");
    row.innerHTML = `
      ${clipArtBoy(ex)}
      <span class="ex-copy">
        <strong>${ex.displayName || ex.name}</strong>
        <small>${dosage}</small>
      </span>
      ${complete ? `<span class="ex-check" aria-label="Done">✓</span>` : ""}`;
    row.addEventListener("click", () => {
      openModal(idx, state.sessionIds);
    });
    list.appendChild(row);
    const coachEl = row.querySelector(".coach-player");
    if (coachEl) startCoachPlayer(coachEl, ex);
  });
  if (push) navigate("day");
  else showView("day");
}

function startSession() {
  if (!state.sessionItems.length && !state.sessionIds.length) return;
  if (!state.sessionItems.length && state.sessionIds.length) {
    state.sessionItems = state.sessionIds.map((id) => exercises[id]).filter(Boolean);
  }
  const day = state.days.find((d) => d.n === state.openDayN);
  state.sessionIndex = day ? dayResumeIndex(day) : 0;
  navigate("player");
  beginCountdown();
}

function clearPlayerTimer() {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
}

function renderSegBar() {
  const bar = $("#seg-bar");
  bar.innerHTML = "";
  const count = state.sessionItems.length || state.sessionIds.length;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("i");
    if (i <= state.sessionIndex) s.classList.add("on");
    bar.appendChild(s);
  }
}

function currentEx() {
  if (state.sessionItems[state.sessionIndex]) return state.sessionItems[state.sessionIndex];
  return exercises[state.sessionIds[state.sessionIndex]];
}

function beginCountdown() {
  clearPlayerTimer();
  clearVoiceCoach();
  state.phase = "countdown";
  state.paused = false;
  const ex = currentEx();
  renderSegBar();
  startCoachPlayer($("#player-coach"), ex);
  $("#ready-name").textContent = ex.name;
  $("#active-name").textContent = ex.name;
  const readyHint = $("#player-ready")?.querySelector(".player-hint");
  if (readyHint) {
    readyHint.textContent = isVoiceGrainSession()
      ? "Watch and listen · follow the coached demo"
      : "Match the coach · breathe easy";
  }
  startVoiceExerciseCoach(ex);
  $("#player-ready").hidden = false;
  $("#player-active").hidden = true;
  const cd = $("#countdown");
  cd.hidden = false;
  cd.classList.toggle("no-pop", isVoiceGrainSession());
  startMusic();
  setMusicDuck(isVoiceItem(ex) && voiceGrainSlugForExercise(ex) ? 0.3 : 1);
  let n = 3;
  cd.textContent = n;
  playSfx("tick");
  state.timer = setInterval(() => {
    n -= 1;
    if (n > 0) playSfx("tick");
    if (n <= 0) {
      clearPlayerTimer();
      beginActive();
      return;
    }
    cd.textContent = n;
    if (!isVoiceGrainSession()) {
      cd.style.animation = "none";
      void cd.offsetWidth;
      cd.style.animation = "";
    }
  }, 1000);
}

function beginActive() {
  clearPlayerTimer();
  const ex = currentEx();
  state.phase = "active";
  state.total = ex.duration || (ex.reps || 10) * 3;
  state.remaining = state.total;
  state.paused = false;
  $("#countdown").hidden = true;
  $("#player-ready").hidden = true;
  $("#player-active").hidden = false;
  $("#timer").textContent = formatTime(state.remaining);
  $("#pause-icon").textContent = "⏸";
  updatePauseProgress();
  playSfx("go");
  beginVoiceExerciseCoach(ex);
  state.timer = setInterval(tickActive, 1000);
}

function tickActive() {
  if (state.paused) return;
  state.remaining -= 1;
  $("#timer").textContent = formatTime(Math.max(0, state.remaining));
  updatePauseProgress();
  tickVoiceExerciseCoach();
  if (state.remaining <= 0) {
    clearPlayerTimer();
    nextExercise();
  }
}

function updatePauseProgress() {
  const pct = state.total ? ((state.total - state.remaining) / state.total) * 100 : 0;
  $("#pause-progress").style.width = `${pct}%`;
}

function nextExercise() {
  recordCompletedExerciseTime();
  saveState();
  clearVoiceCoach();
  const len = state.sessionItems.length || state.sessionIds.length;
  const day = state.days.find((d) => d.n === state.openDayN);
  if (day && day.status !== "done") {
    day.doneCount = Math.max(day.doneCount || 0, state.sessionIndex + 1);
    day.percent = Math.round((day.doneCount / len) * 100);
    saveState();
  }
  if (state.sessionIndex >= len - 1) {
    finishDay();
    return;
  }
  playSfx("done");
  state.sessionIndex += 1;
  beginCountdown();
}

function prevExercise() {
  if (state.sessionIndex <= 0) return;
  clearVoiceCoach();
  state.sessionIndex -= 1;
  beginCountdown();
}

function finishDay() {
  clearPlayerTimer();
  clearVoiceCoach();
  stopMusic();
  playSfx("complete");
  const day = state.days.find((d) => d.n === (state.openDayN || state.currentDay));
  const alreadyDone = day?.status === "done";
  if (day) {
    day.status = "done";
    day.percent = 100;
    day.doneCount = dayItemCount(day);
  }
  if (!alreadyDone) {
    const next = state.days.find((d) => d.n === (day?.n || state.currentDay) + 1);
    if (next && !next.rest) next.status = "active";
    else if (next?.rest) {
      const after = state.days.find((d) => d.n === next.n + 1);
      if (after) after.status = "active";
    }
    markSessionDoneForToday();
    state.streak = computeCurrentStreak();
    state.currentDay = Math.min(30, (day?.n || state.currentDay) + 1);
    const sessionsDone = Math.max(0, state.currentDay - 1);
    const photoCount = loadReportProgressCount();
    const totalMinutes = sessionsDone * 9;
    const badgeCtx = badgeContext(sessionsDone, photoCount, totalMinutes);
    const newBadges = syncUnlockedBadges(badgeCtx);
    if (newBadges.length) {
      setTimeout(() => playSfx("reward"), 700);
      showToast(`Badge unlocked: ${newBadges.map((b) => `${b.emoji} ${b.title}`).join(", ")}`, 3400);
    }
  }
  refreshHome();
  renderDayList();
  saveState();
  speakCoachCue("Session complete", { forceVoiceGrain: true });
  showToast("Day complete — small wins stack.");
  state.stack = ["home"];
  showView("home");
}

/* Modal */
function openModal(index) {
  state.modalIndex = index;
  state.modalTab = "animation";
  renderModal();
  $("#modal").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  stopCoachPlayer($("#modal-coach"));
  $("#modal").hidden = true;
  document.body.style.overflow = "";
}

function modalExercise() {
  if (state.sessionItems[state.modalIndex]) return state.sessionItems[state.modalIndex];
  return exercises[state.sessionIds[state.modalIndex]];
}

function renderModal() {
  const ex = modalExercise();
  if (!ex) return;
  const total = state.sessionItems.length || state.sessionIds.length;
  $("#modal-title").textContent = ex.name;
  $("#modal-pager").textContent = `${state.modalIndex + 1}/${total}`;
  $$(".tab-pill").forEach((t) => {
    t.hidden = false;
    t.classList.toggle("active", t.dataset.mtab === state.modalTab);
  });

  const modalMedia = $("#modal-media");
  if (modalMedia) modalMedia.hidden = false;

  startCoachPlayer($("#modal-coach"), ex);
  const hint = $("#modal-media-hint");
  if (hint) {
    if ($("#modal-coach")?.classList.contains("coach-static")) {
      hint.textContent = "No demo video yet. Follow the How-to steps.";
    } else if (isVoiceGrainSession()) {
      hint.textContent = "Watch and listen — coached voice demo";
    } else if (state.modalTab === "muscle") {
      hint.textContent = ex.voice
        ? "Vocal tract focus — match the coach"
        : "Face muscle focus — match the coach";
    } else if (state.modalTab === "howto") {
      hint.textContent = "Step-by-step — go slow, stay gentle";
    } else {
      hint.textContent = "Looping coach demo — copy this person";
    }
  }

  const metricLabel = ex.dosage
    ? "DOSAGE"
    : ex.reps != null
      ? `REPEATS${ex.eachSide ? " (each side)" : ""}`
      : "DURATION";
  const metricValue = ex.dosage || (ex.reps != null ? `x${ex.reps}` : formatMetric(ex));
  const steps = ex.steps || [];
  const mistakes = ex.mistakes || [];
  const breathing = ex.breathing || [];
  const focus = ex.focus || ["Face"];

  let html = "";

  if (state.modalTab === "animation") {
    html += `
      <div class="sheet-section row-between">
        <h3 style="margin:0">${metricLabel}</h3>
        <span class="pill-soft">${metricValue}</span>
      </div>
      <div class="sheet-section"><h3>OVERVIEW</h3><p>${ex.instructions}</p></div>`;
  }

  if (state.modalTab === "howto") {
    html += `<div class="sheet-section"><h3>STEPS</h3>
      ${steps.length ? steps.map((s, i) => `<p><strong>${i + 1}.</strong> ${s}</p>`).join("") : `<p>${ex.instructions}</p>`}
    </div>`;
    html += `<div class="sheet-section"><h3>BREATHING</h3>${breathing
      .map((t) => `<div class="tip">${t}</div>`)
      .join("")}</div>`;
  }

  if (state.modalTab === "muscle") {
    html += `<div class="sheet-section"><h3>FOCUS AREA</h3><div class="chips">${focus
      .map(
        (f, i) =>
          `<span class="chip"><i style="background:${i ? "var(--blue-mid)" : "var(--indigo)"}"></i>${f}</span>`
      )
      .join("")}</div>
      <p style="margin-top:10px">Highlighted soft tissue & habits — tone and posture, not bone structure.</p>
    </div>`;
  }

  if (state.modalTab !== "howto") {
    html += `<div class="sheet-section"><h3>COMMON MISTAKES</h3>${mistakes
      .map(
        (m, i) =>
          `<div class="mistake"><span class="num">${i + 1}</span><div><strong>${m.title}</strong><p>${m.description}</p></div></div>`
      )
      .join("")}</div>`;
  }

  if (state.modalTab === "animation") {
    html += `<div class="sheet-section"><h3>QUICK STEPS</h3>
      ${steps.length ? steps.slice(0, 3).map((s, i) => `<p>${i + 1}. ${s}</p>`).join("") : `<p>${ex.instructions}</p>`}
    </div>`;
  }

  $("#modal-content").innerHTML = html;
}

/* Events */
function bind() {
  $$("[data-track]").forEach((btn) => {
    btn.addEventListener("click", () => selectTrack(btn.dataset.track));
  });

  $("#btn-google-signin")?.addEventListener("click", startGoogleSignIn);
  $("#btn-sign-out")?.addEventListener("click", signOutAccount);
  $$("[data-close-auth]").forEach((el) => {
    el.addEventListener("click", cancelPendingAuth);
  });

  $("#btn-change-track")?.addEventListener("click", () => {
    clearPlayerTimer();
    state.stack = ["landing"];
    showView("landing");
  });

  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const map = { training: "home", reports: "reports", me: "me" };
      const id = map[tab.dataset.tab];
      state.stack = [id];
      if (id === "me") renderMe();
      showView(id);
    });
  });

  $("#btn-open-plan").addEventListener("click", () => {
    renderDayList();
    navigate("plan");
  });

  const startToday = $("#btn-start-today");
  const openTodaySession = () => {
    const day = state.days.find((d) => d.n === state.currentDay);
    if (day && isDayAccessible(day)) openDay(day.n);
    else {
      renderDayList();
      navigate("plan");
    }
  };
  startToday?.addEventListener("click", openTodaySession);
  startToday?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openTodaySession();
    }
  });

  $("#btn-hero-photo")?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openHeroPhotoPicker();
  });

  $("#hero-photo-input")?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) handleHeroPhotoSelected(file);
  });

  $$("[data-back]").forEach((b) => b.addEventListener("click", goBack));

  $("#btn-start-session").addEventListener("click", startSession);
  $("#btn-replay-tour")?.addEventListener("click", replayTour);
  $("#btn-adjust")?.addEventListener("click", () => {
    openSettingsTab();
    showToast("Coach voice and reminders live in Me → Preferences.");
  });
  $("#btn-day-more")?.addEventListener("click", () => {
    showToast("More options coming soon.");
  });
  $("#btn-player-settings")?.addEventListener("click", openSettingsTab);
  $("#btn-player-mirror")?.addEventListener("click", () => {
    state.settings.mirror = !state.settings.mirror;
    applySettingsUi();
    saveState();
    showToast(state.settings.mirror ? "Mirror mode on" : "Mirror mode off");
  });

  [
    ["set-music", "music", "Background music"],
    ["set-sfx", "sfx", "Sound effects"],
  ].forEach(([id, key, label]) => {
    $("#" + id)?.addEventListener("change", (e) => {
      state.settings[key] = e.target.checked;
      saveState();
      if (key === "sfx" && e.target.checked) playSfx("done");
      showToast(`${label} ${e.target.checked ? "on" : "off"}`);
    });
  });

  ["set-coach-voice", "set-reminders"].forEach((id) => {
    $("#" + id)?.addEventListener("change", (e) => {
      const key = id === "set-coach-voice" ? "coachVoice" : "reminders";
      state.settings[key] = e.target.checked;
      saveState();
      if (key === "coachVoice") {
        if (e.target.checked) speakCoachCue("Coach voice on");
        else window.speechSynthesis?.cancel();
        showToast(state.settings.coachVoice ? "Coach voice cues on" : "Coach voice cues off");
      } else if (key === "reminders") {
        syncNativeReminder({ askPermission: e.target.checked });
        if (e.target.checked) {
          showToast(
            IS_NATIVE_APP
              ? `Daily reminder set for ${formatReminderTime(state.settings.reminderTime)}`
              : "Reminders arrive through the CARVE Android app"
          );
        }
      }
    });
  });

  $("#btn-reminder-time")?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openReminderTimePicker();
  });

  bindReminderClock();

  $("#btn-edit-name")?.addEventListener("click", () => {
    const next = window.prompt("Your name", state.profileName || "Priya");
    if (next == null) return;
    const cleaned = next.trim().slice(0, 24);
    if (!cleaned) return;
    state.profileName = cleaned;
    saveState();
    renderMe();
    const el = $("#profile-name");
    if (el) el.textContent = cleaned;
  });

  $$("[data-me-track]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const track = btn.dataset.meTrack;
      if (!track || track === state.track) {
        renderMe();
        return;
      }
      state.track = track;
      resetPresenceAnalysisPanels();
      state.days = buildDays(track);
      state.currentDay = 1;
      state.streak = 0;
      state.sessionDates = {};
      state.exerciseSecondsByDate = {};
      state.unlockedBadges = {};
      state.habitChecks = {};
      state.startedAt = dateKey();
      saveState();
      refreshHome();
      renderDayList();
      renderReports();
      renderMe();
      showToast(
        track === "voice" ? "Switched to Voice Grain" : track === "both" ? "Switched to Full Presence" : "Switched to Face Form"
      );
    });
  });

  $("#btn-evidence")?.addEventListener("click", openEvidencePolicyModal);
  $$("[data-close-evidence]").forEach((el) => {
    el.addEventListener("click", closeEvidencePolicyModal);
  });

  $("#btn-help")?.addEventListener("click", openHelpFaqModal);
  $$("[data-close-help-faq]").forEach((el) => {
    el.addEventListener("click", closeHelpFaqModal);
  });

  $("#btn-feedback")?.addEventListener("click", openFeedbackModal);
  $$("[data-close-feedback]").forEach((el) => {
    el.addEventListener("click", closeFeedbackModal);
  });
  $("#feedback-form")?.addEventListener("submit", submitFeedback);

  $("#btn-delete-data")?.addEventListener("click", () => {
    openDeleteDataModal();
  });

  $$("[data-close-delete-data]").forEach((el) => {
    el.addEventListener("click", closeDeleteDataModal);
  });
  $("#btn-delete-data-confirm")?.addEventListener("click", confirmDeleteUserData);
  $("#btn-delete-data-clear")?.addEventListener("click", confirmDeleteUserData);
  $("#btn-delete-data-plus")?.addEventListener("click", () => {
    closeDeleteDataModal();
    openCarvePlusPlan();
  });

  $("#btn-export-data")?.addEventListener("click", () => {
    exportProgressPdf();
  });

  $("#btn-carve-plus")?.addEventListener("click", () => {
    openCarvePlusPlan();
  });

  $$("[data-close-carve-plus]").forEach((el) => {
    el.addEventListener("click", closeCarvePlusPlan);
  });
  $("#btn-carve-plus-subscribe")?.addEventListener("click", subscribeCarvePlus);

  const reportsRoot = $("#view-reports");
  if (reportsRoot && reportsRoot.dataset.bound !== "1") {
    reportsRoot.dataset.bound = "1";
    reportsRoot.addEventListener("click", (e) => {
      if (e.target.closest("#btn-daily-progress")) {
        openDailyProgressEntry();
        return;
      }
      if (e.target.closest(".reports-voice-play")) {
        const playSlot = e.target.closest("[data-voice-slot].has-voice");
        if (playSlot) {
          playVoiceClip(playSlot);
          return;
        }
      }
      const voiceBtn = e.target.closest("[data-voice-slot]");
      if (voiceBtn) {
        startVoiceRecorder(voiceBtn.dataset.voiceSlot);
        return;
      }
      const photoBtn = e.target.closest("[data-photo-slot]");
      if (photoBtn) {
        startProgressCamera(photoBtn.dataset.photoSlot);
        return;
      }
      if (e.target.closest("#btn-reports-add-photo")) {
        openReportsProgressPicker(
          isVoiceProgressMode() ? preferredProgressVoiceSlot() : preferredProgressPhotoSlot(),
          isVoiceProgressMode() ? "voice" : "photo"
        );
        return;
      }
      if (e.target.closest("#btn-reports-add-voice")) {
        openReportsProgressPicker(preferredProgressVoiceSlot(), "voice");
        return;
      }
      if (e.target.closest("#btn-reports-photo-capture")) {
        captureProgressPhoto();
        return;
      }
      if (e.target.closest("#btn-reports-photo-cancel")) {
        cancelProgressCamera();
        return;
      }
      if (e.target.closest("#btn-reports-voice-record")) {
        toggleVoiceRecording();
        return;
      }
      if (e.target.closest("#btn-reports-voice-cancel")) {
        cancelVoiceRecorder();
        return;
      }
      if (e.target.closest("#presence-status-face")) {
        togglePresenceAnalysisPanel("face");
        return;
      }
      if (e.target.closest("#presence-status-voice")) {
        togglePresenceAnalysisPanel("voice");
        return;
      }
      if (
        e.target.closest("#btn-face-analysis-start") ||
        e.target.closest("#btn-face-analysis-reanalyze")
      ) {
        startFaceCamera();
        return;
      }
      if (e.target.closest("#btn-face-analysis-capture")) {
        captureAndAnalyzeFace();
        return;
      }
      if (e.target.closest("#btn-face-analysis-cancel")) {
        cancelFaceCamera();
        return;
      }
      if (
        e.target.closest("#btn-voice-analysis-start") ||
        e.target.closest("#btn-voice-analysis-reanalyze")
      ) {
        startVoiceAnalysisRecorder();
        return;
      }
      if (e.target.closest("#btn-voice-analysis-record")) {
        toggleVoiceAnalysisRecording();
        return;
      }
      if (e.target.closest("#btn-voice-analysis-cancel")) {
        cancelVoiceAnalysisRecorder();
      }
    });
  }

  $("#btn-my-progress-go-analysis")?.addEventListener("click", goToAnalysisFromMyProgress);

  const myProgressRoot = $("#view-my-progress");
  if (myProgressRoot && myProgressRoot.dataset.bound !== "1") {
    myProgressRoot.dataset.bound = "1";
    myProgressRoot.addEventListener("click", (e) => {
      const analyzeBtn = e.target.closest("[data-my-progress-analyze]");
      if (analyzeBtn) {
        openAnalysisForDailyProgress(analyzeBtn.dataset.myProgressAnalyze);
        return;
      }
      const dayBtn = e.target.closest("[data-progress-day]");
      if (dayBtn) {
        if (dayBtn.disabled) return;
        const key = dayBtn.dataset.progressDay;
        if (progressDayOffset(key) > 0) {
          showToast("This day unlocks when it arrives.");
          return;
        }
        if (key !== dateKey()) {
          const entry = loadDailyProgress()[key] || {};
          if (dailyEntryComplete(entry, dailyProgressModes())) {
            showToast(`${formatProgressDayLabel(key)} — saved`);
          } else {
            showToast("Only today's analysis fills your daily log.");
          }
          return;
        }
        openAnalysisForDailyProgress("auto");
      }
    });
  }

  $("#btn-skip").addEventListener("click", () => {
    clearPlayerTimer();
    beginActive();
  });
  $("#btn-pause").addEventListener("click", () => {
    if (state.phase !== "active") return;
    state.paused = !state.paused;
    setMusicDuck(state.paused ? 0.15 : isVoiceItem(currentEx()) && voiceGrainSlugForExercise(currentEx()) ? 0.3 : 1);
    $("#pause-icon").textContent = state.paused ? "▶" : "⏸";
    const playerVideo = $("#player-coach")?.querySelector("video");
    if (playerVideo) {
      if (state.paused) playerVideo.pause();
      else playerVideo.play().catch(() => {});
    }
    if (window.speechSynthesis) {
      if (state.paused) window.speechSynthesis.pause();
      else if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    }
  });
  $("#btn-next").addEventListener("click", () => {
    clearPlayerTimer();
    nextExercise();
  });
  $("#btn-prev").addEventListener("click", () => {
    clearPlayerTimer();
    prevExercise();
  });
  $("#btn-detail-ready").addEventListener("click", () => openModal(state.sessionIndex));
  $("#btn-detail-active").addEventListener("click", () => openModal(state.sessionIndex));

  $$("[data-close-modal]").forEach((el) => el.addEventListener("click", closeModal));
  $("#modal-prev").addEventListener("click", () => {
    state.modalIndex = Math.max(0, state.modalIndex - 1);
    renderModal();
  });
  $("#modal-next").addEventListener("click", () => {
    const total = state.sessionItems.length || state.sessionIds.length;
    state.modalIndex = Math.min(total - 1, state.modalIndex + 1);
    renderModal();
  });
  $$(".tab-pill").forEach((t) =>
    t.addEventListener("click", () => {
      state.modalTab = t.dataset.mtab;
      renderModal();
    })
  );

  window.addEventListener("resize", scheduleAnalysisCardRefit);
}

function init() {
  bind();
  preloadCoachFrames();
  loadState();
  loadAuth();
  if (state.user?.name && (!state.profileName || state.profileName === "Priya")) {
    state.profileName = String(state.user.name).trim().slice(0, 24);
  }
  if (state.user?.id) applyCachedPlusForUser(state.user.id);
  applySettingsUi();
  if (IS_NATIVE_APP) {
    $("#btn-google-signin")?.removeAttribute("disabled");
    syncNativeReminder();
  } else {
    whenGoogleReady(initGoogleAuth);
  }
  state.stack = ["landing"];
  showView("landing");
  bootPayments();
}

async function bootPayments() {
  await loadDodoConfig();
  let storedSession = "";
  try {
    storedSession = sessionStorage.getItem("carve-dodo-session") || "";
  } catch (_) {
    storedSession = "";
  }
  await handleDodoReturn();
  if (isSignedIn()) {
    await syncCarvePlusFromServer({ sessionId: storedSession, toastOnActivate: true });
  }
}

init();
