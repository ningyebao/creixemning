from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from data.database import init_db, get_db
from typing import List
from sqlalchemy.future import select
from data.cruds.cd_fitxes_trucades import get_fitxa_trucada, create_fitxa_trucada, update_fitxa_trucada, delete_fitxa_trucada, get_all_fitxes_trucades
from data.schemas.sch_fitxes_trucades import FitxaTrucada, FitxaTrucadaCreate
from fastapi import Query

router = APIRouter(tags=["Fitxes Trucades"])

@router.get("/{trucada_id}", response_model=FitxaTrucada)
async def read_fitxa_trucada(trucada_id: int, db: AsyncSession = Depends(get_db)):
    trucada = await get_fitxa_trucada(db, trucada_id)
    if not trucada:
        raise HTTPException(status_code=404, detail="Fitxa Trucada not found")
    return trucada

@router.get("/", response_model=List[FitxaTrucada])
async def read_all_fitxes_trucades(
    skip: int = Query(0, ge=0, description="Número de registros a omitir"),
    limit: int = Query(100, ge=1, le=1000, description="Número máximo de registros a devolver"),
    db: AsyncSession = Depends(get_db)
):
    return await get_all_fitxes_trucades(db, skip=skip, limit=limit)

@router.post("/", response_model=FitxaTrucada, status_code=status.HTTP_201_CREATED)
async def create_fitxa_trucada_endpoint(trucada_in: FitxaTrucadaCreate, db: AsyncSession = Depends(get_db)):
    trucada = await create_fitxa_trucada(db, trucada_in)
    return trucada

@router.put("/{trucada_id}", response_model=FitxaTrucada)
async def update_fitxa_trucada_endpoint(trucada_id: int, trucada_in: FitxaTrucadaCreate, db: AsyncSession = Depends(get_db)):
    updated_trucada = await update_fitxa_trucada(db, trucada_id, trucada_in.dict(exclude_unset=True))
    if not updated_trucada:
        raise HTTPException(status_code=404, detail="Fitxa Trucada not found")
    return updated_trucada

@router.delete("/{trucada_id}", response_model=dict)
async def delete_fitxa_trucada_endpoint(trucada_id: int, db: AsyncSession = Depends(get_db)):
    success = await delete_fitxa_trucada(db, trucada_id)
    if not success:
        raise HTTPException(status_code=404, detail="Fitxa Trucada not found")
    return {"detail": "Fitxa Trucada deleted successfully"}
