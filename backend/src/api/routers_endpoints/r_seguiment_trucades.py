from fastapi import APIRouter, Depends, HTTPException, Query, Path
from fastapi import status                                       
from sqlalchemy.ext.asyncio import AsyncSession                   
from typing import List

from data.database import get_db                                  
from data.schemas.sch_seguiment_trucades import (
    SeguimentTrucades,
    SeguimentTrucadesCreate
)
from data.cruds.cd_seguiment_trucades import (
    create_seguiment_trucades,
    get_seguiment_trucades,
    get_all_seguiments_trucades,
    update_seguiment_trucades,
    delete_seguiment_trucades
)

router = APIRouter(tags=["Seguiment Trucades"])

@router.post(
    "/",
    response_model=SeguimentTrucades,
    status_code=status.HTTP_201_CREATED
)
async def create_seguiment(
    seguiment: SeguimentTrucadesCreate,
    db: AsyncSession = Depends(get_db)     # <- Ahora AsyncSession y get_db están definidos
):
    return await create_seguiment_trucades(db, seguiment)

@router.get("/{seguiment_id}", response_model=SeguimentTrucades)
async def read_seguiment(
    seguiment_id: int,
    db: AsyncSession = Depends(get_db)
):
    seguiment = await get_seguiment_trucades(db, seguiment_id)
    if not seguiment:
        raise HTTPException(status_code=404, detail="Seguiment no trobat")
    return seguiment

@router.get("/", response_model=List[SeguimentTrucades])
async def read_all_seguiments(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    return await get_all_seguiments_trucades(db, skip, limit)

@router.put("/{seguiment_id}", response_model=SeguimentTrucades)
async def update_seguiment(
    seguiment_id: int,
    update_data: SeguimentTrucadesCreate,
    db: AsyncSession = Depends(get_db)
):
    updated = await update_seguiment_trucades(
        db,
        seguiment_id,
        update_data.dict(exclude_unset=True)
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Seguiment no trobat")
    return updated

@router.delete("/{seguiment_id}", response_model=dict)
async def delete_seguiment(
    seguiment_id: int,
    db: AsyncSession = Depends(get_db)
):
    success = await delete_seguiment_trucades(db, seguiment_id)
    if not success:
        raise HTTPException(status_code=404, detail="Seguiment no trobat")
    return {"detail": "Seguiment eliminat correctament"}
