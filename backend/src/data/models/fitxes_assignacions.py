from sqlalchemy import Column, Integer, String, DateTime, PrimaryKeyConstraint, func 
from data.database import Base 

class FitxesAssignacions(Base):
    __tablename__ = 'fitxes_assignacions'
    # The correct format is: constraints first, then dict at the end
    __table_args__ = (
        PrimaryKeyConstraint('id_fitxes_assignacions'),
        {'schema': 'creixemprueba3'}
    )

    id_fitxes_assignacions = Column(Integer, primary_key=True, autoincrement=True)
    id_agents = Column(Integer)
    id_leads = Column(Integer)
    id_autor = Column(Integer)
    data_creacio_fitxes_assignacions = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    id_fitxes_trucades_fitxes_assignacions = Column(Integer)
    id_campanya_leads = Column(Integer)
    estat_fitxes_assignacions = Column(String)
    potencial_fitxes_assignacions = Column(Integer)
    prioritat_fitxes_assignacions = Column(Integer)

    obsevacions_fitxes_assignacions = Column(String)