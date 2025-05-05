from pydantic import BaseModel
from typing import Optional

class FormesPagamentBase(BaseModel):
    id_facturacio: Optional[int] = None
    num_pagaments: Optional[int] = None
    observacions_forma_pagament: Optional[str] = None

class FormesPagamentCreate(FormesPagamentBase):
    pass

class FormesPagament(FormesPagamentBase):
    id_formapagament: int

    class Config:
        orm_mode = True
