#!/usr/bin/env bash
# ==============================================================================
# AutoOps — Documentation Integrity & Static Asset Validation Script
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "=== AutoOps: Documentation & Public Asset Validation ==="
echo "Repository Root: ${REPO_DIR}"
echo ""

cd "${REPO_DIR}"

DOC_PAIRS=(
  "docs/report/AutoOps_Final_Project_Report.md:web/public/docs/report/AutoOps_Final_Project_Report.md"
  "docs/report/architecture.md:web/public/docs/report/architecture.md"
  "docs/report/security_and_risk_assessment.md:web/public/docs/report/security_and_risk_assessment.md"
  "docs/report/testing_and_evaluation.md:web/public/docs/report/testing_and_evaluation.md"
  "docs/report/final_acceptance_matrix.md:web/public/docs/report/final_acceptance_matrix.md"
  "README.md:web/public/docs/README.md"
  "docs/report/website-fix-baseline.md:web/public/docs/report/website-fix-baseline.md"
  "docs/report/website-implementation.md:web/public/docs/report/website-implementation.md"
)

ERRORS=0

for pair in "${DOC_PAIRS[@]}"; do
  REPO_PATH="${pair%%:*}"
  WEB_PATH="${pair##*:}"

  echo "Checking: ${REPO_PATH} -> ${WEB_PATH}"

  if [[ ! -f "${REPO_PATH}" ]]; then
    echo "  [FAIL] Repository file missing: ${REPO_PATH}"
    ERRORS=$((ERRORS + 1))
  elif [[ ! -s "${REPO_PATH}" ]]; then
    echo "  [FAIL] Repository file is empty: ${REPO_PATH}"
    ERRORS=$((ERRORS + 1))
  else
    REPO_BYTES=$(wc -c < "${REPO_PATH}" | tr -d ' ')
    echo "  [OK] Repo source exists (${REPO_BYTES} bytes)"
  fi

  if [[ ! -f "${WEB_PATH}" ]]; then
    echo "  [FAIL] Web static asset missing: ${WEB_PATH}"
    ERRORS=$((ERRORS + 1))
  elif [[ ! -s "${WEB_PATH}" ]]; then
    echo "  [FAIL] Web static asset is empty: ${WEB_PATH}"
    ERRORS=$((ERRORS + 1))
  else
    WEB_BYTES=$(wc -c < "${WEB_PATH}" | tr -d ' ')
    echo "  [OK] Web public asset exists (${WEB_BYTES} bytes)"
  fi
done

echo ""
if [[ ${ERRORS} -gt 0 ]]; then
  echo "FAIL: Documentation validation failed with ${ERRORS} error(s)."
  exit 1
fi

echo "Documentation integrity check: PASSED (${#DOC_PAIRS[@]} / ${#DOC_PAIRS[@]} document pairs verified)"
echo "=== Documentation Validation Complete ==="
