from sqlalchemy import Column, Integer, Float, ForeignKey

from sqlalchemy.orm import relationship

from app.core.database import Base


class VisitService(Base):
    __tablename__ = "visit_services"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    visit_id = Column(
        Integer,
        ForeignKey("visits.id"),
        nullable=False
    )

    service_id = Column(
        Integer,
        ForeignKey("services.id"),
        nullable=False
    )

    price_at_visit = Column(
        Float,
        nullable=False
    )

    visit = relationship(
        "Visit",
        back_populates="visit_services"
    )