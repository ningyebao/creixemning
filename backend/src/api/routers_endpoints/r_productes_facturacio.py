from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from data.database import get_db
from data.cruds.cd_productes_facturacio import (
    get_all_productes_facturacio,
    get_producte_facturacio,
    create_producte_facturacio,
    update_producte_facturacio,
    delete_producte_facturacio
)
from data.schemas.sch_productes_facturacio import ProducteFacturacio, ProducteFacturacioCreate

router = APIRouter(tags=["Producte Facturació"])

@router.get("/", response_model=List[ProducteFacturacio])
async def read_all_productes_facturacio(db: AsyncSession = Depends(get_db)):
    return await get_all_productes_facturacio(db)

@router.get("/{id_facturacio}/{id_producte}", response_model=ProducteFacturacio)
async def read_producte_facturacio(id_facturacio: int, id_producte: int, db: AsyncSession = Depends(get_db)):
    pf = await get_producte_facturacio(db, id_facturacio, id_producte)
    if not pf:
        raise HTTPException(status_code=404, detail="Producte Facturació not found")
    return pf

@router.post("/", response_model=ProducteFacturacio, status_code=status.HTTP_201_CREATED)
async def create_producte_facturacio_endpoint(pf_in: ProducteFacturacioCreate, db: AsyncSession = Depends(get_db)):
    return await create_producte_facturacio(db, pf_in)

@router.put("/{id_facturacio}/{id_producte}", response_model=ProducteFacturacio)
async def update_producte_facturacio_endpoint(id_facturacio: int, id_producte: int, pf_in: ProducteFacturacioCreate, db: AsyncSession = Depends(get_db)):
    updated = await update_producte_facturacio(db, id_facturacio, id_producte, pf_in.dict(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Producte Facturació not found")
    return updated

@router.delete("/{id_facturacio}/{id_producte}", response_model=dict)
async def delete_producte_facturacio_endpoint(id_facturacio: int, id_producte: int, db: AsyncSession = Depends(get_db)):
    success = await delete_producte_facturacio(db, id_facturacio, id_producte)
    if not success:
        raise HTTPException(status_code=404, detail="Producte Facturació not found")
    return {"detail": "Producte Facturació deleted successfully"}
