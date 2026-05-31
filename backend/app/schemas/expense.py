from datetime import datetime

from pydantic import BaseModel, Field


class ExpenseCreate(BaseModel):
    title: str
    amount: float = Field(..., gt=0)


class ExpenseResponse(BaseModel):
    id: int
    title: str
    amount: float
    expense_date: datetime | None = None
    created_at: datetime | None = None

    class Config:
        from_attributes = True