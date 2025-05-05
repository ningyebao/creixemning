from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class AltaBase(BaseModel):
    id_agent: Optional[int] = None
    id_lead_alta: Optional[int] = None
    id_client_alta: Optional[int] = None
    id_campanya_alta: Optional[int] = None
    data_creacio_alta: Optional[datetime] = None
    persona_contacte_alta: Optional[datetime] = None  # Revisar si es datetime o str
    email_persona_contacte_alta: Optional[str] = None
    telefon_persona_contacte_alta: Optional[str] = None
    quota_alta: Optional[str] = None
    quota_anual_alta: Optional[str] = None
    id_forma_pagament_alta: Optional[int] = None
    lliurament_alta: Optional[datetime] = None
    digits_pagament_alta: Optional[int] = None
    entitat_alta: Optional[str] = None
    oficina_alta: Optional[str] = None
    compte_alta: Optional[str] = None
    tarja1_alta: Optional[str] = None
    tarja2_alta: Optional[str] = None
    tarja3_alta: Optional[str] = None
    tarja4_alta: Optional[str] = None
    caducitat_tarja_alta: Optional[datetime] = None
    cvv_tarja_alta: Optional[str] = None
    data_facturat_alta: Optional[datetime] = None
    numero_factura_alta: Optional[int] = None
    data_per_facturar_alta: Optional[datetime] = None
    data_no_enviar_fins_alta: Optional[datetime] = None
    comissio_cobrada_alta: Optional[bool] = None
    data_abonament_alta: Optional[datetime] = None
    num_abonament_alta: Optional[int] = None

class AltaCreate(AltaBase):
    pass

class Alta(AltaBase):
    id_alta: int

    class Config:
        orm_mode = True
