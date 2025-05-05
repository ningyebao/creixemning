from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, Float
from data.database import Base 

class Producte(Base):
    __tablename__ = 'productes'
    __table_args__ = {'schema': 'creixemprueba3'}  

    id_producte = Column(Integer, primary_key=True, autoincrement=True)
    id_client = Column(Integer)  # se podría definir como ForeignKey si es necesario
    nom_producte = Column(String, nullable=False)  # Ahora es texto
    preu_producte = Column(Float)  # O Numeric si se requieren decimales
    descripcio_producte = Column(String)
    sector_producte = Column(String)
    significatiu_producte = Column(String)  # Puede usarse Text si se requiere mayor longitud
    enquesta_producte = Column(String)        # Idem
    actiu_producte = Column(Boolean, default=True)  # Nuevo campo para indicar si el producto está activo
    datacreacio_producte = Column(DateTime)
    databaixa_prducte = Column(DateTime)
