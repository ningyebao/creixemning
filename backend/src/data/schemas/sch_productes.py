from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProducteBase(BaseModel):
    id_client: Optional[int] = None
    nom_producte: Optional[str] = None
    preu_producte: Optional[float] = None
    descripcio_producte: Optional[str] = None
    sector_producte: Optional[str] = None
    significatiu_producte: Optional[str] = None
    enquesta_producte: Optional[str] = None
    actiu_producte: Optional[bool] = True
    datacreacio_producte: Optional[datetime] = None
    databaixa_prducte: Optional[datetime] = None

class ProducteCreate(ProducteBase):
    pass

class Producte(ProducteBase):
    id_producte: int

    class Config:
        orm_mode = True
