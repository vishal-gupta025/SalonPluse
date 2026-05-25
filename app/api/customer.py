from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.auth import (
    get_current_user
)

from app.schemas.customer import (
    CustomerCreate,
    CustomerResponse
)

from app.services.customer_service import (
    CustomerService
)

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


@router.post(
    "",
    response_model=CustomerResponse
)
def create_customer(
    payload: CustomerCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    try:
        return CustomerService.create_customer(
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
    response_model=list[CustomerResponse]
)
def get_customers(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return CustomerService.get_customers(
        db,
        current_user.id
    )