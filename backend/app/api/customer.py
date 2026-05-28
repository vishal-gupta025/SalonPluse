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

from fastapi import Query

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

@router.get(
    "/search",
    response_model=list[CustomerResponse]
)
def search_customers(
    query: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return CustomerService.search(
        db,
        current_user.id,
        query
    )

@router.get(
    "/{customer_id}/visits"
)
def customer_visit_history(
    customer_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return (
        CustomerService
        .customer_history(
            db,
            current_user.id,
            customer_id
        )
    )