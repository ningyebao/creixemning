from fastapi import APIRouter, Depends, HTTPException, Query, Path
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime

from data.database import get_db
from data.cruds.cd_sucursal import (
    create_sucursal, get_all_sucursales, get_sucursal_by_id,
    get_sucursales_by_lead_id, update_sucursal, delete_sucursal,
    set_sucursal_principal, count_sucursales_by_lead
)

# Esquemas Pydantic para validación de datos
class SucursalBase(BaseModel):
    id_lead: Optional[int] = None
    nom_sucursal: str
    adreça_sucursal: Optional[str] = None
    telefon_sucursal: Optional[str] = None
    es_principal: bool = False

class SucursalCreate(SucursalBase):
    pass

class SucursalUpdate(SucursalBase):
    id_lead: Optional[int] = None
    nom_sucursal: Optional[str] = None

class SucursalResponse(SucursalBase):
    id_sucursal: int
    
    class Config:
        orm_mode = True

# Crear router
router = APIRouter(
    tags=["sucursales"],
    responses={404: {"description": "Sucursal no encontrada"}},
)

# Rutas para el CRUD de sucursales
@router.post("/", response_model=SucursalResponse, status_code=201)
def api_create_sucursal(
    sucursal: SucursalCreate,
    db: Session = Depends(get_db)
):
    """
    Crea una nueva sucursal.
    """
    sucursal_data = sucursal.dict()
    return create_sucursal(db, sucursal_data)

@router.get("/", response_model=List[SucursalResponse])
def api_get_all_sucursales(
    skip: int = 0,
    limit: int = 100,
    id_lead: Optional[int] = None,
    es_principal: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    """
    Obtiene todas las sucursales con filtros opcionales.
    """
    filters = {}
    if id_lead is not None:
        filters["id_lead"] = id_lead
    if es_principal is not None:
        filters["es_principal"] = es_principal
        
    return get_all_sucursales(db, skip=skip, limit=limit, filters=filters)

@router.get("/{sucursal_id}", response_model=SucursalResponse)
def api_get_sucursal_by_id(
    sucursal_id: int = Path(..., title="ID de la sucursal", ge=1),
    db: Session = Depends(get_db)
):
    """
    Obtiene una sucursal por su ID.
    """
    return get_sucursal_by_id(db, sucursal_id)

@router.get("/lead/{lead_id}", response_model=List[SucursalResponse])
def api_get_sucursales_by_lead(
    lead_id: int = Path(..., title="ID del lead", ge=1),
    db: Session = Depends(get_db)
):
    """
    Obtiene todas las sucursales asociadas a un lead.
    """
    return get_sucursales_by_lead_id(db, lead_id)

@router.put("/{sucursal_id}", response_model=SucursalResponse)
def api_update_sucursal(
    sucursal_id: int = Path(..., title="ID de la sucursal", ge=1),
    sucursal: SucursalUpdate = ...,
    db: Session = Depends(get_db)
):
    """
    Actualiza una sucursal existente.
    """
    sucursal_data = {k: v for k, v in sucursal.dict().items() if v is not None}
    return update_sucursal(db, sucursal_id, sucursal_data)

@router.delete("/{sucursal_id}")
def api_delete_sucursal(
    sucursal_id: int = Path(..., title="ID de la sucursal", ge=1),
    db: Session = Depends(get_db)
):
    """
    Elimina una sucursal por su ID.
    """
    return delete_sucursal(db, sucursal_id)

@router.post("/{sucursal_id}/set-principal")
def api_set_sucursal_principal(
    sucursal_id: int = Path(..., title="ID de la sucursal", ge=1),
    lead_id: int = Query(..., title="ID del lead", ge=1),
    db: Session = Depends(get_db)
):
    """
    Marca una sucursal como principal y desmarca las demás del mismo lead.
    """
    return set_sucursal_principal(db, sucursal_id, lead_id)

@router.get("/lead/{lead_id}/count", response_model=int)
def api_count_sucursales_by_lead(
    lead_id: int = Path(..., title="ID del lead", ge=1),
    db: Session = Depends(get_db)
):
    """
    Cuenta el número de sucursales asociadas a un lead.
    """
    return count_sucursales_by_lead(db, lead_id)