#!/usr/bin/env python3
"""AutoOps — CI Workflow Validator.

Validates GitHub Actions workflow structure, syntax, and schema definitions.
"""
import sys
from pathlib import Path
import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
WORKFLOW_FILE = REPO_ROOT / ".github" / "workflows" / "ci.yml"

REQUIRED_JOBS = [
    "hygiene",
    "python-quality",
    "terraform-validate",
    "ansible-validate",
    "puppet-validate",
    "nagios-validate",
]


def validate_workflow():
    """Validate structure, triggers, permissions, and required jobs."""
    print(f"Validating workflow file: {WORKFLOW_FILE}")
    if not WORKFLOW_FILE.exists():
        print(f"ERROR: Workflow file not found at {WORKFLOW_FILE}")
        sys.exit(1)

    try:
        with open(WORKFLOW_FILE, "r", encoding="utf-8") as f:
            content = yaml.safe_load(f)
    except yaml.YAMLError as exc:
        print(f"ERROR: Failed to parse workflow YAML: {exc}")
        sys.exit(1)

    assert isinstance(content, dict), "Workflow root must be a YAML mapping"

    # Verify triggers ('on' in YAML 1.1 might be parsed as bool or str)
    triggers = content.get("on") or content.get(True)
    assert triggers is not None, "Workflow must declare 'on' trigger"
    assert "push" in triggers, "Workflow must trigger on push"
    assert "pull_request" in triggers, "Workflow must trigger on pull_request"
    assert "workflow_dispatch" in triggers, "Workflow must permit dispatch"

    # Verify permissions
    assert "permissions" in content, "Workflow must declare permissions"
    perm = content["permissions"].get("contents")
    assert perm == "read", "contents permission must be read-only"

    # Verify jobs
    jobs = content.get("jobs", {})
    for job in REQUIRED_JOBS:
        assert job in jobs, f"Workflow is missing required job: {job}"
        name = jobs[job].get("name")
        print(f"  [+] Job verified: {job} -> '{name}'")

    total = len(REQUIRED_JOBS)
    print(f"SUCCESS: Workflow validated. All {total} quality gates confirmed.")


if __name__ == "__main__":
    validate_workflow()
