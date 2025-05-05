from sqlalchemy import Column, Integer, Date, String, Float, ForeignKey
from data.database import Base

class Dedicacio(Base):
    __tablename__ = "dedicacio"
    __table_args__ = {"schema": "creixemprueba3"}

    id_dedicacio = Column(Integer, primary_key=True, autoincrement=True)
    id_agent = Column(Integer, ForeignKey("creixemprueba3.agents.id_agent"), nullable=False)
    id_lead = Column(Integer, ForeignKey("creixemprueba3.leads.id_lead"), nullable=False)
    id_campanya = Column(Integer, ForeignKey("creixemprueba3.campanya.id_campanya"), nullable=False)
    data_actual_dedicacio = Column(Date, nullable=False)
    hores = Column(Float, nullable=False)
    observacions_dedicacio = Column(String)