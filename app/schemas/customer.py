from pydantic import BaseModel


class CustomerCreate(BaseModel):
    name: str
    phone: str
    gender: str | None = None


class CustomerResponse(BaseModel):
    id: int
    name: str
    phone: str
    gender: str | None

    class Config:
        from_attributes = True