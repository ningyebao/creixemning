from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from sqlalchemy.exc import SQLAlchemyError
from typing import List, Optional

from data.models.filter_group import FilterGroup
from data.schemas.sch_filter_group import FilterGroupCreate, FilterGroupUpdate


async def create_filter_group(
    db: AsyncSession,
    filter_group: FilterGroupCreate
) -> FilterGroup:
    """Crear un nuevo grupo de filtros"""
    db_filter_group = FilterGroup(
        name=filter_group.name,
        description=filter_group.description,
        filters=filter_group.filters
    )
    
    try:
        db.add(db_filter_group)
        await db.commit()
        await db.refresh(db_filter_group)
        return db_filter_group
    except SQLAlchemyError as e:
        await db.rollback()
        raise e


async def get_filter_groups(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 100
) -> List[FilterGroup]:
    """Obtener todos los grupos de filtros con paginación"""
    query = select(FilterGroup).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()


async def get_filter_group(
    db: AsyncSession,
    filter_group_id: int
) -> Optional[FilterGroup]:
    """Obtener un grupo de filtros por ID"""
    query = select(FilterGroup).where(FilterGroup.id == filter_group_id)
    result = await db.execute(query)
    return result.scalar_one_or_none()


async def update_filter_group(
    db: AsyncSession,
    filter_group_id: int,
    filter_group_update: FilterGroupUpdate
) -> Optional[FilterGroup]:
    """Actualizar un grupo de filtros existente"""
    # Obtener el grupo de filtros existente
    query = select(FilterGroup).where(FilterGroup.id == filter_group_id)
    result = await db.execute(query)
    db_filter_group = result.scalar_one_or_none()
    
    if not db_filter_group:
        return None
    
    # Actualizar solo los campos proporcionados
    update_data = filter_group_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_filter_group, field, value)
    
    try:
        await db.commit()
        await db.refresh(db_filter_group)
        return db_filter_group
    except SQLAlchemyError as e:
        await db.rollback()
        raise e


async def delete_filter_group(
    db: AsyncSession,
    filter_group_id: int
) -> bool:
    """Eliminar un grupo de filtros"""
    query = delete(FilterGroup).where(FilterGroup.id == filter_group_id)
    
    try:
        result = await db.execute(query)
        await db.commit()
        return result.rowcount > 0
    except SQLAlchemyError as e:
        await db.rollback()
        raise e