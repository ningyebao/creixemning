# cd_campanyes.py

from typing import List
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.campanyes import Campanya
from data.schemas.sch_campanyes import CampanyaCreate, Campanya as CampanyaSchema

async def get_campanya(db: AsyncSession, campanya_id: int) -> Campanya:
    result = await db.execute(
        select(Campanya).filter(Campanya.id_campanya == campanya_id)
    )
    return result.scalars().first()

async def create_campanya(db: AsyncSession, campanya_in: CampanyaCreate) -> Campanya:
    # Convertir a dict excluyendo campos no enviados
    data = campanya_in.dict(exclude_unset=True)
    # Si contiene datetimes con tzinfo, los volvemos naive
    for field, val in data.items():
        if isinstance(val, datetime) and val.tzinfo is not None:
            data[field] = val.replace(tzinfo=None)
    # Crear y persistir
    new = Campanya(**data)
    db.add(new)
    await db.commit()
    await db.refresh(new)
    return new

async def update_campanya(db: AsyncSession, campanya_id: int, update_data: dict) -> Campanya:
    result = await db.execute(
        select(Campanya).filter(Campanya.id_campanya == campanya_id)
    )
    camp = result.scalars().first()
    if camp:
        for key, val in update_data.items():
            setattr(camp, key, val)
        await db.commit()
        await db.refresh(camp)
    return camp

async def delete_campanya(db: AsyncSession, campanya_id: int) -> bool:
    result = await db.execute(
        select(Campanya).filter(Campanya.id_campanya == campanya_id)
    )
    camp = result.scalars().first()
    if camp:
        await db.delete(camp)
        await db.commit()
        return True
    return False

async def get_all_campanyes(db: AsyncSession) -> List[Campanya]:
    result = await db.execute(select(Campanya))
    return result.scalars().all()
