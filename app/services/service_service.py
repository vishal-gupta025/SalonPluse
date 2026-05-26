from app.models.service import Service

from app.repositories.service_repo import (
    ServiceRepository
)


class ServiceService:

    @staticmethod
    def create_service(
        db,
        payload,
        owner_id
    ):

        existing = (
            ServiceRepository.get_by_name(
                db,
                owner_id,
                payload.name
            )
        )

        if existing:
            raise ValueError(
                "Service already exists"
            )

        service = Service(
            owner_id=owner_id,
            name=payload.name,
            price=payload.price,
            description=payload.description
        )

        return ServiceRepository.create(
            db,
            service
        )

    @staticmethod
    def get_services(
        db,
        owner_id
    ):
        return (
            ServiceRepository.get_all_by_owner(
                db,
                owner_id
            )
        )