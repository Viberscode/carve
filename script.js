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

const FACE_SETS = [
  ["jaw_release", "chin_tucks", "cheek_lift", "eye_brightener", "lip_seal", "neck_glide"],
  ["chin_tucks", "jaw_release", "neck_glide", "cheek_lift", "lip_seal", "eye_brightener"],
  ["cheek_lift", "eye_brightener", "chin_tucks", "jaw_release", "neck_glide", "lip_seal"],
];

const VOICE_SETS = [
  ["diaphragmatic_breath", "humming_resonance", "diaphragmatic_breath", "humming_resonance"],
  ["humming_resonance", "diaphragmatic_breath", "humming_resonance"],
  ["diaphragmatic_breath", "humming_resonance", "diaphragmatic_breath", "humming_resonance", "diaphragmatic_breath"],
];

const BOTH_SETS = [
  ["jaw_release", "chin_tucks", "cheek_lift", "eye_brightener", "lip_seal", "neck_glide", "humming_resonance"],
  ["chin_tucks", "jaw_release", "neck_glide", "cheek_lift", "lip_seal", "eye_brightener", "diaphragmatic_breath"],
  ["cheek_lift", "eye_brightener", "chin_tucks", "jaw_release", "neck_glide", "humming_resonance", "diaphragmatic_breath"],
];

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
    art: "✦",
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

function daySetsFor(track) {
  if (track === "voice") return VOICE_SETS;
  if (track === "both") return BOTH_SETS;
  return FACE_SETS;
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

function buildDays(track = "face") {
  if (track === "face" && typeof ROADMAP !== "undefined") {
    return buildDaysFromRoadmap(ROADMAP, "face");
  }
  if (track === "voice" && typeof VOICE_ROADMAP !== "undefined") {
    return buildDaysFromRoadmap(VOICE_ROADMAP, "voice");
  }
  const sets = daySetsFor(track);
  const days = [];
  for (let n = 1; n <= 30; n++) {
    days.push({
      n,
      rest: false,
      status: n === 1 ? "active" : "locked",
      ids: sets[(n - 1) % sets.length],
      roadmap: null,
      percent: 0,
      doneCount: 0,
    });
  }
  return days;
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

function videoSlugForName(name) {
  const raw = name || "";
  const n = raw.toLowerCase().replace(/_/g, " ");
  const rules = [
    ["chin tuck", "chin_tucks"],
    ["cheek puff", "cheek_puffs"],
    ["cobra", "cobra_stretch"],
    ["eyebrow", "eyebrow_lift"],
    ["jaw resist", "jaw_resistance"],
    ["neck curl", "neck_curl_ups"],
    ["fish face", "fish_face"],
    ["vowel", "vowel"],
    ["neck rotat", "neck_rotation"],
    ["straw", "straw_pull"],
    ["mewing", "mewing"],
    ["tongue posture", "mewing"],
    ["tongue stretch", "mewing_alt"],
    ["gua", "facial_gua_sha"],
    ["eye de", "eye_de_puff"],
    ["de-puff", "eye_de_puff"],
    ["depuff", "eye_de_puff"],
    ["big smile", "big_smile"],
    ["smile", "big_smile"],
    ["jaw stretch", "jaw_stretch"],
    ["jaw circle", "jaw_stretch"],
    ["silent scream", "jaw_stretch"],
    ["chew", "jaw_stretch"],
    ["thumb", "jaw_resistance"],
    ["bite", "jaw_resistance"],
    ["pucker", "straw_pull"],
    ["kiss", "straw_pull"],
    ["o-e", "vowel"],
    ["lion", "fish_face"],
    ["collarbone", "cobra_stretch"],
    ["platysma", "neck_curl_ups"],
    ["jaw release", "jaw_stretch"],
    ["cheek lift", "big_smile"],
    ["eye brightener", "eyebrow_lift"],
    ["lip seal", "mewing"],
    ["neck glide", "neck_rotation"],
    ["humming", "vowel"],
    ["diaphrag", "generic"],
    ["breath", "generic"],
    ["neck", "neck_rotation"],
    ["eye", "eyebrow_lift"],
    ["cheek", "cheek_puffs"],
    ["jaw", "jaw_stretch"],
    ["lip", "straw_pull"],
    ["tongue", "mewing"],
    ["massage", "facial_gua_sha"],
  ];
  for (const [needle, slug] of rules) {
    if (n.includes(needle)) return slug;
  }
  return "generic";
}

function videoSlugForExercise(ex) {
  if (!ex) return "generic";
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
  root.querySelectorAll(".coach-player").forEach(stopCoachPlayer);
}

function startCoachPlayer(el, ex) {
  if (!el) return;
  stopCoachPlayer(el);
  const slug = videoSlugForExercise(ex);
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
    v.src = videoUrl("generic");
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
  const set =
    typeof exOrKey === "string" ? coachSetForName(exOrKey) : coachSetForExercise(exOrKey);
  return `<span class="coach-player thumb" data-coach-set="${set}"></span>`;
}

function roadmapToSessionItem(str) {
  const { name, dosage } = parseRoadmapExercise(str);
  const seconds = estimateSecondsFromDosage(dosage);
  const isVoice = state.track === "voice";
  return {
    id: name,
    name: name.toUpperCase(),
    displayName: name,
    dosage,
    duration: seconds,
    emoji: emojiForName(name),
    anim: animClassForName(name),
    instructions: isVoice
      ? `${name}. Dosage: ${dosage}. Easy air, easy pitch — you're training breath, resonance, and habit, not larynx size.`
      : `${name}. Dosage: ${dosage}. Move with control — you're training soft tissue, posture, and habits, not bone structure.`,
    steps: isVoice
      ? [
          `Set up upright for ${name}.`,
          `Follow the dosage: ${dosage}.`,
          "Keep the throat soft; stop if anything feels pressed or hoarse.",
        ]
      : [
          `Set up comfortably for ${name}.`,
          `Follow the dosage: ${dosage}.`,
          "Keep the jaw soft; stop if anything feels sharp.",
        ],
    focus: isVoice ? ["Voice Grain", "Breath & resonance"] : ["Face Form", "Soft tissue"],
    mistakes: isVoice
      ? [
          { title: "Pushing the sound", description: "If it feels strained or hoarse, ease volume and pitch." },
          { title: "Shallow breath", description: "Let the belly move first. Shoulders stay quiet." },
        ]
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

const state = {
  track: null,
  days: buildDays("face"),
  currentDay: 1,
  streak: 0,
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
};

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

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

  const landing = $("#view-landing");
  landing.classList.add("view-leaving");

  window.setTimeout(() => {
    state.track = track;
    state.days = buildDays(track);
    state.currentDay = 1;
    state.streak = 0;
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

    window.setTimeout(() => home.classList.remove("view-entering"), 520);
  }, 400);
}

function renderProgressBox() {
  const box = $("#progress-box");
  // Same home layout for all tracks: no days progress box
  if (box) box.hidden = true;
}

function renderTrackExtras() {
  const root = $("#track-extras");
  const track = state.track || "face";

  if (track === "face") {
    root.innerHTML = `
      <div class="extras-block">
        <div class="insight-card face insight-pulse">
          <h3>Today’s focus — soft tissue & posture</h3>
        </div>
        <h2 class="section-title focus-heading">Focus zones</h2>
        <div class="focus-grid strips">
          <div class="focus-tile strip purple"><span class="emoji">💎</span><strong>Jawline Focus</strong></div>
          <div class="focus-tile strip green"><span class="emoji">✨</span><strong>Eye Brightening</strong></div>
          <div class="focus-tile strip blue"><span class="emoji">🧘</span><strong>5-Min Face Reset</strong></div>
          <div class="focus-tile strip teal"><span class="emoji">🦢</span><strong>Neckline Posture</strong></div>
        </div>

        <section class="feel-good" aria-label="Practice notes">
          <h2 class="section-title focus-heading">After you train</h2>
          <p class="feel-lead">Small wins stack. Keep it gentle — tone, posture, and habit.</p>
          <div class="feel-list">
            <article class="feel-card feel-water">
              <span class="feel-icon" aria-hidden="true">💧</span>
              <div>
                <strong class="feel-card-title">Sip water</strong>
                <p>Hydration helps soft tissue feel less tight after massage and holds.</p>
              </div>
            </article>
            <article class="feel-card feel-jaw">
              <span class="feel-icon" aria-hidden="true">😌</span>
              <div>
                <strong class="feel-card-title">Unclench the jaw</strong>
                <p>Rest the tongue on the palate. Soft face = better recovery.</p>
              </div>
            </article>
            <article class="feel-card feel-safe">
              <span class="feel-icon" aria-hidden="true">🌙</span>
              <div>
                <strong class="feel-card-title">Stop if it hurts</strong>
                <p>Pressure should feel relieving. Sharp pain means ease off.</p>
              </div>
            </article>
          </div>
        </section>
      </div>`;
    return;
  }

  if (track === "voice") {
    root.innerHTML = `
      <div class="extras-block">
        <div class="insight-card voice insight-pulse">
          <h3>Today’s focus — breath & resonance</h3>
        </div>
        <h2 class="section-title focus-heading">Focus zones</h2>
        <div class="focus-grid strips">
          <div class="focus-tile strip teal"><span class="emoji">🎙️</span><strong>Deep Voice Drills</strong></div>
          <div class="focus-tile strip purple"><span class="emoji">🎵</span><strong>Resonance Hum</strong></div>
          <div class="focus-tile strip blue"><span class="emoji">🌬️</span><strong>Diaphragm Steady</strong></div>
          <div class="focus-tile strip green"><span class="emoji">🗣️</span><strong>Confident Speaking</strong></div>
        </div>

        <section class="feel-good" aria-label="Practice notes">
          <h2 class="section-title focus-heading">After you train</h2>
          <p class="feel-lead">Protect the voice. Easy air, easy pitch — never strain.</p>
          <div class="feel-list">
            <article class="feel-card feel-water">
              <span class="feel-icon" aria-hidden="true">💧</span>
              <div>
                <strong class="feel-card-title">Sip warm water</strong>
                <p>Keeps the throat comfortable after humming and breath work.</p>
              </div>
            </article>
            <article class="feel-card feel-jaw">
              <span class="feel-icon" aria-hidden="true">🎶</span>
              <div>
                <strong class="feel-card-title">Stay in easy range</strong>
                <p>If it feels pressed or hoarse, stop. Habit change is gradual.</p>
              </div>
            </article>
            <article class="feel-card feel-safe">
              <span class="feel-icon" aria-hidden="true">🫁</span>
              <div>
                <strong class="feel-card-title">Reset the breath</strong>
                <p>One quiet nasal inhale, long soft exhale — shoulders down.</p>
              </div>
            </article>
          </div>
        </section>
      </div>`;
    return;
  }

  // Full Presence — same shell, face + voice content
  root.innerHTML = `
    <div class="extras-block">
      <div class="insight-card face insight-pulse">
        <h3>Today’s focus — look & sound together</h3>
      </div>
      <h2 class="section-title focus-heading">Focus zones</h2>
      <div class="focus-grid strips">
        <div class="focus-tile strip purple"><span class="emoji">💎</span><strong>Jawline Focus</strong></div>
        <div class="focus-tile strip teal"><span class="emoji">🎙️</span><strong>Deep Voice Drills</strong></div>
        <div class="focus-tile strip green"><span class="emoji">✨</span><strong>Eye Brightening</strong></div>
        <div class="focus-tile strip blue"><span class="emoji">🌬️</span><strong>Diaphragm Steady</strong></div>
      </div>

      <section class="feel-good" aria-label="Practice notes">
        <h2 class="section-title focus-heading">After you train</h2>
        <p class="feel-lead">Face soft. Voice easy. Presence without pressure.</p>
        <div class="feel-list">
          <article class="feel-card feel-water">
            <span class="feel-icon" aria-hidden="true">💧</span>
            <div>
              <strong class="feel-card-title">Hydrate both ways</strong>
              <p>Water supports soft tissue recovery and a comfortable speaking voice.</p>
            </div>
          </article>
          <article class="feel-card feel-jaw">
            <span class="feel-icon" aria-hidden="true">🪞</span>
            <div>
              <strong class="feel-card-title">Soft face, open throat</strong>
              <p>Unclench the jaw and keep the neck easy after face + voice work.</p>
            </div>
          </article>
          <article class="feel-card feel-safe">
            <span class="feel-icon" aria-hidden="true">✦</span>
            <div>
              <strong class="feel-card-title">Never force either</strong>
              <p>No bone claims. No larynx strain. Stop if anything feels sharp.</p>
            </div>
          </article>
        </div>
      </section>
    </div>`;
}

function refreshHome() {
  const meta = TRACKS[state.track || "face"];
  const sessionsDone = Math.max(0, state.currentDay - 1);
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
  $("#plan-bar").style.width = `${pct}%`;
  $("#days-left").textContent = String(30 - sessionsDone);
  $("#minutes-trained").textContent = `${sessionsDone * 9} min`;
  $("#volume-bar").style.width = `${pct}%`;
  $("#hero-sub").textContent = meta.subtitle;
  $("#hero-art").textContent = meta.art;
  $("#plan-title").textContent = meta.planTitle;
  $("#plan-tags").textContent = meta.tags;
  $("#plan-art").textContent = meta.art;
  $("#home-disclaimer").textContent = meta.disclaimer;
  const today = state.days.find((d) => d.n === state.currentDay);
  const heroStart = $("#hero-start-label");
  if (heroStart && today) {
    heroStart.textContent =
      today.status !== "done" && (today.doneCount || today.percent) > 0 ? "CONTINUE" : "START";
  }
  const profileMeta = document.querySelector(".profile .muted");
  if (profileMeta) profileMeta.textContent = meta.planTitle;
  renderProgressBox();
  renderTrackExtras();
}

function renderReports() {
  const cal = $("#streak-cal");
  cal.innerHTML = "";
  for (let i = 0; i < 14; i++) {
    const s = document.createElement("span");
    const isToday = i === 13;
    const completed = state.streak > 0 && i >= 13 - state.streak && i < 13;
    if (completed) s.classList.add("on");
    if (isToday) s.classList.add("today");
    cal.appendChild(s);
  }
  const chart = $("#pitch-chart");
  chart.innerHTML = "";
  if (state.streak === 0) {
    chart.classList.add("empty");
    chart.innerHTML = `<p class="muted">Complete a voice session to see your pitch trend.</p>`;
    return;
  }
  chart.classList.remove("empty");
  [148, 145, 142, 140, 138, 136, 135].forEach((hz) => {
    const i = document.createElement("i");
    const h = ((hz - 130) / 25) * 80 + 20;
    i.style.height = `${h}px`;
    i.dataset.hz = hz;
    chart.appendChild(i);
  });
}

function renderDayList() {
  const list = $("#day-list");
  list.innerHTML = "";
  state.days.forEach((d) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "day-card";
    if (d.status === "locked") btn.classList.add("locked");
    if (d.status === "active" && d.n === state.currentDay) btn.classList.add("active");

    const count = (d.roadmap || d.ids || []).length;
    let sub = `${count} Exercises`;
    if (d.status === "done") sub = "Finished";
    if (d.status === "locked") sub = "Locked";
    if (d.status === "active" && d.percent) sub = `${d.percent}% Completed`;
    const right =
      d.status === "done"
        ? `<span class="check">✓</span>`
        : d.status === "locked"
          ? `<span class="lock" aria-hidden="true">🔒</span>`
          : `<span class="cta">${d.percent ? "CONTINUE" : "START"}</span>`;

    btn.innerHTML = `<span><strong>Day ${d.n}</strong><small>${sub}</small></span>${right}`;
    if (d.status !== "locked") {
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
  if (day?.roadmap?.length) return day.roadmap.length;
  if (day?.ids?.length) return day.ids.length;
  return 0;
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
    heroLabel.textContent = day.status !== "done" && done > 0 ? "CONTINUE" : "START";
  }
}

function openDay(n) {
  renderDayView(n, { push: true });
}

function renderDayView(n, { push } = { push: true }) {
  const day = state.days.find((d) => d.n === n);
  if (!day || day.status === "locked") return;
  state.openDayN = n;

  let items = [];
  if (day.roadmap && day.roadmap.length) {
    items = day.roadmap.map(roadmapToSessionItem);
    state.sessionItems = items;
    state.sessionIds = items.map((_, i) => `rm-${i}`);
  } else {
    state.sessionItems = day.ids.map((id) => exercises[id]).filter(Boolean);
    state.sessionIds = [...day.ids];
    items = state.sessionItems;
  }

  $("#day-title").textContent = `Day ${n}`;
  $("#stat-ex").textContent = String(items.length);
  const secs = items.reduce((sum, ex) => sum + (ex.duration || (ex.reps || 0) * 3 || 30), 0);
  const mins = Math.max(1, Math.round(secs / 60));
  $("#stat-time").textContent = `${mins} min`;
  const effort = (items.length * 4.2 + mins * 2.1).toFixed(1);
  $("#stat-kcal").textContent = `${effort}`;
  const focusEl = $("#stat-focus");
  if (focusEl) {
    focusEl.textContent =
      state.track === "voice" ? "Voice" : state.track === "both" ? "Both" : "Face";
  }

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
    startCoachPlayer(row.querySelector(".coach-player"), ex);
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
  state.phase = "countdown";
  state.paused = false;
  const ex = currentEx();
  renderSegBar();
  startCoachPlayer($("#player-coach"), ex);
  $("#ready-name").textContent = ex.name;
  $("#active-name").textContent = ex.name;
  $("#player-ready").hidden = false;
  $("#player-active").hidden = true;
  const cd = $("#countdown");
  cd.hidden = false;
  let n = 3;
  cd.textContent = n;
  state.timer = setInterval(() => {
    n -= 1;
    if (n <= 0) {
      clearPlayerTimer();
      beginActive();
      return;
    }
    cd.textContent = n;
    cd.style.animation = "none";
    void cd.offsetWidth;
    cd.style.animation = "";
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
  state.timer = setInterval(tickActive, 1000);
}

function tickActive() {
  if (state.paused) return;
  state.remaining -= 1;
  $("#timer").textContent = formatTime(Math.max(0, state.remaining));
  updatePauseProgress();
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
  const len = state.sessionItems.length || state.sessionIds.length;
  const day = state.days.find((d) => d.n === state.openDayN);
  if (day && day.status !== "done") {
    day.doneCount = Math.max(day.doneCount || 0, state.sessionIndex + 1);
    day.percent = Math.round((day.doneCount / len) * 100);
  }
  if (state.sessionIndex >= len - 1) {
    finishDay();
    return;
  }
  state.sessionIndex += 1;
  beginCountdown();
}

function prevExercise() {
  if (state.sessionIndex <= 0) return;
  state.sessionIndex -= 1;
  beginCountdown();
}

function finishDay() {
  clearPlayerTimer();
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
    state.streak += 1;
    state.currentDay = Math.min(30, (day?.n || state.currentDay) + 1);
  }
  refreshHome();
  renderDayList();
  state.stack = ["home", "plan"];
  showView("plan");
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
  $$(".tab-pill").forEach((t) => t.classList.toggle("active", t.dataset.mtab === state.modalTab));

  startCoachPlayer($("#modal-coach"), ex);
  const hint = $("#modal-media-hint");
  if (hint) {
    hint.textContent =
      state.modalTab === "muscle"
        ? ex.voice
          ? "Vocal tract focus — match the coach"
          : "Face muscle focus — match the coach"
        : "Looping coach demo — copy this person";
  }

  const metricLabel = ex.dosage ? "DOSAGE" : ex.reps != null ? `REPEATS${ex.eachSide ? " (each side)" : ""}` : "DURATION";
  const metricValue = ex.dosage || (ex.reps != null ? `x${ex.reps}` : formatMetric(ex));
  const steps = ex.steps || [];
  const mistakes = ex.mistakes || [];
  const breathing = ex.breathing || [];
  const focus = ex.focus || ["Face"];

  let html = "";
  if (state.modalTab !== "muscle") {
    html += `
      <div class="sheet-section row-between">
        <h3 style="margin:0">${metricLabel}</h3>
        <div class="stepper"><button type="button" data-step="-">−</button><span>${metricValue}</span><button type="button" data-step="+">+</button></div>
      </div>
      <div class="sheet-section"><h3>INSTRUCTIONS</h3><p>${ex.instructions}</p>
        ${steps.map((s, i) => `<p>${i + 1}. ${s}</p>`).join("")}
      </div>`;
  }
  html += `<div class="sheet-section"><h3>FOCUS AREA</h3><div class="chips">${focus
    .map((f, i) => `<span class="chip"><i style="background:${i ? "var(--blue-mid)" : "var(--indigo)"}"></i>${f}</span>`)
    .join("")}</div>
    ${state.modalTab === "muscle" ? `<p style="margin-top:10px">Highlighted soft tissue & habits — tone and posture, not bone structure.</p>` : ""}
  </div>`;
  html += `<div class="sheet-section"><h3>COMMON MISTAKES</h3>${mistakes
    .map(
      (m, i) =>
        `<div class="mistake"><span class="num">${i + 1}</span><div><strong>${m.title}</strong><p>${m.description}</p></div></div>`
    )
    .join("")}</div>`;
  html += `<div class="sheet-section"><h3>BREATHING TIPS</h3>${breathing.map((t) => `<div class="tip">${t}</div>`).join("")}</div>`;
  $("#modal-content").innerHTML = html;
}

/* Events */
function bind() {
  $$("[data-track]").forEach((btn) => {
    btn.addEventListener("click", () => selectTrack(btn.dataset.track));
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
      if (id === "reports") renderReports();
      showView(id);
    });
  });

  $("#btn-open-plan").addEventListener("click", () => {
    renderDayList();
    navigate("plan");
  });

  $("#btn-start-today")?.addEventListener("click", (e) => {
    e.stopPropagation();
    const day = state.days.find((d) => d.n === state.currentDay);
    if (day && day.status !== "locked") openDay(day.n);
    else {
      renderDayList();
      navigate("plan");
    }
  });

  $("#btn-see-all-days")?.addEventListener("click", () => {
    renderDayList();
    navigate("plan");
  });

  $$("[data-back]").forEach((b) => b.addEventListener("click", goBack));

  $("#btn-start-session").addEventListener("click", startSession);
  $("#btn-adjust")?.addEventListener("click", () => {
    /* placeholder — adjust flow later */
  });
  $("#btn-skip").addEventListener("click", () => {
    clearPlayerTimer();
    beginActive();
  });
  $("#btn-pause").addEventListener("click", () => {
    if (state.phase !== "active") return;
    state.paused = !state.paused;
    $("#pause-icon").textContent = state.paused ? "▶" : "⏸";
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
}

bind();
preloadCoachFrames();
showView("landing");
