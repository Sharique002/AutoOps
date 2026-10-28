.PHONY: help venv install lint test run docker-build docker-run docker-stop docker-health compose-up compose-down compose-ps compose-logs tf-init tf-plan tf-apply tf-destroy puppet-lint puppet-validate puppet-apply puppet-test ansible-syntax ansible-preflight ansible-deploy ansible-smoke ansible-verify ansible-test nagios-verify nagios-test nagios-logs nagios-dashboard check-secrets ci-test clean

-include .env
export

VENV := .venv
PYTHON := $(VENV)/bin/python
PIP := $(VENV)/bin/pip
PYTEST := $(VENV)/bin/pytest
FLAKE8 := $(VENV)/bin/flake8
UVICORN := $(VENV)/bin/uvicorn
IMAGE_NAME := autoops-app
IMAGE_TAG := latest
CONTAINER_NAME := autoops-app-instance
APP_PORT ?= 5000
NAGIOS_PORT ?= 8080
NAGIOSADMIN_USER ?= nagiosadmin
NAGIOSADMIN_PASS ?= ChangeMeToAStrongPassword123!
ANSIBLE_CFG := $(CURDIR)/ansible/ansible.cfg

help:
	@echo "AutoOps Project Management Makefile"
	@echo ""
	@echo "Usage:"
	@echo "  make install           Install development and runtime dependencies into .venv"
	@echo "  make lint              Check code quality with flake8"
	@echo "  make test              Run unit tests with pytest"
	@echo "  make run               Run application locally with uvicorn on port $(APP_PORT)"
	@echo "  make docker-build      Build the Docker container image"
	@echo "  make docker-run        Run container standalone"
	@echo "  make docker-health     Query application health check"
	@echo "  make docker-stop       Stop and remove standalone container"
	@echo "  make compose-up        Start runtime services with Docker Compose"
	@echo "  make compose-down      Stop and remove Docker Compose services"
	@echo "  make compose-ps        List running Docker Compose services"
	@echo "  make compose-logs      View Docker Compose service logs"
	@echo "  make tf-init           Initialize Terraform Docker provider"
	@echo "  make tf-plan           Generate and inspect Terraform execution plan"
	@echo "  make tf-apply          Apply Terraform infrastructure resources"
	@echo "  make tf-destroy        Destroy Terraform-managed infrastructure"
	@echo "  make puppet-lint       Lint Puppet manifests with puppet-lint"
	@echo "  make puppet-validate   Validate Puppet syntax with parser validate"
	@echo "  make puppet-apply      Apply Puppet policy configuration"
	@echo "  make puppet-test       Run full Puppet verification test suite"
	@echo "  make ansible-syntax    Validate Ansible playbooks syntax"
	@echo "  make ansible-preflight Run Ansible preflight verification playbook"
	@echo "  make ansible-deploy    Deploy application via Ansible orchestration"
	@echo "  make ansible-smoke     Run Ansible smoke testing playbook"
	@echo "  make ansible-verify    Run Ansible end-to-end audit verification"
	@echo "  make ansible-test      Run full Ansible verification test suite"
	@echo "  make nagios-verify     Validate Nagios configuration syntax"
	@echo "  make nagios-test       Run full Nagios monitoring & recovery test suite"
	@echo "  make nagios-logs       Follow Nagios service logs in Docker Compose"
	@echo "  make nagios-dashboard  Check Nagios web dashboard availability"
	@echo "  make check-secrets     Scan repository for exposed secrets & credentials"
	@echo "  make ci-test           Run complete local suite of CI quality gates"
	@echo "  make clean             Clean local caches and temporary files"

venv:
	@test -d $(VENV) || python3 -m venv $(VENV)

install: venv
	$(PIP) install --no-cache-dir -r requirements-dev.txt

lint:
	$(FLAKE8) app tests

test:
	$(PYTEST) -v tests

run:
	$(UVICORN) app.main:app --host 0.0.0.0 --port $(APP_PORT) --reload

docker-build:
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .

docker-run:
	docker run -d --name $(CONTAINER_NAME) -p $(APP_PORT):$(APP_PORT) $(IMAGE_NAME):$(IMAGE_TAG)

docker-health:
	curl -s http://127.0.0.1:$(APP_PORT)/health | jq . || curl -s http://127.0.0.1:$(APP_PORT)/health

docker-stop:
	-docker stop $(CONTAINER_NAME)
	-docker rm $(CONTAINER_NAME)

compose-up:
	docker compose up -d

compose-down:
	docker compose down

compose-ps:
	docker compose ps

compose-logs:
	docker compose logs -f

tf-init:
	cd terraform && terraform init

tf-plan:
	cd terraform && terraform plan

tf-apply:
	cd terraform && terraform apply -auto-approve

tf-destroy:
	cd terraform && terraform destroy -auto-approve

puppet-lint:
	puppet-lint --fail-on-warnings puppet/manifests/site.pp puppet/modules/autoops_policy/manifests/init.pp

puppet-validate:
	puppet parser validate puppet/manifests/site.pp puppet/modules/autoops_policy/manifests/init.pp
	puppet epp validate puppet/modules/autoops_policy/templates/autoops_policy.conf.epp

puppet-apply:
	sudo puppet apply --modulepath=$(CURDIR)/puppet/modules $(CURDIR)/puppet/manifests/site.pp

puppet-test:
	./scripts/test_puppet.sh

ansible-syntax:
	ANSIBLE_CONFIG=$(ANSIBLE_CFG) ansible-playbook -i ansible/inventory/hosts.ini --syntax-check ansible/playbooks/*.yml

ansible-preflight:
	ANSIBLE_CONFIG=$(ANSIBLE_CFG) ansible-playbook -i ansible/inventory/hosts.ini ansible/playbooks/01_preflight.yml

ansible-deploy:
	ANSIBLE_CONFIG=$(ANSIBLE_CFG) ansible-playbook -i ansible/inventory/hosts.ini ansible/playbooks/02_deploy.yml

ansible-smoke:
	ANSIBLE_CONFIG=$(ANSIBLE_CFG) ansible-playbook -i ansible/inventory/hosts.ini ansible/playbooks/03_smoke_test.yml

ansible-verify:
	ANSIBLE_CONFIG=$(ANSIBLE_CFG) ansible-playbook -i ansible/inventory/hosts.ini ansible/playbooks/04_verify.yml

ansible-test:
	./scripts/test_ansible.sh

nagios-verify:
	docker run --rm -v $(CURDIR)/nagios/nagios.cfg:/opt/nagios/etc/nagios.cfg:ro -v $(CURDIR)/nagios/conf.d:/opt/nagios/etc/conf.d:ro jasonrivers/nagios:latest /usr/local/bin/nagios -v /opt/nagios/etc/nagios.cfg

nagios-test:
	./scripts/test_nagios.sh

nagios-logs:
	docker compose logs -f autoops-nagios

nagios-dashboard:
	@echo "Querying Nagios dashboard on port $(NAGIOS_PORT)..."
	@curl -s -I -u "$(NAGIOSADMIN_USER):$(NAGIOSADMIN_PASS)" http://127.0.0.1:$(NAGIOS_PORT)/nagios/

check-secrets:
	./scripts/check_secrets.sh

ci-test:
	./scripts/test_ci_local.sh

clean:
	rm -rf __pycache__ */__pycache__ .pytest_cache
