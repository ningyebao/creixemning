from sqlalchemy import Column, Integer, String, DateTime, PrimaryKeyConstraint
from data.database import Base 

class FitxesFacturacio(Base):
    __tablename__ = 'fitxes_facturacio'
    # The correct format is: constraints first, then dict at the end
    __table_args__ = (
        PrimaryKeyConstraint('id_fitxes_facturacio'),
        {'schema': 'creixemprueba3'}
    )

    id_fitxes_facturacio = Column(Integer, primary_key=True, autoincrement=True)
    id_agents = Column(Integer)
    id_leads = Column(Integer)
    id_autor = Column(Integer)
    data_creacio_fitxes_facturacio = Column(DateTime)
    id_fitxes_trucades_fitxes_facturacio = Column(Integer)
    id_campanya_leads = Column(Integer)
    estat_fitxes_facturacio = Column(String)
    potencial_fitxes_facturacio = Column(Integer)
    prioritat_fitxes_facturacio = Column(Integer)
    obsevacions_fitxes_facturacio = Column(Integer)