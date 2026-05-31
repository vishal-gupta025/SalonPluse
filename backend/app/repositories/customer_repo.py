from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.visit import Visit
from sqlalchemy import func

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
        db,
        owner_id,
        customer_id
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

    @staticmethod
    def get_customers_by_date(
        db,
        owner_id: int,
        visit_date
    ):
        # Join with Visit and return distinct customers who had visits on visit_date
        rows = (
            db.query(
                Customer.id,
                Customer.name,
                Customer.phone,
                Customer.gender
            )
            .join(Visit, Visit.customer_id == Customer.id)
            .filter(
                Customer.owner_id == owner_id,
                func.date(Visit.visit_date) == visit_date
            )
            .distinct()
            .all()
        )

        # Map rows to dicts matching CustomerResponse
        result = []
        for r in rows:
            result.append({
                "id": r.id,
                "name": r.name,
                "phone": r.phone,
                "gender": r.gender,
            })

        return result