# facturacio_crud.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.facturacio import Facturacio
from typing import List
from data.schemas.sch_facturacio import FacturacioCreate, Facturacio as FacturacioSchema

async def get_facturacio(db: AsyncSession, facturacio_id: int) -> Facturacio:
    result = await db.execute(select(Facturacio).filter(Facturacio.id_facturacio == facturacio_id))
    return result.scalars().first()

async def get_all_facturacions(db: AsyncSession) -> List[Facturacio]:
    result = await db.execute(select(Facturacio))
    return result.scalars().all()

async def create_facturacio(db: AsyncSession, facturacio_in: FacturacioCreate) -> Facturacio:
    new_facturacio = Facturacio(**facturacio_in.dict())
    db.add(new_facturacio)
    await db.commit()
    await db.refresh(new_facturacio)
    return new_facturacio

async def update_facturacio(db: AsyncSession, facturacio_id: int, update_data: dict) -> Facturacio:
    result = await db.execute(select(Facturacio).filter(Facturacio.id_facturacio == facturacio_id))
    facturacio = result.scalars().first()
    if facturacio:
        for key, value in update_data.items():
            setattr(facturacio, key, value)
        await db.commit()
        await db.refresh(facturacio)
    return facturacio

async def delete_facturacio(db: AsyncSession, facturacio_id: int) -> bool:
    result = await db.execute(select(Facturacio).filter(Facturacio.id_facturacio == facturacio_id))
    facturacio = result.scalars().first()
    if facturacio:
        await db.delete(facturacio)
        await db.commit()
        return True
    return False
