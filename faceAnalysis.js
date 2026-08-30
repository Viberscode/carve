/**
 * Face analysis utility — MediaPipe Face Mesh (468 landmarks) on captured images.
 * Exposes window.CarveFaceAnalysis
 */
(function (global) {
  "use strict";

  const STORAGE_KEY = "faceReport";
  const FACE_MESH_CDN = "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619";

  // MediaPipe Face Mesh landmark indices
  const LM = {
    noseTip: 1,
    forehead: 10,
    leftCheek: 234,
    rightCheek: 454,
    leftJaw: 172,
    rightJaw: 397,
    chin: 152,
    upperInnerLip: 13,
    lowerInnerLip: 14,
    leftInnerMouth: 78,
    rightInnerMouth: 308,
    leftOuterMouth: 61,
    rightOuterMouth: 291,
  };

  const LIP_OUTER_INDICES = [
    61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 409, 270, 269, 267, 0, 37, 39, 40, 185,
  ];
  const LIP_INNER_INDICES = [
    78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 415, 310, 311, 312, 13, 82, 81, 80, 191,
  ];

  // Jaw contour landmarks for on-photo overlay (left → chin → right)
  const JAW_OVERLAY_INDICES = [
    234, 93, 132, 58, 172, 136, 150, 152, 377, 400, 378, 379, 365, 397, 288, 361, 323, 454,
  ];

  const SYMMETRY_PAIRS = [
    [234, 454],
    [93, 323],
    [132, 361],
    [58, 288],
    [172, 397],
    [136, 365],
    [150, 379],
    [176, 400],
    [148, 377],
    [61, 291],
  ];

  let meshInstance = null;
  let meshReady = null;
  let liveMeshActive = false;
  let liveMeshGeneration = 0;

  function dist(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = (a.z || 0) - (b.z || 0);
    return Math.hypot(dx, dy, dz);
  }

  function loadImageFromFile(file) {
    return new Promise((resolve, reject) => {
      if (!file || !String(file.type || "").startsWith("image/")) {
        reject(new Error("Image load failure"));
        return;
      }
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        if (!img.naturalWidth || !img.naturalHeight) {
          reject(new Error("Image load failure"));
          return;
        }
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Image load failure"));
      };
      img.src = url;
    });
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-carve-mp="${src}"]`);
      if (existing) {
        if (typeof global.FaceMesh !== "undefined") resolve();
        else existing.addEventListener("load", () => resolve());
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.dataset.carveMp = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("MediaPipe Face Mesh failed to load"));
      document.head.appendChild(script);
    });
  }

  async function ensureFaceMesh() {
    if (meshInstance) return meshInstance;
    if (meshReady) return meshReady;

    meshReady = (async () => {
      if (typeof global.FaceMesh === "undefined") {
        await loadScript(`${FACE_MESH_CDN}/face_mesh.js`);
      }
      if (typeof global.FaceMesh === "undefined") {
        throw new Error("MediaPipe Face Mesh failed to load");
      }

      const faceMesh = new global.FaceMesh({
        locateFile: (file) => `${FACE_MESH_CDN}/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      if (typeof faceMesh.initialize === "function") {
        await faceMesh.initialize();
      }

      meshInstance = faceMesh;
      return faceMesh;
    })();

    try {
      return await meshReady;
    } catch (err) {
      meshReady = null;
      throw err;
    }
  }

  function detectLandmarks(faceMesh, image) {
    stopLiveMesh();
    return new Promise((resolve, reject) => {
      let settled = false;
      let timer = null;
      const finish = (fn, value) => {
        if (settled) return;
        settled = true;
        if (timer) clearTimeout(timer);
        fn(value);
      };

      faceMesh.onResults((results) => {
        finish(resolve, results);
      });

      Promise.resolve(faceMesh.send({ image })).catch((err) => {
        finish(reject, err || new Error("Face analysis failed"));
      });

      timer = setTimeout(() => {
        finish(reject, new Error("Face analysis timed out"));
      }, 20000);
    });
  }

  function calcSymmetry(landmarks) {
    const midX = landmarks[LM.noseTip].x;
    let sum = 0;
    for (let i = 0; i < SYMMETRY_PAIRS.length; i++) {
      const [li, ri] = SYMMETRY_PAIRS[i];
      const left = landmarks[li];
      const right = landmarks[ri];
      const leftDist = Math.abs(left.x - midX);
      const rightDist = Math.abs(right.x - midX);
      const avg = (leftDist + rightDist) / 2 || 1e-6;
      const xScore = 1 - Math.min(1, Math.abs(leftDist - rightDist) / avg);
      const yScore = 1 - Math.min(1, Math.abs(left.y - right.y) * 4);
      sum += (xScore * 0.7 + yScore * 0.3);
    }
    return sum / SYMMETRY_PAIRS.length;
  }

  function calcJawlineScore(jawRatio, symmetry) {
    // Heuristic: defined jawline often sits near ~0.78–0.88 of face width
    const ideal = 0.83;
    const ratioScore = Math.max(0, 100 - Math.abs(jawRatio - ideal) * 220);
    const symScore = symmetry * 100;
    return Math.round(Math.min(100, Math.max(0, ratioScore * 0.55 + symScore * 0.45)));
  }

  function landmarkPoint(landmarks, i) {
    return {
      x: Number(landmarks[i].x.toFixed(4)),
      y: Number(landmarks[i].y.toFixed(4)),
    };
  }

  function mouthMetricsFromLandmarks(landmarks) {
    if (!landmarks || landmarks.length < 468) return null;
    const mouthWidth = dist(landmarks[LM.leftInnerMouth], landmarks[LM.rightInnerMouth]);
    const mouthHeight = dist(landmarks[LM.upperInnerLip], landmarks[LM.lowerInnerLip]);
    const faceHeight =
      dist(landmarks[LM.forehead], landmarks[LM.chin]) ||
      Math.abs((landmarks[LM.chin].y || 0) - (landmarks[LM.forehead].y || 0)) ||
      1e-6;
    const faceWidth = dist(landmarks[LM.leftCheek], landmarks[LM.rightCheek]) || 1e-6;
    const mouthOpen = mouthWidth ? mouthHeight / mouthWidth : 0;
    const jawDrop = dist(landmarks[LM.upperInnerLip], landmarks[LM.chin]) / faceHeight;
    const lipSpread = dist(landmarks[LM.leftOuterMouth], landmarks[LM.rightOuterMouth]) / faceWidth;
    return {
      mouthOpen: Number(mouthOpen.toFixed(4)),
      jawDrop: Number(jawDrop.toFixed(4)),
      lipSpread: Number(lipSpread.toFixed(4)),
    };
  }

  function aggregateMouthFrames(frames) {
    if (!frames || !frames.length) return null;
    const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
    const variance = (arr, m) => arr.reduce((s, v) => s + (v - m) * (v - m), 0) / arr.length;
    const opens = frames.map((f) => Number(f.mouthOpen) || 0);
    const jaws = frames.map((f) => Number(f.jawDrop) || 0);
    const lips = frames.map((f) => Number(f.lipSpread) || 0);
    const avgMouthOpen = mean(opens);
    const avgJawDrop = mean(jaws);
    const avgLipSpread = mean(lips);
    return {
      frameCount: frames.length,
      avgMouthOpen: Number(avgMouthOpen.toFixed(4)),
      maxMouthOpen: Number(Math.max(...opens).toFixed(4)),
      mouthOpenVar: Number(variance(opens, avgMouthOpen).toFixed(5)),
      avgJawDrop: Number(avgJawDrop.toFixed(4)),
      avgLipSpread: Number(avgLipSpread.toFixed(4)),
      lipSpreadVar: Number(variance(lips, avgLipSpread).toFixed(5)),
    };
  }

  function buildMouthOverlay(landmarks) {
    if (!landmarks || landmarks.length < 468) return null;
    return {
      outer: LIP_OUTER_INDICES.map((i) => landmarkPoint(landmarks, i)),
      inner: LIP_INNER_INDICES.map((i) => landmarkPoint(landmarks, i)),
      upper: landmarkPoint(landmarks, LM.upperInnerLip),
      lower: landmarkPoint(landmarks, LM.lowerInnerLip),
      left: landmarkPoint(landmarks, LM.leftInnerMouth),
      right: landmarkPoint(landmarks, LM.rightInnerMouth),
      chin: landmarkPoint(landmarks, LM.chin),
      noseTip: landmarkPoint(landmarks, LM.noseTip),
    };
  }

  function stopLiveMesh() {
    liveMeshActive = false;
    liveMeshGeneration += 1;
    if (meshInstance) {
      try {
        meshInstance.onResults(() => {});
      } catch (_) {
        /* ignore */
      }
    }
  }

  /**
   * Run MediaPipe Face Mesh on a live <video> element until stopLiveMesh().
   * @param {HTMLVideoElement} video
   * @param {(landmarks: object[] | null) => void} onFrame
   */
  async function startLiveMesh(video, onFrame) {
    if (!video) throw new Error("MediaPipe Face Mesh failed to load");
    const startToken = ++liveMeshGeneration;
    liveMeshActive = false;
    const faceMesh = await ensureFaceMesh();
    if (startToken !== liveMeshGeneration) return null;

    liveMeshActive = true;
    faceMesh.onResults((results) => {
      if (!liveMeshActive || startToken !== liveMeshGeneration) return;
      const faces = results && results.multiFaceLandmarks;
      onFrame(faces && faces.length ? faces[0] : null);
    });

    (async function loop() {
      while (liveMeshActive && startToken === liveMeshGeneration) {
        if (video.readyState >= 2) {
          try {
            await faceMesh.send({ image: video });
          } catch (_) {
            await new Promise((resolve) => setTimeout(resolve, 40));
          }
        } else {
          await new Promise((resolve) => requestAnimationFrame(resolve));
        }
      }
    })();

    return faceMesh;
  }

  function buildOverlayData(landmarks) {
    const pt = (i) => ({
      x: Number(landmarks[i].x.toFixed(4)),
      y: Number(landmarks[i].y.toFixed(4)),
    });

    return {
      jaw: JAW_OVERLAY_INDICES.map((i) => pt(i)),
      leftCheek: pt(LM.leftCheek),
      rightCheek: pt(LM.rightCheek),
      leftJaw: pt(LM.leftJaw),
      rightJaw: pt(LM.rightJaw),
      noseTip: pt(LM.noseTip),
      chin: pt(LM.chin),
    };
  }

  function buildFaceAnalysis(metrics) {
    const jawRatio = Number(metrics.jawRatio);
    const symmetry = Number(metrics.symmetry);
    const jawlineScore = Number(metrics.jawlineScore);
    const symPct = Math.round(symmetry * 100);

    let jawDef;
    if (jawRatio >= 0.84) {
      jawDef =
        "Your lower face reads angular — jaw width tracks close to your cheeks, giving a sculpted mandible line in this capture.";
    } else if (jawRatio >= 0.78) {
      jawDef =
        "Your jaw width balances well with your mid-face. The outline along the mandible looks defined without looking heavy.";
    } else if (jawRatio >= 0.72) {
      jawDef =
        "Your jaw sits slightly narrower than your cheeks in this shot. Jaw-release work and posture resets can help sharpen the outline.";
    } else {
      jawDef =
        "Your lower face reads softer relative to cheek width here. Consistent chin tucks and masseter release can gradually define the line.";
    }

    let symNote;
    if (symmetry >= 0.88) {
      symNote = `Left–right balance is strong (${symPct}% symmetry). Both sides align closely — a solid base for even training.`;
    } else if (symmetry >= 0.78) {
      symNote = `Symmetry looks balanced at ${symPct}%. Minor side-to-side variation is normal and often improves with mirrored reps.`;
    } else {
      symNote = `Symmetry reads at ${symPct}% — some left/right difference shows in this capture. Gentle, balanced exercises can help even things out.`;
    }

    let headline;
    if (jawlineScore >= 85) headline = "Well-defined jawline";
    else if (jawlineScore >= 70) headline = "Solid structure — keep sharpening";
    else if (jawlineScore >= 55) headline = "Definition emerging";
    else headline = "Your baseline capture";

    let takeaway;
    if (jawlineScore >= 70) {
      takeaway =
        "Maintain posture resets, jaw-release sessions, and hydration. Re-capture in the same light each week to track real change.";
    } else {
      takeaway =
        "Focus on chin tucks, jaw-release massage, and back-sleeping. Small daily habits compound — check back after a week of sessions.";
    }

    return {
      headline,
      paragraphs: [jawDef, symNote, takeaway],
    };
  }

  function buildFaceAnalysisSummary(metrics) {
    const jawlineScore = Number(metrics.jawlineScore);
    const jawRatio = Number(metrics.jawRatio);
    const symmetry = Number(metrics.symmetry);

    const hl = (text, phrase) =>
      phrase && text.includes(phrase)
        ? text.replace(phrase, `<strong class="analysis-tip-hl">${phrase}</strong>`)
        : text;

    const weakest =
      symmetry < 0.78
        ? "symmetry"
        : jawlineScore < 70 || jawRatio < 0.78
          ? "jawline"
          : "maintain";

    const tips = [];

    if (weakest === "symmetry") {
      tips.push(hl("Train both sides evenly — mirror each rep so left and right get equal work.", "mirror each rep"));
      tips.push(hl("Check head tilt in the mirror; even a small lean can skew how balance reads.", "head tilt"));
      tips.push(hl("Release the tighter jaw side with gentle massage before your session.", "gentle massage"));
      tips.push(hl("Favour back-sleeping when you can — it reduces overnight facial asymmetry.", "back-sleeping"));
    } else if (weakest === "jawline") {
      tips.push(hl("Add slow chin tucks daily — controlled reps, never forced or strained.", "chin tucks"));
      tips.push(hl("Massage along the masseter for two minutes each side to release jaw tension.", "masseter"));
      tips.push(hl("Stack neck posture resets with jaw work for a cleaner mandible line.", "posture resets"));
      tips.push(hl("Stay hydrated — soft tissue tone responds better when you're well watered.", "Stay hydrated"));
    } else {
      tips.push(hl("You're building a solid base — small daily sessions beat long occasional pushes.", "daily sessions"));
      tips.push(hl("Keep pairing jaw-release work with upright neck and shoulder posture.", "jaw-release"));
      tips.push(hl("Add eye and mid-face drills to balance the overall look.", "mid-face drills"));
    }

    tips.push(hl("Re-capture in the same angle and light each week to track real change.", "same angle and light"));
    tips.push(hl("Stop if anything feels painful — CARVE trains soft tissue, not bone.", "soft tissue, not bone"));

    return tips;
  }

  function metricsFromLandmarks(landmarks) {
    if (!landmarks || landmarks.length < 468) {
      throw new Error("No face detected");
    }

    const faceWidth = dist(landmarks[LM.leftCheek], landmarks[LM.rightCheek]);
    const jawWidth = dist(landmarks[LM.leftJaw], landmarks[LM.rightJaw]);
    if (!faceWidth || !jawWidth) throw new Error("No face detected");

    const jawRatio = jawWidth / faceWidth;
    const symmetry = calcSymmetry(landmarks);
    const jawlineScore = calcJawlineScore(jawRatio, symmetry);
    const analysis = buildFaceAnalysis({ jawRatio, symmetry, jawlineScore });

    return {
      landmarkCount: landmarks.length,
      faceWidth: Number(faceWidth.toFixed(4)),
      jawWidth: Number(jawWidth.toFixed(4)),
      jawRatio: Number(jawRatio.toFixed(4)),
      symmetry: Number(symmetry.toFixed(4)),
      jawlineScore,
      analysisHeadline: analysis.headline,
      analysisParagraphs: analysis.paragraphs,
      overlay: buildOverlayData(landmarks),
      analyzedAt: new Date().toISOString(),
    };
  }

  /**
   * Analyze an HTML image/video/canvas element with MediaPipe Face Mesh.
   * @param {CanvasImageSource} source
   * @returns {Promise<object>} metrics result
   */
  async function analyzeFaceFromImage(source) {
    if (!source) throw new Error("Image load failure");
    const faceMesh = await ensureFaceMesh();
    const results = await detectLandmarks(faceMesh, source);

    const faces = results && results.multiFaceLandmarks;
    if (!faces || !faces.length) {
      throw new Error("No face detected");
    }

    return metricsFromLandmarks(faces[0]);
  }

  /**
   * Analyze an uploaded image file with MediaPipe Face Mesh.
   * @param {File} file
   * @returns {Promise<object>} metrics result
   */
  async function analyzeFaceFromFile(file) {
    const image = await loadImageFromFile(file);
    return analyzeFaceFromImage(image);
  }

  function loadFaceReport() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      if (typeof parsed.jawlineScore !== "number") return null;
      return parsed;
    } catch (_) {
      return null;
    }
  }

  function saveFaceReport(report) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(report));
  }

  function clearFaceReport() {
    localStorage.removeItem(STORAGE_KEY);
  }

  global.CarveFaceAnalysis = {
    STORAGE_KEY,
    analyzeFaceFromFile,
    analyzeFaceFromImage,
    startLiveMesh,
    stopLiveMesh,
    mouthMetricsFromLandmarks,
    aggregateMouthFrames,
    buildMouthOverlay,
    buildFaceAnalysis,
    buildFaceAnalysisSummary,
    loadFaceReport,
    saveFaceReport,
    clearFaceReport,
  };
})(typeof window !== "undefined" ? window : globalThis);
