output "network_id" {
  description = "Unique identifier of the Terraform-managed infrastructure network"
  value       = docker_network.infra_network.id
}

output "network_name" {
  description = "Name of the Terraform-managed infrastructure network"
  value       = docker_network.infra_network.name
}

output "network_subnet" {
  description = "Subnet of the infrastructure network"
  value       = var.infra_subnet
}

output "volume_name" {
  description = "Name of the Terraform-managed persistent data volume"
  value       = docker_volume.data_storage.name
}

output "sandbox_container_id" {
  description = "ID of the ephemeral infrastructure validation container"
  value       = docker_container.infra_sandbox.id
}
