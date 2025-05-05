from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.altes_productes import AltaProducte
from data.schemas.sch_altes_productes import AltaProducteCreate, AltaProducte as AltaProducteSchema

async def get_alta_producte(db: AsyncSession, alta_producte_id: int) -> AltaProducte:
    result = await db.execute(select(AltaProducte).filter(AltaProducte.id_alta_producte == alta_producte_id))
    return result.scalars().first()

async def create_alta_producte(db: AsyncSession, ap_in: AltaProducteCreate) -> AltaProducte:
    new_ap = AltaProducte(**ap_in.dict())
    db.add(new_ap)
    await db.commit()
    await db.refresh(new_ap)
    return new_ap

async def update_alta_producte(db: AsyncSession, alta_producte_id: int, update_data: dict) -> AltaProducte:
    result = await db.execute(select(AltaProducte).filter(AltaProducte.id_alta_producte == alta_producte_id))
    ap = result.scalars().first()
    if ap:
        for key, value in update_data.items():
            setattr(ap, key, value)
        await db.commit()
        await db.refresh(ap)
    return ap

async def delete_alta_producte(db: AsyncSession, alta_producte_id: int) -> bool:
    result = await db.execute(select(AltaProducte).filter(AltaProducte.id_alta_producte == alta_producte_id))
    ap = result.scalars().first()
    if ap:
        await db.delete(ap)
        await db.commit()
        return True
    return False

# NUEVA FUNCIÓN: Obtener todos los registros (con paginación)
async def get_all_altes_productes(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 100
) -> List[AltaProducte]:
    query = select(AltaProducte).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()
