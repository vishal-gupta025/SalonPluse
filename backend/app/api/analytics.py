from fastapi import APIRouter
from fastapi import Depends
from datetime import date

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.auth import (
    get_current_user
)

from app.schemas.analytics import (
    DashboardResponse,
    RevenueTrendResponse,
    TopServiceResponse,
    CustomerGrowthResponse,
    CustomersByDateResponse
)

from app.services.analytics_service import (
    AnalyticsService
)

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get(
    "/dashboard",
    response_model=DashboardResponse
)
def dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return AnalyticsService.dashboard(
        db,
        current_user.id
    )

@router.get(
    "/top-services",
    response_model=list[TopServiceResponse]
)
def top_services(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return AnalyticsService.top_services(
        db,
        current_user.id
    )

@router.get(
    "/revenue-trend",
    response_model=list[RevenueTrendResponse]
)
def revenue_trend(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return AnalyticsService.revenue_trend(
        db,
        current_user.id
    )

@router.get(
    "/payment-breakdown",
    response_model=dict[str, float]
)
def payment_breakdown(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return (
        AnalyticsService
        .payment_breakdown(
            db,
            current_user.id
        )
    )

@router.get(
    "/customer-growth",
    response_model=list[CustomerGrowthResponse]
)
def customer_growth(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return (
        AnalyticsService
        .customer_growth(
            db,
            current_user.id
        )
    )

@router.get(
    "/customers-by-date",
    response_model=CustomersByDateResponse
)
def customers_by_date(
    date: date,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return (
        AnalyticsService
        .customers_by_date(
            db,
            current_user.id,
            date
        )
    )