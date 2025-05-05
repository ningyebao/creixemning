from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey
from data.database import Base 

class FitxaTrucada(Base):
    __tablename__ = 'fitxes_trucades'
    __table_args__ = {'schema': 'creixemprueba3'}  

    id_trucada_fitxes_trucades = Column(Integer, primary_key=True, autoincrement=True)
    id_campanya = Column(Integer, ForeignKey('creixemprueba3.campanya.id_campanya'))
    id_producte = Column(Integer, ForeignKey('creixemprueba3.productes.id_producte'))
    id_agent = Column(Integer, ForeignKey('creixemprueba3.agents.id_agent'))
    id_lead = Column(Integer, ForeignKey('creixemprueba3.leads.id_lead'))
    forma_juridica_fitxes_trucades = Column(String)
    empresa_extingida_fitxes_trucades = Column(Boolean)
    coneix_producte_fitxes_trucades = Column(Boolean)
    no_tornar_trucar_fitxes_trucades = Column(Boolean)
    data_creacio_fitxes_trucades = Column(DateTime)
    telefon_fitxes_trucades = Column(String)
    telefon_erroni_fitxes_trucades = Column(Boolean)
    nom_interlocutor_fitxes_trucades = Column(String)  # se asume string a pesar de la ambigüedad
    planificacio_fitxes_trucades = Column(DateTime)
    nivell_argumentacio_fitxes_trucades = Column(String)  # o Text
    resultat_fitxes_trucades = Column(String)
    observacions_fitxes_trucades = Column(String)  # o Text
