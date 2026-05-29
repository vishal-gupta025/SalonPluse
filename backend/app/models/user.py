from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from app.core.database import Base
from app.core.timezone import indian_time
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=indian_time)
    updated_at = Column(DateTime, default=indian_time, onupdate=indian_time)

    

