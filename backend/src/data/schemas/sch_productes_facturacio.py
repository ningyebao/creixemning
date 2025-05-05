from pydantic import BaseModel
from typing import Optional

class ProducteFacturacioBase(BaseModel):
    id_facturacio: Optional[int] = None
    id_producte: Optional[int] = None

class ProducteFacturacioCreate(ProducteFacturacioBase):
    pass

class ProducteFacturacio(ProducteFacturacioBase):
    # Con clave compuesta
    class Config:
        orm_mode = True
