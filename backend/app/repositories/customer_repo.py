from sqlalchemy.orm import Session

from app.models.customer import Customer

from sqlalchemy import or_


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
        if not phone:
            return None
        
        return (
            db.query(Customer)
            .filter(
                Customer.owner_id == owner_id,
                Customer.phone == phone
            )
            .first()
        )
    
    @staticmethod
    def get_by_id(
        db: Session,
        owner_id: int,
        customer_id: int
    ):
        return (
            db.query(Customer)
            .filter(
                Customer.id == customer_id,
                Customer.owner_id == owner_id
            )
            .first()
        )
    
    @staticmethod
    def search(
        db,
        owner_id,
        query
    ):
        return (
            db.query(Customer)
            .filter(
                Customer.owner_id == owner_id
            )
            .filter(
                or_(
                    Customer.name.ilike(f"%{query}%"),
                    Customer.phone.ilike(f"%{query}%")
                )
               
            )
            .all()
        )