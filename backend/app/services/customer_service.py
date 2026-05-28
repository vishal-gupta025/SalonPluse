from app.models.customer import Customer

from app.repositories.customer_repo import (
    CustomerRepository
)

from app.repositories.visit_repo import (
    VisitRepository
)

class CustomerService:

    @staticmethod
    def create_customer(
        db,
        payload,
        owner_id
    ):

        existing = (
            CustomerRepository
            .get_by_phone(
                db,
                owner_id,
                payload.phone
            )
        )

        if existing:
            raise ValueError(
                "Customer already exists"
            )

        customer = Customer(
            owner_id=owner_id,
            name=payload.name,
            phone=payload.phone,
            gender=payload.gender
        )

        return CustomerRepository.create(
            db,
            customer
        )

    @staticmethod
    def get_customers(
        db,
        owner_id
    ):
        return (
            CustomerRepository
            .get_all_by_owner(
                db,
                owner_id
            )
        )
    
    @staticmethod
    def search(
        db,
        owner_id,
        query
    ):
        return CustomerRepository.search(
            db,
            owner_id,
            query
        )
    
    @staticmethod
    def customer_history(
        db,
        owner_id,
        customer_id
    ):
        return (
            VisitRepository
            .get_by_customer(
                db,
                owner_id,
                customer_id
            )
        )