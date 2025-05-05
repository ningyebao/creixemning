from sqlalchemy import Column, Integer, String, Text
from data.database import Base 

class FormesPagament(Base):
    __tablename__ = 'formes_pagament'
    __table_args__ = {'schema': 'creixemprueba3'}  

    id_formapagament = Column(Integer, primary_key=True, autoincrement=True)
    id_facturacio = Column(Integer)
    num_pagaments = Column(Integer)
    observacions_forma_pagament = Column(String)  # o Text