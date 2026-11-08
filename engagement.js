/*
 * CARVE engagement features. Loaded before script.js, and uses its globals
 * (state, $, dateKey, showToast, hasCarvePlus...) only at call time.
 *
 * 1. Free 7-day photo challenge: one photo a day, stored only in this browser
 *    (IndexedDB), then a Day 1 vs Day 7 comparison.
 * 2. CARVE Plus: shareable story cards (streak, before/after), with card
 *    styles unlocked by streak milestones.
 * 3. Background music and sound effects, synthesised with Web Audio
 *    (no audio files, nothing to license).
 */

/* ---------- 1. 7-day photo challenge ---------- */

const PHOTO_DB_NAME = "carve-daily-photos";
const PHOTO_STORE = "photos";
const PHOTO_CYCLE_DAYS = 7;

function photoDb() {
  if (!photoDb.promise) {
    photoDb.promise = new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error("IndexedDB unavailable"));
        return;
      }
      const req = indexedDB.open(PHOTO_DB_NAME, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(PHOTO_STORE);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  return photoDb.promise;
}

async function photoStoreRequest(mode, makeRequest) {
  const db = await photoDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PHOTO_STORE, mode);
    const req = makeRequest(tx.objectStore(PHOTO_STORE));
    tx.oncomplete = () => resolve(req?.result);
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

/** Photos are keyed per signed-in user so accounts on one device stay separate. */
function photoOwner() {
  return state.user?.id || "local";
}

function photoKey(day) {
  return `${photoOwner()}:${day}`;
}

function cycleStorageKey() {
  return `carve-photo-cycle-v1:${photoOwner()}`;
}

function getPhotoCycleStart() {
  try {
    return localStorage.getItem(cycleStorageKey()) || null;
  } catch (_) {
    return null;
  }
}

function setPhotoCycleStart(day) {
  try {
    if (day) localStorage.setItem(cycleStorageKey(), day);
    else localStorage.removeItem(cycleStorageKey());
  } catch (_) {
    /* storage blocked */
  }
}

function addDaysToKey(key, n) {
  const d = new Date(`${key}T12:00:00`);
  d.setDate(d.getDate() + n);
  return dateKey(d);
}

function daysBetweenKeys(a, b) {
  return Math.round((new Date(`${b}T12:00:00`) - new Date(`${a}T12:00:00`)) / 86400000);
}

async function loadPhotoCycle() {
  const start = getPhotoCycleStart();
  const today = dateKey();
  if (!start) return { start: null, dayIndex: 0, days: [], photos: {}, count: 0, ready: false, finished: false };
  const days = Array.from({ length: PHOTO_CYCLE_DAYS }, (_, i) => addDaysToKey(start, i));
  const photos = {};
  await Promise.all(
    days.map(async (day) => {
      try {
        const url = await photoStoreRequest("readonly", (st) => st.get(photoKey(day)));
        if (url) photos[day] = url;
      } catch (_) {
        /* unreadable entry */
      }
    })
  );
  const dayIndex = daysBetweenKeys(start, today) + 1;
  const count = Object.keys(photos).length;
  const finished = dayIndex >= PHOTO_CYCLE_DAYS;
  // The comparison needs the Day 1 photo plus at least one later photo.
  const ready = finished && Boolean(photos[days[0]]) && count >= 2;
  return { start, dayIndex, days, photos, count, ready, finished, today };
}

function photoPanelVisible() {
  return state.track === "face" || state.track === "both";
}

async function renderDailyPhotoPanel() {
  const root = document.getElementById("photo-panel");
  if (!root) return;
  if (!photoPanelVisible()) {
    root.hidden = true;
    return;
  }
  root.hidden = false;
  let cycle;
  try {
    cycle = await loadPhotoCycle();
  } catch (_) {
    root.innerHTML = `<div class="momentum-shell photo-shell"><p class="momentum-lead">Photos can't be saved in this browser mode.</p></div>`;
    return;
  }
  const { start, dayIndex, days, photos, ready, finished, today } = cycle;
  const hasToday = Boolean(start && photos[today]);
  const shownDay = start ? Math.min(dayIndex, PHOTO_CYCLE_DAYS) : 1;

  let lead;
  if (!start) lead = "Snap one photo a day. On day 7, see Day 1 and Day 7 side by side.";
  else if (ready) lead = "Your 7 days are done. Compare Day 1 with your latest photo.";
  else if (finished) lead = "This round has ended without enough photos to compare. Start a fresh 7 days.";
  else if (hasToday) lead = "Today's photo is saved. Come back tomorrow, same angle and same light.";
  else lead = "Same angle, same light, every day. That's what makes the comparison honest.";

  const slots = (start ? days : Array.from({ length: PHOTO_CYCLE_DAYS }, () => null))
    .map((day, i) => {
      const url = day ? photos[day] : null;
      const isToday = day === today;
      const cls = `photo-slot${url ? " has-photo" : ""}${isToday ? " today" : ""}`;
      const inner = url ? `<img src="${url}" alt="Day ${i + 1} photo" />` : `<span>${i + 1}</span>`;
      return `<li class="${cls}">${inner}</li>`;
    })
    .join("");

  let actions = "";
  if (ready) {
    actions = `
      <button type="button" class="photo-cta primary" data-photo-action="compare">See your 7-day comparison</button>
      <button type="button" class="photo-cta" data-photo-action="restart">Start a new 7 days</button>`;
  } else if (finished) {
    actions = `<button type="button" class="photo-cta primary" data-photo-action="restart">Start a new 7 days</button>`;
  } else {
    actions = `<button type="button" class="photo-cta primary" data-photo-action="capture">${hasToday ? "Retake today's photo" : start ? "Take today's photo" : "Take your Day 1 photo"}</button>`;
  }

  root.innerHTML = `
    <div class="momentum-shell photo-shell">
      <div class="momentum-head">
        <div>
          <p class="momentum-kicker">Free · day ${shownDay} of 7</p>
          <h2 class="panel-title">7-day photo</h2>
          <p class="momentum-lead">${lead}</p>
        </div>
      </div>
      <ol class="photo-strip" aria-label="Daily photos">${slots}</ol>
      <div class="photo-actions">${actions}</div>
      <p class="photo-privacy">Photos stay on this device. They're never uploaded.</p>
    </div>`;
}

function bindDailyPhotoPanel() {
  const root = document.getElementById("photo-panel");
  if (!root || root.dataset.bound === "1") return;
  root.dataset.bound = "1";
  root.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-photo-action]");
    if (!btn) return;
    const action = btn.dataset.photoAction;
    if (action === "capture") {
      document.getElementById("daily-photo-input")?.click();
    } else if (action === "restart") {
      setPhotoCycleStart(null);
      await renderDailyPhotoPanel();
      showToast("New 7 days started. Take your Day 1 photo.");
    } else if (action === "compare") {
      openPhotoCompare();
    }
  });
  const input = document.getElementById("daily-photo-input");
  if (input && input.dataset.bound !== "1") {
    input.dataset.bound = "1";
    input.addEventListener("change", async (e) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (file) await saveDailyPhotoFile(file);
    });
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function saveDailyPhotoFile(file) {
  if (!String(file.type || "").startsWith("image/")) {
    showToast("Please choose an image file");
    return;
  }
  try {
    const raw = await readFileAsDataUrl(file);
    const compressed = await compressProfilePhoto(raw, 720);
    const today = dateKey();
    const start = getPhotoCycleStart();
    if (!start || daysBetweenKeys(start, today) >= PHOTO_CYCLE_DAYS) setPhotoCycleStart(today);
    await photoStoreRequest("readwrite", (st) => st.put(compressed, photoKey(today)));
    await renderDailyPhotoPanel();
    playSfx("done");
    showToast("Today's photo saved on this device");
  } catch (_) {
    showToast("Could not save the photo on this device");
  }
}

async function openPhotoCompare() {
  const cycle = await loadPhotoCycle();
  if (!cycle.ready) return;
  const firstDay = cycle.days[0];
  const lastIdx = cycle.days.reduce((acc, d, i) => (cycle.photos[d] ? i : acc), 0);
  const lastDay = cycle.days[lastIdx];
  const thumbs = cycle.days
    .map((d, i) => (cycle.photos[d] ? `<img src="${cycle.photos[d]}" alt="Day ${i + 1}" />` : `<span class="compare-gap">${i + 1}</span>`))
    .join("");
  openCarveSheet(`
    <p class="momentum-kicker">Your 7 days</p>
    <h2 class="carve-sheet-title">Day 1 vs Day ${lastIdx + 1}</h2>
    <div class="compare-pair">
      <figure><img src="${cycle.photos[firstDay]}" alt="Day 1 photo" /><figcaption>Day 1</figcaption></figure>
      <figure><img src="${cycle.photos[lastDay]}" alt="Day ${lastIdx + 1} photo" /><figcaption>Day ${lastIdx + 1}</figcaption></figure>
    </div>
    <div class="compare-strip">${thumbs}</div>
    <p class="photo-privacy">Lighting and angle change how a face looks. Small, steady change is normal.</p>
    <div class="photo-actions">
      <button type="button" class="photo-cta primary" data-sheet-action="share-compare">Share before / after${hasCarvePlus() ? "" : " · Plus"}</button>
      <button type="button" class="photo-cta" data-sheet-action="close">Close</button>
    </div>`);
  const sheet = document.getElementById("carve-sheet");
  sheet.querySelector('[data-sheet-action="share-compare"]').addEventListener("click", () => {
    openShareSheet("compare", { before: cycle.photos[firstDay], after: cycle.photos[lastDay], afterDay: lastIdx + 1 });
  });
}

/* Simple bottom sheet used by the comparison and share screens. */
function openCarveSheet(html) {
  let sheet = document.getElementById("carve-sheet");
  if (!sheet) {
    sheet = document.createElement("div");
    sheet.id = "carve-sheet";
    sheet.className = "carve-sheet-wrap";
    document.body.appendChild(sheet);
    sheet.addEventListener("click", (e) => {
      if (e.target === sheet || e.target.closest('[data-sheet-action="close"]')) closeCarveSheet();
    });
  }
  sheet.innerHTML = `<div class="carve-sheet" role="dialog" aria-modal="true">${html}</div>`;
  sheet.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeCarveSheet() {
  const sheet = document.getElementById("carve-sheet");
  if (sheet) sheet.hidden = true;
  document.body.style.overflow = "";
}

/* ---------- 2. CARVE Plus share cards ---------- */

const CARD_STYLES = [
  { id: "classic", name: "Classic", streak: 0, from: "#1e3fe0", to: "#05070a", accent: "#93c5fd" },
  { id: "ember", name: "Ember", streak: 3, from: "#f97316", to: "#431407", accent: "#fed7aa" },
  { id: "ocean", name: "Ocean", streak: 7, from: "#0891b2", to: "#082f49", accent: "#a5f3fc" },
  { id: "gold", name: "Gold", streak: 14, from: "#ca8a04", to: "#1c1917", accent: "#fde68a" },
  { id: "aurora", name: "Aurora", streak: 21, from: "#7c3aed", to: "#064e3b", accent: "#c4b5fd" },
  { id: "legend", name: "Legend", streak: 30, from: "#e11d48", to: "#0f0a1e", accent: "#fecdd3" },
];

function bestStreakForRewards() {
  return Math.max(computeBestStreak(), computeCurrentStreak());
}

function unlockedCardStyles() {
  const best = bestStreakForRewards();
  return CARD_STYLES.filter((s) => best >= s.streak);
}

function trackLabel() {
  if (state.track === "voice") return "Voice Grain";
  if (state.track === "both") return "Full Presence";
  return "Face Form";
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawCover(ctx, img, x, y, w, h) {
  const scale = Math.max(w / img.width, h / img.height);
  const sw = w / scale;
  const sh = h / scale;
  ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x, y, w, h);
}

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Draw a 1080x1920 story card. */
async function drawShareCard(kind, style, data = {}) {
  const W = 1080;
  const H = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, style.from);
  bg.addColorStop(1, style.to);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 96px Syne, Montserrat, sans-serif";
  ctx.fillText("CARVE", W / 2, 200);
  ctx.fillStyle = style.accent;
  ctx.font = "600 40px Outfit, sans-serif";
  ctx.fillText(trackLabel(), W / 2, 266);

  if (kind === "streak") {
    const streak = computeCurrentStreak();
    ctx.font = "320px sans-serif";
    ctx.fillText("🔥", W / 2, 840);
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 260px Montserrat, sans-serif";
    ctx.fillText(String(streak), W / 2, 1160);
    ctx.font = "700 72px Outfit, sans-serif";
    ctx.fillText(`day${streak === 1 ? "" : "s"} in a row`, W / 2, 1270);
    ctx.fillStyle = style.accent;
    ctx.font = "500 46px Outfit, sans-serif";
    const sessionsDone = Math.max(0, (state.currentDay || 1) - 1);
    ctx.fillText(sessionsDone ? `Day ${sessionsDone} of my 30-day programme` : "Building the habit", W / 2, 1360);
  } else {
    const [before, after] = await Promise.all([loadImage(data.before), loadImage(data.after)]);
    const pw = 460;
    const ph = 620;
    const top = 420;
    [[before, 60, "Day 1"], [after, W - 60 - pw, `Day ${data.afterDay || 7}`]].forEach(([img, x, label]) => {
      ctx.save();
      roundRectPath(ctx, x, top, pw, ph, 36);
      ctx.clip();
      drawCover(ctx, img, x, top, pw, ph);
      ctx.restore();
      ctx.fillStyle = "#ffffff";
      ctx.font = "700 52px Outfit, sans-serif";
      ctx.fillText(label, x + pw / 2, top + ph + 80);
    });
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 84px Montserrat, sans-serif";
    ctx.fillText("7 days of showing up", W / 2, 1300);
    ctx.fillStyle = style.accent;
    ctx.font = "500 44px Outfit, sans-serif";
    ctx.fillText("Tone, posture and habits, practised daily", W / 2, 1380);
  }

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "600 42px Outfit, sans-serif";
  ctx.fillText("carve-lime.vercel.app", W / 2, H - 140);
  return canvas;
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

async function openShareSheet(kind, data = {}) {
  if (!hasCarvePlus()) {
    closeCarveSheet();
    showToast("Share cards are part of CARVE Plus");
    openCarvePlusPlan();
    return;
  }
  const styles = unlockedCardStyles();
  let style = styles[styles.length - 1] || CARD_STYLES[0];
  const lockedStyles = CARD_STYLES.filter((s) => !styles.includes(s));
  openCarveSheet(`
    <p class="momentum-kicker">CARVE Plus · share card</p>
    <h2 class="carve-sheet-title">${kind === "streak" ? "Your streak card" : "Your before / after"}</h2>
    <div class="share-preview"><span class="share-loading">Drawing your card…</span></div>
    <div class="share-styles" role="radiogroup" aria-label="Card style">
      ${styles.map((s) => `<button type="button" class="share-style${s === style ? " active" : ""}" data-style="${s.id}" role="radio" aria-checked="${s === style}" style="--from:${s.from};--to:${s.to}">${s.name}</button>`).join("")}
      ${lockedStyles.map((s) => `<span class="share-style locked" style="--from:${s.from};--to:${s.to}" title="Unlocks at a ${s.streak}-day streak">🔒 ${s.streak}d</span>`).join("")}
    </div>
    <div class="photo-actions">
      <button type="button" class="photo-cta primary" data-sheet-action="share">Share</button>
      ${IS_NATIVE_APP ? "" : '<button type="button" class="photo-cta" data-sheet-action="save">Save image</button>'}
      <button type="button" class="photo-cta" data-sheet-action="close">Close</button>
    </div>
    ${kind === "compare" ? '<p class="photo-privacy">This card includes your photos. It is only shared if you tap Share.</p>' : ""}`);

  const sheet = document.getElementById("carve-sheet");
  let canvas = null;
  const redraw = async () => {
    const preview = sheet.querySelector(".share-preview");
    try {
      canvas = await drawShareCard(kind, style, data);
      preview.innerHTML = "";
      const img = new Image();
      img.alt = "Share card preview";
      img.src = canvas.toDataURL("image/png");
      preview.appendChild(img);
    } catch (_) {
      preview.innerHTML = '<span class="share-loading">Could not draw the card.</span>';
    }
  };
  await redraw();

  sheet.querySelectorAll("[data-style]").forEach((btn) =>
    btn.addEventListener("click", async () => {
      style = CARD_STYLES.find((s) => s.id === btn.dataset.style) || style;
      sheet.querySelectorAll("[data-style]").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-checked", String(on));
      });
      await redraw();
    })
  );

  const fileName = kind === "streak" ? "carve-streak.png" : "carve-7-days.png";
  sheet.querySelector('[data-sheet-action="share"]').addEventListener("click", async () => {
    if (!canvas) return;
    const blob = await canvasToBlob(canvas);
    if (IS_NATIVE_APP) {
      try {
        await nativeShareImage(blob, fileName, "Showing up daily with CARVE");
      } catch (_) {
        /* user cancelled */
      }
      return;
    }
    const file = new File([blob], fileName, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "CARVE", text: "Showing up daily with CARVE" });
      } catch (_) {
        /* user cancelled */
      }
    } else {
      downloadBlob(blob, fileName);
      showToast("Sharing isn't supported here, so the image was saved instead");
    }
  });
  sheet.querySelector('[data-sheet-action="save"]')?.addEventListener("click", async () => {
    if (!canvas) return;
    downloadBlob(await canvasToBlob(canvas), fileName);
  });
}

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/** One line for the Streak rewards panel about card styles. */
function streakRewardsPlusLine() {
  const unlocked = unlockedCardStyles().filter((s) => s.streak > 0);
  const next = CARD_STYLES.find((s) => s.streak > bestStreakForRewards());
  if (!hasCarvePlus()) {
    return "CARVE Plus turns every milestone into a new share-card style.";
  }
  if (!next) return `All ${CARD_STYLES.length} card styles unlocked.`;
  const have = unlocked.length ? `${unlocked.map((s) => s.name).join(", ")} unlocked. ` : "";
  return `${have}Next card style: ${next.name} at ${next.streak} days.`;
}

/* ---------- 3. Music and sound effects ---------- */

const carveAudio = { ctx: null, master: null, voices: [], timer: null, duck: 1, chord: 0 };
const MUSIC_LEVEL = 0.05;
const MUSIC_CHORDS = [
  [220.0, 277.18, 329.63],
  [196.0, 246.94, 293.66],
  [174.61, 220.0, 261.63],
  [196.0, 246.94, 329.63],
];

function audioContext() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!carveAudio.ctx) carveAudio.ctx = new AC();
  if (carveAudio.ctx.state === "suspended") carveAudio.ctx.resume().catch(() => {});
  return carveAudio.ctx;
}

const SFX = {
  tick: { wave: "sine", notes: [[880, 0, 0.07]] },
  go: { wave: "triangle", notes: [[660, 0, 0.09], [990, 0.09, 0.14]] },
  done: { wave: "triangle", notes: [[784, 0, 0.1], [1047, 0.1, 0.18]] },
  complete: { wave: "triangle", notes: [[523.25, 0, 0.16], [659.25, 0.14, 0.16], [783.99, 0.28, 0.16], [1046.5, 0.42, 0.4]] },
  reward: { wave: "sine", notes: [[1046.5, 0, 0.09], [1318.5, 0.08, 0.09], [1568, 0.16, 0.09], [2093, 0.24, 0.3]] },
};

function playSfx(kind) {
  if (state.settings?.sfx === false) return;
  const def = SFX[kind];
  const ctx = def && audioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  def.notes.forEach(([freq, at, len]) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = def.wave;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, now + at);
    gain.gain.exponentialRampToValueAtTime(0.16, now + at + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + at + len);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + at);
    osc.stop(now + at + len + 0.05);
  });
}

function playMusicChord() {
  const ctx = carveAudio.ctx;
  if (!ctx || !carveAudio.master) return;
  const now = ctx.currentTime;
  const chord = MUSIC_CHORDS[carveAudio.chord % MUSIC_CHORDS.length];
  carveAudio.chord += 1;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.connect(carveAudio.master);
  chord.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    osc.detune.value = (i - 1) * 4;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.33, now + 2.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 9.5);
    osc.connect(gain).connect(filter);
    osc.start(now);
    osc.stop(now + 10);
  });
}

function startMusic() {
  if (!state.settings?.music) return;
  const ctx = audioContext();
  if (!ctx || carveAudio.master) return;
  carveAudio.master = ctx.createGain();
  carveAudio.master.gain.setValueAtTime(0.0001, ctx.currentTime);
  carveAudio.master.gain.exponentialRampToValueAtTime(MUSIC_LEVEL * carveAudio.duck, ctx.currentTime + 2);
  carveAudio.master.connect(ctx.destination);
  playMusicChord();
  carveAudio.timer = setInterval(playMusicChord, 8000);
}

function stopMusic() {
  if (carveAudio.timer) clearInterval(carveAudio.timer);
  carveAudio.timer = null;
  const ctx = carveAudio.ctx;
  const master = carveAudio.master;
  carveAudio.master = null;
  if (!ctx || !master) return;
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.25);
  setTimeout(() => master.disconnect(), 1500);
}

/** Lower the music under narrated voice clips or while paused. 1 = normal level. */
function setMusicDuck(level) {
  carveAudio.duck = level;
  const ctx = carveAudio.ctx;
  if (ctx && carveAudio.master) {
    carveAudio.master.gain.setTargetAtTime(Math.max(0.0001, MUSIC_LEVEL * level), ctx.currentTime, 0.3);
  }
}
