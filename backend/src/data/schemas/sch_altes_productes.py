from pydantic import BaseModel
from typing import Optional

class AltaProducteBase(BaseModel):
    id_alta: Optional[int] = None
    id_producte: Optional[int] = None
    quantitat_venuda: Optional[int] = None

class AltaProducteCreate(AltaProducteBase):
    pass

class AltaProducte(AltaProducteBase):
    id_alta_producte: int

    class Config:
        orm_mode = True
