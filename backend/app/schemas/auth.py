from pydantic import BaseModel, EmailStr
from typing import Optional

from pydantic import (
    BaseModel,
    EmailStr,
    field_validator
)

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: str

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, value):
        if not value.isdigit():
            raise ValueError("Phone number must contain only digits")
        if len(value) != 10:
            raise ValueError("Phone number must be 10 digits long")
        return value

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
