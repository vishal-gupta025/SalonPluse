from app.repositories.analytics_repo import (
    AnalyticsRepository
)


class AnalyticsService:

    @staticmethod
    def dashboard(
        db,
        owner_id
    ):

        revenue = (
            AnalyticsRepository
            .get_monthly_revenue(
                db,
                owner_id
            )
        )

        expense = (
            AnalyticsRepository
            .get_monthly_expense(
                db,
                owner_id
            )
        )

        return {
            "today_revenue":
                AnalyticsRepository
                .get_today_revenue(
                    db,
                    owner_id
                ),

            "today_customers":
                AnalyticsRepository
                .get_today_customers(
                    db,
                    owner_id
                ),

            "monthly_revenue":
                revenue,

            "monthly_expense":
                expense,

            "monthly_profit":
                revenue - expense
        }
    
    @staticmethod
    def top_services(
        db,
        owner_id
    ):

        data = (
            AnalyticsRepository
            .get_top_services(
                db,
                owner_id
            )
        )

        return [
            {
                "service_name": row[0],
                "count": row[1]
            }
            for row in data
        ]

    @staticmethod
    def revenue_trend(
        db,
        owner_id
    ):

        rows = (
            AnalyticsRepository
            .revenue_trend(
                db,
                owner_id
            )
        )

        return [
            {
                "date": str(row[0]),
                "revenue": row[1]
            }
            for row in rows
        ]

    @staticmethod
    def payment_breakdown(
        db,
        owner_id
    ):

        rows = (
            AnalyticsRepository
            .payment_breakdown(
                db,
                owner_id
            )
        )

        return {
            row[0]: row[1]
            for row in rows
        }
    
    @staticmethod
    def customer_growth(
        db,
        owner_id
    ):

        rows = (
            AnalyticsRepository
            .customer_growth(
                db,
                owner_id
            )
        )

        return [
            {
                "month": row.month.strftime(
                    "%Y-%m"
                ),
                "customers": row.count
            }
            for row in rows
        ]
    
    @staticmethod
    def customers_by_date(
        db,
        owner_id,
        target_date
    ):

        count = (
            AnalyticsRepository
            .customers_by_date(
                db,
                owner_id,
                target_date
            )
        )

        return {
            "date": str(target_date),
            "customers": count
        }