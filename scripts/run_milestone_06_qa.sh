#!/usr/bin/env bash
# ==============================================================================
# AutoOps — Milestone 06 Comprehensive QA & Final Verification Runner
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${REPO_DIR}"

echo "=============================================================================="
echo "         AutoOps — Milestone 06 Final QA & Verification Log                   "
echo "=============================================================================="
echo "Timestamp       : $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "Host Kernel     : $(uname -srm)"
echo "Working Branch  : $(git branch --show-current)"
echo "Git Commit HEAD : $(git rev-parse HEAD)"
echo "=============================================================================="
echo ""

echo "--- Step 1: Secret Scanning & Repository Hygiene ---"
chmod +x scripts/check_secrets.sh
./scripts/check_secrets.sh
echo ""

echo "--- Step 2: Python Bytecode, Flake8 & Pytest Suite (12 Tests) ---"
.venv/bin/python3 -m compileall -q app tests scripts
echo "compileall: PASSED (0 errors)"
.venv/bin/flake8 app tests scripts
echo "flake8: PASSED (0 violations)"
.venv/bin/pytest -v tests
echo ""

echo "--- Step 3: GitHub Actions CI Workflow Validation ---"
actionlint .github/workflows/ci.yml
echo "actionlint: PASSED (0 errors)"
.venv/bin/python3 scripts/validate_ci.py
echo ""

echo "--- Step 4: Terraform Format, Validate & Drift Check ---"
(
  cd terraform
  terraform fmt -check -diff
  terraform validate
  terraform plan -no-color
)
echo ""

echo "--- Step 5: Puppet Syntax, Template & Lint Validation ---"
puppet parser validate puppet/manifests/site.pp puppet/modules/autoops_policy/manifests/init.pp
puppet epp validate puppet/modules/autoops_policy/templates/autoops_policy.conf.epp
puppet-lint --fail-on-warnings puppet/manifests/site.pp puppet/modules/autoops_policy/manifests/init.pp
echo "puppet: ALL CHECKS PASSED (0 errors, 0 warnings)"
echo ""

echo "--- Step 6: Ansible Syntax Check Across All 5 Playbooks ---"
ANSIBLE_CONFIG="${REPO_DIR}/ansible/ansible.cfg" ansible-playbook -i ansible/inventory/hosts.ini --syntax-check \
  ansible/playbooks/01_preflight.yml \
  ansible/playbooks/02_deploy.yml \
  ansible/playbooks/03_smoke_test.yml \
  ansible/playbooks/04_verify.yml \
  ansible/playbooks/99_error_handling.yml
echo "ansible: ALL PLAYBOOKS PASSED SYNTAX CHECK"
echo ""

echo "--- Step 7: Container Security Hardening Inspection ---"
docker inspect autoops-app --format 'autoops-app -> ReadonlyRootfs: {{.HostConfig.ReadonlyRootfs}}, CapDrop: {{.HostConfig.CapDrop}}, SecurityOpt: {{.HostConfig.SecurityOpt}}, MemoryLimit: {{.HostConfig.Memory}}, Health: {{.State.Health.Status}}'
docker inspect autoops-nagios --format 'autoops-nagios -> SecurityOpt: {{.HostConfig.SecurityOpt}}, MemoryLimit: {{.HostConfig.Memory}}, Health: {{.State.Health.Status}}'
echo ""

echo "--- Step 8: Live Service HTTP Probes ---"
curl -s http://127.0.0.1:5000/health | python3 -m json.tool
make nagios-dashboard
echo ""

echo "--- Step 9: Nagios Active Failure Detection & Recovery Verification ---"
chmod +x scripts/test_nagios.sh
./scripts/test_nagios.sh
echo ""

echo "=============================================================================="
echo "         AutoOps Milestone 06 Verification: ALL CHECKS COMPLETED              "
echo "=============================================================================="
