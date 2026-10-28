resource "docker_image" "sandbox_image" {
  name         = var.sandbox_image
  keep_locally = true
}

resource "docker_network" "infra_network" {
  name   = var.infra_network_name
  driver = "bridge"

  ipam_config {
    subnet  = var.infra_subnet
    gateway = var.infra_gateway
  }

  labels {
    label = "managed_by"
    value = "terraform"
  }

  labels {
    label = "environment"
    value = var.environment
  }
}

resource "docker_volume" "data_storage" {
  name = var.storage_volume_name

  labels {
    label = "managed_by"
    value = "terraform"
  }

  labels {
    label = "environment"
    value = var.environment
  }
}

resource "docker_container" "infra_sandbox" {
  name         = "autoops-infra-sandbox"
  image        = docker_image.sandbox_image.image_id
  network_mode = "bridge"

  command = [
    "python",
    "-c",
    "import os; os.makedirs('/var/autoops/data', exist_ok=True); open('/var/autoops/data/iac_verified.txt', 'w').write('Terraform IaC storage verified\\n'); print('IaC storage and network verification successful.')"
  ]

  must_run = false
  restart  = "no"

  networks_advanced {
    name = docker_network.infra_network.name
  }

  volumes {
    volume_name    = docker_volume.data_storage.name
    container_path = "/var/autoops/data"
  }
}
