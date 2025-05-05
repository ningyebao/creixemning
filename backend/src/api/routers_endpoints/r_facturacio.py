from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from data.database import get_db
from data.cruds.cd_facturacio import get_all_facturacions, get_facturacio, create_facturacio, update_facturacio, delete_facturacio
from data.schemas.sch_facturacio import Facturacio, FacturacioCreate

router = APIRouter(tags=["Facturació"])

@router.get("/", response_model=List[Facturacio])
async def read_all_facturacions(db: AsyncSession = Depends(get_db)):
    return await get_all_facturacions(db)

@router.get("/{facturacio_id}", response_model=Facturacio)
async def read_facturacio(facturacio_id: int, db: AsyncSession = Depends(get_db)):
    fact = await get_facturacio(db, facturacio_id)
    if not fact:
        raise HTTPException(status_code=404, detail="Facturació not found")
    return fact

@router.post("/", response_model=Facturacio, status_code=status.HTTP_201_CREATED)
async def create_facturacio_endpoint(fact_in: FacturacioCreate, db: AsyncSession = Depends(get_db)):
    fact = await create_facturacio(db, fact_in)
    return fact

@router.put("/{facturacio_id}", response_model=Facturacio)
async def update_facturacio_endpoint(facturacio_id: int, fact_in: FacturacioCreate, db: AsyncSession = Depends(get_db)):
    updated_fact = await update_facturacio(db, facturacio_id, fact_in.dict(exclude_unset=True))
    if not updated_fact:
        raise HTTPException(status_code=404, detail="Facturació not found")
    return updated_fact

@router.delete("/{facturacio_id}", response_model=dict)
async def delete_facturacio_endpoint(facturacio_id: int, db: AsyncSession = Depends(get_db)):
    success = await delete_facturacio(db, facturacio_id)
    if not success:
        raise HTTPException(status_code=404, detail="Facturació not found")
    return {"detail": "Facturació deleted successfully"}
