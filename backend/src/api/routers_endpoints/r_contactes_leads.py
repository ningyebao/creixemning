from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from data.database import get_db
from data.cruds.cd_contactes_leads import get_all_contactes_leads, get_contacte_lead, create_contacte_lead, update_contacte_lead, delete_contacte_lead
from data.schemas.sch_contactes_leads import ContacteLead, ContacteLeadCreate

router = APIRouter(tags=["Contactes Leads"])

@router.get("/", response_model=List[ContacteLead])
async def read_all_contactes_leads(db: AsyncSession = Depends(get_db)):
    return await get_all_contactes_leads(db)

@router.get("/{contacte_id}", response_model=ContacteLead)
async def read_contacte_lead(contacte_id: int, db: AsyncSession = Depends(get_db)):
    contacte = await get_contacte_lead(db, contacte_id)
    if not contacte:
        raise HTTPException(status_code=404, detail="Contacte Lead not found")
    return contacte

@router.post("/", response_model=ContacteLead, status_code=status.HTTP_201_CREATED)
async def create_contacte_lead_endpoint(contacte_in: ContacteLeadCreate, db: AsyncSession = Depends(get_db)):
    contacte = await create_contacte_lead(db, contacte_in)
    return contacte

@router.put("/{contacte_id}", response_model=ContacteLead)
async def update_contacte_lead_endpoint(contacte_id: int, contacte_in: ContacteLeadCreate, db: AsyncSession = Depends(get_db)):
    updated_contacte = await update_contacte_lead(db, contacte_id, contacte_in.dict(exclude_unset=True))
    if not updated_contacte:
        raise HTTPException(status_code=404, detail="Contacte Lead not found")
    return updated_contacte

@router.delete("/{contacte_id}", response_model=dict)
async def delete_contacte_lead_endpoint(contacte_id: int, db: AsyncSession = Depends(get_db)):
    success = await delete_contacte_lead(db, contacte_id)
    if not success:
        raise HTTPException(status_code=404, detail="Contacte Lead not found")
    return {"detail": "Contacte Lead deleted successfully"}
