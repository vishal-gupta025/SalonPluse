from sqlalchemy.orm import Session

from app.models.service import Service


class ServiceRepository:

    @staticmethod
    def create(
        db: Session,
        service: Service
    ):
        db.add(service)
        db.commit()
        db.refresh(service)
        return service

    @staticmethod
    def get_all_by_owner(
        db: Session,
        owner_id: int
    ):
        return (
            db.query(Service)
            .filter(
                Service.owner_id == owner_id
            )
            .all()
        )

    @staticmethod
    def get_by_name(
        db: Session,
        owner_id: int,
        name: str
    ):
        return (
            db.query(Service)
            .filter(
                Service.owner_id == owner_id,
                Service.name == name
            )
            .first()
        )
    @staticmethod
    def get_by_ids(
        db: Session,
        owner_id: int,
        service_ids: list[int]
    ):
        return (
            db.query(Service)
            .filter(
                Service.owner_id == owner_id,
                Service.id.in_(service_ids)
            )
            .all()
        )