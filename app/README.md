# CARVE

Face & voice training app — mobile-first fitness-style UX for facial muscle tone, posture, habits, and vocal technique. Never claims to change bone structure.

## Stack

- Expo (SDK 57) + TypeScript + expo-router
- NativeWind (Tailwind for RN)
- Zustand + AsyncStorage
- Reanimated, Lottie, expo-av, expo-linear-gradient

## Run

```bash
npm install
npx expo start
```

## What's built (incremental order)

1. Scaffold + design tokens + 3-tab navigator (Training / Reports / Me)
2. Static UI: Home, Plan detail, Day detail, Exercise player (timer + countdown), Exercise detail modal
3. Mock plan: **Sculpted Jaw in 30 Days** (6 face + 2 voice drills)
4. Zustand persistence for day/exercise progress & settings
5. Reports + Me stubs (streak, pitch chart placeholder, preferences)

## Next (per spec)

- Onboarding → rule-based plan generation
- Front-camera mirror mode (`expo-camera`)
- Voice module: guided audio, recording, on-device pitch detection
- Lottie exercise loops + notification reminders
