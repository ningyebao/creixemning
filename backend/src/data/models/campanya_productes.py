from sqlalchemy import Column, Integer, PrimaryKeyConstraint
from data.database import Base 

class CampanyaProducte(Base):
    __tablename__ = 'campanya_productes'
    # The correct format is: constraints first, then dict at the end
    __table_args__ = (
        PrimaryKeyConstraint('id_campanya', 'id_producte'),
        {'schema': 'creixemprueba3'}
    )

    id_campanya = Column(Integer)
    id_producte = Column(Integer)
    quantitat_producte = Column(Integer)