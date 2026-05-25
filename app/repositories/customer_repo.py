from sqlalchemy.orm import Session

from app.models.customer import Customer


class CustomerRepository:

    @staticmethod
    def create(
        db: Session,
        customer: Customer
    ):
        db.add(customer)

        db.commit()

        db.refresh(customer)

        return customer

    @staticmethod
    def get_all_by_owner(
        db: Session,
        owner_id: int
    ):
        return (
            db.query(Customer)
            .filter(
                Customer.owner_id == owner_id
            )
            .all()
        )

    @staticmethod
    def get_by_phone(
        db: Session,
        owner_id: int,
        phone: str
    ):
        return (
            db.query(Customer)
            .filter(
                Customer.owner_id == owner_id,
                Customer.phone == phone
            )
            .first()
        )