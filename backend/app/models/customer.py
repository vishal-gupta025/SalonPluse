from app.core.timezone import indian_time

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

from app.core.database import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer,primary_key=True,index=True)

    owner_id = Column(Integer,ForeignKey("users.id"),nullable=False)

    name = Column(String,nullable=False)

    phone = Column(String,nullable=True)

    gender = Column(String,nullable=True)

    created_at = Column(DateTime,default=indian_time)