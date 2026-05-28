from app.models.expense import Expense

from app.repositories.expense_repo import (
    ExpenseRepository
)


class ExpenseService:

    @staticmethod
    def create_expense(
        db,
        payload,
        owner_id
    ):

        expense = Expense(
            owner_id=owner_id,
            title=payload.title,
            amount=payload.amount
        )

        return ExpenseRepository.create(
            db,
            expense
        )

    @staticmethod
    def get_expenses(
        db,
        owner_id
    ):

        return (
            ExpenseRepository
            .get_all_by_owner(
                db,
                owner_id
            )
        )