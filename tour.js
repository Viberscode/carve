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
  // Re-measure on anything that moves the target: rotation, browser toolbars
  // showing or hiding, keyboard, or the user scrolling under the overlay.
  let frame = 0;
  tourState.onResize = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => positionTourStep());
  };
  document.addEventListener("keydown", tourState.onKey);
  window.addEventListener("resize", tourState.onResize);
  window.addEventListener("scroll", tourState.onResize, true);
  window.visualViewport?.addEventListener("resize", tourState.onResize);
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
  await waitForStillTarget(target);
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
  // Short screens (small phones, landscape): if the card had to sit on top of the
  // highlight, scroll the target to the top so the card fits underneath it.
  if (tourCardCoversSpot(el)) {
    target.scrollIntoView({ block: "start", behavior: "auto" });
    await waitForStillTarget(target, 400);
    if (tourState.el !== el) return;
    positionTourStep();
  }
  el.classList.add("is-shown");
  el.querySelector(".tour-next").focus({ preventScroll: true });
}

/** Smooth scrolling takes longer on slow phones: wait until the target stops moving. */
function waitForStillTarget(target, maxMs = 1200) {
  return new Promise((resolve) => {
    let last = null;
    let still = 0;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    // Timer, not animation frames: frames pause when the page isn't visible,
    // which would leave the tour stuck.
    const fallback = setTimeout(finish, maxMs);
    const tick = () => {
      if (done) return;
      const r = target.getBoundingClientRect();
      const key = `${Math.round(r.top)}:${Math.round(r.left)}:${Math.round(r.height)}`;
      still = key === last ? still + 1 : 0;
      last = key;
      if (still >= 4) {
        clearTimeout(fallback);
        finish();
      } else setTimeout(tick, 32);
    };
    setTimeout(tick, 32);
  });
}

function tourCardCoversSpot(el) {
  const spot = el.querySelector(".tour-spot");
  const card = el.querySelector(".tour-card");
  const spotTop = parseFloat(spot.style.top);
  const spotBottom = spotTop + parseFloat(spot.style.height);
  const cardTop = parseFloat(card.style.top);
  const cardBottom = cardTop + card.offsetHeight;
  return cardBottom > spotTop + 1 && cardTop < spotBottom - 1;
}

/** The visible screen area, minus notches, status bar and gesture bar. */
function tourSafeArea(el) {
  const cs = getComputedStyle(el);
  const vv = window.visualViewport;
  const width = vv ? vv.width : window.innerWidth;
  const height = vv ? vv.height : window.innerHeight;
  return {
    top: parseFloat(cs.paddingTop) || 0,
    left: parseFloat(cs.paddingLeft) || 0,
    right: width - (parseFloat(cs.paddingRight) || 0),
    bottom: height - (parseFloat(cs.paddingBottom) || 0),
  };
}

function positionTourStep() {
  const el = tourState.el;
  const step = tourState.steps[tourState.index];
  const target = step && visibleTarget(step.sel);
  if (!el || !target) return;
  const area = tourSafeArea(el);
  const edge = 4; // keep the spotlight ring off the screen edges
  const gap = 12; // space between spotlight and card
  const r = target.getBoundingClientRect();
  // Less padding on narrow phones so the ring doesn't run past the screen edge.
  const pad = Math.max(4, Math.min(8, r.left - area.left - edge, area.right - r.right - edge));

  const top = Math.max(area.top + edge, r.top - pad);
  const left = Math.max(area.left + edge, r.left - pad);
  const right = Math.min(area.right - edge, r.right + pad);
  const bottom = Math.min(area.bottom - edge, r.bottom + pad);
  const radius = Math.min(28, (parseFloat(getComputedStyle(target).borderTopLeftRadius) || 12) + pad);

  const spot = el.querySelector(".tour-spot");
  spot.style.top = `${top}px`;
  spot.style.left = `${left}px`;
  spot.style.width = `${Math.max(0, right - left)}px`;
  spot.style.height = `${Math.max(0, bottom - top)}px`;
  spot.style.borderRadius = `${radius}px`;

  // Place the card where it fits: below, else above, else over the bottom of a tall target.
  const card = el.querySelector(".tour-card");
  card.style.maxHeight = `${Math.max(160, area.bottom - area.top - 24)}px`;
  const ch = card.offsetHeight;
  const spaceBelow = area.bottom - bottom - gap - 12;
  const spaceAbove = top - area.top - gap - 12;
  let cardTop;
  if (ch <= spaceBelow) cardTop = bottom + gap;
  else if (ch <= spaceAbove) cardTop = top - gap - ch;
  else cardTop = area.bottom - ch - 12;
  cardTop = Math.max(area.top + 12, cardTop);
  card.classList.toggle("above", cardTop < top);
  card.style.bottom = "";
  card.style.top = `${cardTop}px`;
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
  window.removeEventListener("scroll", tourState.onResize, true);
  window.visualViewport?.removeEventListener("resize", tourState.onResize);
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
