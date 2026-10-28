"""AutoOps HTTP Application — Minimal Production-Conscious Microservice."""

from contextlib import asynccontextmanager
from datetime import datetime, timezone
import logging
import sys
import time
from typing import Any, AsyncGenerator, Dict

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app import __version__

# Configure structured application logger
logger = logging.getLogger("autoops")
logger.setLevel(logging.INFO)
log_handler = logging.StreamHandler(sys.stdout)
formatter = logging.Formatter(
    fmt="%(asctime)s [%(levelname)s] [%(name)s] %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S%z",
)
log_handler.setFormatter(formatter)
if not logger.handlers:
    logger.addHandler(log_handler)

# Record application start time for uptime calculation
START_TIME = time.time()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Lifespan context manager for startup and shutdown events."""
    logger.info("AutoOps service starting up (version: %s)", __version__)
    yield
    uptime = time.time() - START_TIME
    logger.info(
        "AutoOps service shutting down (total uptime: %.2f seconds)",
        uptime,
    )


app = FastAPI(
    title="AutoOps HTTP Service",
    description="Minimal, observable HTTP microservice.",
    version=__version__,
    lifespan=lifespan,
    docs_url=None,  # Disabled by default in production
    redoc_url=None,
)


@app.middleware("http")
async def log_requests_middleware(request: Request, call_next: Any) -> Any:
    """Request logging middleware capturing method, path, and duration."""
    start_time = time.time()
    client_ip = request.client.host if request.client else "unknown"
    method = request.method
    path = request.url.path

    try:
        response = await call_next(request)
        duration_ms = (time.time() - start_time) * 1000.0
        logger.info(
            "HTTP %s %s [%s] -> %d (%.2f ms)",
            method,
            path,
            client_ip,
            response.status_code,
            duration_ms,
        )
        return response
    except Exception as exc:
        duration_ms = (time.time() - start_time) * 1000.0
        logger.error(
            "HTTP %s %s [%s] FAILED (%.2f ms): %s",
            method,
            path,
            client_ip,
            duration_ms,
            type(exc).__name__,
        )
        raise


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(
    request: Request, exc: StarletteHTTPException
) -> JSONResponse:
    """Graceful handler for HTTP exceptions returning predictable JSON."""
    status_code = exc.status_code
    detail = exc.detail if exc.detail else "An HTTP error occurred."
    return JSONResponse(
        status_code=status_code,
        content={
            "error": "Not Found" if status_code == 404 else "HTTP Error",
            "detail": detail,
            "status_code": status_code,
        },
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    """Handler for request validation errors."""
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": "Validation Error",
            "detail": "The request entity was unprocessable.",
            "status_code": status.HTTP_422_UNPROCESSABLE_ENTITY,
        },
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(
    request: Request, exc: Exception
) -> JSONResponse:
    """Fallback handler for unhandled exceptions, sanitizing details."""
    logger.exception(
        "Unhandled server exception encountered on %s", request.url.path
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "Internal Server Error",
            "detail": "An unexpected error occurred.",
            "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
        },
    )


@app.get("/", status_code=status.HTTP_200_OK)
async def root() -> Dict[str, Any]:
    """Root metadata endpoint."""
    return {
        "service": "AutoOps Platform",
        "version": __version__,
        "status": "running",
        "endpoints": {
            "health": "/health",
        },
    }


@app.get("/health", status_code=status.HTTP_200_OK)
async def health() -> Dict[str, Any]:
    """
    Standard Health Check Endpoint.

    Contract:
      - status: 'healthy'
      - service: 'autoops'
      - version: Semantic version string
      - timestamp: ISO 8601 UTC timestamp
      - uptime_seconds: Float seconds since startup
    """
    uptime = time.time() - START_TIME
    return {
        "status": "healthy",
        "service": "autoops",
        "version": __version__,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "uptime_seconds": round(uptime, 2),
    }
