from fastapi import FastAPI

from app.api.customer import router as customer_router
from app.api.auth import router as auth_router
from app.core.database import Base, engine
from app.api.test import router as test_router
from app.models.customer import Customer  
from app.models.user import User


app = FastAPI(title="SalonPluse")



Base.metadata.create_all(bind=engine)

app.include_router(test_router)
app.include_router(customer_router)
app.include_router(auth_router)


@app.get("/")
def home() -> dict[str, str]:
    return {"message": "Welcome to SalonPluse API"}