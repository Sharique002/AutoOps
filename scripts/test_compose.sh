#!/usr/bin/env bash
set -euo pipefail

OUTPUT_FILE="docs/evidence/compose_verification.txt"
PORT=5000

echo "=== Docker Compose Verification Log ===" > "${OUTPUT_FILE}"
echo "Execution timestamp: $(date -u)" >> "${OUTPUT_FILE}"

echo "[*] Validating compose.yaml syntax..."
docker compose config >> "${OUTPUT_FILE}" 2>&1

echo "[*] Starting services with docker compose up -d..."
docker compose up -d >> "${OUTPUT_FILE}" 2>&1

cleanup() {
    echo "[*] Performing teardown with docker compose down..."
    docker compose down >> "${OUTPUT_FILE}" 2>&1 || true
}
# Keep running for tests; clean up on explicit request or end of test
trap cleanup EXIT

echo "[*] Waiting for autoops-app container to become healthy..."
HEALTH_STATUS="unknown"
for i in {1..30}; do
    HEALTH_STATUS=$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' autoops-app 2>/dev/null || echo "not_running")
    if [ "${HEALTH_STATUS}" = "healthy" ]; then
        echo "[+] Container autoops-app is HEALTHY after ${i} checks."
        break
    fi
    echo "[*] Health status: ${HEALTH_STATUS} (waiting...)"
    sleep 2
done

echo -e "\n--- Docker Compose PS ---" >> "${OUTPUT_FILE}"
docker compose ps >> "${OUTPUT_FILE}" 2>&1

echo -e "\n--- Network Inspection ---" >> "${OUTPUT_FILE}"
docker network inspect autoops-network --format 'Name: {{.Name}}, Driver: {{.Driver}}, Subnet: {{(index .IPAM.Config 0).Subnet}}' >> "${OUTPUT_FILE}" 2>&1

echo -e "\n--- HTTP GET /health ---" >> "${OUTPUT_FILE}"
curl -s -i "http://127.0.0.1:${PORT}/health" >> "${OUTPUT_FILE}" 2>&1

echo -e "\n\n--- Container Logs ---" >> "${OUTPUT_FILE}"
docker compose logs --no-color autoops-app >> "${OUTPUT_FILE}" 2>&1

echo "[*] Compose verification finished successfully. Output captured:"
cat "${OUTPUT_FILE}"
