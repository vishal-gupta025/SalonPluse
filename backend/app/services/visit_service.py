from app.models.visit import Visit
from app.models.visit_service import VisitService
from app.models.customer import Customer

from app.repositories.customer_repo import CustomerRepository
from app.repositories.service_repo import ServiceRepository

from app.repositories.visit_repo import VisitRepository
from app.repositories.visit_service_repo import VisitServiceRepository


class VisitManager:

    @staticmethod
    def create_visit(
        db,
        payload,
        owner_id
    ):

        customer = None

        # Existing customer

        if payload.customer_id:

            customer = (
                CustomerRepository
                .get_by_id(
                    db,
                    owner_id,
                    payload.customer_id
                )
            )

        # New customer

        elif payload.new_customer:

            existing_customer = None

            if payload.new_customer.phone:
                existing_customer = (
                    CustomerRepository
                    .get_by_phone(
                        db,
                        owner_id,
                        payload.new_customer.phone
                    )
                )

            if existing_customer:

                customer = existing_customer

            else:

                customer = Customer(
                    owner_id=owner_id,
                    name=payload.new_customer.name,
                    phone=payload.new_customer.phone,
                    gender=payload.new_customer.gender
                )

                db.add(customer)

                db.flush()

        else:

            raise ValueError(
                "Customer information required"
            )

        services = (
            ServiceRepository
            .get_by_ids(
                db,
                owner_id,
                payload.service_ids
            )
        )

        if not services:

            raise ValueError(
                "Services not found"
            )

        total_amount = sum(
            service.price
            for service in services
        )

        visit = Visit(
            owner_id=owner_id,
            customer_id=customer.id,
            total_amount=total_amount,
            payment_method=payload.payment_method
        )

        visit = VisitRepository.create(
            db,
            visit
        )

        for service in services:

            visit_service = VisitService(
                visit_id=visit.id,
                service_id=service.id,
                price_at_visit=service.price
            )

            VisitServiceRepository.create(
                db,
                visit_service
            )

        db.commit()

        db.refresh(visit)

        return VisitManager.get_visit_details(
            db,
            owner_id,
            visit.id
        )

    @staticmethod
    def get_visits(
        db,
        owner_id
    ):
        return VisitRepository.get_all_by_owner(
            db,
            owner_id
        )
    
    @staticmethod
    def get_visit_details(
        db,
        owner_id,
        visit_id
    ):
        visit = VisitRepository.get_by_id(
            db,
            owner_id,
            visit_id
        )

        if not visit:
            raise ValueError(
                "Visit not found"
            )

        services = (
            VisitServiceRepository
            .get_by_visit_id(
                db,
                visit_id
            )
        )

        service_details = [
            {
                "service_id": service.service_id,
                "price_at_visit": service.price_at_visit
            }
            for service in services
        ]

        return {
            "id": visit.id,
            "customer_id": visit.customer_id,
            "customer_name": visit.customer.name,
            "total_amount": visit.total_amount,
            "payment_method": visit.payment_method,
            "services": service_details
        }