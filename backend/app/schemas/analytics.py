from pydantic import BaseModel


class DashboardResponse(BaseModel):
    today_revenue: float
    today_customers: int
    monthly_revenue: float
    monthly_expense: float
    monthly_profit: float

class TopServiceResponse(BaseModel):
    service_name: str
    count: int

class RevenueTrendResponse(BaseModel):
    date: str
    revenue: float

class CustomerGrowthResponse(BaseModel):
    month: str
    customers: int

class CustomersByDateResponse(BaseModel):
    date: str
    customers: int