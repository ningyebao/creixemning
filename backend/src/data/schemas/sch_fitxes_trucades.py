from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class FitxaTrucadaBase(BaseModel):
    id_agent: Optional[int] = None
    id_lead: Optional[int] = None
    id_campanya: Optional[int] = None
    id_producte: Optional[int] = None
    forma_juridica_fitxes_trucades: Optional[str] = None
    data_creacio_fitxes_trucades: Optional[datetime] = None
    telefon_fitxes_trucades: Optional[str] = None
    nom_interlocutor_fitxes_trucades: Optional[str] = None
    resultat_fitxes_trucades: Optional[str] = None
    planificacio_fitxes_trucades: Optional[datetime] = None
    nivell_argumentacio_fitxes_trucades: Optional[str] = None
    observacions_fitxes_trucades: Optional[str] = None
    telefon_erroni_fitxes_trucades: Optional[bool] = None
    empresa_extingida_fitxes_trucades: Optional[bool] = None
    coneix_producte_fitxes_trucades: Optional[bool] = None
    no_tornar_trucar_fitxes_trucades: Optional[bool] = None

class FitxaTrucadaCreate(FitxaTrucadaBase):
    pass

class FitxaTrucada(FitxaTrucadaBase):
    id_trucada_fitxes_trucades: int

    class Config:
        orm_mode = True
