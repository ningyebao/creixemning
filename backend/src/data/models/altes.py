from sqlalchemy import Column, Integer, String, DateTime, Boolean
from data.database import Base  # Import Base from database.py

class Alta(Base):
    __tablename__ = 'altes'
    __table_args__ = {'schema': 'creixemprueba3'}  # Fixed indentation
    
    id_alta = Column(Integer, primary_key=True, autoincrement=True)
    id_agent = Column(Integer)
    id_lead_alta = Column(Integer)  # opciones predeterminadas
    id_client_alta = Column(Integer)  # opciones predeterminadas
    id_campanya_alta = Column(Integer)  # opciones predeterminadas
    data_creacio_alta = Column(DateTime)
    persona_contacte_alta = Column(DateTime)  # revisar si es datetime o string
    email_persona_contacte_alta = Column(String)
    telefon_persona_contacte_alta = Column(String)
    quota_alta = Column(String)
    quota_anual_alta = Column(String)
    id_forma_pagament_alta = Column(Integer)  # opciones predeterminadas
    lliurament_alta = Column(DateTime)
    digits_pagament_alta = Column(Integer)
    entitat_alta = Column(String)
    oficina_alta = Column(String)
    compte_alta = Column(String)
    tarja1_alta = Column(String)
    tarja2_alta = Column(String)
    tarja3_alta = Column(String)
    tarja4_alta = Column(String)
    caducitat_tarja_alta = Column(DateTime)
    cvv_tarja_alta = Column(String)
    data_facturat_alta = Column(DateTime)
    numero_factura_alta = Column(Integer)
    data_per_facturar_alta = Column(DateTime)
    data_no_enviar_fins_alta = Column(DateTime)
    comissio_cobrada_alta = Column(Boolean)
    data_abonament_alta = Column(DateTime)
    num_abonament_alta = Column(Integer)