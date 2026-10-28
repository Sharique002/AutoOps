#!/usr/bin/env bash
# ==============================================================================
# AutoOps — Puppet Configuration Management Verification Script
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "=== AutoOps: Puppet Configuration Management Verification ==="
echo "Repository: ${REPO_DIR}"
echo "Puppet Version: $(puppet --version)"
echo "Puppet-Lint Version: $(puppet-lint --version)"
echo ""

cd "${REPO_DIR}"

echo "--- Step 1: Validating Manifest & Template Syntax ---"
puppet-lint --fail-on-warnings puppet/manifests/site.pp puppet/modules/autoops_policy/manifests/init.pp
puppet parser validate puppet/manifests/site.pp puppet/modules/autoops_policy/manifests/init.pp
puppet epp validate puppet/modules/autoops_policy/templates/autoops_policy.conf.epp
echo "Syntax and lint checks: PASSED"
echo ""

echo "--- Step 2: Puppet Dry-Run (--noop) ---"
sudo puppet apply --noop \
  --modulepath="${REPO_DIR}/puppet/modules" \
  "${REPO_DIR}/puppet/manifests/site.pp"
echo ""

echo "--- Step 3: Puppet Live Apply ---"
sudo puppet apply \
  --modulepath="${REPO_DIR}/puppet/modules" \
  "${REPO_DIR}/puppet/manifests/site.pp"
echo ""

echo "--- Step 4: Validating Enforced Target State ---"
TARGET_DIR="/etc/autoops"
TARGET_FILE="/etc/autoops/autoops_policy.conf"

if [[ ! -d "${TARGET_DIR}" ]]; then
  echo "FAIL: Expected directory ${TARGET_DIR} does not exist"
  exit 1
fi

if [[ ! -f "${TARGET_FILE}" ]]; then
  echo "FAIL: Expected policy file ${TARGET_FILE} does not exist"
  exit 1
fi

ls -ld "${TARGET_DIR}"
ls -l "${TARGET_FILE}"
echo ""
echo "File content:"
cat "${TARGET_FILE}"
echo ""

echo "--- Step 5: Validating Idempotency (Second Apply Must Produce Zero Changes) ---"
SECOND_RUN=$(sudo puppet apply \
  --modulepath="${REPO_DIR}/puppet/modules" \
  "${REPO_DIR}/puppet/manifests/site.pp")
echo "${SECOND_RUN}"

if echo "${SECOND_RUN}" | grep -q "content: content changed\|created"; then
  echo "FAIL: Second Puppet run was not idempotent; unexpected changes detected."
  exit 1
fi
echo "Idempotency check: PASSED (Zero changes detected)"
echo ""

echo "--- Step 6: Validating Drift Detection & Remediation ---"
echo "Injecting unauthorized drift (modifying app_port to 9999)..."
sudo sed -i 's/app_port = 5000/app_port = 9999/' "${TARGET_FILE}"
grep "app_port" "${TARGET_FILE}"

echo "Re-applying Puppet to restore desired state..."
sudo puppet apply \
  --modulepath="${REPO_DIR}/puppet/modules" \
  "${REPO_DIR}/puppet/manifests/site.pp"

RESTORED_PORT=$(grep "app_port" "${TARGET_FILE}" | awk '{print $3}')
if [[ "${RESTORED_PORT}" != "5000" ]]; then
  echo "FAIL: Drift was not remediated. Expected port 5000, got ${RESTORED_PORT}"
  exit 1
fi
echo "Drift remediation: PASSED (app_port restored to 5000)"
echo ""

echo "=== Puppet Verification Complete: ALL TESTS PASSED ==="
