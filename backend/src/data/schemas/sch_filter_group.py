from pydantic import BaseModel, ConfigDict
from typing import Dict, Any, Optional
from datetime import datetime


class FilterGroupBase(BaseModel):
    name: str
    description: Optional[str] = None
    filters: Dict[str, Any]


class FilterGroupCreate(FilterGroupBase):
    pass


class FilterGroupUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    filters: Optional[Dict[str, Any]] = None


class FilterGroupInDB(FilterGroupBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class FilterGroupResponse(FilterGroupInDB):
    pass