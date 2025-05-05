from pydantic import BaseModel
from typing import Optional

class AsignatBase(BaseModel):
    asig_IDcampanya: Optional[int] = None
    asig_IDagent: Optional[int] = None

class AsignatCreate(AsignatBase):
    pass

class Asignat(AsignatBase):
    # Al ser clave compuesta, puede omitirse un id único
    class Config:
        orm_mode = True
