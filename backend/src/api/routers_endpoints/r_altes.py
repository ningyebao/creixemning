from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from data.database import get_db
from data.cruds.cd_altes import get_all_altes, get_alta, create_alta, update_alta, delete_alta
from data.schemas.sch_altes import Alta, AltaCreate

router = APIRouter(tags=["Altes"])

@router.get("/", response_model=List[Alta])
async def read_all_altes(db: AsyncSession = Depends(get_db)):
    return await get_all_altes(db)

@router.get("/{alta_id}", response_model=Alta)
async def read_alta(alta_id: int, db: AsyncSession = Depends(get_db)):
    alta = await get_alta(db, alta_id)
    if not alta:
        raise HTTPException(status_code=404, detail="Alta not found")
    return alta

@router.post("/", response_model=Alta, status_code=status.HTTP_201_CREATED)
async def create_alta_endpoint(alta_in: AltaCreate, db: AsyncSession = Depends(get_db)):
    alta = await create_alta(db, alta_in)
    return alta

@router.put("/{alta_id}", response_model=Alta)
async def update_alta_endpoint(alta_id: int, alta_in: AltaCreate, db: AsyncSession = Depends(get_db)):
    updated_alta = await update_alta(db, alta_id, alta_in.dict(exclude_unset=True))
    if not updated_alta:
        raise HTTPException(status_code=404, detail="Alta not found")
    return updated_alta

@router.delete("/{alta_id}", response_model=dict)
async def delete_alta_endpoint(alta_id: int, db: AsyncSession = Depends(get_db)):
    success = await delete_alta(db, alta_id)
    if not success:
        raise HTTPException(status_code=404, detail="Alta not found")
    return {"detail": "Alta deleted successfully"}
