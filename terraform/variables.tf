variable "infra_network_name" {
  type        = string
  description = "Name of the isolated infrastructure management network"
  default     = "autoops-infra-net"
}

variable "infra_subnet" {
  type        = string
  description = "Subnet CIDR allocated to the infrastructure network"
  default     = "172.28.0.0/16"
}

variable "infra_gateway" {
  type        = string
  description = "Gateway IP for the infrastructure network subnet"
  default     = "172.28.0.1"
}

variable "storage_volume_name" {
  type        = string
  description = "Name of the persistent auxiliary volume for infrastructure artifacts"
  default     = "autoops-data-storage"
}

variable "environment" {
  type        = string
  description = "Deployment environment classification"
  default     = "local-dev"
}

variable "sandbox_image" {
  type        = string
  description = "Local Docker image for the infrastructure verification sandbox"
  default     = "python:3.12-slim"
}
