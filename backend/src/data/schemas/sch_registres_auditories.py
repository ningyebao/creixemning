from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class RegistreAuditoriaBase(BaseModel):
    id_usuari: Optional[int] = None
    data_creacio_registre_auditoria: Optional[datetime] = None
    motiu_registre_auditoria: Optional[str] = None
    canvi_realitzar__registre_auditoria: Optional[str] = None
    querry_realitzat_registre_auditoria: Optional[str] = None
    observacions_registre_auditoria: Optional[str] = None

class RegistreAuditoriaCreate(RegistreAuditoriaBase):
    pass

class RegistreAuditoria(RegistreAuditoriaBase):
    id_registre_auditoria: int

    class Config:
        orm_mode = True
