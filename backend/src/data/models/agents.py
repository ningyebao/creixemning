from sqlalchemy import Column, Integer, String, DateTime, Text
from data.database import Base 

class Agent(Base):
    __tablename__ = 'agents'
    __table_args__ = {'schema': "creixemprueba3"}  # Fixed missing underscore
    
    id_agent = Column(Integer, primary_key=True, autoincrement=True)
    nom_agent = Column(String, nullable=False)
    contrasenya_agent = Column(String, nullable=False, server_default='creixem123')
    data_alta_agent = Column(DateTime)
    data_baixa_agent = Column(DateTime)
    data_creacio_agent = Column(DateTime)
    cognom1_agent = Column(String)
    cognom2_agent = Column(String)
    adreça_agent = Column(String)
    codi_postal_agent = Column(String)
    poblacio_agent = Column(String)
    telefon_agent = Column(String)
    mobil_agent = Column(String)
    NIF_agent = Column(String)
    seguretat_social_agent = Column(String)
    compte_corrent_agent = Column(String)
    Agents_nom_firma = Column(String)
    observacions_agent = Column(String)  # o Text