# 🎯 CARVE — Guided Face & Voice Practice

> **Presence over pressure.**
> A daily practice platform for face-related habits, vocal practice, and consistency.

🌐 **Live Prototype:** https://carve-lime.vercel.app/

---

## 🌍 Overview

**CARVE** brings face and voice practice together in one organised experience.

Users can choose a practice path, access daily sessions, follow a 30-day programme, and track participation through weekly activity, daily habits, and achievements.

The platform encourages comfortable, consistent practice with realistic expectations.

**Choose your practice. Build your consistency.**

---

## 🔎 Problem Statement

People often discover face and voice exercises through scattered videos, tutorials, and social media posts.

However, finding exercises does not automatically create an effective routine. Users may struggle to:

- Decide where to begin.
- Choose exercises relevant to their interests.
- Follow an organised daily schedule.
- Maintain consistency over time.
- Track participation clearly.
- Understand realistic outcomes and appropriate limits.

**CARVE aims to simplify this journey through structured practice and habit tracking.**

---

## 💡 Our Solution

CARVE offers three dedicated practice paths:

| Practice Path | Focus |
|---|---|
| **Face Form** | Face-related exercises, facial habits, and posture awareness |
| **Voice Grain** | Breathing, resonance, and comfortable habitual pitch practice |
| **Full Presence** | An integrated routine combining face and voice practice |

The dashboard brings together today's session, programme progress, daily habits, weekly activity, and achievements.

---

## 👥 Intended Users

- Beginners looking for an organised practice routine.
- Students and speakers interested in comfortable vocal practice.
- Users seeking support with daily practice consistency.
- People interested in a combined face and voice programme.

CARVE is a general practice platform, not a diagnostic or treatment service.

---

## ✨ Features & Modules

### 🎯 Practice-Path Selection

Choose between **Face Form**, **Voice Grain**, and **Full Presence** according to your interests.

### 🔐 Sign-In Entry

A **Continue with Google** entry is presented before accessing practice.

### 📅 Daily Session Dashboard

View the current programme day and access today's practice from one central card.

### 🗓️ 30-Day Programme

Follow a structured practice schedule with a visible programme-progress indicator.

The 30-day timeline represents a practice plan, not a guaranteed transformation.

### 🔥 Weekly Activity & Streaks

Track practice participation through a weekly completion display and streak indicator.

### ✅ Daily Habit Checklists

Check off reminders alongside dedicated practice, including hydration, posture resets, and gentle voice-related habits.

### 🏅 Momentum & Achievements

Use progress indicators and achievements to support regular participation.

### 🧭 Simple Navigation

Access three main sections:

- **Training**
- **Reports**
- **Me**

> **Prototype note:** The interface presents these modules. Full session behaviour, report calculations, account synchronisation, and data persistence require end-to-end validation. The displayed performance preview is labelled as sample data.

---

## 🔄 User Workflow

1. **Choose a path** — Face Form, Voice Grain, or Full Presence.
2. **Continue through sign-in** — Access the practice experience.
3. **Review today's session** — Check the current programme day.
4. **Begin practice** — Follow the selected routine.
5. **Complete daily habits** — Check off relevant reminders.
6. **Review participation** — Follow weekly activity and programme progress.
7. **Return consistently** — Continue the practice schedule.

---

## ⚙️ Technical Approach

The product flow connects four functional layers:

| Layer | Responsibility |
|---|---|
| **User Interface** | Practice selection, navigation, session cards, and progress displays |
| **Identity & Preferences** | Sign-in and selected practice path |
| **Practice Management** | Programme days, session content, and completion events |
| **Progress Tracking** | Weekly activity, streaks, habit completion, and achievements |

A reliable implementation should:

- Record completion events consistently.
- Prevent duplicate completion credit.
- Define how programme days and streaks are calculated.
- Distinguish sample displays from personal results.
- Explain whether progress is stored locally or synced across devices.

---

## 🛠️ Technology & Deployment

| Component | Current Information |
|---|---|
| **Prototype Hosting** | Vercel |
| **Authentication Entry** | Continue with Google |
| **Frontend Framework** | To be documented from repository dependencies |
| **Backend & Database** | To be documented from the implementation |
| **Audio Processing / AI Libraries** | No implementation confirmed in this README |

Exact dependencies, environment variables, and setup commands should be documented from the actual source code.

---

## 🌟 What Makes CARVE Different?

### Combined Practice Experience

Face and voice routines are organised within a single platform.

### Clear Starting Point

Three focused paths help users choose a practice direction.

### Daily Structure

Today's session and the longer programme are presented together.

### Habit Support

Checklists, weekly activity, and achievements encourage participation.

### Realistic Positioning

CARVE emphasises guided practice and consistency without promising structural transformation.

These are product-design strengths. Comparative effectiveness requires user testing.

---

## 📊 Progress & Evaluation

Proposed metrics for evaluating CARVE include:

| Metric | Purpose |
|---|---|
| **Session Completion Rate** | Understand whether users finish planned practice |
| **Weekly Practice Days** | Measure participation consistency |
| **Programme Retention** | Track continued participation |
| **Habit Completion** | Record self-reported daily actions |
| **User-Reported Comfort** | Assess whether practice feels comfortable |
| **Instruction Clarity** | Evaluate whether exercises are easy to understand |
| **Validated Voice Measures** | Assess defined vocal outcomes if reliable analysis is introduced |

**Practice completion is not proof of physical or vocal improvement.**

Any outcome score needs a documented calculation and appropriate validation.

---

## 🧠 AI/ML Integration — Future Scope

Potential additions include:

- **Voice Analysis:** Measure pitch range, pauses, and speaking pace.
- **Recording Quality Checks:** Identify unsuitable audio before providing feedback.
- **Personalised Routines:** Adapt practice to goals, comfort, and participation.
- **Explainable Feedback:** Show what was measured and how feedback was generated.
- **Adaptive Reminders:** Support consistency using practice patterns.

These are planned directions, not claims of deployed AI functionality.

Voice analysis should account for recording conditions and should not treat a lower pitch as universally better.

---

## 🛡️ Responsible Practice & Privacy

- CARVE does not promise changes to facial bone structure or larynx size.
- A 30-day programme does not guarantee a particular appearance or voice outcome.
- Exercise guidance should be reviewed by appropriately qualified professionals.
- Users should avoid forcing movements or vocal pitch.
- Practice should stop if it causes pain or strain.
- Persistent jaw or voice concerns require professional assessment.
- Photo and audio collection should explain consent, storage, retention, and deletion.
- Sample metrics should remain clearly separated from personal results.

---

## 🚀 Future Roadmap

- Introduce a guest session before sign-in.
- Add expert-reviewed exercise instructions and demonstrations.
- Validate session completion, streaks, and progress across devices.
- Define report calculations clearly.
- Improve accessibility and desktop layouts.
- Introduce optional, validated voice feedback.
- Conduct user testing for usability and retention.
- Document the source architecture and developer setup.

---

## 📍 Project Status

**Live prototype available.**

The interface demonstrates CARVE's practice choices and dashboard structure.

Further validation is needed to establish the reliability of the complete practice journey and the effectiveness of its exercises.

---

## 🎬 Demonstration

Explore the live prototype:

👉 https://carve-lime.vercel.app/

The project walkthrough covers:

- Practice-path selection.
- Training dashboard.
- 30-day programme structure.
- Daily habit checklists.
- Weekly participation and achievements.
- Responsible-practice boundaries.

---

## 🎯 Our Vision

Make daily face and voice practice easier to understand, follow, and maintain through structured routines and realistic goals.

---

### CARVE

**Choose your practice. Build your consistency.**

**Presence over pressure.**
