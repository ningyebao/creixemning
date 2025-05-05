from sqlalchemy import Column, Integer, PrimaryKeyConstraint
from data.database import Base 

class Asignat(Base):
    __tablename__ = 'Asignat'
    # The correct format is: constraints first, then dict at the end
    __table_args__ = (
        PrimaryKeyConstraint('asig_IDcampanya', 'asig_IDagent'),
        {'schema': 'creixemprueba3'}
    )

    asig_IDcampanya = Column(Integer)
    asig_IDagent = Column(Integer)