# AutoOps Top-Level Site Manifest
# Enforces desired state configuration for AutoOps host environment.

node default {
  class { 'autoops_policy':
    env_name              => 'production',
    app_port              => 5000,
    nagios_port           => 8080,
    health_endpoint       => '/health',
    health_check_interval => 10,
    health_check_timeout  => 5,
    health_check_retries  => 3,
  }
}
