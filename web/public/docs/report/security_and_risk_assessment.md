# AutoOps — Security Architecture & Risk Assessment Report

## 1. Executive Summary & Security Objectives

Security in the **AutoOps** platform is designed around the principles of **Least Privilege**, **Defense in Depth**, **Immutability**, and **Zero Committed Secrets**. Rather than treating security as an afterthought, hardening controls are enforced directly at the container engine, configuration management, orchestration, and continuous integration layers.

---

## 2. STRIDE Threat Modeling Analysis

| Threat Category | Threat Description | AutoOps Mitigation Strategy | Architectural Verification |
| :--- | :--- | :--- | :--- |
| **Spoofing** | Unauthorized access to monitoring dashboard | HTTP Basic Authentication with htpasswd; binding strictly to `127.0.0.1:8080` prevents LAN/WAN access. | `curl` unauthorized test returns HTTP 401; dashboard only accessible with credentials. |
| **Tampering** | In-container malware execution modifying application code or host filesystem | Container rootfs mounted immutable (`read_only: true`); all Linux capabilities dropped (`cap_drop: [ALL]`); Puppet automatically restores tampered policy files. | Container rejects file writes (`touch /app/evil.sh` fails); Puppet detects drift and reverts port edits. |
| **Repudiation** | Unaudited actions or lack of incident trace | Uvicorn outputs structured request timestamps; Nagios Core maintains hard/soft state change logs with UNIX epoch timestamps in `/opt/nagios/var/nagios.log`. | Auditable alert transitions captured in `docs/evidence/nagios_verification.txt`. |
| **Information Disclosure** | Leakage of API keys, tokens, or environment passwords in Git or CI logs | Pre-commit secret scanning (`check_secrets.sh`); `.env` git-ignored; placeholders in `.env.example`; password output suppressed via `@curl`. | Automated hygiene scanner confirms 0 leaks in tracked repository files. |
| **Denial of Service** | Resource exhaustion crashing the host or adjacent containers | Explicit memory and CPU boundaries (`mem_limit: 512m`, `cpus: 1.0` for app; `mem_limit: 1024m`, `cpus: 1.5` for Nagios). | Docker engine enforces hard limits; `docker inspect` confirms Memory = 536870912 bytes. |
| **Elevation of Privilege** | Container escape granting root privileges on the WSL2 host | Process runs as non-root user `appuser` (UID 10001, GID 10001); kernel flag `no-new-privileges: true` prohibits setuid binaries. | Verified `ReadonlyRootfs: true`, `SecurityOpt: [no-new-privileges:true]`, and non-root execution. |

---

## 3. Container Hardening Specifications

### Application Container (`autoops-app`)
1. **User Non-Root Execution**:
   - Declared in `Dockerfile`: `USER appuser` (UID 10001, GID 10001).
   - Prevents an attacker from gaining root access even in the event of an arbitrary code execution vulnerability.
2. **Immutable Root Filesystem (`read_only: true`)**:
   - The root filesystem is mounted completely read-only.
   - Attackers cannot write modified binaries, upload reverse shells, or mutate application code.
3. **Volatile Memory Mounts (`tmpfs`)**:
   - Writable storage is limited to a RAM-backed `/tmp` mount (`tmpfs:rw,noexec,nosuid,size=64m`).
   - Binaries placed in `/tmp` cannot be executed due to `noexec`.
4. **Capability Dropping (`cap_drop: [ALL]`)**:
   - All standard Linux kernel capabilities (`CAP_NET_ADMIN`, `CAP_SYS_ADMIN`, `CAP_CHOWN`, etc.) are stripped from the container process.
5. **Privilege Escalation Prevention (`no-new-privileges: true`)**:
   - Ensures that child processes cannot acquire additional privileges via `setuid` or `setgid` executables.
6. **Resource Limits**:
   - `mem_limit: 512m` and `cpus: 1.0` guarantee that memory leaks or denial-of-service loops cannot starve host memory.

### Observability Container (`autoops-nagios`)
1. **Host Port Boundary (`127.0.0.1:8080:80`)**:
   - Container port 80 is forwarded strictly to the local loopback interface (`127.0.0.1`), ensuring the administration panel is inaccessible across the local network or public internet.
2. **Read-Only Configuration Mounts**:
   - Host configuration files (`nagios.cfg`, `conf.d/autoops.cfg`) are mounted with the `:ro` flag.
3. **Privilege Hardening**:
   - `security_opt: [no-new-privileges:true]` enforced.
4. **Resource Limits**:
   - `mem_limit: 1024m` and `cpus: 1.5`.

---

## 4. Credential Remediation & Historical Exposure Audit

### Assessment of Previously Disclosed Test Credential
During Milestone 04 development, an ephemeral local testing credential (`[REDACTED_LOCAL_TEST_PASS]`) was utilized for intra-container dashboard verification. A comprehensive risk evaluation established:
- **Scope**: The credential was purely local to a standalone container running inside WSL2 on localhost; it was not associated with any cloud, external, corporate, or production infrastructure.
- **Exposure in History**: Commit `0d89282` contains the string in Git history.
- **Remediation Action**:
  - In adherence to strict operational guidelines (*"Do not rewrite Git history or force-push without explicit approval"*), Git history was preserved intact.
  - The active container credential was rotated to an uncommitted secret stored in `.env`.
  - All tracked template files ([`nagios/.env.example`](file:///D:/files/OneDrive/Desktop/AutoOps/nagios/.env.example) and [`.env.example`](file:///D:/files/OneDrive/Desktop/AutoOps/.env.example)) were updated with generic placeholders: `ChangeMeToAStrongPassword123!`.
  - All occurrences in [`compose.yaml`](file:///D:/files/OneDrive/Desktop/AutoOps/compose.yaml), [`Makefile`](file:///D:/files/OneDrive/Desktop/AutoOps/Makefile), and [`scripts/test_nagios.sh`](file:///D:/files/OneDrive/Desktop/AutoOps/scripts/test_nagios.sh) were removed.
  - Automated scanner [`scripts/check_secrets.sh`](file:///D:/files/OneDrive/Desktop/AutoOps/scripts/check_secrets.sh) was authored and integrated into CI, actively verifying that no tracked files contain high-entropy keys, private keys, or rotated test passwords.

---

## 5. Residual Risks & Future Security Roadmap

1. **Host Docker Socket Access**:
   - *Risk*: Running Docker commands requires membership in the `docker` Unix group, which provides root-equivalent access to the host.
   - *Mitigation*: In production, Docker Rootless mode or a dedicated daemon authorization plugin should be introduced.
2. **Nagios In-Container Daemon Execution**:
   - *Risk*: `jasonrivers/nagios:latest` runs Apache as `nagios` user but initializes runit as root internally.
   - *Mitigation*: Re-architect Nagios Core into a distroless multi-stage image running strictly under UID 1000.
3. **HTTP Transport Encryption (TLS)**:
   - *Risk*: Intra-container communication currently uses unencrypted HTTP/1.1 over Docker bridge network `autoops-network`.
   - *Mitigation*: Deploy an mTLS service mesh (e.g., Traefik or Envoy sidecar) for encrypted inter-service traffic.
