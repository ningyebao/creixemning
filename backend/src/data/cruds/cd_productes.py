# cd_productes.py

from typing import List
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.productes import Producte
from data.schemas.sch_productes import ProducteCreate, Producte as ProducteSchema

async def get_producte(db: AsyncSession, producte_id: int) -> Producte:
    result = await db.execute(
        select(Producte).filter(Producte.id_producte == producte_id)
    )
    return result.scalars().first()

async def get_all_productes(db: AsyncSession) -> List[Producte]:
    result = await db.execute(select(Producte))
    return result.scalars().all()

async def create_producte(db: AsyncSession, producte_in: ProducteCreate) -> Producte:
    # Convertir a dict excluyendo campos no enviados
    data = producte_in.dict(exclude_unset=True)
    # Si contiene datetimes con tzinfo, los volvemos naive
    for field, val in data.items():
        if isinstance(val, datetime) and val.tzinfo is not None:
            data[field] = val.replace(tzinfo=None)
    # Crear y persistir
    new = Producte(**data)
    db.add(new)
    await db.commit()
    await db.refresh(new)
    return new

async def update_producte(db: AsyncSession, producte_id: int, update_data: dict) -> Producte:
    result = await db.execute(
        select(Producte).filter(Producte.id_producte == producte_id)
    )
    prod = result.scalars().first()
    if prod:
        for key, val in update_data.items():
            setattr(prod, key, val)
        await db.commit()
        await db.refresh(prod)
    return prod

async def delete_producte(db: AsyncSession, producte_id: int) -> bool:
    result = await db.execute(
        select(Producte).filter(Producte.id_producte == producte_id)
    )
    prod = result.scalars().first()
    if prod:
        await db.delete(prod)
        await db.commit()
        return True
    return False
