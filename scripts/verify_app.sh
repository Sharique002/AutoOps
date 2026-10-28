#!/usr/bin/env bash
# Automated health check verification script
set -euo pipefail

TARGET_URL="${1:-http://127.0.0.1:5000/health}"
echo "[*] Querying health check at: ${TARGET_URL}"

RESPONSE=$(curl -s -w "\n%{http_code}" "${TARGET_URL}")
BODY=$(echo "${RESPONSE}" | head -n -1)
STATUS_CODE=$(echo "${RESPONSE}" | tail -n 1)

echo "[*] Received HTTP Status Code: ${STATUS_CODE}"
echo "[*] Response Body: ${BODY}"

if [ "${STATUS_CODE}" -eq 200 ]; then
    echo "[+] SUCCESS: Health check returned HTTP 200 OK."
    exit 0
else
    echo "[-] FAILURE: Expected HTTP 200, got ${STATUS_CODE}."
    exit 1
fi
