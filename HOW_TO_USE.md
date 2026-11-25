# 📖 AutoOps — Easy Step-by-Step User Manual

Welcome to **AutoOps**! This guide explains how to start, use, and explore every part of the AutoOps platform in simple, easy-to-understand language.

---

## 🌟 What is AutoOps? (In Simple Words)

AutoOps is an **all-in-one DevOps engineering platform**. It brings together everything needed to run and monitor a modern web microservice:

1. 💻 **Web Showcase Dashboard:** A sleek, interactive web dashboard (*Editorial Orchid & Tangerine theme*) to explore architecture, pipelines, milestones, and reports.
2. ⚡ **FastAPI Microservice:** A high-speed Python web service running securely in a Docker container.
3. 📊 **Nagios Core Monitoring:** An active monitoring dashboard that checks application health 24/7 and alerts if a service goes down.
4. 🏗️ **Infrastructure as Code (Terraform):** Automatically builds and manages virtual networks and storage volumes.
5. 📜 **Policy Enforcement (Puppet):** Enforces strict file security and server permissions.
6. 🚀 **Automated Deployments (Ansible):** Automatically tests and deploys software with zero manual work.

---

## 📋 Prerequisites (What You Need on Your Machine)

Before running AutoOps, ensure you have:

- **Docker Desktop** (or Docker engine inside WSL2 / Linux).
- **Node.js** (v18 or higher) — for running the web frontend.
- **Python** (v3.12 recommended) — for running tests and scripts.
- **WSL2 (Ubuntu 24.04)** — recommended for Windows users.

---

## 🚀 Quick Start (Up & Running in 2 Minutes)

### Step 1: Start the Backend & Monitoring (Docker)
Open your terminal (WSL2 or Git Bash in the project folder):

```bash
docker compose up -d
```
*What this does:* Starts the FastAPI app (`autoops-app`) and Nagios monitoring (`autoops-nagios`) in the background.

### Step 2: Start the Web Dashboard (Frontend)
Open another terminal window, navigate to the `web/` folder, and run:

```bash
cd web
npm install    # (Only needed the very first time)
npm run dev
```

### Step 3: Open in Your Browser!
Click the links below to open each service:

| Service | Browser Link | Default Login |
| :--- | :--- | :--- |
| **Web Dashboard** | [http://localhost:5173](http://localhost:5173) | *No login needed* |
| **Nagios Observability** | [http://localhost:8080/nagios/](http://localhost:8080/nagios/) | **User:** `nagiosadmin`<br>**Pass:** `AutoOps_Rotated_2026_Secure!` |
| **FastAPI Health API** | [http://127.0.0.1:5000/health](http://127.0.0.1:5000/health) | *JSON response* |

---

## 🖥️ How to Use the Web Showcase Dashboard

Open [http://localhost:5173](http://localhost:5173) in your browser. Here is what you can do:

### 1. Run Automated Quick Demo (Single Click ⚡)
- Click the vibrant orange button **`[ ⚡ QUICK DEMO RUN (AUTOMATIC) ]`** in the Hero section (or the **`[ ⚡ QUICK DEMO ]`** pill in the top navigation bar).
- The automated demo runner will immediately start and execute live checks across all 7 platform layers:
  1. **Application Microservice:** FastAPI HTTP 200 contract verification.
  2. **Container Orchestration:** Docker Compose multi-container runtime & network isolation.
  3. **Active Observability:** Nagios Core health probes and zero-flapping checks.
  4. **Infrastructure as Code:** Terraform auxiliary state & drift verification.
  5. **Configuration Management:** Puppet desired-state policy compliance.
  6. **Deployment Orchestration:** Ansible automated playbook execution.
  7. **Security Hardening:** Container defense-in-depth and secret leak audit.
- Watch the live telemetry logs stream in real time.
- Upon completion, review the **Final Demonstration Audit Report** table, click **`[ DOWNLOAD REPORT (.MD) ]`** to save the generated markdown report, or click **`[ COPY REPORT ]`** to copy the summary.

### 2. Instant Navigation (<kbd>Cmd</kbd> + <kbd>K</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd>)
- Press <kbd>Ctrl</kbd> + <kbd>K</kbd> on Windows or <kbd>Cmd</kbd> + <kbd>K</kbd> on Mac (or click the search button in the top bar).
- Type keywords like `docker`, `nagios`, `terraform`, `report`, or `pytest`.
- Click any result to immediately jump to that section or copy the command.

### 3. Quick Jump Bar
- Directly under the main title on the homepage, click any pill button (`Architecture`, `Pipeline`, `Monitoring`, `Security`, `Milestones`, `QA Matrix`, `Docs`) to smoothly scroll right to that section.

### 4. Read Academic Reports Directly on Screen
- Scroll down to the **Project Reports** section.
- Click **`READ REPORT →`** on any card. An interactive modal popup will open displaying the full technical markdown report.
- Click **`RAW FILE`** if you prefer reading the raw markdown file in a new tab.

### 5. Copy Test Commands with 1 Click
- In the **Acceptance Matrix** table, click the small copy icon next to any test command to copy it directly to your clipboard.

### 6. Floating "Back to Top"
- When scrolling down, a floating **`[ ↑ TOP ]`** button appears in the bottom-right corner. Click it anytime to return to the top instantly.

---

## 📊 How to Use Nagios Monitoring

Open [http://localhost:8080/nagios/](http://localhost:8080/nagios/) in your browser.

1. **Log in:**
   - **Username:** `nagiosadmin`
   - **Password:** `AutoOps_Rotated_2026_Secure!` *(stored in `.env`)*
2. **Check System Health:**
   - On the left sidebar menu, click **Services**.
   - You will see the 3 active health probes:
     - `HTTP-Health`: Checks `http://autoops-app:5000/health`
     - `HTTP-Root`: Checks `http://autoops-app:5000/`
     - `TCP-Port-5000`: Checks if port 5000 is accepting network connections.
   - All 3 will show **`OK` (Green)** when healthy.

---

## 🧪 How to Run Automated Tests

To verify that the code and APIs are 100% healthy, run these commands inside your terminal:

### Run Python Unit Tests (12/12 Tests)
```bash
make test
```
*Or directly via pytest:*
```bash
pytest -v tests/
```
*Expected Output:* `12 passed in 1.2s` (All tests pass with green checks).

### Run Code Quality Check (Flake8 Linter)
```bash
make lint
```
*Checks your Python code for formatting, style, and syntax errors.*

### Run All CI Quality Gates Locally
```bash
make ci-test
```
*Runs all 7 quality gates (Pytest, Flake8, Terraform validate, Puppet lint, Ansible syntax, Nagios verify, Secret scan).*

---

## 🛠️ Infrastructure & Automation Commands Cheat Sheet

The project comes with a convenient `Makefile` so you don't need to remember long commands:

| What You Want to Do | Simple Command |
| :--- | :--- |
| **Start Docker services** | `make compose-up` |
| **Check Docker service status** | `make compose-ps` |
| **View live logs** | `make compose-logs` |
| **Stop Docker services** | `make compose-down` |
| **Test Terraform plan** | `make tf-plan` |
| **Apply Terraform infra** | `make tf-apply` |
| **Cleanly destroy Terraform infra** | `make tf-destroy` |
| **Run Puppet security policy check** | `make puppet-test` |
| **Run Ansible deployment playbook** | `make ansible-deploy` |
| **Run full Milestone 06 QA suite** | `make qa-verify` |
| **Build frontend for production** | `make web-build` |
| **Clean temporary cache files** | `make clean` |

---

## 🛑 How to Stop Everything Cleanly

When you are done testing or working on AutoOps:

1. **Stop the Web Frontend:**
   - Press <kbd>Ctrl</kbd> + <kbd>C</kbd> in the terminal where `npm run dev` is running.

2. **Stop the Docker Containers:**
   ```bash
   docker compose down
   ```
   *This safely stops and removes the containers without deleting any saved data.*

---

## ❓ Frequently Asked Questions & Troubleshooting

### Q1: What if port 5000 or 8080 says "already in use"?
- On Windows, another program (like AirPlay or a background Python script) might be using port 5000.
- Check which program is using it:
  ```powershell
  Get-NetTCPConnection -LocalPort 5000 -State Listen
  ```
- Inside Docker and WSL2, `autoops-app` runs on internal bridge network `autoops-network` independently.

### Q2: WSL2 stops running when I close the window?
- WSL2 automatically sleeps after 15 seconds of inactivity. To keep it awake in the background, run:
  ```bash
  wsl -d Ubuntu-24.04 bash -c "sleep infinity"
  ```

### Q3: How do I change the Nagios password?
- Open the `.env` file in the project root and update `NAGIOSADMIN_PASS`.
- Then restart containers: `docker compose down && docker compose up -d`.

---

## 🎯 Summary
- **Frontend Dashboard:** [http://localhost:5173](http://localhost:5173)
- **Monitoring (Nagios):** [http://localhost:8080/nagios/](http://localhost:8080/nagios/) (`nagiosadmin` / `AutoOps_Rotated_2026_Secure!`)
- **FastAPI Microservice:** `http://127.0.0.1:5000/health`
- **Run Tests:** `make test`
- **Start All:** `docker compose up -d && cd web && npm run dev`
- **Stop All:** `docker compose down`
