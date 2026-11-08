/*
 * First-run walkthrough. A spotlight moves between real parts of the screen
 * with a short tip card. Shown once on the landing screen, once on the
 * training home (per signed-in user), and again on demand from Me.
 * Loaded before script.js; uses its globals only at call time.
 */

const TOUR_LANDING_FLAG = "carve-tour-landing-v1";

const LANDING_TOUR = [
  {
    sel: ".track-choices",
    title: "Welcome to CARVE",
    text: "Pick a path: Face Form, Voice Grain, or Full Presence for both. You can switch later by tapping the CARVE logo.",
  },
];

const HOME_TOUR = [
  {
    sel: "#home-week",
    title: "Your week at a glance",
    text: "✓ marks a day you trained, ✕ a day you missed. Today has a ring.",
  },
  {
    sel: "#btn-start-today",
    title: "Start here every day",
    text: "Tap to open today's session. It takes a few minutes.",
  },
  {
    sel: "#photo-panel:not([hidden])",
    title: "One photo a day",
    text: "Take a quick photo daily. On day 7 you'll see Day 1 next to Day 7. Photos never leave your phone.",
  },
  {
    sel: ".focus-panel",
    title: "Today's focus",
    text: "One form tip for today's session. Read it before you start.",
  },
  {
    sel: ".rewards-panel",
    title: "Streak rewards",
    text: "Train on back-to-back days to unlock rewards. Miss a day and the streak starts again.",
  },
  {
    sel: '.tab[data-tab="reports"]',
    title: "Reports and Me",
    text: "Reports has your streak calendar and scans. Me has settings, music and reminders.",
  },
];

function homeTourFlag() {
  return `carve-tour-home-v1:${state.user?.id || "local"}`;
}

function tourSeen(flag) {
  try {
    return localStorage.getItem(flag) === "1";
  } catch (_) {
    return true; // storage blocked: don't nag every launch
  }
}

function markTourSeen(flag) {
  try {
    localStorage.setItem(flag, "1");
  } catch (_) {
    /* storage blocked */
  }
}

const tourState = { steps: [], index: 0, flag: null, el: null, onKey: null, onResize: null };

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function visibleTarget(sel) {
  const el = document.querySelector(sel);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0 ? el : null;
}

function startTour(steps, flag) {
  const available = steps.filter((s) => visibleTarget(s.sel));
  if (!available.length || tourState.el) return;
  tourState.steps = available;
  tourState.index = 0;
  tourState.flag = flag;

  const el = document.createElement("div");
  el.className = "tour";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  el.setAttribute("aria-labelledby", "tour-title");
  el.innerHTML = `
    <div class="tour-spot" aria-hidden="true"></div>
    <div class="tour-card">
      <p class="tour-count"></p>
      <h3 class="tour-title" id="tour-title"></h3>
      <p class="tour-text"></p>
      <div class="tour-foot">
        <div class="tour-dots" aria-hidden="true"></div>
        <div class="tour-actions">
          <button type="button" class="tour-skip">Skip</button>
          <button type="button" class="tour-next">Next</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(el);
  tourState.el = el;
  el.querySelector(".tour-skip").addEventListener("click", () => endTour());
  el.querySelector(".tour-next").addEventListener("click", () => nextTourStep());
  tourState.onKey = (e) => {
    if (e.key === "Escape") endTour();
  };
  tourState.onResize = () => positionTourStep();
  document.addEventListener("keydown", tourState.onKey);
  window.addEventListener("resize", tourState.onResize);
  showTourStep();
}

async function showTourStep() {
  const el = tourState.el;
  const step = tourState.steps[tourState.index];
  if (!el || !step) return;
  const target = visibleTarget(step.sel);
  if (!target) {
    nextTourStep();
    return;
  }
  el.classList.remove("is-shown");
  target.scrollIntoView({ block: "center", behavior: prefersReducedMotion() ? "auto" : "smooth" });
  await new Promise((r) => setTimeout(r, prefersReducedMotion() ? 50 : 380));
  if (tourState.el !== el) return;

  const last = tourState.index === tourState.steps.length - 1;
  el.querySelector(".tour-count").textContent = `${tourState.index + 1} of ${tourState.steps.length}`;
  el.querySelector(".tour-title").textContent = step.title;
  el.querySelector(".tour-text").textContent = step.text;
  el.querySelector(".tour-next").textContent = last ? "Got it" : "Next";
  el.querySelector(".tour-skip").hidden = last;
  el.querySelector(".tour-dots").innerHTML = tourState.steps
    .map((_, i) => `<span class="${i === tourState.index ? "on" : ""}"></span>`)
    .join("");
  positionTourStep();
  el.classList.add("is-shown");
  el.querySelector(".tour-next").focus({ preventScroll: true });
}

function positionTourStep() {
  const el = tourState.el;
  const step = tourState.steps[tourState.index];
  const target = step && visibleTarget(step.sel);
  if (!el || !target) return;
  const pad = 8;
  const r = target.getBoundingClientRect();
  const spot = el.querySelector(".tour-spot");
  spot.style.top = `${r.top - pad}px`;
  spot.style.left = `${r.left - pad}px`;
  spot.style.width = `${r.width + pad * 2}px`;
  spot.style.height = `${r.height + pad * 2}px`;

  const card = el.querySelector(".tour-card");
  const vh = window.innerHeight;
  const below = vh - r.bottom;
  card.classList.toggle("above", below < 220 && r.top > below);
  if (card.classList.contains("above")) {
    card.style.top = "";
    card.style.bottom = `${Math.max(16, vh - r.top + pad + 12)}px`;
  } else {
    card.style.bottom = "";
    card.style.top = `${Math.min(vh - 200, r.bottom + pad + 12)}px`;
  }
}

function nextTourStep() {
  if (tourState.index >= tourState.steps.length - 1) {
    endTour();
    return;
  }
  tourState.index += 1;
  showTourStep();
}

function endTour() {
  if (tourState.flag) markTourSeen(tourState.flag);
  document.removeEventListener("keydown", tourState.onKey);
  window.removeEventListener("resize", tourState.onResize);
  tourState.el?.remove();
  tourState.el = null;
  tourState.steps = [];
}

function maybeStartLandingTour() {
  if (tourSeen(TOUR_LANDING_FLAG)) return;
  if (!document.getElementById("view-landing")?.classList.contains("view-active")) return;
  startTour(LANDING_TOUR, TOUR_LANDING_FLAG);
}

function maybeStartHomeTour({ force = false } = {}) {
  if (!force && tourSeen(homeTourFlag())) return;
  if (!isSignedIn() || !document.getElementById("auth-modal")?.hidden) return;
  if (!document.getElementById("view-home")?.classList.contains("view-active")) return;
  startTour(HOME_TOUR, homeTourFlag());
}

/** From Me: go to the training home and run the home tour again. */
function replayTour() {
  state.stack = ["home"];
  showView("home");
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === "training"));
  setTimeout(() => maybeStartHomeTour({ force: true }), 500);
}
