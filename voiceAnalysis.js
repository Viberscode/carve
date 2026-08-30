/**
 * Voice analysis utility — Web Audio API on recorded clips.
 * Exposes window.CarveVoiceAnalysis
 */
(function (global) {
  "use strict";

  const STORAGE_KEY = "voiceReport";

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

  function buildVoiceAnalysis(metrics) {
    const pitchHz = Number(metrics.pitchHz) || 0;
    const pitchScore = Number(metrics.pitchScore);
    const resonanceScore = Number(metrics.resonanceScore);
    const clarityScore = Number(metrics.clarityScore);
    const voiceScore = Number(metrics.voiceScore);

    let pitchNote;
    if (!pitchHz) {
      pitchNote =
        "We couldn't lock onto a steady pitch — speak a bit louder and hold one phrase for 5–8 seconds.";
    } else if (pitchHz >= 165) {
      pitchNote = `Your average pitch landed around ${Math.round(pitchHz)} Hz — bright and forward. Breath support and chest resonance drills can add warmth without strain.`;
    } else if (pitchHz >= 130) {
      pitchNote = `Your average pitch reads near ${Math.round(pitchHz)} Hz — a balanced speaking register with room to deepen through resonance work.`;
    } else {
      pitchNote = `Your average pitch sits around ${Math.round(pitchHz)} Hz — a naturally lower register. Focus on clarity and breath so depth stays effortless.`;
    }

    let resonanceNote;
    if (resonanceScore >= 80) {
      resonanceNote = `Resonance score ${resonanceScore}% — strong chest and mid-body tone in this clip.`;
    } else if (resonanceScore >= 65) {
      resonanceNote = `Resonance score ${resonanceScore}% — solid foundation. Hum-and-hold drills can widen the sound without pushing.`;
    } else {
      resonanceNote = `Resonance score ${resonanceScore}% — the voice reads a little thin here. Slow exhales and lip trills can help fill the tone.`;
    }

    let clarityNote;
    if (clarityScore >= 80) {
      clarityNote = `Clarity ${clarityScore}% — consonants and vowels come through cleanly in this recording.`;
    } else if (clarityScore >= 65) {
      clarityNote = `Clarity ${clarityScore}% — mostly clear. Record closer to the mic in a quiet room for sharper detail.`;
    } else {
      clarityNote = `Clarity ${clarityScore}% — background noise or distance may be masking detail. Try a quieter spot and speak at a natural volume.`;
    }

    let headline;
    if (voiceScore >= 85) headline = "Strong vocal presence";
    else if (voiceScore >= 72) headline = "Balanced tone — keep building";
    else if (voiceScore >= 58) headline = "Baseline captured";
    else headline = "Room to grow";

    const takeaway =
      voiceScore >= 72
        ? "Repeat the same phrase weekly to track pitch stability, resonance, and clarity as you train."
        : "Use Voice Grain sessions for breath support and resonance, then re-record in the same quiet spot each week.";

    return {
      headline,
      paragraphs: [pitchNote, resonanceNote, clarityNote, takeaway],
    };
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

  async function decodeAudioBlob(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const ctx = new (global.AudioContext || global.webkitAudioContext)();
    try {
      return await ctx.decodeAudioData(arrayBuffer.slice(0));
    } finally {
      await ctx.close();
    }
  }

  async function analyzeVoiceFromBlob(blob) {
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
    const analysis = buildVoiceAnalysis({
      pitchHz,
      pitchScore,
      resonanceScore,
      clarityScore,
      voiceScore,
    });

    return {
      pitchHz: Number(pitchHz.toFixed(1)),
      pitchScore,
      resonanceScore,
      clarityScore,
      voiceScore,
      analysisHeadline: analysis.headline,
      analysisParagraphs: analysis.paragraphs,
      waveform: buildWaveformPeaks(samples),
      durationMs: Math.round((samples.length / sampleRate) * 1000),
      analyzedAt: new Date().toISOString(),
    };
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
  }

  function clearVoiceReport() {
    localStorage.removeItem(STORAGE_KEY);
  }

  global.CarveVoiceAnalysis = {
    STORAGE_KEY,
    analyzeVoiceFromBlob,
    buildVoiceAnalysis,
    loadVoiceReport,
    saveVoiceReport,
    clearVoiceReport,
  };
})(typeof window !== "undefined" ? window : globalThis);
