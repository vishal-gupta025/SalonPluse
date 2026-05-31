from sqlalchemy.orm import Session

from app.models.visit import Visit

from app.models.customer import Customer

from app.models.visit_service import VisitService

from app.models.service import Service

from sqlalchemy import func


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
    db,
    owner_id
    ):

        visits = (
            db.query(
                Visit.id,
                Customer.name.label(
                    "customer_name"
                ),
                Visit.total_amount,
                Visit.payment_method,
                Visit.visit_date
            )
            .join(
                Customer,
                Visit.customer_id == Customer.id
            )
            .filter(
                Visit.owner_id == owner_id
            )
            .all()
        )

        result=[]

        for visit in visits:
            services = (
                db.query(Service.name)
                .join(
                    VisitService,
                    VisitService.service_id
                    == Service.id
                )
                .filter(
                    VisitService.visit_id
                    == visit.id
                )
                .all()
            )

            service_names = [
                service.name
                for service in services
            ]

            result.append({

                "id": visit.id,

                "customer_name":
                visit.customer_name,

                "services":
                service_names,

                "total_amount":
                visit.total_amount,

                "payment_method":
                visit.payment_method,

                "visit_date":
                visit.visit_date.strftime(
                    "%Y-%m-%d"
                )
            })

        return result

    @staticmethod
    def get_by_date(
        db,
        owner_id,
        visit_date
    ):

        visits = (
            db.query(
                Visit.id,
                Customer.name.label(
                    "customer_name"
                ),
                Visit.total_amount,
                Visit.payment_method,
                Visit.visit_date
            )
            .join(
                Customer,
                Visit.customer_id == Customer.id
            )
            .filter(
                Visit.owner_id == owner_id,
                func.date(
                    Visit.visit_date
                ) == visit_date
            )
            .all()
        )

        result = []

        for visit in visits:

            services = (
                db.query(Service.name)
                .join(
                    VisitService,
                    VisitService.service_id
                    == Service.id
                )
                .filter(
                    VisitService.visit_id
                    == visit.id
                )
                .all()
            )

            result.append({

                "id": visit.id,

                "customer_name":
                visit.customer_name,

                "services":
                [s.name for s in services],

                "total_amount":
                visit.total_amount,

                "payment_method":
                visit.payment_method,

                "visit_date":
                visit.visit_date.strftime(
                    "%Y-%m-%d"
                )
            })

        return result


    
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

        visits = (
            db.query(Visit)
            .filter(
                Visit.owner_id == owner_id,
                Visit.customer_id == customer_id
            )
            .order_by(
                Visit.visit_date.desc()
            )
            .all()
        )

        result = []

        for visit in visits:

            services = [
                vs.service.name
                for vs in visit.visit_services
            ]

            result.append({

                "id": visit.id,

                "visit_date":
                visit.visit_date,

                "payment_method":
                visit.payment_method,

                "total_amount":
                visit.total_amount,

                "services":
                services
            })

        return result