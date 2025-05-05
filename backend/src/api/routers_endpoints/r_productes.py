from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from data.database import get_db
from data.cruds.cd_productes import (
    get_all_productes,
    get_producte,
    create_producte,
    update_producte,
    delete_producte
)
from data.schemas.sch_productes import Producte, ProducteCreate

router = APIRouter(tags=["Productes"])

@router.get("/", response_model=List[Producte])
async def read_all_productes(db: AsyncSession = Depends(get_db)):
    return await get_all_productes(db)

@router.get("/{producte_id}", response_model=Producte)
async def read_producte(producte_id: int, db: AsyncSession = Depends(get_db)):
    prod = await get_producte(db, producte_id)
    if not prod:
        raise HTTPException(status_code=404, detail="Producte not found")
    return prod

@router.post("/", response_model=Producte, status_code=status.HTTP_201_CREATED)
async def create_producte_endpoint(producte_in: ProducteCreate, db: AsyncSession = Depends(get_db)):
    return await create_producte(db, producte_in)

@router.put("/{producte_id}", response_model=Producte)
async def update_producte_endpoint(producte_id: int, producte_in: ProducteCreate, db: AsyncSession = Depends(get_db)):
    updated = await update_producte(db, producte_id, producte_in.dict(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Producte not found")
    return updated

@router.delete("/{producte_id}", response_model=dict)
async def delete_producte_endpoint(producte_id: int, db: AsyncSession = Depends(get_db)):
    success = await delete_producte(db, producte_id)
    if not success:
        raise HTTPException(status_code=404, detail="Producte not found")
    return {"detail": "Producte deleted successfully"}
