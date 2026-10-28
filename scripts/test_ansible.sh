#!/usr/bin/env bash
# ==============================================================================
# AutoOps — Ansible Deployment & Orchestration Verification Script
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "=== AutoOps: Ansible Deployment & Orchestration Verification ==="
echo "Repository: ${REPO_DIR}"
echo "Ansible Version: $(ansible --version | head -n 1)"
echo ""

cd "${REPO_DIR}/ansible"
export ANSIBLE_CONFIG="${REPO_DIR}/ansible/ansible.cfg"

echo "--- Step 1: Validating Playbook Syntax ---"
ansible-playbook -i inventory/hosts.ini --syntax-check \
  playbooks/01_preflight.yml \
  playbooks/02_deploy.yml \
  playbooks/03_smoke_test.yml \
  playbooks/04_verify.yml \
  playbooks/99_error_handling.yml
echo "Playbook syntax check: PASSED"
echo ""

echo "--- Step 2: Executing 01_preflight.yml ---"
ansible-playbook -i inventory/hosts.ini playbooks/01_preflight.yml
echo ""

echo "--- Step 3: Executing 02_deploy.yml ---"
ansible-playbook -i inventory/hosts.ini playbooks/02_deploy.yml
echo ""

echo "--- Step 4: Executing 03_smoke_test.yml ---"
ansible-playbook -i inventory/hosts.ini playbooks/03_smoke_test.yml
echo ""

echo "--- Step 5: Executing 04_verify.yml ---"
ansible-playbook -i inventory/hosts.ini playbooks/04_verify.yml
echo ""

echo "--- Step 6: Executing 99_error_handling.yml ---"
ansible-playbook -i inventory/hosts.ini playbooks/99_error_handling.yml
echo ""

echo "=== Ansible Verification Complete: ALL PLAYBOOKS EXECUTED SUCCESSFULLY ==="
