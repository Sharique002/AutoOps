# AutoOps — Professional DevOps Dashboard Website Implementation Report

**Project:** AutoOps — CI/CD, Infrastructure as Code & Observability Platform  
**Developer:** Sharique  
**Target Environment:** Ubuntu 24.04 LTS (WSL2) on Windows 11  
**Repository Path:** `/mnt/d/files/OneDrive/Desktop/AutoOps` (`D:\files\OneDrive\Desktop\AutoOps`)  
**Latest Baseline Commit:** `da23d13`  
**Report Date:** 2026-10-28  

---

## 1. Executive Summary

In fulfillment of the AutoOps showcase specification and subsequent production-quality stabilization audit, a responsive, production-grade technical web dashboard was engineered and hardened in the dedicated `web/` directory. Rather than utilizing a generic portfolio template, the application serves as a dedicated engineering cockpit communicating the real architecture, multi-stage automation workflows, container security controls, monitoring capabilities, and evidence-backed acceptance test results of the AutoOps platform.

The website delivers:
1. **Accurate Subsystem Architecture**: Reflects the exact dual-network topology between Docker Compose (`autoops-network` using default bridge IPAM) and Terraform (`autoops-infra-net` using dedicated `172.29.0.0/16`), with an interactive component inspector and formal resource ownership matrix.
2. **Strict Dark Charcoal Theme by Default**: Implements deep charcoal (`#0B0F14`), terminal green (`#35E58C`), and cyan (`#38CFF0`) as the canonical default theme for first-time visitors, while preserving high-fashion Pastel Orchid (`#E7B0DE`), Deep Eggplant Violet (`#400849`), and Signal Orange (`#FF5A0A`) as an accessible alternate theme via an interactive toggle.
3. **In-App Interactive Document Reader & Public Asset Mirror**: Houses markdown reports in `web/public/docs/`, providing one-click in-app modal reading, raw file tab viewing, and file path copying, verified by automated integrity testing (`scripts/validate_docs.sh`).
4. **End-to-End Automation Pipeline**: Distinguishes automated GitHub Actions quality gates from local Docker/WSL orchestration stages.
5. **Observability & Recovery Simulation**: Presents real Nagios Core service checks, an interactive walkthrough of the four-phase controlled failure and recovery cycle, and an explicit `Environment: Local development` boundary with real timestamps.
6. **Hardened Container Security & Secret Hygiene**: Discloses CIS container controls (`appuser: 10001`, `read_only: true`, `cap_drop: [ALL]`, `no-new-privileges: true`, resource quotas, loopback binding) and enforces zero hardcoded fallback credentials across Compose, Makefiles, and test harnesses.
7. **Six-Milestone Lifecycle**: Details deliverables and outcomes for Milestones 01 through 06.
8. **Honest Acceptance Matrix**: Provides a filterable QA matrix distinguishing 15 passing checks from 1 explicitly `NOT RUN` check (Remote GitHub Actions).
9. **Safe Demonstration Guide**: Provides one-click copyable shell commands for academic examination and live viva evaluation.

---

## 2. Technology Stack & Architectural Decision

| Component | Selected Technology | Rationale |
|---|---|---|
| **Framework** | React 18 + TypeScript | Component encapsulation, strict type contracts, and predictable state management. |
| **Bundler & Tooling** | Vite 6 | Sub-second HMR, optimized tree-shaking, and static build generation without heavy runtime overhead. |
| **Design Tokens** | Custom CSS Variables (`tokens.css`) | Strict adherence to the dark DevOps design system without bulky CSS frameworks. |
| **Iconography** | Lucide React | Lightweight, crisp, accessible SVG icon set. |
| **Static Output** | HTML5 / ES2020 (`web/dist/`) | Decoupled static single-page bundle that can be served via Vite preview or static file servers without requiring a backend database. |

### Port Allocation Policy
The development and preview servers were configured to avoid port contention with existing infrastructure:
- **Port 80**: Existing host system Apache2 server (untouched).
- **Port 5000**: AutoOps FastAPI microservice (`autoops-app`).
- **Port 8080**: AutoOps Nagios Core dashboard (`autoops-nagios`, loopback bound).
- **Port 5173**: Vite frontend development server (`web-dev`).
- **Port 4173**: Vite frontend preview server (`web-preview`).

---

## 3. Design System & Theme Engine

The application implements a theme architecture supporting both canonical DevOps engineering and alternate high-contrast color palettes:

### Canonical Default Theme: Dark Charcoal & Terminal Green
- **Canvas Base**: `#0B0F14` (Deep Charcoal Canvas)
- **Card Surfaces**: `#111820` (Elevated Panel) and `#171F29` (Top Panel)
- **Border / Structure**: `#263442` (Slate Border) and `#3A4D62` (Hover State)
- **Primary Accent**: `#35E58C` (Terminal Green) for passing tests, health states, and CTA actions
- **Secondary Accent**: `#38CFF0` (Technical Cyan) for telemetry, network subnets, and code chips
- **Warning / Alert**: `#FFB84D` (Amber) for operational caveats and resource limits
- **Typography**: `Inter` for UI prose and headings; `JetBrains Mono` for commands, network addresses, commit hashes, and JSON schemas.

### Alternate Theme: Pastel Orchid & Deep Eggplant
- **Canvas Base**: `#E7B0DE` (Pastel Orchid Pink)
- **Primary Text & Contrasts**: `#400849` (Deep Eggplant Violet)
- **Action & Highlight**: `#FF5A0A` (Signal Orange)
- **Availability**: Accessible via a persistent navbar toggle button (`Dark` ↔ `Orchid`) with localStorage persistence and no FOUC (`data-theme="dark"` set in root HTML).

---

## 4. Key Subsystems & Section Architecture

### Section A — Navigation (`Navbar.tsx`)
Features the AutoOps geometric infrastructure badge, navigation links with smooth scrolling to sections, mobile responsive drawer with accessible ARIA toggle, theme switcher button, and a status pill: `LOCAL DEV • 6/6 MILESTONES`.

### Section B — Hero (`HeroSection.tsx`)
Displays the eyebrow, primary headline, supporting copy, dual CTA buttons ("Explore Architecture" and "View Project Report"), developer attribution (`ENGINEER: SHARIQUE • UBUNTU 24.04 (WSL2)`), and dynamic vector illustration (`ArchitectureSvg.tsx`) that renders responsive SVG diagrams adapting stroke and fill colors to active theme variables.

### Section C — Summary Metrics (`MetricsGrid.tsx`)
Four high-contrast metric cards:
1. `6 / 6` Milestones Completed (VERIFIED)
2. `7 / 7` Local CI Quality Gates (PASSING)
3. `12 / 12` Python Unit & CI Tests (100% PASS)
4. `NOT RUN` Remote GitHub Actions (LOCAL ONLY)

### Section D — Architecture & Resource Ownership (`ArchitectureSection.tsx`)
- Accurately details dual network topologies: `autoops-network` (Compose: default bridge IPAM) and `autoops-infra-net` (Terraform: `172.29.0.0/16`).
- Interactive component inspector allowing the examiner to select any subsystem to view its managed resources, network/port bindings, boundary scope, and non-interference rules.
- Comprehensive Resource Ownership Matrix table.

### Section E — Automation Pipeline (`PipelineSection.tsx`)
Seven-stage end-to-end workflow stepper with explicit visual badges distinguishing `AUTOMATED CI GATE` (GitHub Actions) from `LOCAL RUNTIME STEP` (WSL2 Docker daemon). Each step displays the tool used, functional purpose, automated validation performed, and repository implementation path.

### Section F — Observability & Monitoring (`MonitoringPanel.tsx`)
- Labeled with explicit boundary: `Environment: Local development | Monitored internally via Docker network autoops-network`.
- Real last verified timestamp: `2026-10-28 17:02:10 UTC` (from Milestone 04/06 evidence).
- Active check cards for HTTP Health (`/health`), HTTP Root (`/`), and TCP Port 5000.
- Interactive four-phase failure and recovery walkthrough (OK -> CRITICAL -> RECOVERY -> OK).
- Real payload contract viewer for `GET /health` with RFC-3339 timestamp schema validation.

### Section G — Security Hardening (`SecuritySection.tsx`)
Defense-in-depth security cards covering non-root execution (`appuser: 10001`), read-only root filesystem, memory-backed tmpfs (`noexec, nosuid`), capability dropping (`cap_drop: [ALL]`), no-new-privileges flag, cgroups limits (`512MB` app, `1024MB` Nagios), loopback binding (`127.0.0.1:8080`), and automated secret scanning. Discloses the remaining intra-container plaintext HTTP transport limitation.

### Section H — Milestone Timeline (`MilestoneTimeline.tsx`)
Interactive cards for Milestones 01 through 06 with tool chips, concise outcomes, expandable lists of technical deliverables, and evidence file references.

### Section I — Verification & Acceptance Matrix (`VerificationTable.tsx`)
Filterable test table containing 16 verified test scenarios categorized by Application, Infrastructure, Configuration, Observability, CI/Workflow, and Security. Features live filters (`ALL`, `PASS`, `NOT RUN`, and category selector) and links to exact test lines.

### Section J — Documentation & In-App Reader (`DocumentationGrid.tsx`)
Contains 8 technical reports and documentation resources. Each card provides:
- **Interactive Document Reader**: Opens an accessible in-app modal fetching raw markdown asynchronously and rendering formatted text with clean headers, monospace code blocks, and lists.
- **Raw File Link**: Opens the static file in a new browser tab (`target="_blank"`).
- **Copy Path**: Copies the local repository path to clipboard with visual confirmation.
- **Integrity Validation**: Backed by `scripts/validate_docs.sh` and `make validate-docs`.

### Section K — Interactive Demonstration Guide & Command Copy
Provides safe terminal commands for live viva examination:
- Health verification (`curl http://127.0.0.1:5000/health`)
- Nagios dashboard probe (`make nagios-dashboard`)
- Full CI quality gates (`make ci-test`)
- Repository secret check (`make check-secrets`)
- Documentation verification (`make validate-docs`)
- Full milestone QA audit (`make qa-verify`)

### Section L — Footer (`Footer.tsx`)
Prominently attributes development to **Sharique**, outlines technology chips, provides an academic disclaimer, and notes the latest verified commit (`da23d13`).

---

## 5. Security Hardening & Secret Hygiene

1. **Elimination of Fallback Credentials**:
   - `compose.yaml`: Replaced `${NAGIOSADMIN_PASS:-ChangeMeToAStrongPassword123!}` with mandatory expansion `${NAGIOSADMIN_PASS:?NAGIOSADMIN_PASS must be configured in .env}`.
   - `compose.yaml`: Replaced healthcheck fallback with `$${NAGIOSADMIN_PASS:?NAGIOSADMIN_PASS unset}`.
   - `Makefile`: Removed default assignment `NAGIOSADMIN_PASS ?= ChangeMeToAStrongPassword123!`; added explicit assertion failing early if unset.
   - `scripts/test_nagios.sh`: Removed fallback parameter expansion; added early exit with error message if unset.
2. **Zero Tracked Secrets**:
   - Run `./scripts/check_secrets.sh` confirms zero tracked `.env`, `.pem`, `.key`, or AWS/GitHub secret tokens in version control.
   - Terminal logs and test outputs never echo raw secret strings.

---

## 6. Verification & Regression Testing

The implementation was validated through end-to-end automated checks:
1. **Frontend Static Build**: `npm run build` executed `tsc && vite build`, transforming 1,593 modules in 2.23s with 0 errors and generating production bundles in `web/dist/`.
2. **TypeScript Strict Typecheck**: `npm run typecheck` (`tsc --noEmit`) exited with code 0.
3. **Backend Unit Tests**: `pytest -v tests` executed in Python 3.12 venv, confirming all 12 tests passed (100% pass rate).
4. **Local CI Quality Gates**: `make ci-test` (`./scripts/test_ci_local.sh`) executed all 7 quality gates successfully.
5. **Documentation Validation**: `make validate-docs` confirmed all 8 documentation resources exist in repository and static mirrors.
6. **Secret Leak Detection**: `./scripts/check_secrets.sh` confirmed zero credential leaks.
7. **Infrastructure State**: `terraform plan` confirmed 0 drift (0 to add, 0 to change, 0 to destroy).
8. **Live Service Health**:
   - `http://127.0.0.1:5000/health`: HTTP 200 OK (`{"status":"healthy"}`).
   - `http://127.0.0.1:8080/nagios/`: HTTP 200 OK with basic auth.
   - `http://localhost:5173/`: HTTP 200 OK serving showcase application.

---

## 7. Makefile Targets Added

To ensure reproducible developer workflows, the root `Makefile` includes:
```makefile
validate-docs:
	./scripts/validate_docs.sh

web-install:
	cd web && npm install

web-dev:
	cd web && npm run dev

web-build:
	cd web && npm run build

web-preview:
	cd web && npm run preview
```

---

## 8. Conclusion

The AutoOps Showcase Website fulfills all requirements of a professional DevOps platform dashboard. It faithfully reflects real code, real infrastructure, and real verification data with zero fabricated claims, strict theme defaults, robust secret hygiene, and full documentation accessibility.
