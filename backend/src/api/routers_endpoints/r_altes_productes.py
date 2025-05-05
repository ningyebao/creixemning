from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from data.database import get_db
from data.cruds.cd_altes_productes import (
    get_alta_producte,
    create_alta_producte,
    update_alta_producte,
    delete_alta_producte,
    get_all_altes_productes
)
from data.schemas.sch_altes_productes import AltaProducte, AltaProducteCreate

router = APIRouter(tags=["Altes Productes"])

# Endpoint para obtener todos los registros (sin filtros, solo paginación)
@router.get("/", response_model=List[AltaProducte])
async def read_all_altes_productes(
    skip: int = Query(0, ge=0, description="Número de registros a omitir"),
    limit: int = Query(100, ge=1, le=1000, description="Número máximo de registros a devolver"),
    db: AsyncSession = Depends(get_db)
):
    altes = await get_all_altes_productes(db, skip=skip, limit=limit)
    return altes

@router.get("/{alta_producte_id}", response_model=AltaProducte)
async def read_alta_producte_endpoint(alta_producte_id: int, db: AsyncSession = Depends(get_db)):
    ap = await get_alta_producte(db, alta_producte_id)
    if not ap:
        raise HTTPException(status_code=404, detail="Alta Producte not found")
    return ap

@router.post("/", response_model=AltaProducte, status_code=status.HTTP_201_CREATED)
async def create_alta_producte_endpoint(ap_in: AltaProducteCreate, db: AsyncSession = Depends(get_db)):
    ap = await create_alta_producte(db, ap_in)
    return ap

@router.put("/{alta_producte_id}", response_model=AltaProducte)
async def update_alta_producte_endpoint(alta_producte_id: int, ap_in: AltaProducteCreate, db: AsyncSession = Depends(get_db)):
    updated_ap = await update_alta_producte(db, alta_producte_id, ap_in.dict(exclude_unset=True))
    if not updated_ap:
        raise HTTPException(status_code=404, detail="Alta Producte not found")
    return updated_ap

@router.delete("/{alta_producte_id}", response_model=dict)
async def delete_alta_producte_endpoint(alta_producte_id: int, db: AsyncSession = Depends(get_db)):
    success = await delete_alta_producte(db, alta_producte_id)
    if not success:
        raise HTTPException(status_code=404, detail="Alta Producte not found")
    return {"detail": "Alta Producte deleted successfully"}
