# producte_facturacio_crud.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from data.models.productes_facturacio import ProducteFacturacio
from data.schemas.sch_productes_facturacio import ProducteFacturacioCreate, ProducteFacturacio as ProducteFacturacioSchema

async def get_producte_facturacio(db: AsyncSession, id_facturacio: int, id_producte: int) -> ProducteFacturacio:
    result = await db.execute(
        select(ProducteFacturacio).filter(
            ProducteFacturacio.id_facturacio == id_facturacio,
            ProducteFacturacio.id_producte == id_producte
        )
    )
    return result.scalars().first()

async def get_all_productes_facturacio(db: AsyncSession) -> List[ProducteFacturacio]:
    result = await db.execute(select(ProducteFacturacio))
    return result.scalars().all()

async def create_producte_facturacio(db: AsyncSession, pf_in: ProducteFacturacioCreate) -> ProducteFacturacio:
    new_pf = ProducteFacturacio(**pf_in.dict())
    db.add(new_pf)
    await db.commit()
    await db.refresh(new_pf)
    return new_pf

async def update_producte_facturacio(db: AsyncSession, id_facturacio: int, id_producte: int, update_data: dict) -> ProducteFacturacio:
    pf = await get_producte_facturacio(db, id_facturacio, id_producte)
    if pf:
        for key, value in update_data.items():
            setattr(pf, key, value)
        await db.commit()
        await db.refresh(pf)
    return pf

async def delete_producte_facturacio(db: AsyncSession, id_facturacio: int, id_producte: int) -> bool:
    pf = await get_producte_facturacio(db, id_facturacio, id_producte)
    if pf:
        await db.delete(pf)
        await db.commit()
        return True
    return False
