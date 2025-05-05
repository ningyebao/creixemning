from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from data.database import Base 
from datetime import datetime
from sqlalchemy.orm import validates


class SeguimentTrucades(Base):
    __tablename__ = "seguiment_trucades"
    __table_args__ = {"schema": "creixemprueba3"}

    d_seguiment_trucades = Column(Integer, primary_key=True, autoincrement=True)
    id_lead = Column(Integer, ForeignKey("creixemprueba3.leads.id_lead"))
    id_agent = Column(Integer, ForeignKey("creixemprueba3.agents.id_agent"))
    id_campanya = Column(Integer, ForeignKey("creixemprueba3.campanya.id_campanya"))
    inici_seguiment = Column(DateTime, default=datetime.utcnow)
    fi_seguiment = Column(DateTime, nullable=True)
    estat_seguiment = Column(String, default="obert")
    notes_seguiment = Column(Text, nullable=True)
    nom_seguiment_trucades = Column(String)

    @validates("id_lead", "id_agent", "id_campanya")
    def generate_name(self, key, value):
        # Asume que ya tienes los tres valores disponibles
        if all([self.id_lead, self.id_agent, self.id_campanya]):
            self.nom_seguiment_trucades = f"{self.id_lead}_{self.id_agent}_{self.id_campanya}"
        return value
