#!/usr/bin/env bash
# ==============================================================================
# AutoOps — Local CI Quality Gates Test Runner
# Simulates and verifies the complete suite of GitHub Actions CI checks locally.
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "=============================================================================="
echo "               AutoOps — Local CI Quality Gates Runner                        "
echo "=============================================================================="
echo "Repository Root : ${REPO_DIR}"
echo "Execution Time  : $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "Host Kernel     : $(uname -srm)"
echo "Python Version  : $(${REPO_DIR}/.venv/bin/python3 --version 2>/dev/null || python3 --version)"
echo "Terraform Ver   : $(terraform version | head -n 1)"
echo "Ansible Version : $(ansible --version | head -n 1)"
echo "Puppet Version  : $(puppet --version 2>/dev/null || echo 'N/A')"
echo "=============================================================================="
echo ""

cd "${REPO_DIR}"

# ------------------------------------------------------------------------------
# Gate 1: Workflow Specification & Schema Validation (actionlint & python)
# ------------------------------------------------------------------------------
echo "--- Quality Gate 1: GitHub Actions Workflow Validation ---"
if command -v actionlint >/dev/null 2>&1; then
  actionlint .github/workflows/ci.yml
  echo "[PASS] actionlint: Zero parse or syntax errors detected in ci.yml"
else
  echo "[WARN] actionlint not installed in PATH, skipping static action analysis."
fi

.venv/bin/python3 scripts/validate_ci.py
echo "[PASS] Workflow specification and trigger rules verified."
echo ""

# ------------------------------------------------------------------------------
# Gate 2: Repository Hygiene & Secret Scanning
# ------------------------------------------------------------------------------
echo "--- Quality Gate 2: Secret Scanning & Repository Hygiene ---"
chmod +x scripts/check_secrets.sh
./scripts/check_secrets.sh
echo "[PASS] Repository hygiene verified: Zero secrets or forbidden files tracked."
echo ""

# ------------------------------------------------------------------------------
# Gate 3: Python Quality, Bytecode Compilation, Flake8 & Pytest Suite
# ------------------------------------------------------------------------------
echo "--- Quality Gate 3: Python Bytecode, Flake8 & Unit Testing ---"
.venv/bin/python3 -m compileall -q app tests scripts
echo "[PASS] Python bytecode compilation: Clean (0 errors)"

.venv/bin/flake8 app tests scripts
echo "[PASS] Flake8 linter: Clean (0 violations)"

.venv/bin/pytest -v tests
echo "[PASS] Pytest test suite: All tests passed successfully."
echo ""

# ------------------------------------------------------------------------------
# Gate 4: Terraform Formatting, Provider Lock & Configuration Validation
# ------------------------------------------------------------------------------
echo "--- Quality Gate 4: Terraform Formatting & Schema Validation ---"
(
  cd terraform
  terraform fmt -check -diff
  echo "[PASS] terraform fmt: Codebase formatted to canonical HCL style."
  terraform validate
  echo "[PASS] terraform validate: Configuration syntax and resource schemas valid."
)
echo ""

# ------------------------------------------------------------------------------
# Gate 5: Ansible Inventory & Playbook Syntax Checks
# ------------------------------------------------------------------------------
echo "--- Quality Gate 5: Ansible Syntax & Inventory Verification ---"
ANSIBLE_CONFIG="${REPO_DIR}/ansible/ansible.cfg" ansible-inventory -i ansible/inventory/hosts.ini --list >/dev/null
echo "[PASS] Ansible inventory syntax verified."

ANSIBLE_CONFIG="${REPO_DIR}/ansible/ansible.cfg" ansible-playbook -i ansible/inventory/hosts.ini --syntax-check \
  ansible/playbooks/01_preflight.yml \
  ansible/playbooks/02_deploy.yml \
  ansible/playbooks/03_smoke_test.yml \
  ansible/playbooks/04_verify.yml \
  ansible/playbooks/99_error_handling.yml
echo "[PASS] Ansible playbooks: All 5 playbooks passed syntax check."
echo ""

# ------------------------------------------------------------------------------
# Gate 6: Puppet Manifest, Template Syntax & Puppet-Lint Checks
# ------------------------------------------------------------------------------
echo "--- Quality Gate 6: Puppet Policy Manifest & Template Validation ---"
puppet parser validate puppet/manifests/site.pp puppet/modules/autoops_policy/manifests/init.pp
puppet epp validate puppet/modules/autoops_policy/templates/autoops_policy.conf.epp
puppet-lint --fail-on-warnings puppet/manifests/site.pp puppet/modules/autoops_policy/manifests/init.pp
echo "[PASS] Puppet manifests and EPP template: Validated with 0 warnings/errors."
echo ""

# ------------------------------------------------------------------------------
# Gate 7: Nagios Core Configuration Pre-Flight Verification
# ------------------------------------------------------------------------------
echo "--- Quality Gate 7: Nagios Core Configuration Pre-Flight Check ---"
docker run --rm \
  -v "${REPO_DIR}/nagios/nagios.cfg:/opt/nagios/etc/nagios.cfg:ro" \
  -v "${REPO_DIR}/nagios/conf.d:/opt/nagios/etc/conf.d:ro" \
  jasonrivers/nagios:latest /usr/local/bin/nagios -v /opt/nagios/etc/nagios.cfg >/dev/null
echo "[PASS] Nagios Core configuration: Pre-flight check passed (0 errors, 0 warnings)."
echo ""

echo "=============================================================================="
echo "       AutoOps CI Verification Result: ALL QUALITY GATES PASSED (7/7)        "
echo "=============================================================================="
