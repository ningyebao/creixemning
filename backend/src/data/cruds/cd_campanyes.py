from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.campanyes import Campanya
from data.schemas.sch_campanyes import CampanyaCreate, Campanya as CampanyaSchema

async def get_campanya(db: AsyncSession, campanya_id: int) -> Campanya:
    result = await db.execute(select(Campanya).filter(Campanya.id_campanya == campanya_id))
    return result.scalars().first()

async def create_campanya(db: AsyncSession, campanya_in: CampanyaCreate) -> Campanya:
    new_campanya = Campanya(**campanya_in.dict())
    db.add(new_campanya)
    await db.commit()
    await db.refresh(new_campanya)
    return new_campanya

async def update_campanya(db: AsyncSession, campanya_id: int, update_data: dict) -> Campanya:
    result = await db.execute(select(Campanya).filter(Campanya.id_campanya == campanya_id))
    campanya = result.scalars().first()
    if campanya:
        for key, value in update_data.items():
            setattr(campanya, key, value)
        await db.commit()
        await db.refresh(campanya)
    return campanya

async def delete_campanya(db: AsyncSession, campanya_id: int) -> bool:
    result = await db.execute(select(Campanya).filter(Campanya.id_campanya == campanya_id))
    campanya = result.scalars().first()
    if campanya:
        await db.delete(campanya)
        await db.commit()
        return True
    return False

async def get_all_campanyes(db: AsyncSession) -> List[Campanya]:
    result = await db.execute(select(Campanya))
    return result.scalars().all()
