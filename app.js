/*
 * Android app (Capacitor) support. The app bundles this same web code and runs
 * it from https://localhost, so it needs a few native paths:
 *   - API calls go to the live site and carry a bearer token (cookies from the
 *     site aren't sent to https://localhost).
 *   - Google sign-in uses the native Credential Manager, not the web popup.
 *   - Share cards use the Android share sheet.
 *   - Daily reminders are local notifications; no server is involved.
 * On the website IS_NATIVE_APP is false and these paths are never used.
 * Loaded before script.js; uses its globals only at call time.
 */

const IS_NATIVE_APP = Boolean(window.Capacitor?.isNativePlatform?.());
const API_ORIGIN = "https://carve-lime.vercel.app";
const APP_TOKEN_KEY = "carve-app-session-v1";
const REMINDER_NOTIFICATION_ID = 1001;

const nativePlugins = {};

function nativePlugin(name) {
  if (!IS_NATIVE_APP) return null;
  const register = window.Capacitor.registerPlugin || window.capacitorExports?.registerPlugin;
  if (!nativePlugins[name]) nativePlugins[name] = register(name);
  return nativePlugins[name];
}

function appSessionToken() {
  try {
    return localStorage.getItem(APP_TOKEN_KEY) || "";
  } catch (_) {
    return "";
  }
}

function setAppSessionToken(token) {
  try {
    if (token) localStorage.setItem(APP_TOKEN_KEY, token);
    else localStorage.removeItem(APP_TOKEN_KEY);
  } catch (_) {
    /* storage blocked */
  }
}

/** fetch() for CARVE's own API: right origin, plus the app's bearer token. */
function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (IS_NATIVE_APP) {
    headers.set("X-Carve-Client", "android-app");
    const token = appSessionToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(apiUrl(path), { ...options, headers });
}

let nativeGoogleReady = null;

/** Returns a Google ID token from Android's account picker. */
async function nativeGoogleIdToken() {
  const SocialLogin = nativePlugin("SocialLogin");
  if (!nativeGoogleReady) {
    // The *web* client ID: it becomes the token's audience, which the server checks.
    nativeGoogleReady = SocialLogin.initialize({ google: { webClientId: googleClientId() } });
  }
  await nativeGoogleReady;
  const res = await SocialLogin.login({ provider: "google", options: {} });
  const idToken = res?.result?.idToken;
  if (!idToken) throw new Error("Google sign-in was cancelled.");
  return idToken;
}

async function nativeGoogleSignOut() {
  try {
    await nativePlugin("SocialLogin")?.logout({ provider: "google" });
  } catch (_) {
    /* already signed out */
  }
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/** Opens Android's share sheet for an image (Instagram, WhatsApp, Save to Photos...). */
async function nativeShareImage(blob, fileName, text) {
  const Filesystem = nativePlugin("Filesystem");
  const Share = nativePlugin("Share");
  const data = await blobToBase64(blob);
  const { uri } = await Filesystem.writeFile({ path: fileName, data, directory: "CACHE" });
  await Share.share({ title: "CARVE", text, files: [uri] });
}

/**
 * Keep the daily reminder notification in step with the settings.
 * askPermission: only true when the user just turned reminders on.
 */
async function syncNativeReminder({ askPermission = false } = {}) {
  if (!IS_NATIVE_APP) return;
  const Notifications = nativePlugin("LocalNotifications");
  try {
    await Notifications.cancel({ notifications: [{ id: REMINDER_NOTIFICATION_ID }] });
    if (!state.settings.reminders) return;
    let perm = await Notifications.checkPermissions();
    if (perm.display !== "granted" && askPermission) perm = await Notifications.requestPermissions();
    if (perm.display !== "granted") {
      if (askPermission) showToast("Allow notifications for CARVE in Android settings to get reminders");
      return;
    }
    const [hour, minute] = normalizeReminderTime(state.settings.reminderTime).split(":").map(Number);
    await Notifications.schedule({
      notifications: [
        {
          id: REMINDER_NOTIFICATION_ID,
          title: "Time for today's CARVE session",
          body: "A few minutes keeps your streak going.",
          smallIcon: "ic_stat_carve",
          schedule: { on: { hour, minute }, allowWhileIdle: true },
        },
      ],
    });
  } catch (_) {
    if (askPermission) showToast("Could not set the reminder on this phone");
  }
}

/** In the app, Plus can't be bought (Google Play billing rules); it only unlocks. */
function openNativePlusInfo() {
  const active = hasCarvePlus();
  openCarveSheet(`
    <p class="momentum-kicker">CARVE Plus</p>
    <h2 class="carve-sheet-title">${active ? "CARVE Plus is active" : "CARVE Plus"}</h2>
    <p class="momentum-lead" style="max-width:none">${
      active
        ? "Share cards, card styles and unlimited scans are unlocked on this account."
        : "CARVE Plus can't be bought in the app yet. If your account already has Plus, it unlocks automatically when you're signed in."
    }</p>
    <div class="photo-actions" style="margin-top:14px">
      <button type="button" class="photo-cta primary" data-sheet-action="close">OK</button>
    </div>`);
}

if (IS_NATIVE_APP) document.documentElement.classList.add("is-native-app");
