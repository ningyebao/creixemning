from sqlalchemy import Column, Integer, PrimaryKeyConstraint
from data.database import Base 

class AltaProducte(Base):
    __tablename__ = 'altes_productes'
    __table_args__ = (
        PrimaryKeyConstraint('id_alta_producte'),
        {'schema': 'creixemprueba3'}  # This specifies the schema
    )

    id_alta_producte = Column(Integer, primary_key=True, autoincrement=True)
    id_alta = Column(Integer)
    id_producte = Column(Integer)
    quantitat_venuda = Column(Integer)