from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.altes import Alta
from data.schemas.sch_altes import AltaCreate, Alta as AltaSchema
from typing import List

async def get_alta(db: AsyncSession, alta_id: int) -> Alta:
    result = await db.execute(select(Alta).filter(Alta.id_alta == alta_id))
    return result.scalars().first()

async def create_alta(db: AsyncSession, alta_in: AltaCreate) -> Alta:
    new_alta = Alta(**alta_in.dict())
    db.add(new_alta)
    await db.commit()
    await db.refresh(new_alta)
    return new_alta

async def get_all_altes(db: AsyncSession) -> List[Alta]:
    result = await db.execute(select(Alta))
    return result.scalars().all()

async def update_alta(db: AsyncSession, alta_id: int, update_data: dict) -> Alta:
    result = await db.execute(select(Alta).filter(Alta.id_alta == alta_id))
    alta = result.scalars().first()
    if alta:
        for key, value in update_data.items():
            setattr(alta, key, value)
        await db.commit()
        await db.refresh(alta)
    return alta

async def delete_alta(db: AsyncSession, alta_id: int) -> bool:
    result = await db.execute(select(Alta).filter(Alta.id_alta == alta_id))
    alta = result.scalars().first()
    if alta:
        await db.delete(alta)
        await db.commit()
        return True
    return False
