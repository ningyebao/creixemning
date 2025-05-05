# data/cruds/cd_seguiment_trucades.py

from typing import List, Optional, Dict, Any, Tuple

# Importamos la sesión asíncrona de SQLAlchemy
from sqlalchemy.ext.asyncio import AsyncSession
# Importamos los constructores de consultas necesarias
from sqlalchemy import select, update, delete

from data.models.seguiment_trucades import SeguimentTrucades
from data.schemas.sch_seguiment_trucades import SeguimentTrucadesCreate


async def create_seguiment_trucades(
    db: AsyncSession,
    seguiment_data: SeguimentTrucadesCreate
) -> SeguimentTrucades:
    seguiment = SeguimentTrucades(**seguiment_data.dict())
    db.add(seguiment)
    await db.commit()
    await db.refresh(seguiment)
    return seguiment


async def get_seguiment_trucades(
    db: AsyncSession,
    seguiment_id: int
) -> Optional[SeguimentTrucades]:
    result = await db.execute(
        select(SeguimentTrucades)
        .where(SeguimentTrucades.id_seguiment_trucades == seguiment_id)
    )
    return result.scalar_one_or_none()


async def get_all_seguiments_trucades(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 100
) -> List[SeguimentTrucades]:
    result = await db.execute(
        select(SeguimentTrucades)
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()


async def update_seguiment_trucades(
    db: AsyncSession,
    seguiment_id: int,
    update_data: dict
) -> Optional[SeguimentTrucades]:
    stmt = (
        update(SeguimentTrucades)
        .where(SeguimentTrucades.id_seguiment_trucades == seguiment_id)
        .values(**update_data)
        .execution_options(synchronize_session="fetch")
    )
    await db.execute(stmt)
    await db.commit()
    return await get_seguiment_trucades(db, seguiment_id)


async def delete_seguiment_trucades(
    db: AsyncSession,
    seguiment_id: int
) -> bool:
    result = await db.execute(
        delete(SeguimentTrucades)
        .where(SeguimentTrucades.id_seguiment_trucades == seguiment_id)
    )
    await db.commit()
    return result.rowcount > 0
