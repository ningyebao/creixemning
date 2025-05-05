from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SeguimentTrucadesBase(BaseModel):
    id_lead: int
    id_agent: int
    id_campanya: int
    inici_seguiment: Optional[datetime] = None
    fi_seguiment: Optional[datetime] = None
    estat_seguiment: Optional[str] = "obert"
    notes_seguiment: Optional[str] = None
    nom_seguiment_trucades: Optional[str] = None  # este campo se puede generar en el backend

class SeguimentTrucadesCreate(SeguimentTrucadesBase):
    pass

class SeguimentTrucades(SeguimentTrucadesBase):
    id_seguiment_trucades: int

    class Config:
        orm_mode = True
