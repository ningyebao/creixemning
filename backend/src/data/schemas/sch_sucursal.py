from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SucursalBase(BaseModel):
    id_lead: Optional[int] = None
    nom_sucursal: Optional[str] = None
    adreça_sucursal: Optional[str] = None
    telefon_sucursal: Optional[str] = None
    es_principal: Optional[bool] = None

class SucursalCreate(SucursalBase):
    pass

class Sucursal(SucursalBase):
    id_sucursal: int

    class Config:
        orm_mode = True