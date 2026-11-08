# CARVE Android app (Capacitor)

The app bundles the website's own files (`index.html`, the JS files, `styles.css`, `assets/`, `videos/`), so it opens and plays exercises offline. Sign-in, Plus status and scans talk to `https://carve-lime.vercel.app`.

- Package: `com.carve.app`. Same package and signing key as the earlier TWA, so it installs as an update over it.
- Version: `versionCode 2`, `versionName 1.1.0`. Raise both for every release in `android/app/build.gradle`.
- Signing key: `~/.carve-signing/carve-release.keystore`, with its passwords in `~/.carve-signing/keystore.properties`. Back this folder up. If it's lost, no update can ever be published again.

## How the app differs from the website

| Area | Website | App |
|---|---|---|
| Sign-in | Google popup, session cookie | Android account picker (Credential Manager), bearer token sent as `Authorization: Bearer` |
| Buying Plus | Dodo checkout | Not offered (Google Play billing rules); Plus bought on the web unlocks automatically |
| Share cards | Web Share API or download | Android share sheet |
| Reminders | Not available | Daily local notification at the time set in Me |

All app-only code is in `app.js`, and it only runs when `window.Capacitor` reports a native platform.

## One-time Google Cloud setup (required for sign-in in the app)

Without this, the app's "Continue with Google" fails. The website is unaffected.

1. Open Google Cloud Console and pick the project that holds the existing **Web** OAuth client: `262918655135-2842oauhjgelgjpe62ggbr4t7fqla709.apps.googleusercontent.com`.
2. Go to APIs & Services → Credentials → Create credentials → OAuth client ID → **Android**.
3. Package name: `com.carve.app`.
4. SHA-1 certificate fingerprint: `16:64:C9:01:74:F8:74:57:FD:F8:FF:C7:53:7D:9C:9B:63:F7:93:DA`
5. Save. Don't put this Android client ID anywhere in the code. The app uses the Web client ID, which is already in `auth-config.js`.
6. If the OAuth consent screen is in Testing mode, add each tester's Google account under Audience → Test users.
7. After publishing on Google Play with Play App Signing, add a **second** Android client using the SHA-1 shown in Play Console → App integrity → App signing key certificate.

Changes can take a few hours to reach Google's servers.

## Build

The Android tools are under `~/.bubblewrap/`: JDK 21, the Android SDK, and a local Gradle zip, because Gradle's own download times out from Java on this PC.

```bash
npm install
```

```bash
npm run android:sync
```

```bash
cd android && ./gradlew.bat assembleRelease bundleRelease
```

These must be set in the shell before the Gradle build:

- `JAVA_HOME=~/.bubblewrap/jdk/jdk-21...`
- `ANDROID_HOME=~/.bubblewrap/android_sdk`
- `TEMP` and `TMP`: a short path such as `~/.bubblewrap/tmp`
- `JAVA_TOOL_OPTIONS=-Djdk.net.unixdomain.tmpdir=<that path>`

Outputs:

- `android/app/build/outputs/apk/release/app-release.apk`: install directly
- `android/app/build/outputs/bundle/release/app-release.aab`: upload to Google Play

`android/gradle/wrapper/gradle-wrapper.properties` points to the local Gradle zip on this PC. On another machine, change `distributionUrl` back to `https\://services.gradle.org/distributions/gradle-8.14.3-all.zip`.

## Permissions

| Permission | Why | Asked when |
|---|---|---|
| Camera | Face scans, daily photo | First camera use |
| Microphone (`RECORD_AUDIO`) | Voice scans | First recording |
| Notifications | Daily reminder | Turning reminders on |

The Facebook SDK is excluded (`capacitor.config.json` → `SocialLogin.providers`). The app therefore has no advertising-ID permission, so it can be declared "no advertising ID" on Play. `SCHEDULE_EXACT_ALARM` is removed, so reminders may arrive a few minutes late.

## Google Play checklist

1. Create a Play Console developer account. Google charges a one-time fee.
2. Create the app with package `com.carve.app`, and upload `app-release.aab` to Internal testing.
3. Fill in Data safety:
   - Camera photos and audio are processed on the device only.
   - The Google account name and email are used for sign-in.
4. Advertising ID: declare that the app does not use it.
5. Content rating: health and fitness category; the app makes no medical claims.
6. Add the Play App Signing SHA-1 to Google Cloud, as in step 7 of the Google Cloud setup above.
