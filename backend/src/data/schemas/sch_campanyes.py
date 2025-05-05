from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CampanyaBase(BaseModel):
    id_client: Optional[int] = None
    campanya_nom: Optional[str] = None
    campanya_num_altes_acordades: Optional[int] = None
    data_creacio_campanya: Optional[datetime] = None
    data_inici_campanya: Optional[datetime] = None
    data_fi_campanya: Optional[datetime] = None
    activa_campanya: Optional[bool] = None
    objectiu_campanya: Optional[str] = None
    objectiu_assolit_campanya: Optional[bool] = None
    observacions_campanya: Optional[str] = None

class CampanyaCreate(CampanyaBase):
    pass

class Campanya(CampanyaBase):
    id_campanya: int

    class Config:
        orm_mode = True
