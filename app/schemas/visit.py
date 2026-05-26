from pydantic import BaseModel


class VisitCreate(BaseModel):
    customer_id: int
    service_ids: list[int]
    payment_method: str


class VisitResponse(BaseModel):
    id: int
    customer_id: int
    total_amount: float
    payment_method: str

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