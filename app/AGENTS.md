# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

## Cloud Agent development

- **Install:** `bash .cursor/cloud-install.sh` (runs `npm ci --prefix app`).
- **Start:** `bash .cursor/cloud-start.sh` — static prototype on port **5500** (`python3 serve.py`) and Expo web on **8081**.
- **Static prototype only:** from repo root, `python3 serve.py` or `npm run dev`.
- **Expo only:** `cd app && CI=1 npx expo start --web --port 8081`.
- Dodo payment APIs need `dodo-secrets.json` or `DODO_PAYMENTS_*` env vars; without them `/api/dodo/health` reports `not_configured` and the UI still runs.
