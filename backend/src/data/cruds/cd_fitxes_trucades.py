# fitxes_trucades_crud.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.fitxes_trucades import FitxaTrucada
from typing import List
from sqlalchemy.future import select
from data.schemas.sch_fitxes_trucades import FitxaTrucadaCreate, FitxaTrucada as FitxaTrucadaSchema

async def get_fitxa_trucada(db: AsyncSession, trucada_id: int) -> FitxaTrucada:
    result = await db.execute(select(FitxaTrucada).filter(FitxaTrucada.id_trucada_fitxes_trucades == trucada_id))
    return result.scalars().first()

async def get_all_fitxes_trucades(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[FitxaTrucada]:
    result = await db.execute(select(FitxaTrucada).offset(skip).limit(limit))
    return result.scalars().all()

async def create_fitxa_trucada(db: AsyncSession, trucada_in: FitxaTrucadaCreate) -> FitxaTrucada:
    new_trucada = FitxaTrucada(**trucada_in.dict())
    db.add(new_trucada)
    await db.commit()
    await db.refresh(new_trucada)
    return new_trucada

async def update_fitxa_trucada(db: AsyncSession, trucada_id: int, update_data: dict) -> FitxaTrucada:
    result = await db.execute(select(FitxaTrucada).filter(FitxaTrucada.id_trucada_fitxes_trucades == trucada_id))
    trucada = result.scalars().first()
    if trucada:
        for key, value in update_data.items():
            setattr(trucada, key, value)
        await db.commit()
        await db.refresh(trucada)
    return trucada

async def delete_fitxa_trucada(db: AsyncSession, trucada_id: int) -> bool:
    result = await db.execute(select(FitxaTrucada).filter(FitxaTrucada.id_trucada_fitxes_trucades == trucada_id))
    trucada = result.scalars().first()
    if trucada:
        await db.delete(trucada)
        await db.commit()
        return True
    return False
