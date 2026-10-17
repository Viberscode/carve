#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

PORT="${CARVE_PORT:-5500}"
EXPO_PORT="${CARVE_EXPO_PORT:-8081}"
TMUX_CONF="${TMUX_CONF:-/exec-daemon/tmux.portal.conf}"

tmux_cmd() {
  if [[ -f "$TMUX_CONF" ]]; then
    tmux -f "$TMUX_CONF" "$@"
  else
    tmux "$@"
  fi
}

if ! curl -sf "http://127.0.0.1:${PORT}/" >/dev/null 2>&1; then
  tmux_cmd has-session -t carve_serve 2>/dev/null ||
    tmux_cmd new-session -d -s carve_serve \
      "cd /workspace && python3 serve.py 2>&1 | tee /tmp/carve-serve.log"
fi

until curl -sf "http://127.0.0.1:${PORT}/" >/dev/null 2>&1; do
  sleep 1
done

if ! curl -sf "http://127.0.0.1:${EXPO_PORT}/" >/dev/null 2>&1; then
  tmux_cmd has-session -t carve_expo 2>/dev/null ||
    tmux_cmd new-session -d -s carve_expo \
      "cd /workspace/app && CI=1 npx expo start --web --port ${EXPO_PORT} 2>&1 | tee /tmp/carve-expo.log"
fi

for _ in $(seq 1 90); do
  if curl -sf "http://127.0.0.1:${EXPO_PORT}/" >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

echo "CARVE static prototype: http://127.0.0.1:${PORT}/"
echo "CARVE Expo web app:     http://127.0.0.1:${EXPO_PORT}/"
