# leads_router.py
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict, Any, Optional
from data.database import get_db
from data.cruds.cd_leads import (
    get_all_leads,
    get_lead,
    create_lead,
    update_lead,
    delete_lead,
    get_unassigned_leads,
    get_leads_by_agent,
    search_leads
)
from data.schemas.sch_leads import Lead, LeadCreate

router = APIRouter(tags=["Leads"])

@router.get("/", response_model=List[Lead])
async def read_all_leads(
    skip: int = 0, 
    limit: int = 100,
    nom_lead: Optional[str] = None,
    adreca_lead: Optional[str] = None,
    codi_postal_lead: Optional[str] = None,
    poblacio_lead: Optional[str] = None,
    comarca_lead: Optional[str] = None,
    provincia_lead: Optional[str] = None,
    NIF_lead: Optional[str] = None,
    email_lead: Optional[str] = None,
    nom_basic_lead: Optional[str] = None,
    nom_empresarial_lead: Optional[str] = None,
    nom_fiscal_lead: Optional[str] = None,
    activitat_lead: Optional[str] = None,
    creador_lead: Optional[str] = None,
    actiu_lead: Optional[bool] = None,
    mida_lead: Optional[int] = None,
    observacions_lead: Optional[str] = None,
    cnae_lead: Optional[str] = None,
    fecha_registro_inicio: Optional[str] = None,
    fecha_registro_fin: Optional[str] = None,
    any_creacio_lead: Optional[str] = None,
    nombre_treballadors_lead: Optional[int] = None,
    capital_social_lead: Optional[int] = None,
    cotitza_borsa_lead: Optional[bool] = None,
    nomes_temporada_lead: Optional[bool] = None,
    conciencia_ecologica_lead: Optional[bool] = None,
    solidaria_social_lead: Optional[bool] = None,
    importa_exporta_lead: Optional[str] = None,
    link_web_lead: Optional[str] = None,
    xarxe_social_lead: Optional[str] = None,
    idioma_preferent_lead: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    """
    Obtener todos los leads con opciones avanzadas de filtrado
    """
    filters = {
        "nom_lead": nom_lead,
        "adreca_lead": adreca_lead,
        "codi_postal_lead": codi_postal_lead,
        "poblacio_lead": poblacio_lead,
        "comarca_lead": comarca_lead,
        "provincia_lead": provincia_lead,
        "NIF_lead": NIF_lead,
        "email_lead": email_lead,
        "nom_basic_lead": nom_basic_lead,
        "nom_empresarial_lead": nom_empresarial_lead,
        "nom_fiscal_lead": nom_fiscal_lead,
        "activitat_lead": activitat_lead,
        "creador_lead": creador_lead,
        "actiu_lead": actiu_lead,
        "mida_lead": mida_lead,
        "observacions_lead": observacions_lead,
        "cnae_lead": cnae_lead,
        "fecha_registro_inicio": fecha_registro_inicio,
        "fecha_registro_fin": fecha_registro_fin,
        "any_creacio_lead": any_creacio_lead,
        "nombre_treballadors_lead": nombre_treballadors_lead,
        "capital_social_lead": capital_social_lead,
        "cotitza_borsa_lead": cotitza_borsa_lead,
        "nomes_temporada_lead": nomes_temporada_lead,
        "conciencia_ecologica_lead": conciencia_ecologica_lead,
        "solidaria_social_lead": solidaria_social_lead,
        "importa_exporta_lead": importa_exporta_lead,
        "link_web_lead": link_web_lead,
        "xarxe_social_lead": xarxe_social_lead,
        "idioma_preferent_lead": idioma_preferent_lead
    }
    
    # Eliminar filtros con valores None
    filters = {k: v for k, v in filters.items() if v is not None}
    
    return await get_all_leads(db, skip, limit, filters)

@router.get("/unassigned/", response_model=List[Lead])
async def read_unassigned_leads(
    skip: int = 0, 
    limit: int = 100,
    nom_lead: Optional[str] = None,
    adreca_lead: Optional[str] = None,
    codi_postal_lead: Optional[str] = None,
    poblacio_lead: Optional[str] = None,
    comarca_lead: Optional[str] = None,
    provincia_lead: Optional[str] = None,
    NIF_lead: Optional[str] = None,
    email_lead: Optional[str] = None,
    nom_basic_lead: Optional[str] = None,
    nom_empresarial_lead: Optional[str] = None,
    nom_fiscal_lead: Optional[str] = None,
    activitat_lead: Optional[str] = None,
    creador_lead: Optional[str] = None,
    actiu_lead: Optional[bool] = None,
    mida_lead: Optional[int] = None,
    observacions_lead: Optional[str] = None,
    cnae_lead: Optional[str] = None,
    fecha_registro_inicio: Optional[str] = None,
    fecha_registro_fin: Optional[str] = None,
    any_creacio_lead: Optional[str] = None,
    nombre_treballadors_lead: Optional[int] = None,
    capital_social_lead: Optional[int] = None,
    cotitza_borsa_lead: Optional[bool] = None,
    nomes_temporada_lead: Optional[bool] = None,
    conciencia_ecologica_lead: Optional[bool] = None,
    solidaria_social_lead: Optional[bool] = None,
    importa_exporta_lead: Optional[str] = None,
    link_web_lead: Optional[str] = None,
    xarxe_social_lead: Optional[str] = None,
    idioma_preferent_lead: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    """
    Obtener leads que no están asignados a ningún agente, con opciones de filtrado
    """
    filters = {
        "nom_lead": nom_lead,
        "adreca_lead": adreca_lead,
        "codi_postal_lead": codi_postal_lead,
        "poblacio_lead": poblacio_lead,
        "comarca_lead": comarca_lead,
        "provincia_lead": provincia_lead,
        "NIF_lead": NIF_lead,
        "email_lead": email_lead,
        "nom_basic_lead": nom_basic_lead,
        "nom_empresarial_lead": nom_empresarial_lead,
        "nom_fiscal_lead": nom_fiscal_lead,
        "activitat_lead": activitat_lead,
        "creador_lead": creador_lead,
        "actiu_lead": actiu_lead,
        "mida_lead": mida_lead,
        "observacions_lead": observacions_lead,
        "cnae_lead": cnae_lead,
        "fecha_registro_inicio": fecha_registro_inicio,
        "fecha_registro_fin": fecha_registro_fin,
        "any_creacio_lead": any_creacio_lead,
        "nombre_treballadors_lead": nombre_treballadors_lead,
        "capital_social_lead": capital_social_lead,
        "cotitza_borsa_lead": cotitza_borsa_lead,
        "nomes_temporada_lead": nomes_temporada_lead,
        "conciencia_ecologica_lead": conciencia_ecologica_lead,
        "solidaria_social_lead": solidaria_social_lead,
        "importa_exporta_lead": importa_exporta_lead,
        "link_web_lead": link_web_lead,
        "xarxe_social_lead": xarxe_social_lead,
        "idioma_preferent_lead": idioma_preferent_lead
    }
    
    # Eliminar filtros con valores None
    filters = {k: v for k, v in filters.items() if v is not None}
    
    return await get_unassigned_leads(db, skip, limit, filters)

@router.get("/agent/{agent_id}", response_model=List[Lead])
async def read_leads_by_agent(
    agent_id: int,
    skip: int = 0, 
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    """
    Obtener todos los leads asignados a un agente específico
    """
    return await get_leads_by_agent(db, agent_id, skip, limit)

@router.get("/search/", response_model=List[Lead])
async def search_leads_endpoint(
    q: str = Query(..., min_length=2, description="Término de búsqueda"),
    skip: int = 0, 
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    """
    Buscar leads utilizando un término de búsqueda general
    """
    return await search_leads(db, q, skip, limit)

@router.get("/{lead_id}", response_model=Lead)
async def read_lead(lead_id: int, db: AsyncSession = Depends(get_db)):
    """
    Obtener un lead específico por su ID
    """
    lead = await get_lead(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead

@router.post("/", response_model=Lead, status_code=status.HTTP_201_CREATED)
async def create_lead_endpoint(lead_in: LeadCreate, db: AsyncSession = Depends(get_db)):
    """
    Crear un nuevo lead
    """
    return await create_lead(db, lead_in)
    
@router.put("/{lead_id}", response_model=Lead)
async def update_lead_endpoint(lead_id: int, lead_in: LeadCreate, db: AsyncSession = Depends(get_db)):
    """
    Actualizar un lead existente
    """
    updated = await update_lead(db, lead_id, lead_in.dict(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Lead not found")
    return updated

@router.delete("/{lead_id}", response_model=dict)
async def delete_lead_endpoint(lead_id: int, db: AsyncSession = Depends(get_db)):
    """
    Eliminar un lead
    """
    success = await delete_lead(db, lead_id)
    if not success:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"detail": "Lead deleted successfully"}