# registres_auditories_crud.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.registres_auditories import RegistreAuditoria
from data.schemas.sch_registres_auditories import RegistreAuditoriaCreate, RegistreAuditoria as RegistreAuditoriaSchema
from typing import List


async def get_registre(db: AsyncSession, registre_id: int) -> RegistreAuditoria:
    result = await db.execute(select(RegistreAuditoria).filter(RegistreAuditoria.id_registre_auditoria == registre_id))
    return result.scalars().first()

async def get_all_registres_auditories(db: AsyncSession) -> List[RegistreAuditoria]:
    result = await db.execute(select(RegistreAuditoria))
    return result.scalars().all()

async def create_registre(db: AsyncSession, registre_in: RegistreAuditoriaCreate) -> RegistreAuditoria:
    new_registre = RegistreAuditoria(**registre_in.dict())
    db.add(new_registre)
    await db.commit()
    await db.refresh(new_registre)
    return new_registre

async def update_registre(db: AsyncSession, registre_id: int, update_data: dict) -> RegistreAuditoria:
    result = await db.execute(select(RegistreAuditoria).filter(RegistreAuditoria.id_registre_auditoria == registre_id))
    registre = result.scalars().first()
    if registre:
        for key, value in update_data.items():
            setattr(registre, key, value)
        await db.commit()
        await db.refresh(registre)
    return registre

async def delete_registre(db: AsyncSession, registre_id: int) -> bool:
    result = await db.execute(select(RegistreAuditoria).filter(RegistreAuditoria.id_registre_auditoria == registre_id))
    registre = result.scalars().first()
    if registre:
        await db.delete(registre)
        await db.commit()
        return True
    return False
