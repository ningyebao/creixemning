from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from data.database import get_db
from typing import List, Optional, Dict, Any
from data.cruds.cd_fitxes_assignacions import update_fitxa_assignacio  
from data.schemas.sch_fitxes_assignacions import FitxaAssignacioUpdate, FitxesAssignacions

from data.cruds.cd_fitxes_assignacions import (
    get_fitxes_assignacions,
    create_fitxes_assignacions,
    update_fitxes_assignacions,
    delete_fitxes_assignacions,
    get_all_fitxes_assignacions,
    get_assignacions_stats  
)
from data.schemas.sch_fitxes_assignacions import (
    FitxesAssignacions, 
    FitxesAssignacionsCreate, 
    FitxesAssignacionsStats,
    FitxaAssignacioUpdate
)

router = APIRouter(tags=["Fitxes Assignacions"])

@router.patch("/{assignment_id}", response_model=FitxesAssignacions)
async def update_fitxa_assignacio_partial(
    assignment_id: int, 
    update_data: FitxaAssignacioUpdate, 
    db: AsyncSession = Depends(get_db)
):
    # Obtiene solo los campos que se han enviado
    update_fields = update_data.dict(exclude_unset=True)
    
    updated_assignment = await update_fitxa_assignacio(db, assignment_id, update_fields)
    if not updated_assignment:
        raise HTTPException(status_code=404, detail="Fitxa Assignació no trobada")
    return updated_assignment

# Endpoint para obtener todos los registros con filtros avanzados
@router.get("/", response_model=List[FitxesAssignacions])
async def read_all_fitxes_assignacions(
    skip: int = Query(0, ge=0, description="Número de registros a omitir"),
    limit: int = Query(100, ge=1, le=1000, description="Número máximo de registros a devolver"),
    id_agents: Optional[int] = Query(None, description="ID del agente"),
    id_leads: Optional[int] = Query(None, description="ID del lead"),
    id_autor: Optional[int] = Query(None, description="ID del autor"),
    id_campanya_leads: Optional[int] = Query(None, description="ID de la campaña"),
    estat_fitxes_assignacions: Optional[str] = Query(None, description="Estado de la asignación"),
    potencial_fitxes_assignacions: Optional[int] = Query(None, description="Potencial de la asignación"),
    prioritat_fitxes_assignacions: Optional[int] = Query(None, description="Prioridad de la asignación"),
    fecha_inicio: Optional[str] = Query(None, description="Fecha de inicio (formato YYYY-MM-DD)"),
    fecha_fin: Optional[str] = Query(None, description="Fecha de fin (formato YYYY-MM-DD)"),
    db: AsyncSession = Depends(get_db)
):
    # Creamos el diccionario de filtros con los valores proporcionados
    filters = {}
    if id_agents is not None:
        filters["id_agents"] = id_agents
    if id_leads is not None:
        filters["id_leads"] = id_leads
    if id_autor is not None:
        filters["id_autor"] = id_autor
    if id_campanya_leads is not None:
        filters["id_campanya_leads"] = id_campanya_leads
    if estat_fitxes_assignacions:
        filters["estat_fitxes_assignacions"] = estat_fitxes_assignacions
    if potencial_fitxes_assignacions is not None:
        filters["potencial_fitxes_assignacions"] = potencial_fitxes_assignacions
    if prioritat_fitxes_assignacions is not None:
        filters["prioritat_fitxes_assignacions"] = prioritat_fitxes_assignacions
    if fecha_inicio and fecha_fin:
        filters["fecha_inicio"] = fecha_inicio
        filters["fecha_fin"] = fecha_fin
    
    assignacions = await get_all_fitxes_assignacions(db, skip=skip, limit=limit, filters=filters)
    return assignacions

# Endpoint para obtener estadísticas
@router.get("/stats", response_model=FitxesAssignacionsStats)
async def read_fitxes_assignacions_stats(
    id_agents: Optional[int] = Query(None, description="ID del agente"),
    id_leads: Optional[int] = Query(None, description="ID del lead"),
    id_autor: Optional[int] = Query(None, description="ID del autor"),
    id_campanya_leads: Optional[int] = Query(None, description="ID de la campaña"),
    estat_fitxes_assignacions: Optional[str] = Query(None, description="Estado de la asignación"),
    potencial_fitxes_assignacions: Optional[int] = Query(None, description="Potencial de la asignación"),
    prioritat_fitxes_assignacions: Optional[int] = Query(None, description="Prioridad de la asignación"),
    fecha_inicio: Optional[str] = Query(None, description="Fecha de inicio (formato YYYY-MM-DD)"),
    fecha_fin: Optional[str] = Query(None, description="Fecha de fin (formato YYYY-MM-DD)"),
    db: AsyncSession = Depends(get_db)
):
    filters = {}
    if id_agents is not None:
        filters["id_agents"] = id_agents
    if id_leads is not None:
        filters["id_leads"] = id_leads
    if id_autor is not None:
        filters["id_autor"] = id_autor
    if id_campanya_leads is not None:
        filters["id_campanya_leads"] = id_campanya_leads
    if estat_fitxes_assignacions:
        filters["estat_fitxes_assignacions"] = estat_fitxes_assignacions
    if potencial_fitxes_assignacions is not None:
        filters["potencial_fitxes_assignacions"] = potencial_fitxes_assignacions
    if prioritat_fitxes_assignacions is not None:
        filters["prioritat_fitxes_assignacions"] = prioritat_fitxes_assignacions
    if fecha_inicio and fecha_fin:
        filters["fecha_inicio"] = fecha_inicio
        filters["fecha_fin"] = fecha_fin
    
    stats = await get_assignacions_stats(db, filters)
    return stats

@router.get("/{assignacio_id}", response_model=FitxesAssignacions)
async def read_fitxes_assignacions(assignacio_id: int, db: AsyncSession = Depends(get_db)):
    assignacio = await get_fitxes_assignacions(db, assignacio_id)
    if not assignacio:
        raise HTTPException(status_code=404, detail="Fitxes Assignacions not found")
    return assignacio

@router.post("/", response_model=FitxesAssignacions, status_code=status.HTTP_201_CREATED)
async def create_fitxes_assignacions_endpoint(assignacio_in: FitxesAssignacionsCreate, db: AsyncSession = Depends(get_db)):
    assignacio = await create_fitxes_assignacions(db, assignacio_in)
    return assignacio

#ultim canvi 8/4/2025- evitar modificar data_creacio
@router.put("/{assignacio_id}", response_model=FitxesAssignacions)
async def update_fitxes_assignacions_endpoint(
    assignacio_id: int,
    assignacio_in: FitxesAssignacionsCreate,
    db: AsyncSession = Depends(get_db)
):
    update_data = assignacio_in.dict(exclude_unset=True)

    # Actualizar y comprobar si se encontró el registro
    updated_assignacio = await update_fitxes_assignacions(db, assignacio_id, update_data)

    if not updated_assignacio:
        raise HTTPException(status_code=404, detail="Assignació no trobada")

    return updated_assignacio

@router.delete("/{assignacio_id}", response_model=dict)
async def delete_fitxes_assignacions_endpoint(assignacio_id: int, db: AsyncSession = Depends(get_db)):
    success = await delete_fitxes_assignacions(db, assignacio_id)
    if not success:
        raise HTTPException(status_code=404, detail="Fitxes Assignacions not found")
    return {"detail": "Fitxes Assignacions deleted successfully"}