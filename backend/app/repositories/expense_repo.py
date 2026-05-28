from sqlalchemy.orm import Session

from app.models.expense import Expense


class ExpenseRepository:

    @staticmethod
    def create(
        db: Session,
        expense: Expense
    ):
        db.add(expense)

        db.commit()

        db.refresh(expense)

        return expense

    @staticmethod
    def get_all_by_owner(
        db: Session,
        owner_id: int
    ):
        return (
            db.query(Expense)
            .filter(
                Expense.owner_id == owner_id
            )
            .all()
        )