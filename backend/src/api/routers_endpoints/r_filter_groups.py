from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from data.database import get_db
from data.cruds.cd_filter_groups import (
    create_filter_group,
    get_filter_groups,
    get_filter_group,
    update_filter_group,
    delete_filter_group
)
from data.schemas.sch_filter_group import FilterGroupCreate, FilterGroupUpdate, FilterGroupResponse

router = APIRouter()

@router.post("/", response_model=FilterGroupResponse, status_code=status.HTTP_201_CREATED)
async def create_filter_group_endpoint(
    filter_group: FilterGroupCreate,
    db: AsyncSession = Depends(get_db)
):
    """Crear un nuevo grupo de filtros"""
    return await create_filter_group(db, filter_group)

@router.get("/", response_model=List[FilterGroupResponse])
async def read_filter_groups_endpoint(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    """Obtener todos los grupos de filtros"""
    filter_groups = await get_filter_groups(db, skip, limit)
    return filter_groups

@router.get("/{filter_group_id}", response_model=FilterGroupResponse)
async def read_filter_group_endpoint(
    filter_group_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Obtener un grupo de filtros específico por ID"""
    filter_group = await get_filter_group(db, filter_group_id)
    if filter_group is None:
        raise HTTPException(status_code=404, detail="Grupo de filtros no encontrado")
    return filter_group

@router.put("/{filter_group_id}", response_model=FilterGroupResponse)
async def update_filter_group_endpoint(
    filter_group_id: int,
    filter_group_update: FilterGroupUpdate,
    db: AsyncSession = Depends(get_db)
):
    """Actualizar un grupo de filtros existente"""
    filter_group = await get_filter_group(db, filter_group_id)
    if filter_group is None:
        raise HTTPException(status_code=404, detail="Grupo de filtros no encontrado")
    
    updated_filter_group = await update_filter_group(
        db, filter_group_id, filter_group_update
    )
    return updated_filter_group

@router.delete("/{filter_group_id}", response_model=dict)
async def delete_filter_group_endpoint(
    filter_group_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Eliminar un grupo de filtros"""
    filter_group = await get_filter_group(db, filter_group_id)
    if filter_group is None:
        raise HTTPException(status_code=404, detail="Grupo de filtros no encontrado")
    
    success = await delete_filter_group(db, filter_group_id)
    if success:
        return {"detail": "Grupo de filtros eliminado correctamente"}
    else:
        raise HTTPException(
            status_code=500,
            detail="Error al eliminar el grupo de filtros"
        )