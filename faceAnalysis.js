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
    leftCheek: 234,
    rightCheek: 454,
    leftJaw: 172,
    rightJaw: 397,
  };

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

    return {
      landmarkCount: landmarks.length,
      faceWidth: Number(faceWidth.toFixed(4)),
      jawWidth: Number(jawWidth.toFixed(4)),
      jawRatio: Number(jawRatio.toFixed(4)),
      symmetry: Number(symmetry.toFixed(4)),
      jawlineScore,
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
    loadFaceReport,
    saveFaceReport,
    clearFaceReport,
  };
})(typeof window !== "undefined" ? window : globalThis);
