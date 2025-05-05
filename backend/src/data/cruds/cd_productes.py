# producte_crud.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.productes import Producte
from typing import List
from data.schemas.sch_productes import ProducteCreate, Producte as ProducteSchema

async def get_producte(db: AsyncSession, producte_id: int) -> Producte:
    result = await db.execute(select(Producte).filter(Producte.id_producte == producte_id))
    return result.scalars().first()

async def get_all_productes(db: AsyncSession) -> List[Producte]:
    result = await db.execute(select(Producte))
    return result.scalars().all()

async def create_producte(db: AsyncSession, producte_in: ProducteCreate) -> Producte:
    new_producte = Producte(**producte_in.dict())
    db.add(new_producte)
    await db.commit()
    await db.refresh(new_producte)
    return new_producte

async def update_producte(db: AsyncSession, producte_id: int, update_data: dict) -> Producte:
    result = await db.execute(select(Producte).filter(Producte.id_producte == producte_id))
    producte = result.scalars().first()
    if producte:
        for key, value in update_data.items():
            setattr(producte, key, value)
        await db.commit()
        await db.refresh(producte)
    return producte

async def delete_producte(db: AsyncSession, producte_id: int) -> bool:
    result = await db.execute(select(Producte).filter(Producte.id_producte == producte_id))
    producte = result.scalars().first()
    if producte:
        await db.delete(producte)
        await db.commit()
        return True
    return False
