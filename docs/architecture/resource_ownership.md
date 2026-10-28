# AutoOps — Resource Ownership & Isolation Matrix

## 1. Principles of Separation

To eliminate state collisions, race conditions, and accidental destruction, operational and resource management responsibilities are partitioned strictly between **Docker Compose**, **Terraform**, **Puppet**, and **Ansible**.

Under no circumstances does any tool modify, overwrite, or assume lifecycle ownership of resources declared and managed by another tool:
- **Docker Compose** owns the application microservice container and its dedicated local bridge network.
- **Terraform** owns auxiliary infrastructure (isolated audit network, persistent backup volume, validator container).
- **Puppet** owns host-level configuration management and policy enforcement under `/etc/autoops/`.
- **Ansible** orchestrates deployment execution, preflight validation, health smoke tests, and end-to-end operational audits without creating or claiming IaC state.

---

## 2. Resource Allocation Matrix

| Resource Identifier | Resource Type | Managing Tool | State File / Manifest | Scope & Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **`autoops-app`** | Container | **Docker Compose** | `compose.yaml` | Application runtime microservice exposing port 5000 |
| **`autoops-network`** | Docker Network | **Docker Compose** | `compose.yaml` | Dedicated bridge network (172.18.0.0/16) for app & monitoring |
| **`autoops-nagios`** | Container | **Docker Compose** | `compose.yaml` | Observability runtime polling `/health` on 127.0.0.1:8080 |
| **`autoops-infra-net`** | Docker Network | **Terraform** | `terraform/main.tf` | Isolated infrastructure audit & management network (172.28.0.0/16) |
| **`autoops-data-storage`** | Docker Volume | **Terraform** | `terraform/main.tf` | Persistent auxiliary storage for operational artifacts |
| **`autoops-infra-sandbox`**| Container | **Terraform** | `terraform/main.tf` | Ephemeral IaC verification container validating storage & network |
| **`/etc/autoops/autoops_policy.conf`** | Config File | **Puppet** | `puppet/manifests/site.pp` | Host policy defining environment, ports, and boundaries |
| **Deployment Orchestration** | Playbooks | **Ansible** | `ansible/playbooks/*.yml` | Automated preflight, rolling restart, smoke test, and verification |

---

## 3. Justification for Tool-Specific Scopes

### A. Terraform Use Case (Infrastructure as Code)
Core infrastructure (audit networks, persistent backup storage, and validation testbeds) is provisioned via Terraform:
1. **`autoops_infra_net`**: Provisions an isolated internal subnet (`172.28.0.0/16`) designated for operational tasks, distinct from the developer application network.
2. **`autoops_data_storage`**: Provisions a labeled Docker volume for infrastructure backup archives with driver labels indicating lifecycle policies.
3. **`autoops_infra_sandbox`**: Provides an automated, ephemeral validation container that tests volume write permissions and network attachment under Terraform state management without interfering with runtime services.

### B. Puppet Use Case (Desired-State Configuration Management)
System-level configuration drift is a major source of outages. Puppet manages host-level operational contracts:
1. **Host Policy (`/etc/autoops/autoops_policy.conf`)**: Centralized system configuration specifying valid runtime ports (5000 for app, 8080 for Nagios), health check thresholds, and resource ownership boundaries.
2. **Idempotent Drift Enforcement**: Automatically detects unauthorized manual modifications (such as port tampering) and restores the declared policy without requiring system reboot or manual intervention.

### C. Ansible Use Case (Deployment Automation & Orchestration)
Procedural orchestration requires coordinated steps across disparate tools:
1. **Preflight Checks**: Verifies Docker daemon health, Compose CLI readiness, and presence of Puppet configuration prior to deployment.
2. **Deployment Execution**: Triggers container rebuild and rolling container recreation using Docker Compose CLI.
3. **Automated Health Probes**: Executes HTTP smoke tests validating HTTP status 200, JSON schema contracts, and 404 error handlers.
4. **End-to-End Auditing**: Asserts all architectural boundaries across Compose, Terraform, and Puppet remain intact.

### D. Nagios Use Case (Active Observability & Failure Detection)
Continuous external health surveillance guarantees proactive notification:
1. **Read-Only Inspection**: Nagios operates exclusively as a consumer of health telemetry; it owns no application state or infrastructure.
2. **Network Scoping**: Attached strictly to `autoops-network` to resolve `autoops-app:5000` internally via Docker DNS, with the web UI bound locally to `127.0.0.1:8080`.
3. **Failure Isolation**: If the application crashes or is stopped, Nagios records the state change independently without impacting or modifying Compose or Terraform states.
