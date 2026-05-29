from app.core.timezone import indian_time

from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey

from app.core.database import Base


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    owner_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    title = Column(
        String,
        nullable=False
    )

    amount = Column(
        Float,
        nullable=False
    )

    expense_date = Column(
        DateTime,
        default=indian_time
    )

    created_at = Column(
        DateTime,
        default=indian_time
    )