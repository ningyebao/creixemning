from sqlalchemy import Column, Integer, String, DateTime, Text,Boolean, ForeignKey
from data.database import Base 

class Sucursal(Base):
    __tablename__ = 'sucursal'
    __table_args__ = {'schema': 'creixemprueba3'}

    id_sucursal = Column(Integer, primary_key=True, autoincrement=True)
    id_lead = Column(Integer, ForeignKey('creixemprueba3.leads.id_lead'), nullable=True)
    nom_sucursal = Column(String)
    adreça_sucursal = Column(String)
    telefon_sucursal = Column(String)
    es_principal = Column(Boolean)
