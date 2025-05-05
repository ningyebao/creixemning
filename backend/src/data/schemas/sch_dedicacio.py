from pydantic import BaseModel
from datetime import date
from typing import Optional

class DedicacioBase(BaseModel):
    id_agent: int
    id_lead: int
    id_campanya: int
    data_actual_dedicacio: date
    hores: float
    observacions_dedicacio: Optional[str] = None

class DedicacioCreate(DedicacioBase):
    pass

class Dedicacio(DedicacioBase):
    id_dedicacio: int

    class Config:
        orm_mode = True