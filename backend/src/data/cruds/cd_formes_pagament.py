# formes_pagament_crud.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from data.models.formes_pagament import FormesPagament
from data.schemas.sch_formes_pagament import FormesPagamentCreate, FormesPagament as FormesPagamentSchema

async def get_forma_pagament(db: AsyncSession, forma_id: int) -> FormesPagament:
    result = await db.execute(select(FormesPagament).filter(FormesPagament.id_formapagament == forma_id))
    return result.scalars().first()

async def get_all_formes_pagament(db: AsyncSession) -> List[FormesPagament]:
    result = await db.execute(select(FormesPagament))
    return result.scalars().all()

async def create_forma_pagament(db: AsyncSession, forma_in: FormesPagamentCreate) -> FormesPagament:
    new_forma = FormesPagament(**forma_in.dict())
    db.add(new_forma)
    await db.commit()
    await db.refresh(new_forma)
    return new_forma

async def update_forma_pagament(db: AsyncSession, forma_id: int, update_data: dict) -> FormesPagament:
    result = await db.execute(select(FormesPagament).filter(FormesPagament.id_formapagament == forma_id))
    forma = result.scalars().first()
    if forma:
        for key, value in update_data.items():
            setattr(forma, key, value)
        await db.commit()
        await db.refresh(forma)
    return forma

async def delete_forma_pagament(db: AsyncSession, forma_id: int) -> bool:
    result = await db.execute(select(FormesPagament).filter(FormesPagament.id_formapagament == forma_id))
    forma = result.scalars().first()
    if forma:
        await db.delete(forma)
        await db.commit()
        return True
    return False
