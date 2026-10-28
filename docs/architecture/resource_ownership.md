# AutoOps — Resource Ownership & Isolation Matrix

## 1. Principles of Separation

To eliminate state collisions, race conditions, and accidental destruction, resource management responsibilities are partitioned strictly between **Docker Compose** and **Terraform**.

Under no circumstances does either tool manage, modify, or assume ownership of resources declared in the other.

---

## 2. Resource Allocation Matrix

| Resource Identifier | Resource Type | Managing Tool | State File / Manifest | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `autoops-app` | Container | **Docker Compose** | `compose.yaml` | Application runtime microservice exposing port 5000 |
| `autoops-network` | Docker Network | **Docker Compose** | `compose.yaml` | Dedicated bridge network for application & monitoring |
| `autoops-nagios` | Container | **Docker Compose** | `compose.yaml` (Milestone 04) | Observability runtime polling `/health` |
| `autoops-infra-net` | Docker Network | **Terraform** | `terraform/main.tf` | Isolated infrastructure audit & management network |
| `autoops-data-storage` | Docker Volume | **Terraform** | `terraform/main.tf` | Persistent auxiliary storage for operational artifacts |
| `autoops-infra-sandbox`| Container | **Terraform** | `terraform/main.tf` | Ephemeral IaC verification container validating storage & network |

---

## 3. Justification for Terraform Use Case

In a real-world multi-tiered production environment, core infrastructure (such as audit networks, centralized backup volumes, and infrastructure verification gates) is provisioned via Infrastructure as Code (Terraform) by platform engineers, while application deployment stacks are orchestrated via Compose or deployment engines by developers.

In AutoOps:
1. **`autoops_infra_net`**: Provisions an isolated internal subnet (`172.28.0.0/16`) designated for operational tasks, distinct from the developer application network.
2. **`autoops_data_storage`**: Provisions a labeled Docker volume for infrastructure backup archives, configured with driver labels indicating lifecycle policies.
3. **`autoops_infra_sandbox`**: Provides an automated, ephemeral validation container that tests volume write permissions and network attachment under Terraform state management without interfering with runtime services.
