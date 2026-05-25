from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    TokenResponse
)

from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/register")
def register(
    payload: RegisterRequest,
    db: Session = Depends(get_db)
):

    try:
        return AuthService.register(
            db,
            payload
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    
@router.post("/login", response_model=TokenResponse)
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db)
):

    try:
        return AuthService.login(
            db,
            payload
        )

    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e)
        )