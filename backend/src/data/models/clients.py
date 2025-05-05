from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.dialects.postgresql import JSONB
from data.database import Base 

class Client(Base):
    __tablename__ = 'clients'
    __table_args__ = {'schema': 'creixemprueba3'}  

    id_client = Column(Integer, primary_key=True, autoincrement=True)
    nom_client = Column(String)
    telefon1_client = Column(JSONB)
    telefon2_client = Column(JSONB)
    actiu_client = Column(Boolean)
    especial_client = Column(Boolean)
    observacions_client = Column(String)  # o Text
    data_creacio_client = Column(DateTime)