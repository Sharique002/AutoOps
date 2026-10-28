.PHONY: help venv install lint test run docker-build docker-run docker-stop docker-health compose-up compose-down compose-ps compose-logs tf-init tf-plan tf-apply tf-destroy clean

VENV := .venv
PYTHON := $(VENV)/bin/python
PIP := $(VENV)/bin/pip
PYTEST := $(VENV)/bin/pytest
FLAKE8 := $(VENV)/bin/flake8
UVICORN := $(VENV)/bin/uvicorn
IMAGE_NAME := autoops-app
IMAGE_TAG := latest
CONTAINER_NAME := autoops-app-instance
APP_PORT := 5000

help:
	@echo "AutoOps Project Management Makefile"
	@echo ""
	@echo "Usage:"
	@echo "  make install         Install development and runtime dependencies into .venv"
	@echo "  make lint            Check code quality with flake8"
	@echo "  make test            Run unit tests with pytest"
	@echo "  make run             Run application locally with uvicorn on port $(APP_PORT)"
	@echo "  make docker-build    Build the Docker container image"
	@echo "  make docker-run      Run container standalone"
	@echo "  make docker-health   Query application health check"
	@echo "  make docker-stop     Stop and remove standalone container"
	@echo "  make compose-up      Start runtime services with Docker Compose"
	@echo "  make compose-down    Stop and remove Docker Compose services"
	@echo "  make compose-ps      List running Docker Compose services"
	@echo "  make compose-logs    View Docker Compose service logs"
	@echo "  make tf-init         Initialize Terraform Docker provider"
	@echo "  make tf-plan         Generate and inspect Terraform execution plan"
	@echo "  make tf-apply        Apply Terraform infrastructure resources"
	@echo "  make tf-destroy      Destroy Terraform-managed infrastructure"
	@echo "  make clean           Clean local caches and temporary files"

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

clean:
	rm -rf __pycache__ */__pycache__ .pytest_cache
