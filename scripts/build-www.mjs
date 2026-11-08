// Copies the website files the Android app needs into www/, which Capacitor bundles.
// Server-only files (Python API, secrets, docs, tests) are never copied.
import { cpSync, mkdirSync, rmSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "www");
const files = [
  "index.html",
  "styles.css",
  "manifest.json",
  "auth-config.js",
  "payments-config.js",
  "data.js",
  "faceAnalysis.js",
  "voiceAnalysis.js",
  "app.js",
  "engagement.js",
  "tour.js",
  "script.js",
];
const dirs = ["assets", "videos", "vendor"];

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const f of files) cpSync(join(root, f), join(out, f));
for (const d of dirs) if (existsSync(join(root, d))) cpSync(join(root, d), join(out, d), { recursive: true });

// The Android bridge only injects a bare window.Capacitor. Capacitor's core JS adds
// registerPlugin and the plugin proxies, so the app build loads it before app.js.
cpSync(join(root, "node_modules/@capacitor/core/dist/capacitor.js"), join(out, "capacitor.js"));
const indexPath = join(out, "index.html");
const html = readFileSync(indexPath, "utf8");
const marker = '<script src="app.js';
if (!html.includes(marker)) throw new Error("index.html has no app.js script tag");
writeFileSync(indexPath, html.replace(marker, `<script src="capacitor.js"></script>\n  ${marker}`));
console.log(`www/ ready: ${files.length} files, ${dirs.length} folders`);
