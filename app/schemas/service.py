from pydantic import BaseModel


class ServiceCreate(BaseModel):
    name: str
    price: float
    description: str | None = None


class ServiceResponse(BaseModel):
    id: int
    name: str
    price: float
    description: str | None

    class Config:
        from_attributes = True