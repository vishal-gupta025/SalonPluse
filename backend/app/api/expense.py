from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.auth import (
    get_current_user
)

from app.schemas.expense import (
    ExpenseCreate,
    ExpenseResponse
)

from app.services.expense_service import (
    ExpenseService
)

router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"]
)


@router.post(
    "",
    response_model=ExpenseResponse
)
def create_expense(
    payload: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return ExpenseService.create_expense(
        db,
        payload,
        current_user.id
    )


@router.get(
    "",
    response_model=list[ExpenseResponse]
)
def get_expenses(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return ExpenseService.get_expenses(
        db,
        current_user.id
    )