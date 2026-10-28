#!/usr/bin/env bash
set -euo pipefail

PORT=5000
HOST="127.0.0.1"
OUTPUT_FILE="docs/evidence/local_http_tests.txt"

echo "[*] Starting Uvicorn in background..."
.venv/bin/uvicorn app.main:app --host "${HOST}" --port "${PORT}" &
UVICORN_PID=$!

cleanup() {
    echo "[*] Cleaning up Uvicorn process (PID: ${UVICORN_PID})..."
    kill "${UVICORN_PID}" 2>/dev/null || true
    wait "${UVICORN_PID}" 2>/dev/null || true
}
trap cleanup EXIT

echo "[*] Waiting for server to become responsive..."
for i in {1..30}; do
    if curl -s "http://${HOST}:${PORT}/health" >/dev/null 2>&1; then
        echo "[+] Server is up after ${i} seconds."
        break
    fi
    sleep 1
done

echo "=== GET /health ===" > "${OUTPUT_FILE}"
curl -s -i "http://${HOST}:${PORT}/health" >> "${OUTPUT_FILE}"

echo -e "\n=== GET /api/v1/invalid-route ===" >> "${OUTPUT_FILE}"
curl -s -i "http://${HOST}:${PORT}/api/v1/invalid-route" >> "${OUTPUT_FILE}"

echo "[*] Test output captured in ${OUTPUT_FILE}:"
cat "${OUTPUT_FILE}"
