from pydantic import BaseModel
from typing import Optional

class ContacteLeadBase(BaseModel):
    id_lead: Optional[int] = None
    email_contactes_leads: Optional[str] = None
    num_contacte_lead: Optional[str] = None
    nom_contacte_contacte_lead: Optional[str] = None
    idioma_contacte_lead: Optional[str] = None
    carreg_contacte_lead: Optional[str] = None
    observacions_contacte_lead: Optional[str] = None

class ContacteLeadCreate(ContacteLeadBase):
    pass

class ContacteLead(ContacteLeadBase):
    id_contacte_lead: int

    class Config:
        orm_mode = True
