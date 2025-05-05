from sqlalchemy import Column, Integer, String, DateTime, Numeric, Text
from data.database import Base 

class Facturacio(Base):
    __tablename__ = 'facturacio'
    __table_args__ = {'schema': 'creixemprueba3'}  

    id_facturacio = Column(Integer, primary_key=True, autoincrement=True)
    id_client = Column(Integer)
    data_creacio_facturacio = Column(DateTime)
    import_facturacio_client = Column(Numeric)
    datainici_facturacio_client = Column(DateTime)
    datafi_facturacio_client = Column(DateTime)
    estat_facturacio = Column(String)
    last_update = Column(DateTime)
    observacions_facturacio_client = Column(String)  # o Text