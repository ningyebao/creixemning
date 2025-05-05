from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from data.database import get_db
from data.cruds.cd_registres_auditories import (
    get_all_registres_auditories,
    get_registre,
    create_registre,
    update_registre,
    delete_registre
)
from data.schemas.sch_registres_auditories import RegistreAuditoria, RegistreAuditoriaCreate

router = APIRouter(tags=["Registres Auditories"])

@router.get("/", response_model=List[RegistreAuditoria])
async def read_all_registres_auditories(db: AsyncSession = Depends(get_db)):
    return await get_all_registres_auditories(db)

@router.get("/{registre_id}", response_model=RegistreAuditoria)
async def read_registre(registre_id: int, db: AsyncSession = Depends(get_db)):
    reg = await get_registre(db, registre_id)
    if not reg:
        raise HTTPException(status_code=404, detail="Registre not found")
    return reg

@router.post("/", response_model=RegistreAuditoria, status_code=status.HTTP_201_CREATED)
async def create_registre_endpoint(registre_in: RegistreAuditoriaCreate, db: AsyncSession = Depends(get_db)):
    return await create_registre(db, registre_in)

@router.put("/{registre_id}", response_model=RegistreAuditoria)
async def update_registre_endpoint(registre_id: int, registre_in: RegistreAuditoriaCreate, db: AsyncSession = Depends(get_db)):
    updated = await update_registre(db, registre_id, registre_in.dict(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Registre not found")
    return updated

@router.delete("/{registre_id}", response_model=dict)
async def delete_registre_endpoint(registre_id: int, db: AsyncSession = Depends(get_db)):
    success = await delete_registre(db, registre_id)
    if not success:
        raise HTTPException(status_code=404, detail="Registre not found")
    return {"detail": "Registre deleted successfully"}
