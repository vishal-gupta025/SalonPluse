from datetime import datetime
from datetime import timedelta

from app.core.timezone import indian_time

from sqlalchemy import func

from app.models.visit import Visit
from app.models.service import Service
from app.models.visit_service import VisitService
from app.models.expense import Expense
from app.models.customer import Customer

class AnalyticsRepository:

    # Today's Revenue
    @staticmethod
    def get_today_revenue(
        db,
        owner_id
    ):

        today = indian_time().date()

        revenue = (
            db.query(
                func.sum(
                    Visit.total_amount
                )
            )
            .filter(
                Visit.owner_id == owner_id,
                func.date(
                    Visit.visit_date
                ) == today
            )
            .scalar()
        )

        return revenue or 0
    
    # Today's Customers
    @staticmethod
    def get_today_customers(
        db,
        owner_id
    ):

        today = indian_time().date()

        count = (
            db.query(
                func.count(
                    Visit.id
                )
            )
            .filter(
                Visit.owner_id == owner_id,
                func.date(
                    Visit.visit_date
                ) == today
            )
            .scalar()
        )

        return count or 0

    # Monthly Revenue
    @staticmethod
    def get_monthly_revenue(
        db,
        owner_id
    ):

        now = indian_time()

        revenue = (
            db.query(
                func.sum(
                    Visit.total_amount
                )
            )
            .filter(
                Visit.owner_id == owner_id,
                func.extract(
                    "month",
                    Visit.visit_date
                ) == now.month,
                func.extract(
                    "year",
                    Visit.visit_date
                ) == now.year
            )
            .scalar()
        )

        return revenue or 0
    
    # Monthly Expenses
    @staticmethod
    def get_monthly_expense(
        db,
        owner_id
    ):

        now = indian_time()

        expense = (
            db.query(
                func.sum(
                    Expense.amount
                )
            )
            .filter(
                Expense.owner_id == owner_id,
                func.extract(
                    "month",
                    Expense.expense_date
                ) == now.month,
                func.extract(
                    "year",
                    Expense.expense_date
                ) == now.year
            )
            .scalar()
        )

        return expense or 0
    
    @staticmethod
    def get_top_services(
        db,
        owner_id
    ):
        return (
            db.query(
                Service.name,
                func.count(
                    VisitService.id
                ).label("count")
            )
            .join(
                VisitService,
                VisitService.service_id == Service.id
            )
            .join(
                Visit,
                Visit.id == VisitService.visit_id
            )
            .filter(
                Visit.owner_id == owner_id
            )
            .group_by(
                Service.name
            )
            .order_by(
                func.count(
                    VisitService.id
                ).desc()
            )
            .limit(3)
            .all()
        )
    
    @staticmethod
    def revenue_trend(
        db,
        owner_id
    ):

        return (
            db.query(
                func.date(
                    Visit.visit_date
                ).label("date"),

                func.sum(
                    Visit.total_amount
                ).label("revenue")
            )
            .filter(
                Visit.owner_id == owner_id
            )
            .group_by(
                func.date(
                    Visit.visit_date
                )
            )
            .order_by(
                func.date(
                    Visit.visit_date
                )
            )
            .all()
        )
    
    @staticmethod
    def payment_breakdown(
        db,
        owner_id
    ):
        return (
            db.query(
                Visit.payment_method,
                func.sum(
                    Visit.total_amount
                )
            )
            .filter(
                Visit.owner_id == owner_id
            )
            .group_by(
                Visit.payment_method
            )
            .all()
        )
    
    @staticmethod
    def customer_growth(
        db,
        owner_id
    ):
        return (
            db.query(
                func.date_trunc(
                    "month",
                    Visit.visit_date
                ).label("month"),

                func.count(
                    func.distinct(
                        Visit.customer_id
                    )
                ).label("count")
            )
            .filter(
                Visit.owner_id == owner_id
            )
            .group_by(
                func.date_trunc(
                    "month",
                    Visit.visit_date
                )
            )
            .order_by(
                func.date_trunc(
                    "month",
                    Visit.visit_date
                )
            )
            .all()
        )
        
    @staticmethod
    def customers_by_date(
        db,
        owner_id,
        target_date
    ):
        count = (
            db.query(
                func.count(
                    func.distinct(
                        Visit.customer_id
                    )
                )
            )
            .filter(
                Visit.owner_id == owner_id,
                func.date(
                    Visit.visit_date
                ) == target_date
            )
            .scalar()
        )

        return count or 0
        