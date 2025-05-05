"""
Centralized import and registration of all API routers.
"""

# Imports organized by domain
# Core entity routers
from .r_agents import router as r_agents
from .r_clients import router as r_clients
from .r_leads import router as r_leads

# Commercial activity routers
from .r_altes import router as r_altes
from .r_altes_productes import router as r_altes_productes
from .r_campanyes import router as r_campanyes
from .r_campanya_productes import router as r_campanya_productes
from .r_productes import router as r_productes
from .r_productes_facturacio import router as r_productes_facturacio

# Operational routers
from .r_asignats import router as r_asignats
from .r_fitxes_assignacions import router as r_fitxes_assignacions
from .r_fitxes_trucades import router as r_fitxes_trucades
from .r_seguiment_trucades import router as r_seguiment_trucades
from .r_contactes_leads import router as r_contactes_leads

# Administrative routers
from .r_dedicacio import router as r_dedicacio
from .r_facturacio import router as r_facturacio
from .r_formes_pagaments import router as r_formes_pagaments
from .r_registres_auditories import router as r_registres_auditories
from .r_sucursal import router as r_sucursal

# Helper function to create router config entries
def router_config(router, prefix, tag=None):
    """Create a router configuration with standardized format"""
    if tag is None:
        tag = prefix.replace('-', ' ').replace('/', '').title()
    return {
        "router": router,
        "prefix": prefix,
        "tags": [tag],
        "db": True
    }

# Router registration with logical grouping
all_routers = [
    # Core entities
    router_config(r_agents, "/agents", "Agents"),
    router_config(r_clients, "/clients", "Clients"),
    router_config(r_leads, "/leads", "Leads"),
    
    # Commercial activity
    router_config(r_altes, "/altes", "Altes"),
    router_config(r_altes_productes, "/altes-productes", "Altes Productes"),
    router_config(r_campanyes, "/campanya", "Campanyes"),
    router_config(r_campanya_productes, "/campanya-productes", "Campanya Productes"),
    router_config(r_productes, "/productes", "Productes"),
    router_config(r_productes_facturacio, "/productes-facturacio", "Productes Facturacio"),
    
    # Operational
    router_config(r_asignats, "/asignats", "Assignats"),
    router_config(r_fitxes_assignacions, "/fitxes-assignacions", "Fitxes Assignacions"),
    router_config(r_fitxes_trucades, "/fitxes-trucades", "Fitxes Trucades"),
    router_config(r_seguiment_trucades, "/seguiment-trucades", "Seguiment Trucades"),
    router_config(r_contactes_leads, "/contactes-leads", "Contactes Leads"),
    
    # Administrative
    router_config(r_dedicacio, "/dedicacio", "Dedicacio"),
    router_config(r_facturacio, "/facturacio", "Facturacio"),
    router_config(r_formes_pagaments, "/formes-pagaments", "Formes Pagaments"),
    router_config(r_registres_auditories, "/registres-auditories", "Registres Auditories"),
    router_config(r_sucursal, "/sucursal", "Sucursal"),
]