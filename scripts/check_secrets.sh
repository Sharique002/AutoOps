#!/usr/bin/env bash
# ==============================================================================
# AutoOps — Repository Hygiene & Secret Leak Detection
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "=== AutoOps: Secret Scanning & Repository Hygiene Check ==="
echo "Scanning tracked git files in: ${REPO_DIR}"

cd "${REPO_DIR}"

VIOLATIONS=0

# 1. Verify sensitive files are not tracked by Git
FORBIDDEN_FILES=(
  ".env"
  "nagios/.env"
  "terraform/terraform.tfvars"
  "id_rsa"
  "*.pem"
  "*.key"
)

for pattern in "${FORBIDDEN_FILES[@]}"; do
  # shellcheck disable=SC2086
  MATCHES=$(git ls-files "${pattern}" 2>/dev/null || true)
  if [[ -n "${MATCHES}" ]]; then
    echo "ERROR: Forbidden sensitive file tracked in git: ${MATCHES}"
    VIOLATIONS=$((VIOLATIONS + 1))
  fi
done

# 2. Verify no rotated test credentials exist in tracked files
EXCLUDE_SPECS=(
  ":!scripts/check_secrets.sh"
  ":!tests/test_ci_workflow.py"
)

if git grep -qi "AutoOpsPass" -- "${EXCLUDE_SPECS[@]}"; then
  echo "ERROR: Found rotated credential reference 'AutoOpsPass' in tracked files:"
  git grep -n -i "AutoOpsPass" -- "${EXCLUDE_SPECS[@]}"
  VIOLATIONS=$((VIOLATIONS + 1))
fi

# 3. Check for typical credential and private key patterns in tracked files
PATTERNS=(
  "BEGIN.*PRIVATE KEY"
  "AKIA[0-9A-Z]{16}"
  "ghp_[0-9a-zA-Z]{36}"
  "xox[baprs]-[0-9a-zA-Z]{10,48}"
)

for pattern in "${PATTERNS[@]}"; do
  if git grep -E -q -i "${pattern}" -- "${EXCLUDE_SPECS[@]}"; then
    echo "ERROR: Tracked file matches suspicious credential pattern '${pattern}':"
    git grep -E -n -i "${pattern}" -- "${EXCLUDE_SPECS[@]}"
    VIOLATIONS=$((VIOLATIONS + 1))
  fi
done

if [[ ${VIOLATIONS} -gt 0 ]]; then
  echo ""
  echo "FAIL: Repository hygiene check detected ${VIOLATIONS} credential/hygiene violation(s)."
  exit 1
fi

echo "Repository hygiene check: PASSED (Zero tracked secrets or credentials detected)"
echo "=== Secret Scanning Complete ==="
