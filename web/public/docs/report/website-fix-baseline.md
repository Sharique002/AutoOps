# AutoOps Website — Baseline and Change Inspection Report

**Project:** AutoOps — CI/CD, Infrastructure as Code & Observability Platform  
**Developer:** Sharique  
**Target Environment:** Ubuntu 24.04 LTS (WSL2) on Windows 11  
**Repository Path:** `/mnt/d/files/OneDrive/Desktop/AutoOps` (`D:\files\OneDrive\Desktop\AutoOps`)  
**Inspected Commit HEAD:** `73b5a1c`  
**Baseline Date:** 2026-10-28  

---

## 1. Environment & Working Tree State

- **Git Branch:** `main`
- **Current HEAD Commit:** `73b5a1c59e5ba7f7ee44510183363ace19815c1a`
- **Working Tree Status:** Clean (`git status --short` returned 0 modified/untracked files prior to baseline documentation).
- **Recent Git Log:**
  - `73b5a1c`: feat(ui): implement Pastel Orchid Pink, Deep Eggplant Violet, and Signal Orange design theme
  - `f024c97`: feat(web): implement responsive AutoOps DevOps dashboard showcase website
  - `da23d13`: feat(delivery): complete Milestone 06 security hardening, academic report, and final QA
  - `c29c2fa`: fix(ci): refine secret scanning pathspecs and update CI evidence
  - `80a2b40`: feat(ci): implement Milestone 05 GitHub Actions CI quality gates and credential remediation

---

## 2. Identified Deficiencies & Investigation Findings

| Finding ID | Component | Current State / Defect | Root Cause & Reproduction Steps | Required Corrective Action |
|---|---|---|---|---|
| **ISSUE-01** | `web/src/context/ThemeContext.tsx` & `tokens.css` | First-time visitors are presented with the Orchid theme instead of the default Dark Charcoal DevOps theme. | In `ThemeContext.tsx`, `localStorage.getItem('autoops-theme')` falls back to `'orchid'` when unset. Furthermore, `:root` in `tokens.css` holds orchid tokens. | Refactor `ThemeContext` and `tokens.css` so `:root` and default state is the **Dark Charcoal theme** (`#0B0F14`) with green (`#35E58C`) and cyan (`#38CFF0`) accents. Retain Orchid as an accessible alternate theme in the switcher. |
| **ISSUE-02** | `web/src/components/DocumentationGrid.tsx` | Documentation cards display static text and relative file paths without real navigation links or in-app viewers. | Cards are non-navigable `<div>` elements with no active `href`, modal viewer, or static asset endpoints. | Copy approved documentation into `web/public/docs/`, wire up real links, add an accessible Markdown modal reader, and create an automated validation check for document targets. |
| **ISSUE-03** | `compose.yaml` vs. `projectData.ts` & Architecture | `autoops-network` is displayed in the architecture diagram and text as having a fixed `172.28.0.0/16` subnet, but `compose.yaml` only declares `driver: bridge` without explicit IPAM. | Inaccurate claim in `projectData.ts` and SVG diagrams; Compose assigns dynamic bridge IPAM by default. In contrast, Terraform's `autoops-infra-net` has explicit `172.29.0.0/16` IPAM declared in HCL. | Update all architectural references to correctly label `autoops-network` as `Compose-managed bridge network (default IPAM)` and retain `172.29.0.0/16` only for Terraform. |
| **ISSUE-04** | `compose.yaml`, `Makefile`, `scripts/test_nagios.sh` | Predictable fallback passwords (`ChangeMeToAStrongPassword123!`) exist in active service definitions and test scripts. | `${NAGIOSADMIN_PASS:-ChangeMeToAStrongPassword123!}` in `compose.yaml`, `NAGIOSADMIN_PASS ?= ...` in `Makefile`, and default in `test_nagios.sh`. | Remove predictable fallback passwords. Require explicit credentials from `.env` or environment, fail early with helpful error if missing, and ensure `.env` is uncommitted. |
| **ISSUE-05** | `web/package-lock.json` & Rollup Binaries | Potential cross-platform Rollup failure when building in Linux if platform-specific binaries are omitted. | Windows-generated lockfiles may lack `@rollup/rollup-linux-x64-gnu`. Lockfile audit confirms it is present, but `npm ci` must be verified and reproducible on both Windows and Linux. | Verify clean `npm ci` execution across environments, document exact package management steps, and verify zero build warnings. |
| **ISSUE-06** | Acceptance Matrix & Telemetry Claims | Risk of telemetry claims being interpreted as live production monitoring rather than verified historical baseline. | Dashboard must maintain explicit separation between live local development and historical verification. | Ensure all metrics explicitly state verification timestamps and remote GitHub Actions remains strictly labeled `NOT RUN`. |

---

## 3. Current Baseline Test & Verification Results

Prior to implementing fixes, baseline checks were recorded:

1. **Python Unit Tests:**
   - Command: `.venv/bin/pytest -v tests`
   - Result: `12 passed in 9.33s` (100% pass rate).
2. **Repository Secret Hygiene:**
   - Command: `./scripts/check_secrets.sh`
   - Result: `Repository hygiene check: PASSED (Zero tracked secrets or credentials detected)`.
3. **Frontend Production Build (WSL):**
   - Command: `cd web && npm run build`
   - Result: `✓ built in 3.88s` (Zero errors, 1,593 modules transformed).
4. **Terraform Infrastructure:**
   - Command: `cd terraform && terraform plan -detailed-exitcode`
   - Result: `0 to add, 0 to change, 0 to destroy` (0 drift).
5. **Docker Compose Runtime:**
   - Containers `autoops-app` (healthy on 5000) and `autoops-nagios` (healthy on 8080) are running.

---

## 4. Remediation Plan

The following files require targeted modification in subsequent phases:
- `web/src/context/ThemeContext.tsx`: Set default theme to `dark`.
- `web/src/styles/tokens.css`: Make `:root` dark charcoal (`#0B0F14`) with green/cyan accents; preserve `[data-theme="orchid"]` as alternate.
- `web/src/styles/global.css`: Ensure dark theme styles apply as base.
- `web/src/data/projectData.ts`: Fix network naming for `autoops-network` (remove inaccurate 172.28 claim), add documentation URLs and targets.
- `web/src/components/DocumentationGrid.tsx`: Implement real navigation links, static document serving, and interactive reading modal.
- `web/src/components/ArchitectureSection.tsx` & `ArchitectureSvg.tsx`: Reflect accurate network label.
- `compose.yaml`: Remove predictable password fallback in `autoops-nagios` environment and healthcheck.
- `Makefile`: Fail early if `NAGIOSADMIN_PASS` is empty, avoiding fallback defaults.
- `scripts/test_nagios.sh`: Enforce explicit credentials and fail early with helpful guidance.
- `scripts/validate_docs.sh`: Automated script validating all documentation targets.
