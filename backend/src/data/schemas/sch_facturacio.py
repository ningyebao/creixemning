from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class FacturacioBase(BaseModel):
    id_client: Optional[int] = None
    data_creacio_facturacio: Optional[datetime] = None
    import_facturacio_client: Optional[float] = None  # Ajustar a Decimal si es necesario
    datainici_facturacio_client: Optional[datetime] = None
    datafi_facturacio_client: Optional[datetime] = None
    estat_facturacio: Optional[str] = None
    last_update: Optional[datetime] = None
    observacions_facturacio_client: Optional[str] = None

class FacturacioCreate(FacturacioBase):
    pass

class Facturacio(FacturacioBase):
    id_facturacio: int

    class Config:
        orm_mode = True
