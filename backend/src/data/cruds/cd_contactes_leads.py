# contactes_leads_crud.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.contactes_leads import ContacteLead
from typing import List
from sqlalchemy.future import select
from data.schemas.sch_contactes_leads import ContacteLeadCreate, ContacteLead as ContacteLeadSchema

async def get_contacte_lead(db: AsyncSession, contacte_id: int) -> ContacteLead:
    result = await db.execute(select(ContacteLead).filter(ContacteLead.id_contacte_lead == contacte_id))
    return result.scalars().first()

async def get_all_contactes_leads(db: AsyncSession) -> List[ContacteLead]:
    result = await db.execute(select(ContacteLead))
    return result.scalars().all()


async def create_contacte_lead(db: AsyncSession, contacte_in: ContacteLeadCreate) -> ContacteLead:
    new_contacte = ContacteLead(**contacte_in.dict())
    db.add(new_contacte)
    await db.commit()
    await db.refresh(new_contacte)
    return new_contacte

async def update_contacte_lead(db: AsyncSession, contacte_id: int, update_data: dict) -> ContacteLead:
    result = await db.execute(select(ContacteLead).filter(ContacteLead.id_contacte_lead == contacte_id))
    contacte = result.scalars().first()
    if contacte:
        for key, value in update_data.items():
            setattr(contacte, key, value)
        await db.commit()
        await db.refresh(contacte)
    return contacte

async def delete_contacte_lead(db: AsyncSession, contacte_id: int) -> bool:
    result = await db.execute(select(ContacteLead).filter(ContacteLead.id_contacte_lead == contacte_id))
    contacte = result.scalars().first()
    if contacte:
        await db.delete(contacte)
        await db.commit()
        return True
    return False
