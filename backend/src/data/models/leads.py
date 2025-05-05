from sqlalchemy import Column, Integer, Float, String, DateTime, Text, Boolean
from data.database import Base 

class Lead(Base):
    __tablename__ = 'leads'
    __table_args__ = {'schema': 'creixemprueba3'}  

    id_lead = Column(Integer, primary_key=True, autoincrement=True)
    nom_lead = Column(String(255), nullable=False)
    adreca_lead = Column("adreca_lead", String)
    codi_postal_lead = Column(String)
    poblacio_lead = Column(String)
    comarca_lead = Column(String)
    provincia_lead = Column(String)
    NIF_lead = Column(String)
    email_lead = Column(String(255), index=True)
    nom_basic_lead = Column(String)
    nom_empresarial_lead = Column(String)
    nom_fiscal_lead = Column(String)
    activitat_lead = Column(String)
    creador_lead = Column(String)
    data_registre_lead = Column(DateTime)
    actiu_lead = Column(Boolean, default=True)
    mida_lead = Column(Integer)
    observacions_lead = Column(String)  
    cnae_lead = Column(String)

    any_creacio_lead = Column(DateTime)
    nombre_treballadors_lead = Column(Integer)
    capital_social_lead = Column(Integer)
    cotitza_borsa_lead = Column(Boolean)
    nomes_temporada_lead = Column(Boolean)
    conciencia_ecologica_lead = Column(Boolean)
    solidaria_social_lead = Column(Boolean)
    importa_exporta_lead = Column(String)
    link_web_lead = Column(String)
    xarxe_social_lead = Column(String)
    idioma_preferent_lead = Column(String)