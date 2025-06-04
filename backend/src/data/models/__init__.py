from data.database import Base

from .clients import Client 
from .productes import Producte
from .facturacio import Facturacio
from .formes_pagament import FormesPagament
from .campanyes import Campanya

from .registres_auditories import RegistreAuditoria
from .agents import Agent
from .leads import Lead
from .contactes_leads import ContacteLead
from .fitxes_trucades import FitxaTrucada
from .altes import Alta
from .filter_group import FilterGroup

from .asignats import Asignat
from .campanya_productes import CampanyaProducte
from .productes_facturacio import ProducteFacturacio
from .altes_productes import AltaProducte
from .fitxes_assignacions import FitxesAssignacions
from .sucursal import Sucursal
from .seguiment_trucades import SeguimentTrucades
from .dedicacio import Dedicacio