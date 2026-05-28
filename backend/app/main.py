from fastapi import FastAPI
from fastapi import Request
from fastapi import status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_redoc_html, get_swagger_ui_html
from fastapi.responses import JSONResponse

from secrets import compare_digest
from base64 import b64decode

from app.api.customer import router as customer_router
from app.api.service import router as service_router
from app.api.auth import router as auth_router
from app.core.database import Base, engine
from app.api.test import router as test_router
from app.api.visit import router as visit_router
from app.api.expense import router as expense_router
from app.api.analytics import router as analytics_router
from app.models.customer import Customer  
from app.models.user import User
from app.models.service import Service
from app.models.visit import Visit
from app.models.visit_service import VisitService
from app.models.expense import Expense
from app.core.config import settings


app = FastAPI(
    title="Bizora",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)


def _validate_basic_auth(authorization_header: str | None) -> bool:
    if not authorization_header:
        return False

    scheme, _, token = authorization_header.partition(" ")
    if scheme.lower() != "basic" or not token:
        return False

    try:
        decoded = b64decode(token).decode("utf-8")
        username, _, password = decoded.partition(":")
    except Exception:
        return False

    return (
        compare_digest(username, settings.ADMIN_USERNAME)
        and compare_digest(password, settings.ADMIN_PASSWORD)
    )


@app.middleware("http")
async def protect_admin_and_docs(request: Request, call_next):
    protected_paths = {
        "/docs",
        "/redoc",
        "/openapi.json",
    }

    path = request.url.path.rstrip("/") or "/"

    if path in protected_paths or path.startswith("/admin"):
        if not _validate_basic_auth(request.headers.get("authorization")):
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Not authenticated"},
                headers={"WWW-Authenticate": 'Basic realm="Bizora Admin"'},
            )

    return await call_next(request)


@app.get("/openapi.json", include_in_schema=False)
def openapi_schema():
    return app.openapi()


@app.get("/docs", include_in_schema=False)
def swagger_docs():
    return get_swagger_ui_html(
        openapi_url="/openapi.json",
        title="Bizora API Docs",
    )


@app.get("/redoc", include_in_schema=False)
def redoc_docs():
    return get_redoc_html(
        openapi_url="/openapi.json",
        title="Bizora API Docs",
    )



Base.metadata.create_all(bind=engine)

app.include_router(test_router)
app.include_router(customer_router)
app.include_router(auth_router)
app.include_router(service_router)
app.include_router(visit_router)
app.include_router(expense_router)
app.include_router(analytics_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

