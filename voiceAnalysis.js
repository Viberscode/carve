/**
 * Voice analysis utility — Web Audio API only (no camera / no MediaPipe).
 * Exposes window.CarveVoiceAnalysis
 */
(function (global) {
  "use strict";

  const STORAGE_KEY = "voiceReport";
  const HISTORY_KEY = "voiceReportHistory";
  const MAX_HISTORY = 20;

  function rms(samples) {
    let sum = 0;
    for (let i = 0; i < samples.length; i++) sum += samples[i] * samples[i];
    return Math.sqrt(sum / samples.length);
  }

  function getMonoSamples(audioBuffer) {
    const ch0 = audioBuffer.getChannelData(0);
    if (audioBuffer.numberOfChannels === 1) return ch0;
    const ch1 = audioBuffer.getChannelData(1);
    const out = new Float32Array(ch0.length);
    for (let i = 0; i < ch0.length; i++) out[i] = (ch0[i] + ch1[i]) * 0.5;
    return out;
  }

  function trimActiveRegion(samples, sampleRate, threshold = 0.018) {
    const frame = Math.max(1, Math.floor(sampleRate * 0.02));
    let start = 0;
    let end = samples.length;

    for (let i = 0; i < samples.length; i += frame) {
      const slice = samples.subarray(i, Math.min(samples.length, i + frame));
      if (rms(slice) >= threshold) {
        start = Math.max(0, i - frame);
        break;
      }
    }

    for (let i = samples.length - frame; i >= 0; i -= frame) {
      const slice = samples.subarray(i, Math.min(samples.length, i + frame));
      if (rms(slice) >= threshold) {
        end = Math.min(samples.length, i + frame * 2);
        break;
      }
    }

    if (end - start < sampleRate * 0.4) return samples;
    return samples.subarray(start, end);
  }

  function estimatePitchHz(samples, sampleRate) {
    const minHz = 70;
    const maxHz = 420;
    const minLag = Math.floor(sampleRate / maxHz);
    const maxLag = Math.floor(sampleRate / minHz);
    const windowSize = Math.min(samples.length, Math.floor(sampleRate * 0.06));
    if (windowSize < maxLag + 4) return 0;

    let bestLag = 0;
    let bestCorr = 0;
    const start = Math.floor((samples.length - windowSize) / 2);
    const window = samples.subarray(start, start + windowSize);

    for (let lag = minLag; lag <= maxLag; lag++) {
      let corr = 0;
      let norm = 0;
      for (let i = 0; i < windowSize - lag; i++) {
        corr += window[i] * window[i + lag];
        norm += window[i] * window[i];
      }
      if (!norm) continue;
      corr /= norm;
      if (corr > bestCorr) {
        bestCorr = corr;
        bestLag = lag;
      }
    }

    if (bestCorr < 0.35 || !bestLag) return 0;
    return sampleRate / bestLag;
  }

  function averagePitch(samples, sampleRate) {
    const hop = Math.floor(sampleRate * 0.05);
    const win = Math.floor(sampleRate * 0.08);
    const pitches = [];

    for (let i = 0; i + win < samples.length; i += hop) {
      const slice = samples.subarray(i, i + win);
      if (rms(slice) < 0.012) continue;
      const hz = estimatePitchHz(slice, sampleRate);
      if (hz >= 75 && hz <= 380) pitches.push(hz);
    }

    if (!pitches.length) return { hz: 0, stability: 0 };
    const mean = pitches.reduce((a, b) => a + b, 0) / pitches.length;
    const variance =
      pitches.reduce((sum, p) => sum + (p - mean) * (p - mean), 0) / pitches.length;
    const std = Math.sqrt(variance);
    const stability = Math.max(0, 1 - std / Math.max(mean * 0.18, 8));
    return { hz: mean, stability };
  }

  function magnitudeSpectrum(samples) {
    const n = 2048;
    const len = Math.min(samples.length, n);
    const re = new Float32Array(n);
    for (let i = 0; i < len; i++) re[i] = samples[i];

    const mag = new Float32Array(n / 2);
    for (let k = 1; k < n / 2; k++) {
      let sumRe = 0;
      let sumIm = 0;
      for (let t = 0; t < len; t++) {
        const angle = (2 * Math.PI * k * t) / n;
        sumRe += re[t] * Math.cos(angle);
        sumIm -= re[t] * Math.sin(angle);
      }
      mag[k] = Math.hypot(sumRe, sumIm);
    }
    return mag;
  }

  function bandEnergyRatio(mag, sampleRate, lowHz, midHz, highHz) {
    const binHz = sampleRate / (mag.length * 2);
    let low = 0;
    let mid = 0;
    let high = 0;

    for (let i = 1; i < mag.length; i++) {
      const f = i * binHz;
      const e = mag[i] * mag[i];
      if (f < lowHz) low += e;
      else if (f < midHz) mid += e;
      else if (f <= highHz) high += e;
    }

    const total = low + mid + high || 1;
    return {
      lowPct: low / total,
      midPct: mid / total,
      highPct: high / total,
    };
  }

  function calcPitchScore(hz, stability) {
    if (!hz) return 42;
    const depthTarget = 130;
    const depthScore = Math.max(0, 100 - Math.abs(hz - depthTarget) * 0.55);
    const stabilityScore = stability * 100;
    return Math.round(Math.min(100, Math.max(35, depthScore * 0.55 + stabilityScore * 0.45)));
  }

  function calcResonanceScore(bands) {
    const chest = bands.lowPct * 100;
    const warmth = bands.midPct * 100;
    const score = chest * 0.62 + warmth * 0.28 + (100 - bands.highPct * 100) * 0.1;
    return Math.round(Math.min(100, Math.max(30, score)));
  }

  function calcClarityScore(samples, sampleRate, pitchHz) {
    const level = rms(samples);
    if (level < 0.008) return 35;

    const mag = magnitudeSpectrum(samples);
    const bands = bandEnergyRatio(mag, sampleRate, 120, 280, 3200);
    const snrScore = Math.min(100, level * 900);
    const hissPenalty = Math.min(35, bands.highPct * 120);
    const harmonicBonus = pitchHz ? Math.min(18, bands.lowPct * 40) : 0;
    return Math.round(Math.min(100, Math.max(32, snrScore * 0.55 + (100 - hissPenalty) * 0.35 + harmonicBonus)));
  }

  function calcVoiceScore(pitchScore, resonanceScore, clarityScore) {
    return Math.round(pitchScore * 0.34 + resonanceScore * 0.33 + clarityScore * 0.33);
  }

  function trendLabel(delta, threshold, labels) {
    if (Math.abs(delta) < threshold) return labels.stable;
    return delta > 0 ? labels.up : labels.down;
  }

  function multiSessionTrend(history, field, threshold) {
    if (!history || history.length < 3) return null;
    const recent = history.slice(-5);
    const delta = Number(recent[recent.length - 1][field]) - Number(recent[0][field]);
    if (Math.abs(delta) < threshold) return `Steady over your last ${recent.length} sessions`;
    return delta > 0
      ? `Trending up over your last ${recent.length} sessions`
      : `Softening over your last ${recent.length} sessions`;
  }

  function buildVoiceTrendLabels(metrics, previous, history) {
    const voiceScore = Number(metrics.voiceScore);
    const resonanceScore = Number(metrics.resonanceScore);
    const clarityScore = Number(metrics.clarityScore);
    const pitchScore = Number(metrics.pitchScore);

    if (!previous) {
      return {
        overall: "Baseline saved",
        resonance: "We'll compare future clips to this",
        clarity: "Starting clarity reference",
        pitch: "Starting pitch-stability reference",
      };
    }

    const voiceDelta = voiceScore - Number(previous.voiceScore);
    const resDelta = resonanceScore - Number(previous.resonanceScore);
    const clarDelta = clarityScore - Number(previous.clarityScore);
    const pitchDelta = pitchScore - Number(previous.pitchScore);
    const multi = multiSessionTrend(history, "voiceScore", 4);

    return {
      overall:
        multi ||
        trendLabel(voiceDelta, 4, {
          up: "Stronger than your last recording",
          stable: "Holding steady since your last session",
          down: "Softer than your last recording",
        }),
      resonance: trendLabel(resDelta, 5, {
        up: "Resonance fuller than your last clip",
        stable: "Resonance more stable than your last session",
        down: "Resonance thinner than your last clip",
      }),
      clarity: trendLabel(clarDelta, 5, {
        up: "Clearer than your last recording",
        stable: "Clarity similar to your last session",
        down: "Less clear than your last recording",
      }),
      pitch: trendLabel(pitchDelta, 5, {
        up: "Pitch steadier than your last session",
        stable: "Pitch stability holding since last week",
        down: "Pitch less steady than your last session",
      }),
    };
  }

  function buildVoiceAnalysis(metrics, previous) {
    const pitchScore = Number(metrics.pitchScore);
    const resonanceScore = Number(metrics.resonanceScore);
    const clarityScore = Number(metrics.clarityScore);
    const voiceScore = Number(metrics.voiceScore);

    if (!previous) {
      return {
        headline: "First recording saved",
        paragraphs: [
          "This clip is your personal baseline — future recordings compare to your own history, not to anyone else.",
          "Re-record the same phrase weekly in a quiet room so trends reflect your training, not background noise.",
          "CARVE tracks breath support and resonance habits — never larynx size or anatomy.",
        ],
      };
    }

    const voiceDelta = voiceScore - Number(previous.voiceScore);
    const resDelta = resonanceScore - Number(previous.resonanceScore);
    const clarDelta = clarityScore - Number(previous.clarityScore);
    const pitchDelta = pitchScore - Number(previous.pitchScore);

    let headline;
    if (resDelta >= 5) headline = "Resonance fuller since your last recording";
    else if (clarDelta >= 5) headline = "Clarity improved since your last recording";
    else if (pitchDelta >= 5) headline = "Pitch steadier since your last session";
    else if (voiceDelta >= 4) headline = "Overall tone stronger since your last recording";
    else if (voiceDelta <= -4) headline = "Tone softer since your last recording — breath work may help";
    else headline = "Holding steady since your last recording";

    let pitchNote;
    if (pitchDelta >= 5) {
      pitchNote = "Pitch stability improved compared to your last clip in this spot.";
    } else if (pitchDelta <= -5) {
      pitchNote = "Pitch wavered more than your last recording — slow exhales before speaking may help.";
    } else {
      pitchNote = "Pitch stability is similar to your last recording.";
    }

    let resonanceNote;
    if (resDelta >= 5) {
      resonanceNote = "Resonance reads fuller compared to your last session.";
    } else if (resDelta <= -5) {
      resonanceNote = "Resonance reads thinner than your last clip — hum-and-hold drills may help.";
    } else {
      resonanceNote = "Resonance is holding near your last recording.";
    }

    let clarityNote;
    if (clarDelta >= 5) {
      clarityNote = "Consonants and vowels come through clearer than your last clip.";
    } else if (clarDelta <= -5) {
      clarityNote = "Detail is softer than your last recording — try a quieter room or closer mic.";
    } else {
      clarityNote = "Clarity is similar to your last recording.";
    }

    const takeaway =
      "Keep the same phrase and mic distance each week to watch your own trend line grow.";

    return {
      headline,
      paragraphs: [pitchNote, resonanceNote, clarityNote, takeaway],
    };
  }

  function buildVoiceAnalysisSummary(metrics, previous) {
    const voiceScore = Number(metrics.voiceScore);
    const resonanceScore = Number(metrics.resonanceScore);
    const clarityScore = Number(metrics.clarityScore);
    const pitchScore = Number(metrics.pitchScore);

    const hl = (text, phrase) =>
      phrase && text.includes(phrase)
        ? text.replace(phrase, `<strong class="analysis-tip-hl">${phrase}</strong>`)
        : text;

    const tips = [];

    if (!previous) {
      tips.push(hl("Save this phrase and mic distance — every future clip compares to this baseline.", "this baseline"));
      tips.push(hl("Take three slow belly breaths before you speak — fill the lower ribs first.", "three slow belly breaths"));
      tips.push(hl("Record in a quiet room with the mic about a hand-span away.", "quiet room"));
      tips.push(hl("Re-record the same phrase each week in the same spot to hear what's actually changing.", "same phrase each week"));
      return tips;
    }

    const resDelta = resonanceScore - Number(previous.resonanceScore);
    const clarDelta = clarityScore - Number(previous.clarityScore);
    const pitchDelta = pitchScore - Number(previous.pitchScore);
    const voiceDelta = voiceScore - Number(previous.voiceScore);

    const weakest =
      resDelta <= clarDelta && resDelta <= pitchDelta && resDelta <= voiceDelta
        ? "resonance"
        : clarDelta <= pitchDelta && clarDelta <= voiceDelta
          ? "clarity"
          : pitchDelta <= voiceDelta
            ? "pitch"
            : "balance";

    if (weakest === "resonance") {
      tips.push(hl("Take three slow belly breaths before you speak — fill the lower ribs first.", "three slow belly breaths"));
      tips.push(hl("Hum gently until you feel vibration in your chest, not just the throat.", "vibration in your chest"));
      tips.push(hl("Keep the jaw loose and the tongue relaxed; let resonance do the work.", "jaw loose"));
      tips.push(hl("Avoid pushing volume — a supported tone carries farther than a forced one.", "supported tone"));
    } else if (weakest === "clarity") {
      tips.push(hl("Record in a quiet room with the mic about a hand-span away.", "quiet room"));
      tips.push(hl("Sit upright, sip warm water first, and speak at a calm conversational level.", "warm water"));
      tips.push(hl("Open your mouth naturally and finish consonants without rushing.", "finish consonants"));
      tips.push(hl("Pause between phrases so each word has space to land clearly.", "Pause between phrases"));
    } else if (weakest === "pitch") {
      tips.push(hl("Practice speaking on a steady exhale — count to five on one breath, then repeat your phrase.", "steady exhale"));
      tips.push(hl("Stop if anything feels strained; depth should feel easy, never forced.", "never forced"));
      tips.push(hl("Use lip trills and hums to smooth pitch before longer speaking.", "lip trills and hums"));
    } else {
      tips.push(hl("Keep training breath support, resonance hums, and easy articulation drills.", "breath support"));
      tips.push(hl("Short daily sessions build more than occasional long recordings.", "daily sessions"));
    }

    tips.push(hl("Re-record the same phrase each week in the same spot to hear what's actually changing.", "same phrase each week"));

    return tips;
  }

  function buildWaveformPeaks(samples, count = 48) {
    const block = Math.max(1, Math.floor(samples.length / count));
    const peaks = [];
    for (let i = 0; i < count; i++) {
      const start = i * block;
      let peak = 0;
      for (let j = start; j < Math.min(samples.length, start + block); j++) {
        peak = Math.max(peak, Math.abs(samples[j]));
      }
      peaks.push(Number(peak.toFixed(4)));
    }
    return peaks;
  }

  function startLiveAudioMonitor(stream, onFrame) {
    if (!stream) throw new Error("No audio recorded");
    const AudioCtx = global.AudioContext || global.webkitAudioContext;
    if (!AudioCtx) throw new Error("Voice recording not supported in this browser.");

    const ctx = new AudioCtx();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.35;
    source.connect(analyser);

    const floatBuf = new Float32Array(analyser.fftSize);
    const byteBuf = new Uint8Array(analyser.fftSize);
    let running = true;
    let raf = 0;

    function readTimeDomain() {
      if (typeof analyser.getFloatTimeDomainData === "function") {
        analyser.getFloatTimeDomainData(floatBuf);
        return floatBuf;
      }
      analyser.getByteTimeDomainData(byteBuf);
      for (let i = 0; i < byteBuf.length; i++) floatBuf[i] = (byteBuf[i] - 128) / 128;
      return floatBuf;
    }

    function tick() {
      if (!running) return;
      const samples = readTimeDomain();
      const level = rms(samples);
      const pitchHz = level > 0.018 ? estimatePitchHz(samples, ctx.sampleRate) : 0;
      onFrame({ pitchHz, level, sampleRate: ctx.sampleRate });
      raf = requestAnimationFrame(tick);
    }

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    tick();

    return {
      async stop() {
        running = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        try {
          source.disconnect();
        } catch (_) {
          /* ignore */
        }
        try {
          analyser.disconnect();
        } catch (_) {
          /* ignore */
        }
        try {
          await ctx.close();
        } catch (_) {
          /* ignore */
        }
      },
    };
  }

  async function decodeAudioBlob(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const ctx = new (global.AudioContext || global.webkitAudioContext)();
    try {
      return await ctx.decodeAudioData(arrayBuffer.slice(0));
    } finally {
      await ctx.close();
    }
  }

  async function analyzeVoiceFromBlob(blob, previousReport) {
    if (!blob || !blob.size) throw new Error("No audio recorded");

    const audioBuffer = await decodeAudioBlob(blob);
    const sampleRate = audioBuffer.sampleRate;
    let samples = getMonoSamples(audioBuffer);
    samples = trimActiveRegion(samples, sampleRate);

    if (samples.length < sampleRate * 0.8) {
      throw new Error("Recording too short — speak for at least 3 seconds.");
    }

    const { hz: pitchHz, stability } = averagePitch(samples, sampleRate);
    const mag = magnitudeSpectrum(samples);
    const bands = bandEnergyRatio(mag, sampleRate, 120, 320, 3200);
    const pitchScore = calcPitchScore(pitchHz, stability);
    const resonanceScore = calcResonanceScore(bands);
    const clarityScore = calcClarityScore(samples, sampleRate, pitchHz);
    const voiceScore = calcVoiceScore(pitchScore, resonanceScore, clarityScore);
    const metrics = {
      pitchHz,
      pitchScore,
      resonanceScore,
      clarityScore,
      voiceScore,
    };
    const baseline = previousReport || null;
    const history = loadVoiceHistory();
    const analysis = buildVoiceAnalysis(metrics, baseline);
    const trendLabels = buildVoiceTrendLabels(metrics, baseline, history);

    return {
      pitchHz: Number(pitchHz.toFixed(1)),
      pitchScore,
      resonanceScore,
      clarityScore,
      voiceScore,
      analysisHeadline: analysis.headline,
      analysisParagraphs: analysis.paragraphs,
      analysisSummary: buildVoiceAnalysisSummary(metrics, baseline),
      trendLabels,
      waveform: buildWaveformPeaks(samples),
      durationMs: Math.round((samples.length / sampleRate) * 1000),
      analyzedAt: new Date().toISOString(),
    };
  }

  function loadVoiceHistory() {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function appendVoiceHistory(snapshot) {
    const history = loadVoiceHistory();
    const last = history[history.length - 1];
    if (last && last.analyzedAt === snapshot.analyzedAt) return;
    history.push(snapshot);
    while (history.length > MAX_HISTORY) history.shift();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }

  function previousSnapshotFor(report, history) {
    const list = history || loadVoiceHistory();
    if (!list.length) return null;
    const idx = list.findIndex((h) => h.analyzedAt === report.analyzedAt);
    if (idx > 0) return list[idx - 1];
    if (idx === -1) {
      const last = list[list.length - 1];
      if (last.analyzedAt !== report.analyzedAt) return last;
      if (list.length >= 2) return list[list.length - 2];
    }
    return null;
  }

  function loadVoiceReport() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      if (typeof parsed.voiceScore !== "number") return null;
      return parsed;
    } catch (_) {
      return null;
    }
  }

  function saveVoiceReport(report) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(report));
    appendVoiceHistory({
      analyzedAt: report.analyzedAt,
      voiceScore: report.voiceScore,
      resonanceScore: report.resonanceScore,
      clarityScore: report.clarityScore,
      pitchScore: report.pitchScore,
    });
  }

  function clearVoiceReport() {
    localStorage.removeItem(STORAGE_KEY);
  }

  global.CarveVoiceAnalysis = {
    STORAGE_KEY,
    analyzeVoiceFromBlob,
    startLiveAudioMonitor,
    buildVoiceAnalysis,
    buildVoiceAnalysisSummary,
    buildVoiceTrendLabels,
    loadVoiceHistory,
    previousSnapshotFor,
    loadVoiceReport,
    saveVoiceReport,
    clearVoiceReport,
  };
})(typeof window !== "undefined" ? window : globalThis);
