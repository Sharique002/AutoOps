# @summary Manages AutoOps host configuration and operational policy.
#
# This class declares and manages the host-level policy configuration
# for the AutoOps platform, establishing strict resource partitioning,
# service port contracts, and monitoring intervals.
#
# @param env_name
#   Name of the operational environment (e.g., 'production', 'staging').
# @param app_port
#   Port assigned to the AutoOps FastAPI microservice.
# @param nagios_port
#   Port assigned to the Nagios observability dashboard.
# @param health_endpoint
#   Endpoint path for application health probes.
# @param health_check_interval
#   Interval in seconds between health check queries.
# @param health_check_timeout
#   Timeout in seconds for health check responses.
# @param health_check_retries
#   Number of failed probes before raising an alert.
# @param config_dir
#   Path to the AutoOps system configuration directory.
# @param policy_file
#   Full path to the policy configuration file.
class autoops_policy (
  String[1]            $env_name              = 'production',
  Integer[1024, 65535] $app_port              = 5000,
  Integer[1024, 65535] $nagios_port           = 8080,
  String[1]            $health_endpoint       = '/health',
  Integer[1, 300]      $health_check_interval = 10,
  Integer[1, 60]       $health_check_timeout  = 5,
  Integer[1, 10]       $health_check_retries  = 3,
  String[1]            $config_dir            = '/etc/autoops',
  String[1]            $policy_file           = '/etc/autoops/autoops_policy.conf',
) {
  file { $config_dir:
    ensure => directory,
    owner  => 'root',
    group  => 'root',
    mode   => '0755',
  }

  file { $policy_file:
    ensure  => file,
    owner   => 'root',
    group   => 'root',
    mode    => '0644',
    content => epp('autoops_policy/autoops_policy.conf.epp', {
      'env_name'              => $env_name,
      'app_port'              => $app_port,
      'nagios_port'           => $nagios_port,
      'health_endpoint'       => $health_endpoint,
      'health_check_interval' => $health_check_interval,
      'health_check_timeout'  => $health_check_timeout,
      'health_check_retries'  => $health_check_retries,
    }),
    require => File[$config_dir],
  }
}
