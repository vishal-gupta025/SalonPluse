from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.auth import (
    get_current_user
)

from app.schemas.service import (
    ServiceCreate,
    ServiceResponse
)

from app.services.service_service import (
    ServiceService
)

router = APIRouter(
    prefix="/services",
    tags=["Services"]
)


@router.post(
    "",
    response_model=ServiceResponse
)
def create_service(
    payload: ServiceCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    try:
        return ServiceService.create_service(
            db,
            payload,
            current_user.id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.get(
    "",
    response_model=list[ServiceResponse]
)
def get_services(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return ServiceService.get_services(
        db,
        current_user.id
    )