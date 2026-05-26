from fastapi import FastAPI

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


app = FastAPI(title="SalonPluse")



Base.metadata.create_all(bind=engine)

app.include_router(test_router)
app.include_router(customer_router)
app.include_router(auth_router)
app.include_router(service_router)
app.include_router(visit_router)
app.include_router(expense_router)
app.include_router(analytics_router)

@app.get("/")
def home() -> dict[str, str]:
    return {"message": "Welcome to SalonPluse API"}