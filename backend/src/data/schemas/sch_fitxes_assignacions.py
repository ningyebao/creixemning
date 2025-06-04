from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class FitxesAssignacionsBase(BaseModel):
    id_agents: int
    id_leads: int
    id_autor: int
    id_campanya: int
    estat_fitxes_assignacions: str
    potencial_fitxes_assignacions: Optional[int] = None
    prioritat_fitxes_assignacions: Optional[int] = None
    obsevacions_fitxes_assignacions: Optional[str] = None
    id_fitxes_trucades_fitxes_assignacions: Optional[int] = None
    data_creacio_fitxes_assignacions: Optional[datetime] = None

class FitxaAssignacioUpdate(BaseModel):
    estat_fitxes_assignacions: Optional[str] = None

    class Config:
        orm_mode = True
class FitxesAssignacionsCreate(FitxesAssignacionsBase):
    pass

class FitxesAssignacions(FitxesAssignacionsBase):
    id_fitxes_assignacions: int

    class Config:
        orm_mode = True

# Nuevo esquema para las estadísticas
class FitxesAssignacionsStats(BaseModel):
    total: int
    estados: Dict[str, int]
    promedio_prioridad: float
    promedio_potencial: float