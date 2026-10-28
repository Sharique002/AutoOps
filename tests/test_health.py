"""Unit and integration tests for the AutoOps HTTP service."""

from datetime import datetime
import pytest
from fastapi.testclient import TestClient

from app.main import app
from app import __version__


@pytest.fixture
def client() -> TestClient:
    """Fixture providing a test client for the FastAPI application."""
    with TestClient(app) as test_client:
        yield test_client


def test_health_status_code_200(client: TestClient) -> None:
    """Verify that GET /health returns HTTP 200 OK."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("application/json")


def test_health_payload_contract(client: TestClient) -> None:
    """Verify that GET /health response adheres to the required contract."""
    response = client.get("/health")
    data = response.json()

    # Required contract keys
    assert "status" in data
    assert "service" in data
    assert "version" in data
    assert "timestamp" in data
    assert "uptime_seconds" in data

    # Contract values
    assert data["status"] == "healthy"
    assert data["service"] == "autoops"
    assert data["version"] == __version__
    assert isinstance(data["uptime_seconds"], (int, float))
    assert data["uptime_seconds"] >= 0.0


def test_health_timestamp_validity(client: TestClient) -> None:
    """Verify that the timestamp field is a valid ISO 8601 UTC format."""
    response = client.get("/health")
    data = response.json()
    # Should parse without exception
    parsed_time = datetime.fromisoformat(data["timestamp"])
    assert parsed_time.tzinfo is not None


def test_root_endpoint(client: TestClient) -> None:
    """Verify that GET / returns root service information."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "AutoOps Platform"
    assert data["status"] == "running"
    assert data["endpoints"]["health"] == "/health"


def test_invalid_route_returns_404(client: TestClient) -> None:
    """Verify that requests to undefined routes return HTTP 404 JSON."""
    response = client.get("/api/v1/invalid-route-sample")
    assert response.status_code == 404
    data = response.json()
    assert data["error"] == "Not Found"
    assert data["status_code"] == 404
    assert "detail" in data


def test_health_method_not_allowed(client: TestClient) -> None:
    """Verify that POST /health returns HTTP 405 Method Not Allowed."""
    response = client.post("/health")
    assert response.status_code == 405
    data = response.json()
    assert data["error"] == "HTTP Error"
    assert data["status_code"] == 405
