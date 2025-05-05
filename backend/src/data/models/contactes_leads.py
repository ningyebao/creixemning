from sqlalchemy import Column, Integer, String, Text
from data.database import Base 

class ContacteLead(Base):
    __tablename__ = 'contactes_leads'
    __table_args__ = {'schema': 'creixemprueba3'}  

    id_contacte_lead = Column(Integer, primary_key=True, autoincrement=True)
    id_lead = Column(Integer)
    email_contactes_leads = Column(String)
    num_contacte_lead = Column(String)
    nom_contacte_contacte_lead = Column(String)
    idioma_contacte_lead = Column(String)  # opciones predefinidas
    carreg_contacte_lead = Column(String)
    observacions_contacte_lead = Column(String)  # o Text