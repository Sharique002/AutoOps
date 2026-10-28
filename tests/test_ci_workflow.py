"""Unit tests for GitHub Actions CI workflow specification."""
from pathlib import Path
import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
WORKFLOW_PATH = REPO_ROOT / ".github" / "workflows" / "ci.yml"


def test_ci_workflow_file_exists():
    """Verify that workflow file exists in expected path."""
    assert WORKFLOW_PATH.is_file(), f"Workflow file missing at {WORKFLOW_PATH}"


def test_ci_workflow_valid_yaml():
    """Verify that the workflow file parses as valid YAML."""
    with open(WORKFLOW_PATH, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)
    assert isinstance(data, dict), "Workflow YAML must be a mapping"


def test_ci_workflow_triggers():
    """Verify push, pull_request, and workflow_dispatch triggers."""
    with open(WORKFLOW_PATH, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    triggers = data.get("on") or data.get(True)
    assert triggers is not None, "Workflow must declare 'on' trigger"
    assert "push" in triggers, "Workflow must trigger on push"
    assert "main" in triggers["push"]["branches"], "Push must target main"
    assert "pull_request" in triggers, "Workflow must trigger on PR"
    assert "main" in triggers["pull_request"]["branches"], "PR targets main"
    assert "workflow_dispatch" in triggers, "Workflow must permit dispatch"


def test_ci_workflow_permissions():
    """Verify minimal least-privilege workflow permissions."""
    with open(WORKFLOW_PATH, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    assert "permissions" in data, "Workflow must declare permissions"
    contents_perm = data["permissions"].get("contents")
    assert contents_perm == "read", "contents permission must be read"


def test_ci_workflow_required_jobs():
    """Verify all required CI quality gate jobs are defined."""
    required_jobs = {
        "hygiene",
        "python-quality",
        "terraform-validate",
        "ansible-validate",
        "puppet-validate",
        "nagios-validate",
    }
    with open(WORKFLOW_PATH, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    jobs = data.get("jobs", {})
    for job_name in required_jobs:
        assert job_name in jobs, f"Job {job_name} missing from workflow"
        assert "runs-on" in jobs[job_name], f"Job {job_name} missing runs-on"
        assert "steps" in jobs[job_name], f"Job {job_name} missing steps"


def test_ci_workflow_no_hardcoded_secrets():
    """Verify no literal passwords or secrets exist in workflow."""
    with open(WORKFLOW_PATH, "r", encoding="utf-8") as f:
        raw_text = f.read()

    forbidden = [
        "AutoOpsPass",
        "password:",
        "passwd:",
        "secret_key:",
        "BEGIN RSA PRIVATE KEY",
    ]
    for pattern in forbidden:
        msg = f"Workflow contains suspicious pattern: {pattern}"
        assert pattern not in raw_text, msg
