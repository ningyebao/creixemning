from sqlalchemy import Column, Integer, String, DateTime, Text
from data.database import Base 

class RegistreAuditoria(Base):
    __tablename__ = 'registres_auditories'
    __table_args__ = {'schema': 'creixemprueba3'}  

    id_registre_auditoria = Column(Integer, primary_key=True, autoincrement=True)
    id_usuari = Column(Integer)
    data_creacio_registre_auditoria = Column(DateTime)
    # Se omite la columna 4 ya que no se especifica
    motiu_registre_auditoria = Column(String)
    canvi_realitzar__registre_auditoria = Column(String)
    querry_realitzat_registre_auditoria = Column(String)
    observacions_registre_auditoria = Column(String)  # o Text