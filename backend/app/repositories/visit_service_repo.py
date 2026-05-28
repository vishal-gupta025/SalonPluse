from sqlalchemy.orm import Session

from app.models.visit_service import VisitService


class VisitServiceRepository:

    @staticmethod
    def create(
        db: Session,
        visit_service: VisitService
    ):
        db.add(visit_service)

    @staticmethod
    def get_by_visit_id(
        db,
        visit_id
    ):
        return (
            db.query(VisitService)
            .filter(
                VisitService.visit_id == visit_id
            )
            .all()
        )