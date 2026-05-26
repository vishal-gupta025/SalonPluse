from sqlalchemy.orm import Session

from app.models.visit import Visit


class VisitRepository:

    @staticmethod
    def create(
        db: Session,
        visit: Visit
    ):
        db.add(visit)

        db.flush()

        return visit

    @staticmethod
    def get_all_by_owner(
        db: Session,
        owner_id: int
    ):
        return (
            db.query(Visit)
            .filter(
                Visit.owner_id == owner_id
            )
            .all()
        )
    
    @staticmethod
    def get_by_id(
        db,
        owner_id,
        visit_id
    ):
        return (
            db.query(Visit)
            .filter(
                Visit.id == visit_id,
                Visit.owner_id == owner_id
            )
            .first()
        )
    
    @staticmethod
    def get_by_customer(
        db,
        owner_id,
        customer_id
    ):
        return (
            db.query(Visit)
            .filter(
                Visit.owner_id == owner_id,
                Visit.customer_id == customer_id
            )
            .all()
        )