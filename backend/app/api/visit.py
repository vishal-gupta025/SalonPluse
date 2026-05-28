from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from typing import List

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.auth import (
    get_current_user
)

from app.schemas.visit import (
    VisitCreate,
    VisitDetailResponse,
    VisitResponse
)

from app.services.visit_service import (
    VisitManager
)

router = APIRouter(
    prefix="/visits",
    tags=["Visits"]
)


@router.post(
    "",
    response_model=VisitDetailResponse
)
def create_visit(
    payload: VisitCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    try:

        return VisitManager.create_visit(
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
    response_model=list[VisitResponse]
)
def get_visits(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return VisitManager.get_visits(
        db,
        current_user.id
    )

@router.get(
    "/{visit_id}",
    response_model=VisitDetailResponse
)
def get_visit_details(
    visit_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return (
        VisitManager
        .get_visit_details(
            db,
            current_user.id,
            visit_id
        )
    )