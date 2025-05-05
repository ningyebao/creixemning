from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text
from data.database import Base 

class Campanya(Base):
    __tablename__ = 'campanya'
    __table_args__ = {'schema': 'creixemprueba3'}  

    id_campanya = Column(Integer, primary_key=True, autoincrement=True)
    id_client = Column(Integer)
    campanya_nom = Column(String)
    campanya_num_altes_acordades = Column(Integer)
    data_creacio_campanya = Column(DateTime)
    data_inici_campanya = Column(DateTime)
    data_fi_campanya = Column(DateTime)
    activa_campanya = Column(Boolean)
    objectiu_campanya = Column(String)  # o Text
    objectiu_assolit_campanya = Column(Boolean)
    observacions_campanya = Column(String)  # o Text