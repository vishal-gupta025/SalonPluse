from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey

from sqlalchemy.orm import relationship

from app.core.database import Base


class Visit(Base):
    __tablename__ = "visits"

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

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )

    total_amount = Column(
        Float,
        nullable=False
    )

    payment_method = Column(
        String,
        nullable=False
    )

    visit_date = Column(
        DateTime,
        default=datetime.utcnow
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    visit_services = relationship(
        "VisitService",
        back_populates="visit",
        cascade="all, delete-orphan"
    )