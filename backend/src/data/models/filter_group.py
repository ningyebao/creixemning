from sqlalchemy import Column, Integer, String, JSON, DateTime
from sqlalchemy.sql import func
from data.database import Base

class FilterGroup(Base):
    __tablename__ = "filter_groups"
    __table_args__ = {'schema': 'creixemprueba3'}  
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    filters = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())