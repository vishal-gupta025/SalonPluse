from typing import Optional

from pydantic import BaseModel, field_validator
import re



class CustomerCreate(BaseModel):
    name: str
    phone: Optional[str] = None
    gender: Optional[str] = None

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, value):
        if value is None or value == "":
            return value
        if not value.isdigit():
            raise ValueError("Phone number must contain only digits")
        if len(value) != 10:
            raise ValueError("Phone number must be 10 digits long")
        return value

class CustomerResponse(BaseModel):
    id: int
    name: str
    phone: Optional[str]=None
    gender: Optional[str]=None

    class Config:
        from_attributes = True