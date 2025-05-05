from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from data.database import init_db, get_db
from data.cruds.cd_campanya_productes import get_campanya_producte, get_all_campanya_productes, create_campanya_producte, update_campanya_producte, delete_campanya_producte
from data.schemas.sch_campanya_productes import CampanyaProducte, CampanyaProducteCreate

router = APIRouter(tags=["Campanya Productes"])

@router.get("/", response_model=List[CampanyaProducte])
async def read_all_campanya_productes(db: AsyncSession = Depends(get_db)):
    cps = await get_all_campanya_productes(db)
    return cps

@router.get("/{id_campanya}/{id_producte}", response_model=CampanyaProducte)
async def read_campanya_producte(id_campanya: int, id_producte: int, db: AsyncSession = Depends(get_db)):
    cp = await get_campanya_producte(db, id_campanya, id_producte)
    if not cp:
        raise HTTPException(status_code=404, detail="Campanya Producte not found")
    return cp

@router.post("/", response_model=CampanyaProducte, status_code=status.HTTP_201_CREATED)
async def create_campanya_producte_endpoint(cp_in: CampanyaProducteCreate, db: AsyncSession = Depends(get_db)):
    cp = await create_campanya_producte(db, cp_in)
    return cp

@router.put("/{id_campanya}/{id_producte}", response_model=CampanyaProducte)
async def update_campanya_producte_endpoint(id_campanya: int, id_producte: int, cp_in: CampanyaProducteCreate, db: AsyncSession = Depends(get_db)):
    updated_cp = await update_campanya_producte(db, id_campanya, id_producte, cp_in.dict(exclude_unset=True))
    if not updated_cp:
        raise HTTPException(status_code=404, detail="Campanya Producte not found")
    return updated_cp

@router.delete("/{id_campanya}/{id_producte}", response_model=dict)
async def delete_campanya_producte_endpoint(id_campanya: int, id_producte: int, db: AsyncSession = Depends(get_db)):
    success = await delete_campanya_producte(db, id_campanya, id_producte)
    if not success:
        raise HTTPException(status_code=404, detail="Campanya Producte not found")
    return {"detail": "Campanya Producte deleted successfully"}
