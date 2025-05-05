from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.campanya_productes import CampanyaProducte
from data.schemas.sch_campanya_productes import CampanyaProducteCreate, CampanyaProducte as CampanyaProducteSchema

async def get_campanya_producte(db: AsyncSession, id_campanya: int, id_producte: int) -> CampanyaProducte:
    result = await db.execute(
        select(CampanyaProducte).filter(
            CampanyaProducte.id_campanya == id_campanya,
            CampanyaProducte.id_producte == id_producte
        )
    )
    return result.scalars().first()

async def create_campanya_producte(db: AsyncSession, cp_in: CampanyaProducteCreate) -> CampanyaProducte:
    new_cp = CampanyaProducte(**cp_in.dict())
    db.add(new_cp)
    await db.commit()
    await db.refresh(new_cp)
    return new_cp

async def update_campanya_producte(db: AsyncSession, id_campanya: int, id_producte: int, update_data: dict) -> CampanyaProducte:
    cp = await get_campanya_producte(db, id_campanya, id_producte)
    if cp:
        for key, value in update_data.items():
            setattr(cp, key, value)
        await db.commit()
        await db.refresh(cp)
    return cp

async def delete_campanya_producte(db: AsyncSession, id_campanya: int, id_producte: int) -> bool:
    cp = await get_campanya_producte(db, id_campanya, id_producte)
    if cp:
        await db.delete(cp)
        await db.commit()
        return True
    return False

async def get_all_campanya_productes(db: AsyncSession) -> List[CampanyaProducte]:
    result = await db.execute(select(CampanyaProducte))
    return result.scalars().all()
