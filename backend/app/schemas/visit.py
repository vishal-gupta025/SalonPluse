from pydantic import BaseModel
from typing import Optional, List


class NewCustomerSchema(BaseModel):
    name: str
    phone: Optional[str] = None
    gender: Optional[str] = None

class VisitCreate(BaseModel):

    customer_id: Optional[int] = None

    new_customer: Optional[
        NewCustomerSchema
    ] = None

    service_ids: list[int]

    payment_method: str


class VisitResponse(BaseModel):
    id: int
    customer_name: str
    services: List[str]
    total_amount: float
    payment_method: str
    visit_date: str

    class Config:
        from_attributes = True
    
class VisitDetailService(BaseModel):
    service_id: int
    price_at_visit: float


class VisitDetailResponse(BaseModel):
    id: int
    customer_id: int
    total_amount: float
    payment_method: str
    services: list[VisitDetailService]