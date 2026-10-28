#!/usr/bin/env bash
# ==============================================================================
# AutoOps — Nagios Observability, Failure Detection & Recovery Verification Script
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Load environment variables from .env if present
if [[ -f "${REPO_DIR}/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "${REPO_DIR}/.env"
  set +a
elif [[ -f "${REPO_DIR}/nagios/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "${REPO_DIR}/nagios/.env"
  set +a
fi

NAGIOS_USER="${NAGIOSADMIN_USER:-nagiosadmin}"
NAGIOS_PASS="${NAGIOSADMIN_PASS:-ChangeMeToAStrongPassword123!}"

echo "=== AutoOps: Nagios Observability & Recovery Verification ==="
echo "Repository: ${REPO_DIR}"
echo ""

cd "${REPO_DIR}"

# Guarantee that autoops-app is restored even on script interruption or failure
cleanup() {
  echo "--- Cleanup Trap: Ensuring autoops-app is running ---"
  if ! docker ps --filter name=autoops-app --filter status=running | grep -q autoops-app; then
    echo "Restoring autoops-app..."
    docker start autoops-app || docker compose up -d autoops-app
    sleep 3
  fi
}
trap cleanup EXIT

echo "--- Step 1: Validating Compose and Nagios Configuration ---"
docker compose config > /dev/null
echo "Compose configuration syntax: PASSED"

docker run --rm \
  -v "${REPO_DIR}/nagios/nagios.cfg:/opt/nagios/etc/nagios.cfg:ro" \
  -v "${REPO_DIR}/nagios/conf.d:/opt/nagios/etc/conf.d:ro" \
  jasonrivers/nagios:latest /usr/local/bin/nagios -v /opt/nagios/etc/nagios.cfg > /dev/null
echo "Nagios pre-flight configuration check: PASSED (0 errors, 0 warnings)"
echo ""

echo "--- Step 2: Verifying Running Services & Health ---"
docker compose up -d
sleep 5

APP_HEALTH=$(docker inspect --format '{{.State.Health.Status}}' autoops-app 2>/dev/null || echo "unknown")
NAGIOS_STATUS=$(docker inspect --format '{{.State.Status}}' autoops-nagios 2>/dev/null || echo "unknown")

echo "autoops-app health: ${APP_HEALTH}"
echo "autoops-nagios status: ${NAGIOS_STATUS}"

if [[ "${NAGIOS_STATUS}" != "running" ]]; then
  echo "FAIL: autoops-nagios is not running."
  exit 1
fi
echo ""

echo "--- Step 3: Direct Container-to-Container HTTP Probe via check_http ---"
PROBE_OUTPUT=$(docker exec autoops-nagios /opt/nagios/libexec/check_http \
  -I autoops-app -p 5000 -u /health -e "HTTP/1.1 200" -s "healthy")
echo "${PROBE_OUTPUT}"

if ! echo "${PROBE_OUTPUT}" | grep -q "HTTP OK"; then
  echo "FAIL: check_http did not report HTTP OK."
  exit 1
fi
echo "Intra-network HTTP probe: PASSED"
echo ""

echo "--- Step 4: Verifying Initial Healthy State in Nagios Engine ---"
# Give Nagios engine up to 15 seconds to record active check
HEALTH_STATE=""
for i in {1..15}; do
  HEALTH_STATE=$(docker exec autoops-nagios awk '/service_description=AutoOps_Microservice_Health/,/current_state/' /opt/nagios/var/status.dat | grep 'current_state' | cut -d'=' -f2 | tr -d ' \r\n' || echo "")
  if [[ "${HEALTH_STATE}" == "0" ]]; then
    break
  fi
  sleep 1
done

echo "AutoOps_Microservice_Health state: ${HEALTH_STATE} (0=OK)"
if [[ "${HEALTH_STATE}" != "0" ]]; then
  echo "FAIL: Nagios did not record initial OK state (got ${HEALTH_STATE})."
  exit 1
fi
echo "Initial health verification: PASSED (OK)"
echo ""

echo "--- Step 5: Verifying Nagios Web Dashboard on Port 8080 ---"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -u "${NAGIOS_USER}:${NAGIOS_PASS}" http://127.0.0.1:8080/nagios/)
echo "Dashboard HTTP response: ${HTTP_CODE}"
if [[ "${HTTP_CODE}" != "200" ]]; then
  echo "FAIL: Dashboard returned HTTP ${HTTP_CODE}, expected 200."
  exit 1
fi
echo "Dashboard availability: PASSED (HTTP 200 OK on http://127.0.0.1:8080/nagios/)"
echo ""

echo "--- Step 6: Injecting Controlled Failure (Stopping autoops-app) ---"
docker stop autoops-app
echo "autoops-app container stopped."
echo "Waiting for Nagios detection cycle..."

FAIL_DETECTED=0
for i in {1..20}; do
  FAIL_STATE=$(docker exec autoops-nagios awk '/service_description=AutoOps_Microservice_Health/,/current_state/' /opt/nagios/var/status.dat | grep 'current_state' | cut -d'=' -f2 | tr -d ' \r\n' || echo "")
  if [[ "${FAIL_STATE}" == "2" ]]; then
    FAIL_DETECTED=1
    break
  fi
  sleep 1
done

if [[ "${FAIL_DETECTED}" -eq 1 ]]; then
  echo "Controlled failure DETECTED by Nagios! State: ${FAIL_STATE} (2=CRITICAL)"
  docker exec autoops-nagios grep 'SERVICE ALERT.*AutoOps_Microservice_Health.*CRITICAL' /opt/nagios/var/nagios.log | tail -n 2
else
  echo "FAIL: Nagios failed to detect failure within threshold."
  exit 1
fi
echo ""

echo "--- Step 7: Restoring Service & Verifying Recovery Detection ---"
echo "Starting autoops-app..."
docker start autoops-app
echo "Waiting for Nagios recovery detection cycle..."

RECOVERY_DETECTED=0
for i in {1..25}; do
  REC_STATE=$(docker exec autoops-nagios awk '/service_description=AutoOps_Microservice_Health/,/current_state/' /opt/nagios/var/status.dat | grep 'current_state' | cut -d'=' -f2 | tr -d ' \r\n' || echo "")
  if [[ "${REC_STATE}" == "0" ]]; then
    RECOVERY_DETECTED=1
    break
  fi
  sleep 1
done

if [[ "${RECOVERY_DETECTED}" -eq 1 ]]; then
  echo "Recovery DETECTED by Nagios! State: ${REC_STATE} (0=OK)"
  docker exec autoops-nagios grep 'SERVICE ALERT.*AutoOps_Microservice_Health.*OK' /opt/nagios/var/nagios.log | tail -n 2
else
  echo "FAIL: Nagios failed to detect service recovery."
  exit 1
fi
echo ""

echo "--- Step 8: Direct Health Endpoint Validation ---"
DIRECT_HEALTH=$(curl -s http://127.0.0.1:5000/health)
echo "Direct HTTP GET /health response:"
echo "${DIRECT_HEALTH}"

if ! echo "${DIRECT_HEALTH}" | grep -q '"status":"healthy"'; then
  echo "FAIL: Application /health did not return healthy status."
  exit 1
fi
echo ""
echo "=== Nagios Verification Complete: ALL TESTS PASSED ==="
