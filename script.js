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

const STORAGE_KEY = "carve-web-v1";

const defaultSettings = {
  mirror: true,
  coachVoice: true,
  music: false,
  reminders: true,
};

const state = {
  track: null,
  days: buildDays("face"),
  currentDay: 1,
  streak: 0,
  sessionDates: {},
  unlockedBadges: {},
  habitChecks: {},
  profileName: "Priya",
  memberSince: "Jul 2026",
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
  toastTimer: null,
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
        unlockedBadges: state.unlockedBadges,
        habitChecks: state.habitChecks,
        profileName: state.profileName,
        memberSince: state.memberSince,
        settings: state.settings,
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
    state.unlockedBadges =
      data.unlockedBadges && typeof data.unlockedBadges === "object" ? data.unlockedBadges : {};
    state.habitChecks = data.habitChecks && typeof data.habitChecks === "object" ? data.habitChecks : {};
    state.profileName = data.profileName || "Priya";
    state.memberSince = data.memberSince || "Jul 2026";
    state.settings = { ...defaultSettings, ...(data.settings || {}) };
    return true;
  } catch (_) {
    return false;
  }
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

function applySettingsUi() {
  const s = state.settings;
  const mirror = $("#set-mirror");
  const coach = $("#set-coach");
  const music = $("#set-music");
  const reminders = $("#set-reminders");
  if (mirror) mirror.checked = s.mirror;
  if (coach) coach.checked = s.coachVoice;
  if (music) music.checked = s.music;
  if (reminders) reminders.checked = s.reminders;
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
  if (id !== "reports") {
    stopFaceCamera();
    stopProgressCamera();
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
    state.sessionDates = {};
    state.unlockedBadges = {};
    state.habitChecks = {};
    refreshHome();
    renderDayList();
    saveState();
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

function careNotes(track) {
  if (track === "voice") {
    return [
      { icon: "💧", title: "Warm water first", body: "A few slow sips keep your throat easy after breath and hum work.", tint: "aqua" },
      { icon: "🎶", title: "Stay in easy range", body: "If it feels pressed or hoarse — stop. Presence grows gently.", tint: "lilac" },
      { icon: "🫁", title: "Reset your breath", body: "Nasal inhale. Soft long exhale. Drop the shoulders.", tint: "sky" },
    ];
  }
  if (track === "both") {
    return [
      { icon: "💧", title: "Hydrate both ways", body: "Water softens tissue recovery and keeps speaking effortless.", tint: "aqua" },
      { icon: "🪞", title: "Soft face, open throat", body: "Unclench the jaw. Keep the neck long and easy.", tint: "lilac" },
      { icon: "✦", title: "Never force it", body: "No bone claims. No larynx strain. Sharp pain = ease off.", tint: "mint" },
    ];
  }
  return [
    { icon: "💧", title: "Sip water now", body: "Hydration unlocks softer tissue after massage and holds.", tint: "aqua" },
    { icon: "😌", title: "Release the jaw", body: "Tongue to palate. Soft cheeks. Better recovery starts here.", tint: "lilac" },
    { icon: "🌙", title: "Respect the signal", body: "Relieving pressure is good. Sharp pain means stop.", tint: "mint" },
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
    emoji: "✦",
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
  const bestStreak = Math.max(computeBestStreak(), currentStreak, state.streak || 0);
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

  return labels.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const key = dateKey(d);
    const isToday = key === todayKey;
    const isFuture = d > now;
    const done = !isFuture && !isToday && dayHasHabitActivity(key);
    return { label, dayNum: d.getDate(), key, isToday, isFuture, done };
  });
}

function habitsLead(track) {
  if (track === "voice") return "Tap to check off today’s voice cues.";
  if (track === "both") return "Tap to check off face + voice cues.";
  return "Tap to check off today’s cues.";
}

function renderHomeWeek() {
  const root = $("#home-week");
  if (!root) return;
  const track = state.track || "face";
  const habits = habitCatalog(track);
  const checks = todayHabitMap();
  const doneCount = habits.filter((h) => checks[h.id]).length;
  const week = getWeekDays();
  const allHabitsDone = doneCount === habits.length && habits.length > 0;
  const weekDone = week.filter((d) => d.done).length + (allHabitsDone ? 1 : 0);

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
            const inner = d.done
              ? `<span class="week-check" aria-hidden="true">✓</span>`
              : `<span class="week-num">${d.dayNum}</span>`;
            return `<div class="${cls}" role="listitem" title="${d.label}">
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
  const track = state.track || "face";
  const habits = habitCatalog(track);
  const notes = careNotes(track);
  const checks = todayHabitMap();
  const doneCount = habits.filter((h) => checks[h.id]).length;
  const progressPct = habits.length ? (doneCount / habits.length) * 100 : 0;

  renderHomeWeek();

  root.innerHTML = `
    <div class="extras-block">
      <section class="home-panel habits-panel" aria-label="Daily habits">
        <div class="habits-shell">
          <div class="habits-head">
            <div class="habits-copy">
              <p class="habits-kicker">Wellness · today</p>
              <h2 class="panel-title">Daily habits</h2>
              <p class="panel-sub">${habitsLead(track)}</p>
            </div>
            <div class="habits-ring" style="--pct:${progressPct}" aria-label="${doneCount} of ${habits.length} complete">
              <span class="habits-ring-value">${doneCount}<small>/${habits.length}</small></span>
            </div>
          </div>
          <div class="habits-progress" aria-hidden="true">
            <div class="habits-progress-fill" style="width:${progressPct}%"></div>
          </div>
          <div class="habits-list">
            ${habits
              .map((h) => {
                const on = Boolean(checks[h.id]);
                return `<button type="button" class="habit-card tint-${h.tint}${on ? " on" : ""}" data-habit-id="${h.id}" aria-pressed="${on}">
                  <span class="habit-icon" aria-hidden="true">${h.icon}</span>
                  <span class="habit-text">
                    <strong>${h.title}</strong>
                    <span>${h.sub}</span>
                  </span>
                  <span class="habit-side">
                    <span class="habit-metric">${h.metric}</span>
                    <span class="habit-toggle" aria-hidden="true">${on ? "✓" : ""}</span>
                  </span>
                </button>`;
              })
              .join("")}
          </div>
        </div>
      </section>

      <section class="home-panel care-panel" aria-label="After you train">
        <div class="care-shell">
          <div class="care-head">
            <p class="care-kicker">Recovery · lock it in</p>
            <h2 class="panel-title">After you train</h2>
          </div>
          <div class="care-list">
            ${notes
              .map(
                (n) => `<article class="care-card tint-${n.tint}">
                <span class="care-icon" aria-hidden="true">${n.icon}</span>
                <div class="care-text">
                  <strong>${n.title}</strong>
                  <p>${n.body}</p>
                </div>
              </article>`
              )
              .join("")}
          </div>
          <div class="photo-check">
            <div class="photo-check-copy">
              <strong>Capture this week</strong>
              <p>Same angle. Same light. Progress stays on your device.</p>
            </div>
            <button type="button" class="photo-check-btn" data-photo-check>Add ›</button>
          </div>
        </div>
      </section>
    </div>`;

  bindTrackExtras();
}

function bindTrackExtras() {
  const root = $("#track-extras");
  if (!root || root.dataset.bound === "1") return;
  root.dataset.bound = "1";
  root.addEventListener("click", (e) => {
    const habitBtn = e.target.closest("[data-habit-id]");
    if (habitBtn) {
      const id = habitBtn.dataset.habitId;
      const map = todayHabitMap();
      map[id] = !map[id];
      saveState();
      renderTrackExtras();
      return;
    }
    if (e.target.closest("[data-photo-check]")) {
      state.stack = ["reports"];
      renderReports();
      showView("reports");
      $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === "reports"));
      showToast("Add weekly progress photos in Reports");
    }
  });
}

function renderProgressBox() {
  /* Home uses hero card only — day rail lives on plan screen */
}

function refreshHome() {
  const meta = trackMeta();
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
  const profileMember = $("#profile-member");
  if (profileMember) profileMember.textContent = `Member since ${state.memberSince || "Jul 2026"}`;
  renderMe();
  renderTrackExtras();
}

function renderMe() {
  const pct = Math.min(100, Math.max(0, ((state.currentDay - 1) / 30) * 100));
  const ring = $("#me-progress-ring");
  if (ring) ring.style.setProperty("--pct", String(pct));

  const streakEl = $("#me-streak-text");
  if (streakEl) {
    streakEl.textContent = `${state.streak}-day streak · Day ${state.currentDay} of 30`;
  }

  $$("[data-me-track]").forEach((btn) => {
    btn.classList.toggle("on", btn.dataset.meTrack === (state.track || "face"));
  });

  applySettingsUi();
}

function renderReports() {
  const sessionsDone = Math.max(0, state.currentDay - 1);
  const totalMinutes = sessionsDone * 9;
  const photos = loadReportPhotos();
  const photoCount = Object.keys(photos).filter((k) => photos[k]).length;

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
  if (cal) {
    cal.innerHTML = "";
    getStreakCalendarDays(14).forEach((d) => {
      const s = document.createElement("span");
      if (d.done) s.classList.add("done");
      else if (d.isToday) s.classList.add("today");
      else if (!d.isFuture) s.classList.add("missed");
      s.title = d.isToday ? "Today" : d.done ? "Session done" : d.isFuture ? "Upcoming" : "Missed";
      cal.appendChild(s);
    });
  }

  renderReportPhotos();
  const badgeCtx = badgeContext(sessionsDone, photoCount, totalMinutes);
  syncUnlockedBadges(badgeCtx);
  renderReportBadges(badgeCtx);
  renderReportWeekly(badgeCtx);
  renderFaceAnalysis();
}

const PHOTO_STORAGE_KEY = "carve-report-photos-v1";

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

function renderReportPhotos() {
  const root = $("#reports-photos");
  if (!root) return;
  const photos = loadReportPhotos();
  const slots = ["Week 1", "Week 2", "Week 3", "Week 4"];
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

function renderReportWeekly(ctx) {
  const week = getWeekTrainingDays();
  const trained = week.filter((d) => d.sessionDone).length;
  const meta = $("#reports-weekly-meta");
  if (meta) meta.textContent = `${trained} / 7 trained`;

  setText("reports-consistency", `${computeConsistencyScore()}%`);
  setText("reports-best-streak", String(ctx.bestStreak));

  const root = $("#reports-week-strip");
  if (!root) return;

  root.innerHTML = week
    .map((d) => {
      let stateClass = "future";
      if (d.sessionDone) stateClass = "done";
      else if (d.isToday) stateClass = "today";
      else if (!d.isFuture) stateClass = "missed";

      const inner = d.sessionDone
        ? `<span class="reports-week-check" aria-hidden="true">✓</span>`
        : `<span class="reports-week-dot" aria-hidden="true"></span>`;

      return `<div class="reports-week-day ${stateClass}" title="${d.label}">
        <span class="reports-week-label">${d.label}</span>
        <div class="reports-week-circle">${inner}</div>
      </div>`;
    })
    .join("");
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
    return `<div class="badge-item${unlocked ? " earned" : ""}" data-tier="${badge.tier}" title="${badge.sub}">
      <div class="badge-medal" style="--badge-pct:${progress}%">
        <span class="badge-emoji" aria-hidden="true">${badge.emoji}</span>
        ${unlocked ? '<span class="badge-check" aria-hidden="true">✓</span>' : '<span class="badge-lock" aria-hidden="true">🔒</span>'}
      </div>
      <strong class="badge-title">${badge.title}</strong>
      <span class="badge-sub">${badge.sub}</span>
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

function fillFaceAnalysisResults(report) {
  const api = window.CarveFaceAnalysis;
  const photoWrap = $("#face-analysis-photo-wrap");
  const photo = $("#face-analysis-photo");
  const headline = $("#face-analysis-headline");
  const analysis = $("#face-analysis-analysis");
  const score = $("#face-analysis-score");
  const ratio = $("#face-analysis-ratio");
  const symmetry = $("#face-analysis-symmetry");

  const writeup = report.analysisHeadline
    ? { headline: report.analysisHeadline, paragraphs: report.analysisParagraphs || [] }
    : api?.buildFaceAnalysis
      ? api.buildFaceAnalysis(report)
      : { headline: "Your face analysis", paragraphs: [] };

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
  if (analysis) {
    analysis.innerHTML = (writeup.paragraphs || [])
      .map((p) => `<p>${p}</p>`)
      .join("");
  }

  if (score) score.textContent = String(report.jawlineScore);
  if (ratio) ratio.textContent = Number(report.jawRatio).toFixed(2);
  if (symmetry) symmetry.textContent = `${Math.round(Number(report.symmetry) * 100)}%`;
}

function renderFaceAnalysis() {
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
  fillFaceAnalysisResults(report);
  setFaceAnalysisView("results");
}

async function startFaceCamera() {
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
    const report = await api.analyzeFaceFromImage(canvas);
    report.photoDataUrl = photoDataUrl;
    api.saveFaceReport(report);
    renderFaceAnalysis();
    showToast("Face analysis saved on this device");
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

function openReportsPhotoPicker(slot) {
  startProgressCamera(slot);
}

let progressCamStream = null;
let progressPhotoSlot = null;

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
  const err = $("#reports-photos-error");
  const meta = $("#reports-photos-meta");
  if (grid) grid.hidden = false;
  if (cam) cam.hidden = true;
  if (err) {
    err.hidden = true;
    err.textContent = "";
  }
  if (meta) meta.textContent = "On-device only";
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

async function startProgressCamera(slot) {
  stopFaceCamera();
  stopProgressCamera();

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
    saveState();
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
    markSessionDoneForToday();
    state.currentDay = Math.min(30, (day?.n || state.currentDay) + 1);
    const sessionsDone = Math.max(0, state.currentDay - 1);
    const photoCount = Object.keys(loadReportPhotos()).length;
    const totalMinutes = sessionsDone * 9;
    const badgeCtx = badgeContext(sessionsDone, photoCount, totalMinutes);
    const newBadges = syncUnlockedBadges(badgeCtx);
    if (newBadges.length) {
      showToast(`Badge unlocked: ${newBadges.map((b) => `${b.emoji} ${b.title}`).join(", ")}`, 3400);
    }
  }
  refreshHome();
  renderDayList();
  saveState();
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
  $$(".tab-pill").forEach((t) => t.classList.toggle("active", t.dataset.mtab === state.modalTab));

  startCoachPlayer($("#modal-coach"), ex);
  const hint = $("#modal-media-hint");
  if (hint) {
    if (state.modalTab === "muscle") {
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
      if (id === "me") renderMe();
      showView(id);
    });
  });

  $("#btn-open-plan").addEventListener("click", () => {
    renderDayList();
    navigate("plan");
  });

  $("#btn-start-today")?.addEventListener("click", () => {
    const day = state.days.find((d) => d.n === state.currentDay);
    if (day && day.status !== "locked") openDay(day.n);
    else {
      renderDayList();
      navigate("plan");
    }
  });

  $$("[data-back]").forEach((b) => b.addEventListener("click", goBack));

  $("#btn-start-session").addEventListener("click", startSession);
  $("#btn-adjust")?.addEventListener("click", () => {
    openSettingsTab();
    showToast("Music, coach, and timer live in Me → Preferences.");
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

  ["set-mirror", "set-coach", "set-music", "set-reminders"].forEach((id) => {
    $("#" + id)?.addEventListener("change", (e) => {
      const key =
        id === "set-mirror"
          ? "mirror"
          : id === "set-coach"
            ? "coachVoice"
            : id === "set-music"
              ? "music"
              : "reminders";
      state.settings[key] = e.target.checked;
      saveState();
    });
  });

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

  $("#btn-me-reports")?.addEventListener("click", () => {
    state.stack = ["reports"];
    renderReports();
    showView("reports");
    $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === "reports"));
  });

  $$("[data-me-track]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const track = btn.dataset.meTrack;
      if (!track || track === state.track) {
        renderMe();
        return;
      }
      state.track = track;
      state.days = buildDays(track);
      state.currentDay = 1;
      state.streak = 0;
      state.sessionDates = {};
      state.unlockedBadges = {};
      state.habitChecks = {};
      saveState();
      refreshHome();
      renderDayList();
      renderMe();
      showToast(
        track === "voice" ? "Switched to Voice Grain" : track === "both" ? "Switched to Full Presence" : "Switched to Face Form"
      );
    });
  });

  const meToasts = {
    "btn-carve-plus": "CARVE Plus — coming soon",
    "btn-reminder-time": "Reminder time — 7:30 PM",
    "btn-export-data": "Export stays on-device — coming soon",
    "btn-delete-data": "Delete data requires confirmation — coming soon",
    "btn-sign-out": "Signed out of this device session",
    "btn-help": "Help & FAQ — coming soon",
    "btn-feedback": "Feedback — coming soon",
    "btn-evidence": "Evidence policy — soft tissue & habits only",
  };
  Object.keys(meToasts).forEach((id) => {
    $("#" + id)?.addEventListener("click", () => showToast(meToasts[id]));
  });

  const reportsRoot = $("#view-reports");
  if (reportsRoot && reportsRoot.dataset.bound !== "1") {
    reportsRoot.dataset.bound = "1";
    reportsRoot.addEventListener("click", (e) => {
      const photoBtn = e.target.closest("[data-photo-slot]");
      if (photoBtn) {
        startProgressCamera(photoBtn.dataset.photoSlot);
        return;
      }
      if (e.target.closest("#btn-reports-add-photo")) {
        startProgressCamera(preferredProgressPhotoSlot());
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

function init() {
  bind();
  preloadCoachFrames();
  if (window.CarveFaceAnalysis?.clearFaceReport) {
    window.CarveFaceAnalysis.clearFaceReport();
  }
  loadState();
  applySettingsUi();
  state.stack = ["landing"];
  showView("landing");
}

init();
