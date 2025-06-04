from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime
from utils import normalize_datetime

class AgentSchema(BaseModel):
    """Schema base con campos comunes para agentes"""
    nom_agent: str = Field(..., min_length=1, max_length=100)
    cognom1_agent: str = Field(..., min_length=1, max_length=100)
    cognom2_agent: Optional[str] = None
    adreça_agent: Optional[str] = None
    codi_postal_agent: Optional[str] = None
    poblacio_agent: Optional[str] = None
    telefon_agent: Optional[str] = None
    mobil_agent: Optional[str] = None
    NIF_agent: str = Field(..., min_length=5, max_length=20)
    seguretat_social_agent: Optional[str] = None
    compte_corrent_agent: Optional[str] = None
    Agents_nom_firma: Optional[str] = None
    observacions_agent: Optional[str] = None
    
    @field_validator('mobil_agent', mode="before")
    @classmethod
    def validate_mobile(cls, v):
        if v and not v.replace('+', '').replace(' ', '').isdigit():
            raise ValueError('El número de móvil debe contener solo dígitos, espacios o +')
        return v

class AgentCreate(AgentSchema):
    """Schema para crear nuevos agentes"""
    data_alta_agent: datetime = Field(default_factory=datetime.now)
    data_baixa_agent: Optional[datetime] = None

    @field_validator('data_alta_agent', 'data_baixa_agent', mode="before")
    @classmethod
    def normalize_dates(cls, v):
        # Asumiendo que normalize_datetime maneja correctamente los valores nulos
        return normalize_datetime(v) if v else None

class AgentUpdate(BaseModel):
    """Schema para actualizar agentes existentes (todos los campos opcionales)"""
    nom_agent: Optional[str] = None
    cognom1_agent: Optional[str] = None
    cognom2_agent: Optional[str] = None
    adreça_agent: Optional[str] = None
    codi_postal_agent: Optional[str] = None
    poblacio_agent: Optional[str] = None
    telefon_agent: Optional[str] = None
    mobil_agent: Optional[str] = None
    NIF_agent: Optional[str] = None
    seguretat_social_agent: Optional[str] = None
    compte_corrent_agent: Optional[str] = None
    Agents_nom_firma: Optional[str] = None
    data_alta_agent: Optional[datetime] = None
    data_baixa_agent: Optional[datetime] = None
    observacions_agent: Optional[str] = None
    
    @field_validator('mobil_agent', mode="before")
    @classmethod
    def validate_mobile(cls, v):
        if v and not v.replace('+', '').replace(' ', '').isdigit():
            raise ValueError('El número de móvil debe contener solo dígitos, espacios o +')
        return v
    
    @field_validator('data_alta_agent', 'data_baixa_agent', mode="before")
    @classmethod
    def normalize_dates(cls, v):
        return normalize_datetime(v) if v else None

class Agent(AgentSchema):
    """Schema completo para respuestas de la API (incluye campos generados por la BD)"""
    id_agent: int
    data_alta_agent: datetime
    data_baixa_agent: Optional[datetime] = None
    data_creacio_agent: Optional[datetime] = None  
    data_modificacio_agent: Optional[datetime] = None

    class Config:
        from_attributes = True