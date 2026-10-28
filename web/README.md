# AutoOps DevOps Showcase Dashboard

A production-quality, responsive engineering showcase website for **AutoOps — CI/CD, Infrastructure as Code & Observability Platform**.

Developed by **Sharique**.

---

## 1. Overview

The AutoOps Showcase Website communicates the architecture, automation workflows, container security controls, monitoring capabilities, six development milestones, and verification evidence of the AutoOps platform.

The interface is styled as a dark DevOps engineering dashboard with:
- Deep charcoal backgrounds (`#0B0F14`, `#111820`, `#171F29`)
- Terminal green (`#35E58C`) and cyan (`#38CFF0`) accents
- Clean typography (Inter + JetBrains Mono)
- Accessible color contrast, keyboard navigation focus rings, and `prefers-reduced-motion` support
- Factual representation: zero fake live counters, real verification timestamps, and explicit `NOT RUN` classification for remote GitHub Actions.

---

## 2. Technology Stack

- **Framework**: React 18 + TypeScript (Strict Mode)
- **Bundler & Dev Server**: Vite 6
- **Icons**: Lucide React
- **Styling**: CSS Design Tokens (`tokens.css`) & Global Styles (`global.css`) without heavy third-party UI framework overhead
- **Deployment Target**: Static single-page application (SPA) output in `web/dist/`

---

## 3. Directory Layout

```
web/
├── index.html                   # HTML entry point with meta tags & typography
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript strict configuration
├── vite.config.ts               # Vite server config (port 5173, host enabled)
├── README.md                    # Frontend documentation
├── public/
│   └── favicon.svg              # Custom geometric infrastructure favicon
└── src/
    ├── main.tsx                 # Application mount point
    ├── App.tsx                  # Top-level composition
    ├── types/
    │   └── index.ts             # TypeScript domain models
    ├── styles/
    │   ├── tokens.css           # Color, typography, spacing, and shadow design tokens
    │   └── global.css           # Resets, utilities, scrollbar, responsive layouts
    ├── data/
    │   └── projectData.ts       # Centralized, evidence-grounded project data model
    └── components/
        ├── Navbar.tsx           # Responsive navigation bar with mobile drawer
        ├── HeroSection.tsx      # Headline, CTAs, metadata badges, dev attribution
        ├── ArchitectureSvg.tsx  # Custom SVG architectural composition
        ├── MetricsGrid.tsx      # 4 core metric summary cards
        ├── ArchitectureSection.tsx # Interactive component inspector & ownership matrix
        ├── PipelineSection.tsx  # 7-step horizontal workflow (CI vs. Local)
        ├── MonitoringPanel.tsx  # Observability panel, health checks, recovery walkthrough
        ├── SecuritySection.tsx  # CIS container hardening controls & risk disclosure
        ├── MilestoneTimeline.tsx# 6-milestone lifecycle with expandable deliverables
        ├── VerificationTable.tsx# Filterable QA acceptance matrix (PASS / NOT RUN)
        ├── DocumentationGrid.tsx# Academic report links & safe terminal command copier
        └── Footer.tsx           # Platform metadata, tech chips, copyright
```

---

## 4. Getting Started

### Prerequisites
- Node.js `v18+` (or `v24+`)
- npm `v9+` (or `v11+`)

### Installation
From the root repository directory:
```bash
make web-install
# Or directly inside web/:
cd web && npm install
```

### Development Server
Starts the local development server on `http://localhost:5173`:
```bash
make web-dev
# Or directly inside web/:
cd web && npm run dev
```

### Production Build
Typechecks with `tsc --noEmit` and bundles static assets into `web/dist`:
```bash
make web-build
# Or directly inside web/:
cd web && npm run build
```

### Preview Static Build
Locally previews the built static site on `http://localhost:4173`:
```bash
make web-preview
# Or directly inside web/:
cd web && npm run preview
```

---

## 5. Architectural Alignment & Safety

- **Port Isolation**: Runs on port `5173` (preview `4173`), avoiding collision with Apache (`80`), FastAPI (`5000`), and Nagios (`8080`).
- **Zero Secrets**: Contains no hardcoded passwords, tokens, or environment credentials.
- **Evidence Integrity**: All metrics, test outputs, and recovery timestamps mirror factual evidence files in `docs/evidence/`.
