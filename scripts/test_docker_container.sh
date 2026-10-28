#!/usr/bin/env bash
set -euo pipefail

CONTAINER_NAME="autoops-app-live"
IMAGE_NAME="autoops-app:latest"
OUTPUT_FILE="docs/evidence/docker_container_verification.txt"
PORT=5000

echo "[*] Ensuring previous container is cleaned up..."
docker rm -f "${CONTAINER_NAME}" 2>/dev/null || true

echo "=== AutoOps Container Verification Log ===" > "${OUTPUT_FILE}"
echo "Started at: $(date -u)" >> "${OUTPUT_FILE}"

echo "[*] Launching container: ${CONTAINER_NAME} on port ${PORT}..."
docker run -d --name "${CONTAINER_NAME}" -p "${PORT}:${PORT}" "${IMAGE_NAME}"

cleanup() {
    echo "[*] Stopping and removing container ${CONTAINER_NAME}..."
    docker stop "${CONTAINER_NAME}" 2>/dev/null || true
    docker rm "${CONTAINER_NAME}" 2>/dev/null || true
}
trap cleanup EXIT

echo "[*] Waiting for container HTTP endpoint to respond..."
for i in {1..30}; do
    if curl -s "http://127.0.0.1:${PORT}/health" >/dev/null 2>&1; then
        echo "[+] Container HTTP service reachable after ${i} seconds."
        break
    fi
    sleep 1
done

echo -e "\n--- Container Non-Root User Verification ---" >> "${OUTPUT_FILE}"
echo "User: $(docker exec ${CONTAINER_NAME} whoami)" >> "${OUTPUT_FILE}"
echo "UID/GID: $(docker exec ${CONTAINER_NAME} id)" >> "${OUTPUT_FILE}"

echo -e "\n--- HTTP GET /health ---" >> "${OUTPUT_FILE}"
curl -s -i "http://127.0.0.1:${PORT}/health" >> "${OUTPUT_FILE}"

echo -e "\n\n--- HTTP GET / ---" >> "${OUTPUT_FILE}"
curl -s -i "http://127.0.0.1:${PORT}/" >> "${OUTPUT_FILE}"

echo -e "\n\n--- HTTP GET /invalid-route-docker-test ---" >> "${OUTPUT_FILE}"
curl -s -i "http://127.0.0.1:${PORT}/invalid-route-docker-test" >> "${OUTPUT_FILE}"

echo "[*] Waiting for Docker internal HEALTHCHECK transition..."
HEALTH_STATUS="unknown"
for i in {1..25}; do
    HEALTH_STATUS=$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "${CONTAINER_NAME}")
    if [ "${HEALTH_STATUS}" = "healthy" ]; then
        echo "[+] Docker daemon reports container is HEALTHY after ${i} checks."
        break
    fi
    echo "[*] Docker health status: ${HEALTH_STATUS} (waiting...)"
    sleep 2
done

echo -e "\n--- Docker Inspect Health Status ---" >> "${OUTPUT_FILE}"
echo "Final Health Status: ${HEALTH_STATUS}" >> "${OUTPUT_FILE}"
docker inspect --format='{{json .State.Health}}' "${CONTAINER_NAME}" >> "${OUTPUT_FILE}"

echo -e "\n\n--- Container Logs ---" >> "${OUTPUT_FILE}"
docker logs "${CONTAINER_NAME}" >> "${OUTPUT_FILE}"

echo "[*] Verification results captured in ${OUTPUT_FILE}:"
cat "${OUTPUT_FILE}"
