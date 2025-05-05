from pydantic import BaseModel
from typing import Optional

class CampanyaProducteBase(BaseModel):
    id_campanya: Optional[int] = None
    id_producte: Optional[int] = None
    quantitat_producte: Optional[int] = None

class CampanyaProducteCreate(CampanyaProducteBase):
    pass

class CampanyaProducte(CampanyaProducteBase):
    # Con clave compuesta
    class Config:
        orm_mode = True
