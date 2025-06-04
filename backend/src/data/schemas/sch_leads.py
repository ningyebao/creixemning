from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from datetime import datetime


class LeadBase(BaseModel):
    nom_lead: Optional[str] = None
    adreca_lead: Optional[str] = None
    codi_postal_lead: Optional[str] = None
    poblacio_lead: Optional[str] = None
    comarca_lead: Optional[str] = None
    provincia_lead: Optional[str] = None
    NIF_lead: Optional[str] = None
    email_lead: Optional[EmailStr] = None
    nom_basic_lead: Optional[str] = None
    nom_empresarial_lead: Optional[str] = None
    nom_fiscal_lead: Optional[str] = None
    activitat_lead: Optional[str] = None
    creador_lead: Optional[str] = None
    actiu_lead: Optional[bool] = None
    mida_lead: Optional[int] = None
    observacions_lead: Optional[str] = None
    cnae_lead: Optional[str] = None
    any_creacio_lead: Optional[datetime] = None
    nombre_treballadors_lead: Optional[int] = None
    capital_social_lead: Optional[int] = None
    cotitza_borsa_lead: Optional[bool] = None
    nomes_temporada_lead: Optional[bool] = None
    conciencia_ecologica_lead: Optional[bool] = None
    solidaria_social_lead: Optional[bool] = None
    importa_exporta_lead: Optional[str] = None
    link_web_lead: Optional[str] = None
    xarxe_social_lead: Optional[str] = None
    idioma_preferent_lead: Optional[str] = None

    @validator("email_lead", pre=True, always=True)
    def coerce_invalid_email(cls, v):
        # Convierte correos vacíos o inválidos en None
        if v is None or v == "":
            return None
        try:
            # Intenta construir un EmailStr para validación
            return EmailStr(v)
        except (ValueError, TypeError):
            return None

    class Config:
        # Pydantic v2: usar desde atributos en lugar de orm_mode
        from_attributes = True


class LeadCreate(LeadBase):
    nom_lead: str  # obligatorio para crear


class LeadUpdate(LeadBase):
    pass  # actualización parcial opcional


class Lead(LeadBase):
    id_lead: int
    data_registre_lead: datetime

    class Config:
        from_attributes = True
