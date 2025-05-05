from sqlalchemy import Column, Integer, PrimaryKeyConstraint
from data.database import Base 

class ProducteFacturacio(Base):
    __tablename__ = 'producte_facturacio'
    # The correct format is: constraints first, then dict at the end
    __table_args__ = (
        PrimaryKeyConstraint('id_facturacio', 'id_producte'),
        {'schema': 'creixemprueba3'}
    )

    id_facturacio = Column(Integer)
    id_producte = Column(Integer)