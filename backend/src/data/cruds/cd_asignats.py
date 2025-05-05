# asignat_crud.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.asignats import Asignat
from data.schemas.sch_asignats import AsignatCreate, Asignat as AsignatSchema
from typing import List

async def get_asignat(db: AsyncSession, id_campanya: int, id_agent: int) -> Asignat:
    result = await db.execute(
        select(Asignat).filter(
            Asignat.asig_IDcampanya == id_campanya,
            Asignat.asig_IDagent == id_agent
        )
    )
    return result.scalars().first()

async def get_all_asignats(db: AsyncSession) -> List[Asignat]:
    result = await db.execute(select(Asignat))
    return result.scalars().all()

async def create_asignat(db: AsyncSession, asignat_in: AsignatCreate) -> Asignat:
    new_asignat = Asignat(**asignat_in.dict())
    db.add(new_asignat)
    await db.commit()
    return new_asignat

async def delete_asignat(db: AsyncSession, id_campanya: int, id_agent: int) -> bool:
    asignat = await get_asignat(db, id_campanya, id_agent)
    if asignat:
        await db.delete(asignat)
        await db.commit()
        return True
    return False
